module.exports = function (app,conn){

    /* 登录模块==================================================================== */
    app.post('/login/star', (req, res) => {
    //  接受前端的data
        const data_body = req.body
        const username = data_body.username
        const passwords = data_body.passwords
        const iphonenum = data_body.iphonenum

    //  mysql语句的定义
        const sqlStar = `
        SELECT 
            login_technique 
        FROM 
            tb_boke_all 
        WHERE 
            username = '${username}' && passwords = '${passwords}' && iphonenum = '${iphonenum}'
        `
        console.log(iphones)
    //  mysql返回数据实现验证登录
        conn.query(sqlStar, (error, results) => {
            if (results === undefined){
                res.json({massage: false, tishi: '账号或者密码错误'})
            }else if(data_body.login_technique === 'true') {
                console.log(iphonenum)
                res.json({massage: true, tishi: '顺利登陆'})
                console.log(iphones)
            }
        })

    })
    /*注册模块===============================================================*/
    app.post('/unlogin/star', (res, req) => {
        //  接受前端的data
        const data_body = req.body
        const iphonenum = data_body.iphonenum
        const username = data_body.username
        const passwords = data_body.passwords
        //  定义sql语句
        const sqlstar = `
        INSERT INTO tb_boke_all (iphonenum, username, passwords, login_technique)
        values ('${iphonenum}', '${username}', '${passwords}', 'true')
        `
        //  执行sql语句
        conn.query(sqlstar, (error, results) => {
            if (results === undefined) {
                res.json({massage: false, tishi: '注册失败'})
            } else {
                res.json({massage: true, tishi: '注册成功'})
            }
        })
    })

    app.get('/l12', (req, res) => {
        res.send('sadiaisudi')
    })
}