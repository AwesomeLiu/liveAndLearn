const Sequelize = require('sequelize');
const config = require('./config');
// 创建一个sequelize对象
var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
// 定义模型Pet
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
    // 关闭Sequelize自动添加timestamp的功能
    timestamps: false
});
// 获取当前时间
var now = Date.now();
// 用Promise的方式写入数据
Pet.create({
    id: 'g-' + now,
    name: 'Gaffey',
    gender: false,
    birth: '2017-07-07',
    createdAt: now,
    updatedAt: now,
    version: 0
}).then(function (p) {
    console.log('created: ' + JSON.stringify(p));
}).catch(function (err) {
    console.log('failed: ' + err);
});
// 用await的方式写入数据 create()
(async () => {
    var dog = await Pet.create({
        id: 'd-' + now,
        name: 'Odie',
        gender: false,
        birth: '2017-07-17',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    console.log('created: ' + JSON.stringify(dog));
})();
// 查询数据 findAll()
(async () => {
    var pets = await Pet.findAll({
        where: {
            name: 'Gaffey'
        }
    });
    console.log(`find $(pets.length) pet(s):`);
    for(let p of pets) {
        console.log(JSON.stringify(p));
    }
})();
// 更新数据 save()
(async () => {
    var p = await queryFromSomewhere();
    p.gender = true;
    p.updatedAt = Date.now();
    p.version ++;
    await p.save();
});
// 删除数据 destroy()
(async () => {
    var p = await queryFromSomewhere();
    await p.destroy();
});