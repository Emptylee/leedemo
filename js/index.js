$(function(){
	$("#fullpage").fullpage({
		scrollBar:true,
		autoScrolling:true,
		controlArrows:true,
		controlArrowColor:"#333",
		// anchors: ['page1', 'page2', 'page3', 'page4'] ,
		afterLoad:function(link,index){
			switch(index){
				case 3://滚动到第三屏时执行回调函数
				(function(){
					var canvas=document.getElementById("canvas");
					var ctx=canvas.getContext("2d");
					var WIDTH=canvas.width;
					var HEIGHT=canvas.height;
					var deg1=deg2=deg3=deg4=deg5=0;

					timer=setInterval(function(){
						ctx.clearRect(0,0,WIDTH,HEIGHT);
						//写文字
						ctx.beginPath();
						ctx.font="25px bolder Arial";
						ctx.textAlign="center";
						ctx.textBaseline="middle";
						ctx.fillStyle="#5CB85C";
						ctx.fillText("HTML/CSS",100,100);
						ctx.fillStyle="#5BC0DE";
						ctx.fillText("JavaScript",300,100);
						ctx.fillStyle="#ED1C24";
						ctx.fillText("HTML5",500,100);
						ctx.fillStyle="#FFC90E";
						ctx.fillText("jQuery",700,100);
						ctx.fillStyle="#3F48CC";
						ctx.fillText("Bootstrap",900,100);
						ctx.closePath();

						//画圆环的底色
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.strokeStyle="#FFFEBB";
						ctx.arc(100,100,80,0,Math.PI*2,false);
						ctx.stroke();
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(300,100,80,0,Math.PI*2,false);
						ctx.stroke();
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(500,100,80,0,Math.PI*2,false);
						ctx.stroke();
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(700,100,80,0,Math.PI*2,false);
						ctx.stroke();
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(900,100,80,0,Math.PI*2,false);
						ctx.stroke();

						//ctx.closePath();
						//画圆环1
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(100,100,80,0,deg1,false);
						ctx.strokeStyle="#5CB85C";
						ctx.stroke();
						//2
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(300,100,80,0,deg2,false);
						ctx.strokeStyle="#5BC0DE";
						ctx.stroke();
						//3
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(500,100,80,0,deg3,false);
						ctx.strokeStyle="#ED1C24";
						ctx.stroke();
						//4
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(700,100,80,0,deg4,false);
						ctx.strokeStyle="#FFF200";
						ctx.stroke();
						//5
						ctx.beginPath();
						ctx.lineWidth=10;
						ctx.arc(900,100,80,0,deg5,false);
						ctx.strokeStyle="#3F48CC";
						ctx.stroke();
						//限制deg的最大值
						if(deg1<=1.6*Math.PI){deg1+=Math.PI/100;}
						if(deg2<=1.3*Math.PI){deg2+=Math.PI/100;}
						if(deg3<=1.4*Math.PI){deg3+=Math.PI/100;}
						if(deg4<=1.2*Math.PI){deg4+=Math.PI/100;}
						if(deg5<=1.1*Math.PI){deg5+=Math.PI/100;}

						if(deg1>1.6*Math.PI && deg2>1.3*Math.PI && deg3>1.4*Math.PI && deg4>1.2*Math.PI && deg5>1.1*Math.PI){
							clearInterval(timer);
						}
					},10);
				})();
				break;
				case 4:
				(function(){
					// $('.section4 .wrapper_final div').click(function(){
					// 	$(this).addClass();
					// });
				})();
				break;
			}
		}
	});
	//音乐播放
	var music=document.getElementById("music");
	music.addEventListener("click",music_click,false);
	function music_click(){
		var media=document.getElementById("media");
		if(media.paused==true){
			media.play();
		}else{
			media.pause();
		}
	}
	//点击更多右滑动
	$('.more').click(function(){
		$.fn.fullpage.moveSlideLeft();
		return false;
	});
});