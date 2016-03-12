// window.onload=function(){
//     function $(id){
//         return document.getElementById(id)
//     }
//     var menu=$("topTags").getElementsByTagName("ul")[0];//顶部菜单容器
//     var tags=menu.getElementsByTagName("li");//顶部菜单
//     var ck=$("leftMenu").getElementsByTagName("ul")[0].getElementsByTagName("li");//左侧菜单
//     var j;
//     //点击左侧菜单增加新标签
//     for(i=0;i<ck.length;i++){
//         ck[i].onclick=function(){
//         $("welcome").style.display="none"//欢迎内容隐藏
//     //循环取得当前索引
//         for(j=0;j<8;j++){
//             if(this==ck[j]){
//                 if($("p"+j)==null){
//                     openNew(j,this.innerHTML);//设置标签显示文字
//                 }
//                 clearStyle();
//                 $("p"+j).style.backgroundColor="yellow";
//                 clearContent();
//                 $("c"+j).style.display="block";
//             }
//         }
//         return false;
//     }
// }
// //增加或删除标签
// function openNew(id,name){
//     var tagMenu=document.createElement("li");
//     tagMenu.id="p"+id;
//     tagMenu.innerHTML=name+"   "+"<img src='http://www.tjdadi.com.cn/off.gif' style='vertical-align:middle'/>";
//     //标签点击事件
//     tagMenu.onclick=function(evt){
//         clearStyle();
//         tagMenu.style.backgroundColor="yellow";
//         clearContent();
//         $("c"+id).style.display="block";
//     }
//     //标签内关闭图片点击事件
//     tagMenu.getElementsByTagName("img")[0].onclick=function(evt){
//         evt=(evt)?evt:((window.event)?window.event:null);
//         if(evt.stopPropagation){
//             evt.stopPropagation()
//         } //取消opera和Safari冒泡行为;
//         this.parentNode.parentNode.removeChild(tagMenu);//删除当前标签
//         var color=tagMenu.style.backgroundColor;
//         //设置如果关闭一个标签时，让最后一个标签得到焦点
//         if(color=="#ffff00"||color=="yellow"){//区别浏览器对颜色解释
//             if(tags.length-1>=0){
//                 clearStyle();
//                 tags[tags.length-1].style.backgroundColor="yellow";
//                 clearContent();
//                 var cc=tags[tags.length-1].id.split("p");
//                 $("c"+cc[1]).style.display="block";
//              }else{
//                 clearContent();
//                 $("welcome").style.display="block"
//              }
//         }
//     }
//     menu.appendChild(tagMenu);
// }
// //清除标签样式
// function clearStyle(){
//     for(i=0;i<tags.length;i++){
//         menu.getElementsByTagName("li")[i].style.backgroundColor="#FFCC00";
//     }
// }
// //清除内容
// function clearContent(){
//     for(i=0;i<7;i++){
//         $("c"+i).style.display="none";
//     }
// }
// }

$(function(){
        
    var $case_show = $('.case_show').children().each(function(){ 
            $(this).hide();
         }).end();

    var $case = $('.case').delegate('div','click',function(){
    
        var $a = $(this);
        var index = $case.children().index($a.parent());
        var $current = $case_show.children().eq(index);
        if(!$a.data('display')){ 
            $current.show();
            $a.data('display',true);
            if($current.show()){
                $(".case_show li").eq(index).siblings().hide();
            }else{
                $(".case_show li").eq(index).siblings().show();
            }
        }else{
            $current.hide();
            $a.data('display',false);
        }
        
    });

 });








$(function(){ 
    var $div_li =$("div.tab_menu ul li"); 
    $div_li.click(function(){ 
        var index = $div_li.index(this);  
        $("div.tab_box > .aa").eq(index).show().siblings().hide();   
    })
}) 





$(function(){
   $('#mymenu dt').click(function(event) {
       var dd = $(this).next('div');
       var display = dd.css('display');
       if (display == 'none') {
           $("#mymenu div").hide().eq($('#mymenu dt').index(this)).show(); 
       }else{
           dd.css('display','none');
       }
   });
})


// $(function(){
//     $("#mymenu dd").hide();
//     $("#mymenu dt").click(function(event) {
//         var index = $("#mymenu dt").index(this);
//         console.log("index:",index);
//         var objList = [];
//         var tmpDD = $("#mymenu dt").eq(index).next();
//         console.log("tmpDD:",tmpDD);
//         while(tmpDD.length>0 && tmpDD.get(0).tagName == 'DD'){
//               objList.push(tmpDD);
//               tmpDD = tmpDD.next();
//         }
//         var display = $(objList[0]).css('display');
//           if(display == 'none') {
//               $("#mymenu dd").hide();
//               $(objList).each(function() {
//                   $(this).show();
//               });
//           }else{
//               $(objList).each(function() {
//                   $(this).hide();
//               });
//           }
//     });
// })

$(function(){  
     var $title = $("h3 a");  
     var $content = $(".a");  
     $title.click(function(){  
         var index = $title.index($(this)); 
         //红色的位置起到相同的作用，注释一个，留一个就可以;
         $content.hide();  
         $($content.get(index)).show().siblings('a').hide();  
         return false;  
     });  
     $(".close").click(function(){
        $('.a').hide();
     })
 });  