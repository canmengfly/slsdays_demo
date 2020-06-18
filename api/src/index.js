
/**************************************************
Node8.9-Mysql
Reference: mysql api---https://www.npmjs.com/package/mysql
Reference: How to access database---https://cloud.tencent.com/document/product/236/3130
Reference: How to connect api gateway with scf---https://cloud.tencent.com/document/product/628/11983
***************************************************/

function wrapPromise(connection, sql) {
  return new Promise((res, rej) => {
    connection.query(sql, function(error, results, fields) {
      if (error) {
        rej(error)
      }
      res(results)
    })
  })
}


exports.main_handler = async (event, context, callback) => {
  const mysql = require('mysql');
  const connection = mysql.createConnection({
    host     : 'sql.tencentcdb.com',       
    user     : 'root',              
    password : 'serverless',       
    port: '60454',                   
    database: 'serverless_form'
  });

  connection.connect();
  console.log(event.body)

  // get value from apigw
  const { username, email, phone, company, poi, company_size, message} = JSON.parse(event.body)

  const updateSql = `INSERT INTO user_slsdays ( username,email,phone,company,use_status,company_size,comment,created_time ) VALUES ( '${username}','${email}','${phone}','${company}',${poi},${company_size},'${message}',NOW() )`

  let queryResult = await wrapPromise(connection, updateSql)
  
  connection.end();

  return queryResult
}
