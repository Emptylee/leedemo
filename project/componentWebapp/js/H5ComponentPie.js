function H5ComponentPie(name,cfg){
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
	ctx.fillStyle="#eee";
	ctx.strokeStyle="#eee";
	ctx.lineWidth=1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	//加入一个数据层
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	$(canvas).css('z-index',2);
	component.append(canvas);

	var colors=['red','green','blue','orange','gray'];//备用颜色
	var sAngle=1.5*Math.PI;//开始的角度在12点位置 顺时针为正
	var eAngle=0;//结束角度
	var aAngle=2*Math.PI;//转一圈的弧度

	var step=cfg.data.length;
	for(var i=0;i<step;i++){
		var item=cfg.data[i];
		var color=item[2] || (item[2]=colors.pop());

		eAngle=sAngle+aAngle*item[1];

		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.strokeStyle=color;
		ctx.lineWidth=.1;
		ctx.moveTo(r,r);//先移到圆心
		ctx.arc(r,r,r,sAngle,eAngle);
		ctx.fill();
		ctx.stroke();

		sAngle=eAngle;

		//加入项目名称及百分比 因为这里有遍历项目 所以加在这里
		var text=$('<div class="text">');
		text.text(cfg.data[i][0]);
		var per=$('<div class="per">');
		per.text(cfg.data[i][1]*100+'%');
		text.append(per);

		var x=r+Math.sin(0.5*Math.PI-sAngle)*r;//这个角度是试出来的
		var y=r+Math.cos(0.5*Math.PI-sAngle)*r;
		// text.css('left',x/2).css('top',y/2);
		if(x>w/2){
			text.css('left',x/2);
		}else{
			text.css('right',(w-x)/2);
		}
		if(y>h/2){
			text.css('top',y/2);
		}else{
			text.css('bottom',(h-y)/2);
		}
		if(cfg.data[i][2]){
			text.css('color',cfg.data[i][2]);
		}	
		text.css('opacity',0);
		component.append(text);
	}

	//加入一个蒙板层(做动画)
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	$(canvas).css('z-index',3);
	component.append(canvas);

	ctx.fillStyle="#eee";
	ctx.strokeStyle="#eee";
	ctx.lineWidth=1;
	
	function draw(per){
		ctx.clearRect(0,0,w,h);

		ctx.beginPath();
		ctx.moveTo(r,r);	

		if(per<=0){
			ctx.arc(r,r,r,0,2*Math.PI);
			component.find('.text').css('opacity',0);
		}else{
			ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI*per,true);//true是逆时针画 只需注意 角度（受per控制）决定的是起止点，true决定的是蒙层按逆时针画
		}

		ctx.fill();
		ctx.stroke();

		if(per>=1){
			component.find('.text').css('opacity',1);
		}
	}
	draw(0);//刚开始的时候让数据层隐藏即蒙层画一整圈遮住数据层

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
				s-=0.01;
				draw(s);
			},i*10);
		}
	});


	return component;
}