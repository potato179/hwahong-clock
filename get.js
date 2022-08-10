const mysqlconfig = require('./public/js/mysql_con.js');
var con = mysqlconfig.con;

function settings_html(req, res, next){
    res.sendFile('./settings.html', {root: __dirname});
}

function settings_js(req, res, next){
    res.sendFile('./settings.js', {root: __dirname});
}

function get_calander(req, res, next){
    var s = `select * from calander;`;
    con.query(s, function(err, result){
        if(err) throw err;
        res.send(result);
    });
}

function write_calander(req, res, next){
    var events_arr = req.query.events;
    var broadcast_arr = req.query.broadcast;
    for(var i = 0; i < 7; i++){
        console.log(`ok in ${i}`);
        con.query(`update calander set broadcast = "${broadcast_arr[i]}", events = "${events_arr[i]}" where day = "${i}";`, function(err, result){
            if(err) throw err;
            console.log(result);
            res.send({
                condition: "등록됨",
                message: "등록을 완료하였습니다."
            });
        });
    }
}

exports.settings_html = settings_html;
exports.settings_js = settings_js;
exports.get_calander = get_calander;
exports.write_calander = write_calander;