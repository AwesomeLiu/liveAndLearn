const assert  = require('assert');
const async_sum = require('../async_sum.js');

describe('#async sum', () => {
    describe('#async Calculate()', () => {
        // 测试异步函数，传入带有一个参数的函数
        // ES7写法，相当于 it('#async with done', function (done) {})
        it('#async with done', (done) => {
            (async function () {
                try {
                    let r = await async_sum();
                    assert.strictEqual(r, 15);
                    done();
                } catch (err) {
                    done(err);
                }
            })();
        });
        // 直接把async函数当作同步函数来测试
        it('#async function', async () => {
            let r = await async_sum();
            assert.strictEqual(r, 15);
        });
        // 测试同步函数，传入无参数函数
        it('#sync function', () => {
            assert(true);
        });
    });
});