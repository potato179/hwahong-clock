console.log("script 로딩 완료");

window.onload = function(){
    setInterval(setClock, 1000);

    var ajaxdata = {
        type: "GET",
        url: "get_calander",
        data: {},
        dataType: "json",
        success: function(data, status, xhr){
            for(var i = 0; i < 7; i++){
                $(`#${i}_events`).val(data[i].events);
                $(`#${i}_broadcast`).val(data[i].broadcast);

                console.log($(`#${i}_events`).val(), $(`#${i}_broadcast`).val())
            }
        }, 
        error: function (jqXHR, textStatus, errorThrown){ 
            console.log(`오류가 발생했습니다! ${jqXHR.responseText}`); 
        }
    };
    $.ajax(ajaxdata);
}

function setClock(){
    var dateInfo = new Date(); 
    var hour = modifyNumber(dateInfo.getHours());
    var min = modifyNumber(dateInfo.getMinutes());
    var sec = modifyNumber(dateInfo.getSeconds());
    var year = dateInfo.getFullYear();
    var month = dateInfo.getMonth() + 1;
    var date = dateInfo.getDate();
    var dateDisplay = `${year}년 ${month}월 ${date}일`;
    var timeDisplay = `${hour}:${min}:${sec}`;
    $("#date").html(dateDisplay);
    $("#time").html(timeDisplay);
    dateInfo.getHours();
}

function modifyNumber(time){
    if(parseInt(time) < 10){
        return "0" + time;
    }
    else{
        return time;
    }
}

function updateCalander(){
    var events = [];
    var broadcast = [];
    for(var i = 0; i < 7; i++){
        events.push($(`#${i}_events`).val());
        broadcast.push($(`#${i}_broadcast`).val());
    }
    console.log(events, broadcast);

    var sendData = {
        events: events, 
        broadcast: broadcast
    };

    var ajaxData = { 
        type: "GET", 
        url : "write_calander",
        data: sendData, 
        dataType: "json", 
        success: alert("저장되었습니다."),
        error: function (jqXHR, textStatus, errorThrown){ 
            console.log(`오류가 발생했습니다! ${jqXHR.responseText}`); 
        }
    };
    $.ajax(ajaxData);
}