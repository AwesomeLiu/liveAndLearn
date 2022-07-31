// 各种config文件的地址
const defaultConfig  = "./configs/config-default.js";
const overrideConfig = "./configs/config-override.js";
const testConfig     = "./configs/config-test.js";

const fs = require('fs');

var config = null;

if (process.env.NODE_ENV === "test") {
    console.log(`Load ${testConfig}...`);
    // 如果是测试环境，就读取config-test.js
    config = require(testConfig);
} else {
    console.log(`Load ${defaultConfig}...`);
    // 读取config-default.js
    config = require(defaultConfig);
    try {
        if (fs.statSync(overrideConfig).isFile()) {
            console.log(`Load ${overrideConfig}...`);
            // 如果不是测试环境，就读取config-override.js
            config = Object.assign(config, require(overrideConfig));
        }
    } catch (err) {
        // 如果config-override.js文件不存在，就忽略
        console.log(`Cannot load ${overrideConfig}.`);
    }
}

module.exports = config;