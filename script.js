console.log("script 로딩 완료");

window.onload = function(){
    setInterval(setClock, 1000);
    setInterval(setMeal, 1000);

    var ajaxdata = {
        type: "GET",
        url: "get_calander",
        data: {},
        dataType: "json",
        success: function(data, status, xhr){
            for(var i = 0; i < 7; i++){
                $(`#${i}_events`).val(data[i].events);
                $(`#${i}_broadcast`).val(data[i].broadcast);
                $(`#${i}_events`).html(data[i].events);
                $(`#${i}_broadcast`).html(data[i].broadcast);
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
    var month = modifyNumber(dateInfo.getMonth()+1);
    var date = modifyNumber(dateInfo.getDate());
    var day_ = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var day = day_[dateInfo.getDay()];
    
    var dateDisplay = `${year}년 ${month}월 ${date}일 ${day}`;
    var timeDisplay = `${hour}:${min}:${sec}`;
    $("#date").html(dateDisplay);
    $("#time").html(timeDisplay);
    dateInfo.getHours();
}

function setMeal(){
    var dateInfo = new Date(); 
    var year = dateInfo.getFullYear();
    var month = modifyNumber(dateInfo.getMonth()+1);
    var date = modifyNumber(dateInfo.getDate());

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = this.responseXML;
            var x = xmlDoc.getElementsByTagName("row");
            for(var i = 0; i < x.length; i++){
                if(x[i].getElementsByTagName("MMEAL_SC_NM")[0].childNodes[0].nodeValue == "중식"){
                    $("#lunch").html(`열량: ${x[i].getElementsByTagName("CAL_INFO")[0].childNodes[0].nodeValue}<br>${x[i].getElementsByTagName("DDISH_NM")[0].childNodes[0].nodeValue}`); 
                }
                if(x[i].getElementsByTagName("MMEAL_SC_NM")[0].childNodes[0].nodeValue == "석식"){
                    $("#dinner").html(`석식: ${x[i].getElementsByTagName("CAL_INFO")[0].childNodes[0].nodeValue}<br>${x[i].getElementsByTagName("DDISH_NM")[0].childNodes[0].nodeValue}`); 
                }
            }
        }
    };
    xhttp.open("GET", `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=70460bde9e304a95831a20bef79102bc&ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530479&MLSV_YMD=${year}${month}${date}`, true);
    xhttp.send();
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