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
            data.forEach(function(item, index){
                str += `<tr>`;
                str += `<th scope = "row">${item.id}</th>`;
                str += `<td>${item.name}</td>`;
                str += `<td><a href = "ViewQuestion(${item.id})">${item.title}<a></td>`;
                str += `<td>${item.category}</td>`;
                str += `</tr>`;
            });
            $("#q_list").html(str);
        }, error: function(q, w, e){}
    };
    $.ajax(ajaxdata);
}

function ViewQuestion(id){
    console.log(`질문 아이디: ${id}`);
    var ajaxdata = {
        type: "GET",
        url: "view_question",
        data: {id: id},
        dataType: "json",
        success: function(data, status, xhr) {
            console.log(data);
            $("#writebutton").html("");
            $("q_table").html("");

            var question_info = "";
            question_info += `<button onclick = "window.location.hef = 'community.html'"><i class = "fas fa-arrow-left box-white" style = "font-size: 250%"></i></button>`;
            question_info += `<button class = 'edit' onclick = edit(${data.id})><i class="fas fa-edit" style = 'font-size: 250%; background: rgba(0, 0, 0, 0); float: right;'></i></button>`;
            question_info += `<button class = 'delete' onclick = delete_question(${data.id})><i class="far fa-trash-alt" style = 'font-size: 250%; background: rgba(0, 0, 0, 0); float: right'></i></button>`;
            question_info += "<br><br><hr><br><br>";
            question_info += `<br><div class = "title">${data.title}</div><br><hr><br>`;
            question_info += `내용: <textarea id='content' rows=4 cols=100>${data.content}</textarea><br><br><br><br><br>`;
            question_info += `댓글: <textarea id='comment' rows=3 cols=100>${data.comment}</textarea>`;
            question_info += `<button class = 'comment' onclick = comment(${data.id})>댓글달기</button><br><br><br><br><br>`;
            question_info += `좋아요 누른 사람: ${data.likes}`;

            if(data.comment != undefined){
                var commentList = JSON.parse(data.comment);
                if(commentList){
                    commentList.forEach(function(element, index){
                        console.log(element);
                        question_info += `<br><div>${element.name}: ${element.text}</div>`;
                    });
                }
            }
            $("#view_q").html(question_info);
        }, error: function(q, w, e){}
    };

    function delete_question(id){
        var ajaxdata = {
            type: "GET",
            url: "del",
            data: {id: id},
            dataType: "json",
            success: function(data, status, xhr) {
                console.log(data);
                alert(data.message);
                window.location.href = "community.html";
            }
        };
        $.ajax(ajaxdata);
    }
}