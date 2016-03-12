
$(function(){
    $(".list_table input[type=checkbox]").click(function(){
        var items = $("input[type=checkbox]:checked");
        if(items.length > 3){
            return essage({
                "type":"error",
                "content":"当前还有客户在，无法切换离线状态"
            })
        }else{

        }
    })
});   