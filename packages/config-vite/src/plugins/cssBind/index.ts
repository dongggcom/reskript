import fs from 'node:fs/promises';
import {Plugin, transformWithEsbuild} from 'vite';
import MagicString from 'magic-string';

const isStyle = (id: string) => /\.module\.(css|less)(\?used)?$/.test(id);

const BIND_MODULE_ID = 'virtual:reskcript-css-bind/css-bind/bind';

const ASSIGN_MODULE_ID = 'virtual:reskript-css-bind/css-bind/assign';

const ASSIGN_MODULE = `
    var hasOwn = Object.prototype.hasOwnProperty;

    export default function assignLocals(locals, css) {
        for (var style in locals) {
            if (hasOwn.call(locals, style)) {
                try {
                    Object.defineProperty(css, style, {value: locals[style]});
                }
                catch (ex) {
                    console.warn(
                        'Unable to assign class name "' + style + '" to function, '
                        + 'change your class name or avoid use .' + style + ' from exported object of stylesheets. '
                        + 'See https://github.com/ecomfe/class-names-loader/wiki/Unsafe-class-names for detail.'
                    );
                }
            }
        }
    }
`;

const transformCssModulesExport = (code: string) => {
    const indexOfExportStatement = code.lastIndexOf('export default');
    const indexOfStartBrace = code.indexOf('{', indexOfExportStatement);
    // @ts-expect-error
    const source = new MagicString(code);
    const imports = `
        // generated by css-bind plugin
        import __classNames__ from '${BIND_MODULE_ID}';
        import __assign__ from '${ASSIGN_MODULE_ID}';
    `;
    source.prepend(imports);
    source.overwrite(indexOfExportStatement, indexOfStartBrace, 'const __css_object__ = ');
    const exports = `
        const __css_function__ = __classNames__.bind(__css_object__);
        __assign__(__css_object__, __css_function__);
        export default __css_function__;
    `;
    source.append(exports);
    return {code: source.toString(), map: source.generateMap({hires: false})};
};

interface Options {
    classNamesModule?: string;
}

export default function cssBindPlugin({classNamesModule = 'classnames/bind'}: Options = {}): Plugin {
    return {
        name: 'reskript:css-bind',
        enforce: 'post',
        resolveId(id) {
            if (id === ASSIGN_MODULE_ID || id === BIND_MODULE_ID) {
                return id;
            }
        },
        transform(code, id) {
            if (isStyle(id)) {
                return transformCssModulesExport(code);
            }
        },
        async load(id) {
            if (id === ASSIGN_MODULE_ID) {
                return ASSIGN_MODULE;
            }

            // 在`classnames`完成ES化以前，不得不在这里转换一下
            if (id === BIND_MODULE_ID) {
                const resolved = await this.resolve(classNamesModule);
                if (resolved) {
                    const code = await fs.readFile(resolved.id, 'utf-8');
                    const transformed = await transformWithEsbuild(code, resolved.id, {format: 'esm'});
                    return transformed.code;
                }
            }
        },
    };
}
