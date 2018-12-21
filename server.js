const express = require("express");
const next = require("next");
const mysql = require("mysql");
const SqlString = require("sqlstring");

const port = parseInt(process.env.PORT, 10) || 4500;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password:"wlingi123456789",
  database: "gudang",
  port: 3307,
  insecureAuth: true
});

app.prepare().then(() => {
  const server = express();

  server.get("/search", (req, res) => {
    const sqlcmd = phrasectrl(req.query.keyword);
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

const phrasectrl = keyw => {
  var inp = keyw;
  var inpToArr = inp.split(" ");
  var crit = "WHERE ";
  for (var i = 0; i < inpToArr.length; i++) {
    crit += `goods.nama REGEXP '${inpToArr[i]}' AND `;
  }
  var critEx = crit.substr(0, crit.length - 5);
  var where = SqlString.raw(critEx);

  var sql = SqlString.format(
    "SELECT goods.kdbarcode, goods.nama, price.hargau, stockitem.qty FROM goods INNER JOIN price ON goods.kdbarang = price.kdbarang INNER JOIN stockitem on goods.kdbarang =stockitem.kdbarang ? AND goods.deleted ='0' AND price.deleted ='0' OR goods.kdbarcode REGEXP ? ORDER BY stockitem.qty DESC",
    [where, inp]
  );
  return sql;
};
