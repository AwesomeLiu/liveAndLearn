const crypto = require('crypto');
// Hmac加密
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello, world!');
hmac.update(new Buffer('Hello, Node.js', 'utf-8'));

console.log(hmac.digest('hex'));