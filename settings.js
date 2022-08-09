console.log("script 로딩 완료");

function onload(){
    var ajaxdata = {
        type: "GET",
        url: "get_calander",
        data: {},
        dataType: "json",
        success: function(data, status, xhr){
            for(var i = 0; i < 7; i++){
                $(`#${i}_events`).val() = data[i].events;
                $(`#${i}_broadcast`).val() = data[i].broadcast;

                console.log($(`#${i}_events`).val(), $(`#${i}_broadcast`).val())
            }
        }, 
        error: console.log("오류가 발생했습니다!")
    };
    $.ajax(ajaxdata);
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
        error: console.log("오류가 발생했습니다!")
    };
    $.ajax(ajaxData);
}