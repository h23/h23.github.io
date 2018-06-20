
picture("html");/*技能轮播图*/
picture("css");
picture("js");
picture("other");
up("project1");/*项目上浮效果*/
up("project2");
up("project3");

//监听页面滚动事件，改变相应导航样式
var as=document.getElementById("nav").children;
window.onscroll=function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop)
    if(scrollTop>1550){
        for(var i=0;i<as.length-1;i++){
            as[i].className="";
        }
        as[3].className="active";
    }else if(scrollTop>800){
        for(var i=0;i<as.length;i++){
            as[i].className="";
        }
        as[2].className="active";
    }else if(scrollTop>300){
        for(var i=0;i<as.length;i++){
            as[i].className="";
        }
        as[1].className="active";
    }else{
        for(var i=0;i<as.length-1;i++){
            as[i].className="";
        }
        as[0].className="active";
    }
}

//技能以列表or图标方式展示
var graphBtn=document.getElementById("graphBtn");
var listBtn=document.getElementById("listBtn");
var graph=document.getElementById("graph");
var list=document.getElementById("list");
    // 图标、列表按钮
graphBtn.onclick=function(){
    graph.style.display="block";
    list.style.display="none";
}
listBtn.onclick=function(){
    list.style.display="block";
    graph.style.display="none";
}

//上浮效果
function up(id){
    var div=document.getElementById(id);
    div.onmouseenter=function(){
        this.className="up";
    }
    div.onmouseleave=function(){
        this.className="";
    }
}

// 轮播图
function picture(id){
    var skill=document.getElementById(id);
    var ul=skill.getElementsByTagName("ul")[0];
    var ulis=ul.getElementsByTagName("li");;
    var left=skill.getElementsByTagName("span")[0];
    var right=skill.getElementsByTagName("span")[1];
    var ol=skill.getElementsByTagName("ol")[0];
    var olis=ol.getElementsByTagName("li");

    var imgWidth=300;/*设置图片宽度*/
    var nowPic=1;/*当前图片索引，用于上、下一张按钮*/
    var imgCount=ulis.length; /*图片个数，用于创建图片索引按钮*/
    var str="";

    // 根据图片个数在ol中创建图表索引按钮
    for(var i=0;i<ulis.length;i++){
        str+="<li>"+(i+1)+"</li>";
    }
    ol.innerHTML=str;
    ol.style.left=(skill.offsetWidth-ol.offsetWidth)/2+"px";/*ol位置居中*/
    olis[0].className="active";/*第一个按钮默认选中*/
    // 给按钮添加点击事件
    for(var i=0;i<olis.length;i++){
        olis[i].index=i;/*自定义属性，确认图片索引*/
        olis[i].onclick=function(){
            for(var i=0;i<olis.length;i++){
                olis[i].className="";
            }
            this.className="active";
            ul.style.left=-this.index*imgWidth+"px";
            nowPic=this.index+1;
        }
    }

    // 上一张、下一张按钮实现
    left.onclick=function(){
        if (nowPic == 1) {/*当前是第一张时，显示最后一张*/
            ul.style.left=-(imgCount-1)*imgWidth+"px";
            nowPic = imgCount;
        }else {/*否则显示上一张*/
            nowPic--;
            ul.style.left=-(nowPic-1)*imgWidth+"px";
        }
        for(var i=0;i<olis.length;i++){
                olis[i].className="";
        }
        olis[nowPic-1].className="active";
    }
    right.onclick=function(){
        if (nowPic == imgCount) {/*当前是最后一张时，显示第一张*/
            ul.style.left=0+"px";
            nowPic = 1;
        }else {
            nowPic++;
            ul.style.left=-(nowPic-1)*imgWidth+"px";
        }
        for(var i=0;i<olis.length;i++){
                olis[i].className="";
        }
        olis[nowPic-1].className="active";
    }
}


