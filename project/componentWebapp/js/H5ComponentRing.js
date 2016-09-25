function H5ComponentRing(name,cfg){
	//其中要先创建H5ComponentBase做为父元素 再建立point并append
	var component=new H5ComponentBase(name,cfg);
	
	var w=cfg.width;
	var h=cfg.height;
	var r=w/2;

	//加入一个底图层
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	$(canvas).css('z-index',1);//为保险还是加一个层叠顺序
	component.append(canvas);
		
	ctx.beginPath();
	ctx.fillStyle=cfg.data[0][2];
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();

	//加入一个数据层 浅灰色 做动画
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	$(canvas).css('z-index',2);
	component.append(canvas);

	var sAngle=1.5*Math.PI;//开始的角度在12点位置 顺时针为正
	var aAngle=2*Math.PI;//转一圈的弧度

	ctx.fillStyle="#eee";
	ctx.strokeStyle="#eee";
	ctx.beginPath();
	ctx.moveTo(r,r);
	ctx.arc(r,r,r,0,aAngle);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	function draw(per){
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngle,sAngle+aAngle*cfg.data[0][1]*per,true);
		ctx.fill();
		ctx.stroke();

		if(per>=1){
			text.css('opacity',1);
		}
		if(per<=0){
			text.css('opacity',0);
		}

	}
	//draw(0);//刚开始的时候给一个极小的范围
	
	//加入一个遮罩层 用css 半径为前一层的80%
	var mask=$('<div class="mask">');
	mask.css('width',r*0.8).css('height',r*0.8);
	mask.css('marginLeft',-1*r*0.8/2).css('marginTop',-1*r*0.8/2);
	var text=$('<p class="text"></p>');
	text.text(cfg.data[0][0]+cfg.data[0][1]*100+"%");
	text.css('color',cfg.data[0][2]);
	text.css('opacity',0);

	mask.append(text);
	component.append(mask);


	component.on('onload',function(){
		var s=0;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500);
		}
	});

	component.on('onleave',function(){
		var s=1;
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.03;//退场动画加速 
				draw(s);
			},i*10);
		}
	});


	return component;
}