const crypto = require('crypto');
// 'md5'可以改为'sha1', 'sha256', 'sha512'
const hash = crypto.createHash('md5');

// 可以任意多次调用update()
hash.update('Hello, world!');
hash.update(new Buffer('Hello, Node.js', 'utf-8'));

console.log(hash.digest('hex'));