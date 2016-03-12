//错误提示框
function alertError(content){
    try{
        window.parent.window.essage({
            "type":"error",
            "content":content
        })
    }catch(e){}
}
//正确提示框
function alertSuccess(content){
    try{
        window.parent.window.essage(content)
    }catch(e){}
};
    
    //路由
    function BindRoute(tx,ty,url){
      var $toolbtn = $(".toolBtn .l")
      var route = "<a class='route' data-ty='"+ty+"' data-url='"+url+"'  href='javascript:void(0)'>"+tx+"</a> <a>/</a>"
      $toolbtn.append(route)
      RouteJump()
    }
    //路由跳转
    function RouteJump(){
      $("a.route").off('click').on("click",function() {
            $this = $(this)
            ty = $this.attr('data-ty')
            url = $this.attr('data-url')
            tx = $this.text()
            // $this.next().nextAll().remove()
            if(ty == "gethistory"){
              GetAll(ty,url)
            }else if(ty == "gethistorypaging"){
              GetAll(ty,url)
            }else{
              ur1 = window.location.origin
              window.location.href = ur1 +url+'?routename='+escape(tx)
            }
            
        });
    }
    

    //打开子页面点击事件
    function OpenHtml(){
        $(".open_btn").off('click').on("click",function() {
            $this = $(this)        
            url = $this.attr('data-url')
            ty = $this.attr('data-ty')
            routename = $this.attr('data-name')

            var prev = $('#mar-box').html()
            if(ty=="history.sub"){
              store('history-prev',prev)
            }else if(ty=="empSession.sub"){
              store('session-prev',prev)
            }
            
            
            ur1 = window.location.origin
            window.location.href = ur1 +url+'?routename='+escape(routename)
        });
    }
    //获取数据列表,返回json
    function GetAll(ty,url){
        console.log('search ty : ',ty,' url : ',url)
        $.get(url, function(data) {
          if(data != ""){
            data = JSON.parse(data)
            removeLoad() //移除loading
            if (data.code == 0){
              if(data.data.total > 0){
                  switch (ty){
                  case "gethistory"://拉客户历史记录 页面生成
                      console.log("拉客户历史记录 ")
                      CreatSubHistoryDetail($('.pubTable'),data.data)
                      break;
                  case "gethistorypaging"://翻页拉客户历史记录 页面生成
                      CreatSubHistoryDetail($('.historyDetail'),data.data)
                      break;
                  }
                }
            }else{
              alertError(data.message)
            }
          }
        });
    }
    function getParam(url,name){
      var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g"),
          matcher = pattern.exec(url),
          items = null;
      if(null != matcher){
              try{
                      items = decodeURIComponent(decodeURIComponent(matcher[1]));
              }catch(e){
                      try{
                              items = decodeURIComponent(matcher[1]);
                      }catch(e){
                              items = matcher[1];
                      }
              }
      }
      return items;
    };
    //生成历史消息页面
    function CreatSubHistoryDetail ($obj,dt) {
        var $table=$obj,
            $box = $table.parent()

        $table.remove();
        dt.totals = Math.ceil(dt.total/dt.size) 
        replaceMSGTime(dt)
        dt.employee_code = dt.employee.code
        dt.subscriber.create_at = new Date(dt.subscriber.create_at).format("yyyy-MM-dd hh:mm:ss");
        $box.html(template('gethistoryTemp',{'gethistoryData':dt}));
        historyPaging()
        gotoPaging(dt.employee_code,dt.subscriber.id,dt.totals)
        replaceQQExp()
        picturePreview($box.find('img.preview'))
    }
    function replaceQQExp () {
      var msg='';
          qqExp = function(str){
            $.each(qqExpAll,function(idx,item){
              img = '<img class="qq" src="/public/img/QQexpression/'+item.img+'"/>'
              reg = new RegExp(item.reg, 'g');
              str = str.replace(reg,img)
              reg = new RegExp('\\'+item.con, 'g');
              str = str.replace(reg,img)
            })
            return str
          }
      $('.historyDetail article aside').each(function(index, el) {
        msg = $(this).html()
        $(this).html(qqExp(msg))
      });

    }
    function replaceMSGTime (json) {
      var dtMSG = json.items
      if(dtMSG.length>0){
        for (var i = 0; i < dtMSG.length; i++) {
          dtMSG[i].send_at = new Date(dtMSG[i].send_at*1000).format("yyyy年MM月dd日 hh:mm:ss")
        };
         return json.items
      }
    }
    //跳转页面
    function gotoPaging (code,sub_id,total_page) {
      var $btn = $('.historyDetail .historyGotoBtn')
          $txt = $btn.prev(),
          val = '',
          code = code

          console.log("gotoPaging:::",code);
      $btn.click(function(){
        val = parseInt($txt.html())
        if(!val){
          alertError("请输入页码！");
          return false;
        } 
        if(total_page<val) {
          alertError("没有第"+val+'页！');
          return false;
        }
        GetAll("gethistorypaging",'/api/history/'+code+'/'+sub_id+'?size=10&page='+val)
      })
      $txt.keydown(function(e){
        e =window.event || e;
        if (e.keyCode == 13 && e.ctrlKey){e.returnValue = false;return false;
        }else if (e.keyCode==13) {e.returnValue = false;return false;}
      })
    }
    //翻页
    function historyPaging () {
      $('.historyDetail .historypaging a[data-ty="historyPaging"]').off('click').click(function(){
        GetAll("gethistorypaging",$(this).attr('data-url'))
      })
    }
    //图片预览
    function picturePreview($img){
      var html = '<div class="picturePreview historyPicturePreview"></div>',
        $picbox = null,
        src = "",
        str_end = 0

      $img.off('click').click(function () {
        $picbox = $(html).appendTo('body')
        src = $(this).attr('src')
        str_end = src.indexOf('&')
        src = src.substring(0,str_end)
        $picbox.append('<span></span><img src="'+src+'" /><i class="fa fa-times"></i>')
        $('.picturePreview').click(function  () {
          $(this).remove()
        })
      })
    }
    //拉客户历史记录
    function BindSubHistoryDetail () {
      $('a[data-ty="gethistory"]').off('click').on('click',function(){
          var prev = $('#mar-box').html()
          store('message-prev',prev)
          
          $this = $(this)
          ty = $this.attr('data-ty')
          url = $this.attr('data-url')
          routename = $this.attr('data-name')
          BindRoute(routename,"gethistorypaging",url)
          GetAll(ty,url)
      })
    }


    //时间控件
    function Calender(){
        $(".JSLiteCalenbar2").each(function(index,item){
            new JSLite.calendar(item,function(date){
              var y = date[0]+""+date[1]+""+date[2]+""+date[3]
              var m = date[5]+""+date[6]
              var d = date[8]+""+date[9]
              $(item).children('input').val(y+"-"+m+"-"+d)
            }).hide().time()
        });
    }
    //api快捷回复删除
    function quickreplyDelete(){
        $('.quickreplyDelete').off('click').click(function(){
            var url = $(this).attr('data-url')
            $.ajax({
                type:'DELETE',
                dataType:'json',
                url:url,
                success:function(data){
                    console.log('')
                    if (data.message=="ok") {
                        alertSuccess('删除成功！')
                        $("input.search_btn").click();
                    }else{
                        alertSuccess(data.message)
                    }
                },
                error:function(d){
                     console.log('error:',d)
                }
            })
        })
    }
    //翻页功能
    function pageGoto(){
     $('.paging .home,.paging .prev,.paging .next,.paging .end,.paging .goto').off('click').click(function(){
        var $this = $(this),
            cls = $this.attr('class')
            url = $this.attr('data-url')
            page = $this.prev().val()
            if(cls == 'goto'){
                if(url.match(/.*page=/)){
                  url = url.match(/.*page=/)[0]
                  url += page
                }else{
                  limit = $("span[name=size]").text()
                  max_page  = $("span[name=max_page]").text()
                  if(parseInt(page)>parseInt(max_page)){
                    page = max_page
                  }
                  if(parseInt(page)<1){
                    page = 1
                  }
                  url += (page-1)*limit
                }
                
            }
            search_url = $(".search_btn").attr('data-url')
            $(".search_btn").attr('data-ty', 'page')
            $(".search_btn").attr('data-url',url)
            $(".search_btn").click()
            $(".search_btn").attr('data-ty', '')
            $(".search_btn").attr('data-url',search_url)
     })
    }
    function CreatePagerObject(total,url){
      var pager = {}
      offset = 0
      limit = url.split('limit=')[1].split('&')[0]
      if(url.match(/.*offset=/)){
        offset = url.split('offset=')[1]
        url = url.match(/.*offset=/)[0]
      }else{
        url += "&offset="
      }
      
      pager["total"] = total
      pager["limit"] = limit
      pager["max_page"] = Math.ceil(total/limit)
      pager["min_page"] = 1
      if(total == 0){
        pager["min_page"] = 0
      }  
      pager["current_page"] = offset/limit + 1
      pager["url"] = url
      return pager
    }


