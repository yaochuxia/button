(function($){
    function callbackHTML(json){
        var icon_class = '',
            box_class = ''

        switch(json.type){
            case 'success': icon_class = 'fa fa-check-circle-o',box_class = 'essage-success';break;
            case 'error': icon_class = 'fa fa-times-circle-o',box_class = 'essage-error';break;
            default:;
        }
        return temp('<div class="essage $class$"><span class="close">×</span><span class="icon $iconClass$"></span>$content$</div>',{
            "class":box_class,
            "iconClass":icon_class,
            "content": json.content
        })
    }
    function temp(str,obj){
        return str.replace(/\$\w+\$/gi, function(matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];
            return typeof returns === "undefined" ? "" : returns;
        });
    }
    function essage(str){
        var type = "success",
            txt = '',
            html = '',
            $box = $('.essage').remove()

        $.type(str) != "String" ? (type = "error",txt = str.content) : txt = str

        $box = $(callbackHTML({
            type:type,
            content:txt
        })).appendTo('body'),$box.css({
            "margin-left":'-'+ (function(){
                return $box.width()/2
            })()+'px',
            "top":'88px'
        })

        type=="success" && setTimeout(function(){
            $box.css('top','-200px')
        },2000)

        $box.find('.close').click(function(){
            $box.css('top','-200px')
            setTimeout(function(){$box.remove()},3000)
        })
    }

    window.essage || (window.essage = essage)
});
/**
 * essage()
 * @type string [error,success]  error错误消息；success正确消息；
 * @content string
 *
 * 例子：
 * essage({
 *   "type":"error",
 *   "content":"这里填写错误消息内容"
 * })
 *
 * 例子2：
 * essage('默认这样写是  正确消息显示 内容')
 * 
 */

// <script id="essageTemp" type="text/html">
//     <div class="essage essage-success">
//         <span class="close">×</span>
//         <span class="icon icon-circle-check"></span> 个人信息更新成功
//     </div>

//     <div class="essage essage-error">
//         <span class="close">×</span>
//         <span class="icon icon-circle-error"></span> 参数有误
//     </div>
// </script>