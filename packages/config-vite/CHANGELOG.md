# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.2.0](https://github.com/ecomfe/reskript/compare/v5.1.0...v5.2.0) (2022-03-14)


### Bug Fixes

* **build:** 修复*.var.less未自动注入的问题 ([#279](https://github.com/ecomfe/reskript/issues/279)) ([65db818](https://github.com/ecomfe/reskript/commit/65db818545b8366450612a48abbf14201f9ea6c2))





# [5.1.0](https://github.com/ecomfe/reskript/compare/v5.0.0...v5.1.0) (2022-03-11)


### Bug Fixes

* **build:** 修复对core-js的预处理逻辑 ([#277](https://github.com/ecomfe/reskript/issues/277)) ([f82c6a0](https://github.com/ecomfe/reskript/commit/f82c6a0b5a15516be149104c62177b1fd22e169c))





# [5.0.0](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.1...v5.0.0) (2022-03-10)


### Bug Fixes

* **config-vite:** 修复调用core-js-compat的错误 ([72e0b3b](https://github.com/ecomfe/reskript/commit/72e0b3bb4e0dc2ece71e65d1213184a6aff286d5))





# [5.0.0-beta.1](https://github.com/ecomfe/reskript/compare/v5.0.0-beta.0...v5.0.0-beta.1) (2022-03-10)


### Performance Improvements

* **build:** 预处理antd和core-js的打包 ([0559a6e](https://github.com/ecomfe/reskript/commit/0559a6e42b3c50fc3445cb91224a531c25d9c31d))





# [5.0.0-beta.0](https://github.com/ecomfe/reskript/compare/v4.3.0...v5.0.0-beta.0) (2022-03-03)


### Features

* **build:** 在Vite引擎中支持publicPath ([#200](https://github.com/ecomfe/reskript/issues/200)) ([c4da054](https://github.com/ecomfe/reskript/commit/c4da054ed4e2a3c704c2d54dc3777801b343167e))
* **build:** 支持Vite的build命令 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([4294acf](https://github.com/ecomfe/reskript/commit/4294acf3da0346760313d1a89db3ca4fb93c45c8))
* **build:** 支持Vite的finalize配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([33ab5b6](https://github.com/ecomfe/reskript/commit/33ab5b65fa91b4843e1c5a5b488054796ed8d830))
* **build:** 支持Vite的service worker生成 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([47600c0](https://github.com/ecomfe/reskript/commit/47600c0cb20276bf72e4d81be7071929816c6d1f))
* **build:** 支持双引擎的HTML修改功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([41d9521](https://github.com/ecomfe/reskript/commit/41d9521225ff4b5bcb43614d82f9eec87bcd638d))
* **config-vite:** 增加css相关的处理插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([3e0e65b](https://github.com/ecomfe/reskript/commit/3e0e65b75c72d3fa308563595254248f5848e392))
* **config-vite:** 实现SVG转React组件的插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([056c06a](https://github.com/ecomfe/reskript/commit/056c06aaf799ad76ca2271c990411d18786ad3b4))
* **dev:** 在Vite引擎中支持customizeMiddleware ([#200](https://github.com/ecomfe/reskript/issues/200)) ([f023a42](https://github.com/ecomfe/reskript/commit/f023a42b47bc41bcd6e0af7c3b3c2df2dcec5e2f))
* **dev:** 实现Vite的dev基础功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([2e46749](https://github.com/ecomfe/reskript/commit/2e46749180f47810abf9171d74d0b85820d98d55))
* **play:** 支持Vite引擎的play功能 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([bb7e629](https://github.com/ecomfe/reskript/commit/bb7e62936582c62098e3bea31ee93f286eaa81a6))
* **portal:** 实现portal模块 ([#266](https://github.com/ecomfe/reskript/issues/266)) ([2e765dc](https://github.com/ecomfe/reskript/commit/2e765dc84f7d9224b317c73bb5ceb9576a28b779))
* 使用query引入worker ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ed5efd4](https://github.com/ecomfe/reskript/commit/ed5efd46a67672b14919b84fa4ea9805afd326c2))
* 实现Vite样式相关的配置 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([ee7bab0](https://github.com/ecomfe/reskript/commit/ee7bab0c127d153ebc158e41f6be6921e108c619))
* 自动生成入口HTML的插件 ([#200](https://github.com/ecomfe/reskript/issues/200)) ([a1efd94](https://github.com/ecomfe/reskript/commit/a1efd94d80eda7e5758e7fb1f28c26dc104271d4))


### BREAKING CHANGES

* **build:** `@reskript/webpack-plugin-extra-script`已经废弃，使用`@reskript/plugin-inject-html`替代
* **dev:** `@reskript/config-webpack`和`build.finalize`中的`styleResources`相关的功能已经移除，由内置的less插件实现
* **dev:** `$features`改名为`skr.features`，`$build`改名为`skr.build`
* **dev:** 自定义HTML模板中，只能使用`templateData.*`获取模板数据
* **dev:** 原入口配置中的`export const html`中，用于模板数据的部分，更新为`export const templateData`
* 要将文件引入为worker，需要使用`xxx?worker`的形式