var page = null;
//全选框 点击事件
function CheckAllBind(){
    $(".CheckAll").off('click').click(function() {
        var $ob  = $("input.CheckAll_btn")
        if(this.checked){
            $ob.each(function(ind, item) {
                item.checked = true
            });
        }else {
            $ob.each(function(ind, item) {
                item.checked = false
            });
        }

    });
}

//返回上一级
function backPrev(){
    $('.boxHead .backPrev').off('click').click(function(){
        $('#manageNav li.ok').click()
    })
}
//绑定 返回上一步 按钮事件
function PrevBtn(){
  $(".prev_btn").off('click').click(function(){
    var len= $("a.route").length
    $("a.route").eq(len-2).click()
  })
}

//编辑按钮 绑定点击事件
function ModifyBind(){
    $(".modify_btn").off('click').on("click",function() {
    var $this = $(this)
    var url = $this.attr('data-url')
    var ty = $this.attr('data-ty')
    switch (ty){
    case "employee":
        Popup(url,"编辑客服信息",360,420);
        break;
    case "quickreply":
        Popup(url,"编辑快捷回复文件夹信息",340,240);
        break;
    case "quickreply.file":
        Popup(url,"编辑快捷回复信息",310,180);
        break;
    case "notification":
        Popup(url,"编辑公告信息",300,220);
        break;
    case "empConfig":
        Popup(url,"编辑客服管理配置",340,200);
        break;
    case "nodeConfig":
        Popup(url,"编辑网点全局配置",340,220);
        break;
    case "subscriber":
        Popup(url,"编辑平台客户信息",340,420);
        break;
    case "offline":
        Popup(url,"离线留言回复",770,520);
        break;
    case "offline_error":
        Popup(url,"离线留言异常设置",340,180);
        break;
    case "CreateFile":
        if(reportTatal == 0){
          alertError('当前网点没有绩效！')
          return
        }
        Popup(url,"创建新文件",340,240);
        break;
    }
    });
}

