function H5ComponentRadar(name,cfg){
	//其中要先创建H5ComponentBase做为父元素 再建立point并append
	var component=new H5ComponentBase(name,cfg);
	
	var w=cfg.width;
	var h=cfg.height;
/*加入一个画布 绘制背景（背景层）************************/
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);
	
	//画多边形
	var r=w/2;
	var step=cfg.data.length;//项目个数 几个项目就是几边形
	var isBlue=false;//控制颜色
	for(var s=10;s>0;s--){
		//把画五边形整个搬进来
		ctx.beginPath();
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;
			var x=r+Math.sin(rad)*r*(s/10);
			var y=r+Math.cos(rad)*r*(s/10);
			
			//ctx.arc(x,y,5,0,2*Math.PI);
			ctx.lineTo(x,y);
		}
		ctx.closePath();//先封闭状态 再stroke
		ctx.fillStyle=(isBlue=!isBlue)?'#99c0ff':'#f1f9ff';
		ctx.fill();
	}

	//绘制伞骨
	for(var i=0;i<step;i++){
		var rad=(2*Math.PI/360)*(360/step)*i;
		var x=r+Math.sin(rad)*r;
		var y=r+Math.cos(rad)*r;
		ctx.moveTo(r,r);
		ctx.lineTo(x,y);
		//这里输出项目文字
		var text=$('<div class="text">');
		text.text(cfg.data[i][0]);
		text.css('transition','all .5s '+i*0.1+'s');//这里是一个效果 让文字一次出来 每隔文字的延迟时间由i决定
		//text.css('left',x/2).css('top',y/2);//注意要除以2 可以这么理解：不在背景canvas上的即单独画上去的要自己除以2 因为w,h都是实际大小  而本身就在canvas背景层上的则自动会因为画布缩小而不需除以2 
		if(x>w/2){//若点在右半边
			text.css('left',x/2);
		}else{//x是多边形点的横坐标 如果点在左半边，则让文字离右端画布的距离为(w-x)/2
			text.css('right',(w-x)/2);
		}
		if(y>h/2){//若点在下半边
			text.css('top',y/2);
		}else{//点在上半边
			text.css('bottom',(h-y)/2);
		}
		text.css('opacity',0);//先隐藏文字 等动画载入完再出现
		component.append(text);
	}
	ctx.strokeStyle='#e0e0e0';
	ctx.stroke();	
	
	
/*绘制雷达图（数据层）******************************/
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);

	ctx.strokeStyle="#f00";
	function draw(per){
		if(per>=1){//动画加载完毕时文字显示
			component.find('.text').css('opacity',1);
		}
		if(per<=0){//退场动画完毕时用
			component.find('.text').css('opacity',0);
		}

		ctx.clearRect(0,0,w,h);
		//输出数据的折线
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;

			var rate=cfg.data[i][1]*per;//per直接控制rate即可
			
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;

			ctx.lineTo(x,y);
		}	
		ctx.closePath();
		ctx.stroke();

		//输出数据的点
		ctx.fillStyle='#ff7676';
		for(var i=0;i<step;i++){
			var rad=(2*Math.PI/360)*(360/step)*i;

			var rate=cfg.data[i][1]*per;//这里也要per
			
			var x=r+Math.sin(rad)*r*rate;
			var y=r+Math.cos(rad)*r*rate;

			ctx.beginPath();
			ctx.arc(x,y,5,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
		}	
	}

	component.on('onload',function(){
		//雷达图的生长动画
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500);
		}
	});

	component.on('onleave',function(){
		//雷达图的退场动画 
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10);
		}
	});


	return component;
}