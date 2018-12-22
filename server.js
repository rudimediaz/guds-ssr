const express = require("express");
const next = require("next");
const mysql = require("mysql");
const SqlString = require("sqlstring");

const port = parseInt(process.env.PORT, 10) || 4500;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();


//=======only on development stages=======\\
const os = require('os')
const databaseConfig1 ={
  host: "127.0.0.1",
  user: "root",
  database:"lodoyo",
  port: 3306,
  insecureAuth: true
}
const databaseConfig2 ={
  host: "127.0.0.1",
  user: "root",
  password:"wlingi123456789",
  database:"gudang",
  port: 3307,
  insecureAuth: true
}

const databaseEnvirontment =()=>{
  if(os.platform()==="linux"){
    return databaseConfig1
  }
  if(os.platform()==="win32"){
    return databaseConfig2
  }
}
//===========================================\\

const db = mysql.createPool(databaseEnvirontment());

app.prepare().then(() => {
  const server = express();

  server.get("/search", (req, res) => {
    const sqlcmd = globalGoodsSearch(req.query.keyword);
    db.query(sqlcmd, (err, result) => {
      err ? err.code : res.send(result);
    });
  });

  server.get("/suggestion", (req, res) => {
    const sqlcmd = searchSuggestion(req.query.keyword);
    db.query(sqlcmd, (err, result) => {
      err ? err.code : res.send(result);
    });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// 

const advancedSearchTools = (keyw)=>{
  var inp = keyw;
  var inpToArr = inp.split(" ");
  var crit = "WHERE ";
  for (var i = 0; i < inpToArr.length; i++) {
    crit += `goods.nama REGEXP '${inpToArr[i]}' AND `;
  }
  var critEx = crit.substr(0, crit.length - 5);
  var where = SqlString.raw(critEx);
  return where
}

const globalGoodsSearch=(que)=>{
  const where = advancedSearchTools(que)
  const sql = SqlString.format("SELECT goods.kdbarcode, goods.nama, price.hargau, stockitem.qty FROM goods INNER JOIN price ON goods.kdbarang = price.kdbarang INNER JOIN stockitem on goods.kdbarang =stockitem.kdbarang ? AND goods.deleted ='0' AND price.deleted ='0' OR goods.kdbarcode REGEXP ? ORDER BY stockitem.qty DESC",
  [where, que])
  return sql
}

const searchSuggestion = (que)=>{
  const where = advancedSearchTools(que)
  const sql = SqlString.format("SELECT goods.kdbarang, goods.nama FROM goods ? AND goods.deleted ='0' OR goods.kdbarcode REGEXP ? ORDER BY goods.nama DESC",[where,que])
  return sql
}


// const phrasectrl = keyw => {
  //   var inp = keyw;
  //   var inpToArr = inp.split(" ");
  //   var crit = "WHERE ";
  //   for (var i = 0; i < inpToArr.length; i++) {
  //     crit += `goods.nama REGEXP '${inpToArr[i]}' AND `;
  //   }
  //   var critEx = crit.substr(0, crit.length - 5);
  //   var where = SqlString.raw(critEx);
  
  //   var sql = SqlString.format(
  //     "SELECT goods.kdbarcode, goods.nama, price.hargau, stockitem.qty FROM goods INNER JOIN price ON goods.kdbarang = price.kdbarang INNER JOIN stockitem on goods.kdbarang =stockitem.kdbarang ? AND goods.deleted ='0' AND price.deleted ='0' OR goods.kdbarcode REGEXP ? ORDER BY stockitem.qty DESC",
  //     [where, inp]
  //   );
  //   return sql;
  // };