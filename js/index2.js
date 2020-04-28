var content_1 = $(".showContent_1");
var content_2 = $(".showContent_2");
var offset_1 = 0;
var offset_2 = 2736;
$(function(){
    setInterval(function(){
        offset_1 += -2;
        if(offset_1 <= -2736){
            offset_1 = 2736 
        }
        content_1.css("left",offset_1);
        // content_1.style.marginLeft = offset;
    
    },50)
    setInterval(function(){
        offset_2 += -2;
        if(offset_2 <= -2736){
            offset_2 = 2736 
        }
        content_2.css("left",offset_2);
        // content_1.style.marginLeft = offset;
    },50)
})

$.ajax({
    url: 'http://192.168.1.238:8080/WisdomBank/xlqiang/picmsg',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
        for(var i = 0; i < data.returnData.length; i++){
            var div = document.createElement('div');
            var divId = div.id = "img_" + data.returnData[i].id;
            document.getElementsByClassName("showContent_1").item(0).appendChild(div);
            
            var img = document.createElement('img');
            var src = document.createAttribute('src');
            src.value = data.returnData[i].pic_path;
            img.setAttributeNode(src);
            document.getElementById(divId).appendChild(img);
        }
       
        // var len = data.returnData.length;
        // for(var i = 0; i < len; i++ ){
        //     var div = document.createElement('div');
        //     div.id = "img_" + data.returnData[i].id;
        //     var divattr = document.createAttribute('class');//添加 class 属性
        //     divattr.value = "imgDiv";
        //     //把 class 属性添加到每一个 div 中
        //     div.setAttribute(divattr);


        // }

    }
})