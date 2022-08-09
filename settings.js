console.log("script 로딩 완료");

function onload(){
    var ajaxdata = {
        type: "GET",
        url: "get_calander",
        data: {},
        dataType: "json",
        success: function(data, status, xhr){
            for(var i = 0; i < 7; i++){
                console.log($(`#${i}_events`).val(), data[i]);
            }
        }, 
        error: function(q, w, e){}
    };
    $.ajax(ajaxdata);
}