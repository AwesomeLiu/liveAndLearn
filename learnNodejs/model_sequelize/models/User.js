const db = require('../db');

module.exports = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: ture // 邮箱唯一
    },
    password: db.STRING(100),
    name: db.STRING(100),
    gender: db.BOOLEAN
});