# 声明文件
当使用第三方库时，需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能

## 索引

```
declare var             声明全局变量
declare function        声明全局方法
declare class           声明全局类
declare enum            声明全局枚举类型
declare namespace       声明（含有子属性的）全局对象
interface / type        声明全局类型
export                  导出变量
export namespace        导出（含有子属性的）对象
export default          es6 默认导出
export =                commonjs 导出模板
export as namespace     UMD 库声明全局变量
declare global          扩展全局变量
declare module          扩展模块
/// <reference />       三斜线指令
```

## 声明语句

```ts
declare var jQuery: (selector: string) => any;
```

## 声明文件

通常会把声明语句放到一个单独的文件 (如 jQuery.d.ts) 中，这就是声明文件，声明文件必需以 .d.ts 为后缀

第三方声明文件

+ 社区

+ npm @types

## 书写声明文件

> 当第三方库没有提供声明文件时，需要自己书写

### 全局变量

通过 `<script>` 标签引入第三方库，注入全局变量

1. `declare var / let / const`

    其中使用 declare const 定义后不允许修改它的值。大部分情况推荐使用

2. `declare function`

    支持重载

3. `declare class`

4. `declare enum`

5. `declare namespace`

    防止命名冲突

6. `interface / type`

    声明合并

### npm 包

通过 `import foo from 'foo'` 导入，符合 es6 模块规范

npm 包的声明可能存在于两个地方

1. 与 npm 包绑定在一起

2. 发布到 `@types` 里

自定义声明文件 由于是通过 `import` 导入的模板，所有声明文件存放的位置也有所约束

1. 创建一个 `node_modules/@types/foo/index.d.ts` 文件，存放 `foo` 模块的声明文件。由于 `node_modules` 目录不稳定，代码也没有被保存到仓库，无法回溯版本，不建议使用，一般只用作临时测试

2. 创建一个 `types` 目录，专门管理自定义的声明文件，将 `foo` 的声明文件放到 `types/foo/index.d.ts` 中。这种方式需要配置 `tsconfig.json` 中的 `paths` 和 `baseUrl` 字段

    ```json
    {
        "compilerOptions": {
            "module": "commonjs",
            "baseUrl": "./",
            "paths": {
                "*": ["types/*"]
            }
        }
    }
    ```

    通过 `import` 导入 `foo` 时，会去 `types` 目录下寻找对应的模块声明文件

    > `module` 配置可以有很多种选项，不同的选项会影响模块的导入导出模式，其中 `commonjs` 是最常用的选项

> 强烈建议将书写好的声明文件发布到开源社区，可通过第三方库发 pr 或直接提交到 `@types` 里

1. `export`

    混用 `declare` 和 `export`

2. `export namespace`

3. `export default`

    只有 `function` / `class` / `interface` 可以直接默认导出，其他变量需要先定义，再默认导出

4. `export = `

    在 commonjs 规范中，用以下方式来导出一个模块

    ```ts
    // 整体导出
    module.exports = foo;
    // 单个导出
    exports.bar = bar;
    ```

    针对这种模块导出有以下三种方式导入

    ```ts
    // 整体导入
    const foo = require('foo');
    // 单个导入
    const bar = require('foo').bar;
    ```

    ```ts
    // 整体导入
    import * as foo from 'foo';
    // 单个导入
    import { bar } from 'foo';
    ```

    ```ts
    // 整体导入
    import foo = require('foo');
    // 单个导入
    import bar = foo.bar;
    ```

    相比 `export =` 更推荐使用 es6 标准的 `export default` 和 `export`

### UMD 库

`<script>` 引入和 `import` 导入两种方式

使用 `export as namespace`

### 直接扩展全局变量

通过 `<script>` 引入后，改变一个全局变量的结构

### 在 npm 包或 UMD 库中扩展全局变量

引用 npm 包或 UMD 库后，改变一个全局变量的结构

使用 `declare global`

### 模块插件

通过 `<script>` 或 `import` 导入后，改变另一个模块的结构

使用 `declare module`

### 声明文件中的依赖

使用三斜线指令

> 不建议使用三斜线指令来声明模块之间的依赖关系，当且仅当以下两个场景中，才需要使用三斜线指令替代 `import`

1. 当我们在**书写**一个全局变量的声明文件时

    在全局变量的声明文件中，是不允许出现 `import` 和 `export` 关键字的。一旦出现，会被视为一个 npm 包或 UMD 库。所以此时需要引入另一个库的类型，就必须使用三斜线指令

    `/// <reference types="jquery" />`

    > 三斜线指令必须放在文件的最顶端，三斜线指令的前面只允许出现单行或多行注释

2. 当我们需要**依赖**一个全局变量的声明文件时

    无法通过 `import` 来导入的全局变量类型，只能通过三斜线指令来引入

#### 拆分声明文件

当全局变量的声明文件太大时，可以通过拆分为多个文件，然后在入口文件将其一一引入，提高代码可维护性。

`types` 用于声明对另一个库的依赖，而 `path` 用于声明对另一个文件的依赖

### 自动生成声明文件

如果库的源码本身就是由 ts 写的，那么在使用 `tsc` 脚本将 ts 编译为 js 的时候，添加 `declaration` 选项，就可以同时也生成 `.d.ts` 声明文件了。

可以在命令行中添加 `--declaration`（简写 `-d`），或者在 tsconfig.json 中添加 `declaration` 选项。

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```

+ `outDir` 是将 ts 文件的编译结果输出到 指定目录下

+ `declarationDir` 设置生成 `.d.ts` 文件的目录，缺少则以 `outDir` 为准

+ `declarationMap` 对每个 `.d.ts` 文件都生成对应的 `.d.ts.map` 文件

+ `emitDeclarationOnly` 仅生成 `.d.ts` 文件，不生成 `.js` 文件

## 发布声明文件

### 将声明文件和源码放在一起

如果声明文件是通过 `tsc` 自动生成的，无需做任何其他配置

如果是手动写的声明文件，需要满足以下条件之一，才能被正确识别

+ 给 `package.json` 中的 `types` 或 `typings` 字段指定一个类型声明文件地址

+ 在项目根目录下，编写一个 `index.d.ts` 文件

+ 针对入口文件（`package.json` 中的 `main` 字段指定的入口文件），编写一个同名不同后缀的 `.d.ts` 文件

### 将声明文件发布到 `@types` 下

给 [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/) 提 pr，需要包含类型声明文件，测试代码以及 `tsconfig.json` 等
