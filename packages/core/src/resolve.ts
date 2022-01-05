import fs from 'fs';
import resolveCore from 'resolve';

export const resolveFrom = (base: string) => (id: string) => {
    const execute = (resolve: (resolved: string) => void, reject: (error: Error) => void) => resolveCore(
        id,
        {basedir: base},
        (err, resolved) => {
            if (err) {
                return reject(err);
            }
            if (!resolved) {
                return reject(new Error(`ENOENT, unable to resolve ${id}`));
            }

            resolve(resolved);
        }
    );
    return new Promise(execute);
};

const USER_MODULES_EXTENSIONS = ['.js', '.cjs'];

export const importUserModule = async <T>(moduleName: string, defaultValue?: T): Promise<T> => {
    const target = USER_MODULES_EXTENSIONS.map(v => moduleName + v).find(fs.existsSync);

    if (target) {
        // NOTE: 如果要改成原生ESM的话，这里得想个别的办法
        delete require.cache[target];
        const value = await import(target);
        return value;
    }

    if (defaultValue) {
        return defaultValue;
    }

    throw new Error(`Unable to find module ${moduleName}`);
};
