const http = require("http");
const express = require("express");
const fs = require("fs");
const app = express();

const mysqlconfig = require("./public/js/mysql_con.js");
const con = mysqlconfig.con;

const ps_get = require("./get.js");

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
    {url: "/settings", ps: ps_get.settings_html},
    {url: "/script.js", ps: ps_get.script},
    {url: "/get_calander", ps: ps_get.get_calander},
    {url: "/write_calander", ps: ps_get.write_calander}
];

urls.forEach(function(element, index){
    app.get(element.url, element.ps);
});