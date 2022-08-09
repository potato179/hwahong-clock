console.log("script 로딩 완료");

function onload(){
    var ajaxdata = {
        type: "GET",
        url: "get_calander",
        data: {},
        dataType: "json",
        success: function(data, status, xhr){
            console.log(data);
            var str = "";
        }, 
        error: function(q, w, e){}
    };
    $.ajax(ajaxdata);
}