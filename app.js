/* 导入api接口 */
const login_api = require('./api/login-api.js')

/* 引入express框架 */
const express = require('express');
const app = express();

/* 引入cors */
const cors = require('cors');
app.use(cors());

/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/* 引入mysql */
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_joen',
})
conn.connect();


// login_api(app)


/* 监听端口 */
app.listen(3000, () => {
    console.log('——————————服务已启动——————————');
})





/*登录模块========================================================================================*/
app.post('/login/star', (req, res) => {
    //  接受前端的data
    const data_body = req.body
    const username = data_body.username
    const password = data_body.passwords
    const iphonenum = data_body.iphonenum

    //  mysql语句的定义
    const sqlStar = `
        SELECT 
            login_technique 
        FROM 
            users 
        WHERE 
            username = '${username}' && password = '${password}' && iphonenum = '${iphonenum}'
        `
    //  mysql返回数据实现验证登录
    conn.query(sqlStar, (error, results) => {
        const bcats = results[0]
        if (bcats === undefined){
            res.json({massage: false, tishi: '账号或者密码错误'})
        }else if(bcats.login_technique === 'true') {
            res.json({massage: true, tishi: '顺利登陆'})
        }
    })

})




/*注册模块===============================================================*/
app.post('/unlogin/star', (req, res) => {
    //  接受前端的data
    const unlogins = req.body
    const iphonenum = unlogins.iphonenum
    const username = unlogins.username
    const passwords = unlogins.passwords
    //  定义sql语句
    const sqlstar = `
        INSERT INTO users (iphonenum, username, password)
        values ('${iphonenum}', '${username}', '${passwords}')
        `
    //  执行sql语句
    conn.query(sqlstar, (error, results) => {
        console.log(results)
        if (results === undefined) {
            res.json({massage: false, tishi: '注册失败'})
        } else {
            res.json({massage: true, tishi: '注册成功'})
        }
    })
})

app.get('/getlogin', (req, res) => {
    const sqlstar = `SELECT * FROM tb_boke_all`
    conn.query(sqlstar, (error, results) => {
        res.json({results: results})
    })
})

