/**
 * [用于笔记框位置和层级的获取&增加&重置]
 * @param  {string} x 用来确认操作的属性和操作方法
 */
var change=(function(){
    var distance=0;/*用于设置笔记框的位置*/
    var noteIndex=0;/*用于设置笔记框的层级*/
    return function(x){
        switch(x){
            case "addDis":
                distance+=20;
                break;
            case "getDis":
                return distance;
            case "resetDis":
                distance=0;
                break;
            case "getIndex":
                noteIndex++;
                return noteIndex;
            case "resetIndex":
                noteIndex=0;
                break;
            case "addIndex":
                noteIndex++;
                break;
        }
    }
})();

var img=new Image();/*预加载图片*/
img.src="images/loading.gif";

/**
 * [展示相应笔记图]
 * @param  {string} catogory 用来确认图片名称的前缀
 * @param  {string} text     用来确认图片名称的后缀
 */
function displayNote(catogory,text){
    if(change("getDis")>=140){/*开了7个笔记框后，位置重置*/
        change("resetDis");
    }else{
        change("addDis")
    }
    change("addIndex")
    var box='<div><h3>'+text+'</h3><img src="images/loading.gif"><span><i></i></span></div>';
    $(box).css({
        top:change("getDis"),
        left:change("getDis"),
        zIndex:change("getIndex"),/*新增的每个笔记框层级递增*/
        width:200
    }).appendTo("#main");
    // 笔记图片未加载成功前，显示loading图片
    // 加载成功后，显示相应图片
    img.src="images/"+catogory+"-"+text+".png";
    img.onload=function(){
        $("#main div:last-child").css("width","800").find("img").attr("src","images/"+catogory+"-"+text+".png");
    }
    /*图片加载失败时，提示待添加*/
    $("#main img").on("error",function(){
        $(this).hide();
        $("#main h3").text("待添加。。。");
    })

}


$(function(){
    var $main=$("#main");
    var $listTitle=$("aside ul h2");
    var $listItem=$("aside li li");
    // 设置笔记区的高度同可视区高度
    $main.css("height",$(window).height()-75);
    // 设置侧边导航栏的高度
    $("aside>ul").css("height",$(window).height()-140);

    //侧边导航栏收缩、展开
   $listTitle.on("click",function(){
        if($(this).next().css("display")=="block"){
            // $(this).next().hide();
            // $(this).find("i").text("");
            // 改用end方法
            $(this).next().hide()
                   .end().find("i").text("");
        }else{
            // $(this).next().show();
            // $(this).find("i").text("");
            $(this).next().show()
                   .end().find("i").text("");
            $listItem.removeClass("active");
            $(this).addClass("active")
                   .parent().siblings().find("h2").removeClass("active");
        }
    });

    //给侧边栏的li添加事件，显示相应笔记图
    $listItem.on("click",function(){
        var currentTitle=$(this).parent().prev().text();
        $listTitle.removeClass("active");
        $listItem.removeClass("active");
        $(this).addClass("active");

        currentTitle=currentTitle.replace(" ","");
        switch(currentTitle){
            case "HTML":
                displayNote("html",$(this).text());
                break;
            case "CSS":
                displayNote("css",$(this).text());
                break;
            case "CSS3":
                displayNote("css3",$(this).text());
                break;
            case "JavaScript":
                displayNote("js",$(this).text());
                break;
            case "BOM":
                displayNote("bom",$(this).text());
                break;
            case "DOM":
                displayNote("dom",$(this).text());
                break;
            case "jQuery":
                displayNote("jq",$(this).text());
                break;
            case "AJAX":
                displayNote("ajax",$(this).text());
                break;
            case "HTTP":
                displayNote("http",$(this).text());
                break;
            case "正则表达式":
                displayNote("reg",$(this).text());
                break;
            case "工具":
                displayNote("tool",$(this).text());
                break;
        }
        if(currentTitle!="面试总结"){
            return false;
        }else if($(this).text()=="下阶段目标"){
            displayNote("ms",$(this).text());
        }

    });

    //笔记的关闭按钮
    $main.on("click","div span",function(){
        $(this).parent().hide();
    });

    //点击笔记框时提升层级
    $main.on("click","div",function(){
        change("addIndex")
        $(this).css("z-Index",change("getIndex"));
    });

    //拖拽笔记框
    $main.on("mousedown","div h3",function(ev){
        var that=this;
        // 计算鼠标按下时，鼠标位置和笔记框的距离差
        var disX = ev.clientX - $(this).offset().left;
        var disY = ev.clientY - $(this).offset().top;
        $(document).on("mousemove",function(ev){
            // 根据距离差和鼠标移动的位置，计算笔记框的top/left值
            var L = ev.clientX - disX - $main.offset().left;
            var T = ev.clientY - disY - $main.offset().top;
            $(that).parent().css({
                left:L,
                top:T
            });
        })
         $(document).on("mouseup",function(){
            $(document).off("mousemove mouseup");
         });
         return false;
    });
    //笔记区标题，提示可拖拽cursor
    $main.on("mouseenter","div h3",function(ev){
        $(this).css("cursor","move");
    });

    //关闭所有笔记框按钮
    $("#closeAll").on("click",function(){
        $("#main div").hide();
        // 关闭后重置笔记框位置和层级
        change("resetDis");
        change("resetIndex");
    });

    //笔记区resize
    $main.on("mousedown","div",function(ev){
        var that=this;
        // 获取笔记框的原始宽度和left值
        var oldWidth= $(this).width();
        var oldLeft=$(this).offset().left;
        var mouseX=ev.clientX;
        var arrow="";
        // IE8 取消默认事件
        if ( this.setCapture ) {
            this.setCapture();
        }
        // 判断鼠标位置，决定缩放方向
        if(mouseX > oldWidth+oldLeft-10){
            arrow="right";
        }else if(mouseX < oldLeft+10){
            arrow="left";
        }
        $(document).on("mousemove",function(ev){
            switch(arrow){
                case "left":
                    $(that).css({
                        width:oldWidth-(ev.clientX-mouseX),
                        left:oldLeft+(ev.clientX-mouseX)- $main.offset().left
                    });
                    break;
                case "right":
                    $(that).css({
                        width:oldWidth+(ev.clientX-mouseX)
                    });
                    break;
            }
        });
        $(document).on("mouseup",function(){
            $(document).off("mousemove mouseup");
        });
        return false;
    });
    //笔记区左右边界提示可调整大小cursor
    $main.on("mousemove","div",function(ev){
        var oldWidth= $(this).width();
        var oldLeft=$(this).offset().left;
        var mouseX=ev.clientX;
        // 当鼠标移动到笔记框左右10像素以内时，改变鼠标样式
        if(mouseX > oldWidth+oldLeft-10 || mouseX < oldLeft+10){
            $(this).css("cursor","e-resize");
        }else{
            $(this).css("cursor","default");
        }
    })

    //侧边导航展开收起功能
    $(".navControl span:first-child").on("click",function(){
        $(".innerItem").show();
    })
    $(".navControl span:last-child").on("click",function(){
        $(".innerItem").hide();
    })

});



