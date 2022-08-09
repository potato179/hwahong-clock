const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const mysqlconfig = require("./public/js/mysql_con.js");
const con = mysqlconfig.con;

const ps_getdb = require("./ps_getdb.js");

const hostname = "127.0.0.1";
const port = "3000";

process.argv.forEach(function(item, index) {
    console.log(item, index);
    if(item == "--port") port = Number(process.argv[index + 1]);
});

app.use("/public", express.static("public"));

app.listen(port, hostname, () => {
    console.log(port, hostname);
});

app.get("/", function(req, res, next){
    res.sendfile("index.html", {root: __dirname});
});

var urls = [
    {url: "/getdb_html", ps: ps_getdb.getdb_html},
    {url: "/get_calander", ps: ps_getdb.get_calander},
    {url: "/write_calander", ps: ps_getdb.write_calander}
];

urls.forEach(function(element, index){
    app.get(element.url, element.ps);
});