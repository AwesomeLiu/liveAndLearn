const model = require("./model.js");
model.sync(); // 自动创建表结构，避免了手动维护一个SQL脚本

console.log("init db ok.");
process.exit(0);