//客服工号管理 - 状态按钮 绑定点击事件
function StatBind(){
    $(".stat_btn").off('click').on("click",function() {
        var $this = $(this)
        var url = $this.attr('data-url')

        if (this.id == "CheckAll"){
            var list = ""
            var $ob  = $("input.CheckAll_btn")
            $ob.each(function(idx, item) {
                if (item.checked){
                    if (list == "" ) {
                        list = item.value
                    } else {
                        list = list + "," +item.value
                    }
                }
            });

            if (list == ""){
                alertSuccess('至少选择一个客服！')
                return
            }
            url = url + list
        }

        $.get(url, function(data) {
            data = JSON.parse(data)
            console.log(data)
            if (data.code == 0){
                console.log(data.data)
                switch(data.data){
                    case 0:alertSuccess('还原成功！');break;
                    case 1:alertSuccess('启用成功！');break;
                    case 2:alertSuccess('禁用成功！');break;
                    case 3:alertSuccess('删除成功！');break;
                    case 4:alertSuccess('发布成功！');break;
                    case 5:alertSuccess('作废成功！');break;
                    case 6:alertSuccess('留言领取成功！');break;
                    case 9:alertSuccess('强制关闭成功！');break;
                }
            }else{
                alertError(data.message)
            };
            setTimeout('$(".search_btn").click()',800)
        });
    });
}



    //新窗口
    function Popup(url,title,w,h){
       $(".popupBox").remove()
        pop = new $.popup({
            "title":title,
            // "content":'大哥测试一下可以不？<div id="baidu" >Baidu</div>',
            "layer":true,
            "iframe":url,
            "offset":{"width":w,"height":h}
        });
    }

    //下载
    function DownloadFile(url){
      if(url==""){
        alertError("导出失败")
        return
      }
      origin = window.location.origin
      $("a.download").attr('href',origin+'/'+url)
      $("a.download").click()
      $("a.download").attr('href','#')
    }
    //验证时间
    function strDateTime(str)
    {
       var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
       var r = str.match(reg); 
       if(r==null)return false; 
       var d = new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
       return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
    }
    //转换中文时间
    function ToCHTime(str){
        var list = str.split(' ')
        var date = list[0].split('-')
        var time = list[1].split(':')
        var result = date[0]+"年"+date[1]+"月"+date[2]+"日"+time[0]+"时"+time[1] +"分"+time[2]+"秒"
        return result
    } 
    //加载无数据提示
    function ResultEmptyRow(num){
        html = '<tr class="data"><td colspan="'+num+'" style="text-align: center;">未查询到任何相关记录！</td></tr>'
        $("tfoot").before(html);
    }

    var loadnum = 0  //loading 计数
    var dload //setTimeout 计数器
    //数据加载loading
    function loading(){
      if(loadnum==0){
        removeLoad()
        var loadhtml = "<tr class='data'><td colspan='20' align='center'><i class='fa fa-spinner fa-pulse fa-1x fa-fw'></i> 数据加载中<b>.</b></td></tr>"
        $("tfoot").before(loadhtml);
        loadnum = 1
      }else if(loadnum == 6){
        loadnum = 1
        $('tr.data td').eq(0).children('b').eq(0).html('.')
      }else{
        $('tr.data td').eq(0).children('b').eq(0).append('.')
        loadnum += 1
      }
      // console.log(load)
      dload = setTimeout("loading()",1000)
    }
    //移除loading
    function removeLoad(){
      loadnum = 0
      clearTimeout(dload)
      $('tr.data').remove()
      $("tfoot").children().eq(0).children().eq(0).html("")
    }
    function formatCalender(){
      Calender() //绑定时间控件
      //格式化 时间输入框的时间格式
      $(".JSLiteCalenbar").click(function(){
        $txt = $(this).prev()
        ty = $txt.attr('name')
        val = $txt.val()
        if(val !="" &&  ty == "startdate"){
            if(val.length != 19){
              $txt.val(val+" 00:00:00")
            }
        }
        if(val !="" && ty == "enddate"){
            if(val.length != 19){
              $txt.val(val+" 23:59:59")
            }
        }
      })
    }
// mgWcj.loadframe();
// window.onresize=function () {
//     mgWcj.loadframe();
// }
