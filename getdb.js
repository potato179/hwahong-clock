const mysqlconfig = require('./public/js/mysql_con.js');
var con = mysqlconfig.con;

function settings_html(req, res, next){
    res.sendFile('settings.html', {root: __dirname});
}

function get_calander(req, res, next){
    var s = `select * from calander;`;
    con.query(s, function(err, result){
        if(err) throw err;
        res.send(result);
    });
}

function write_calander(req, res, next){
    var day = req.query.day;
    var broadcast = req.query.broadcast;
    var events = req.query.events;
    con.query(`update calander set broadcast = "${broadcast}", events = "${events}"; where day = "${day}"`, function(err, result){
        if(err) throw err;
        console.log(result);
        res.send({
            condition: "등록됨",
            message: "등록을 완료하였습니다."
        });
    });
}

exports.settings_html = settings_html;
exports.get_calander = get_calander;
exports.write_calander = write_calander;