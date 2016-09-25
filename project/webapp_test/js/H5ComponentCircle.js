var H5ComponentCircle=function(){
	var component=$('<div class="circle_wrap">');
	var circle1=$('<div class="circle circle1">');
	circle1.text('星座');
	var circle2=$('<div class="circle circle2 more">');
	circle2.text('更多');
	/*circle自身动画*/
	circle1.on('onload',function(){//为什么这里用$('.circle1').on(...)没用？
		$(this).animate({opacity:1,top:0},500);
	});
	circle2.on('onload',function(){
		$(this).animate({opacity:1,top:0},1000);
	});
	circle1.on('onleave',function(){
		$(this).animate({opacity:1,top:'-100px'},1000);
	});
	circle2.on('onleave',function(){
		$(this).animate({opacity:1,top:'-100px'},1000);
	});
	/*circle点击后的事件*/
	circle1.click(function(){
		$.fn.fullpage.moveTo(2);
	});

	circle2.click(function(){//点击时获取该页image的src和名字 赋给尾页相应位置
		$.fn.fullpage.moveTo(15);
		var finalSrc=this.parentNode.parentNode.children[0].src;
		var finalName=this.parentNode.parentNode.children[1].innerHTML;
		$('#finalImage').attr('src',finalSrc);
		$('#finalName').html(finalName);

		$.getJSON('final_data.json',function(json){
			$.each(json,function(i,item){
				if(item.name==finalName){
					$('#finalContent').text(item.text);
				}
			});
		});
	});

	component.append(circle1).append(circle2);
	return component;
}