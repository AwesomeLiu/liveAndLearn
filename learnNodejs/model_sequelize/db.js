const Sequelize = require('sequelize');
console.log("init sequelize");
// 创建一个sequelize对象
var sequelize = new Sequelize('dbname', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
// id不可变
const ID_TYPE = Sequelize.STRING(50);
// 定义defineModel强制实现规范
function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === "object" && value["type"]) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    // 定义id
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    // 定义createdAt
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    // 定义updatedAt
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    // 定义version
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++; // 版本号自增
                }
            }
        }
    });
}