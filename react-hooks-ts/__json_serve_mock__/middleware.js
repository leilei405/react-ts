module.exports = (req, res, next) => {
    // console.log(req, '---req');
    // console.log(res, '---res');
    // 判断捕获login请求
    if(req.method === 'POST' && req.path === '/login') {
        if (req.body.username === 'jack' && req.body.password === '123456') {
            // console.log(req.body.username, '---req.body.username');
            // console.log(req.body.password, '---req.body.password');
            return res.status(200).json({
                user: {
                    token:'123'
                }
            })
        } else {
            return res.status(400).json({ message: '用户名或者密码错误' })
        }
    }
    next();
} 