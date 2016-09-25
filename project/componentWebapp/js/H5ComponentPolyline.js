function H5ComponentPolyline(name,cfg){
	//先对柱状图的基本进行设置 通过data传入数据 
	//其中要先创建H5ComponentBase做为父元素 再建立point并append
	var component=new H5ComponentBase(name,cfg);
	
	var w=cfg.width;
	var h=cfg.height;
/*加入一个画布 绘制网格线（背景层）************************/
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);
	//水平网格线 100份 这里简化为10份
	var step=10;
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeStyle="#aaa";

	window.ctx=ctx;
	for(var i=0;i<step+1;i++){//11条线 才能水平分成10份
		var y=(h/step)*i;
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);
	}
	ctx.stroke();
	//垂直网格线 按项目个数来分
	step=cfg.data.length+1;//分为项目数+1份 因为每个项目是画在线上的 所以中间要有5根线，所以要分6份
	var text_w=w/step>>0;//在外面定好项目文字的宽度即每隔的宽度 >>表示小数点去掉
	for(var i=0;i<step+1;i++){//7根线 出去左右两端的两根不用，每个项目是画在横竖交叉的点上 所以要7根线
		var x=(w/step)*i;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);
		//因为这里是和项目数有关的循环 所以这里顺便把项目名输出
		if(cfg.data[i]){
			var text=$('<div class="text"></div>');
			text.text(cfg.data[i][0]);
			text.css('width',text_w/2).css('left',x/2+text_w/4);//因为显示区大小是canvas实际大小的一半所以除2 又由于项目的字是和线对齐的 所以要左移即减text_width/4即字体宽度的一半 再右移一个间隔即+text/2
			component.append(text);
		}
	}
	ctx.stroke();
	component.append(canvas);
	
/*绘制折线数据（数据层） 由于折线是动态的 所以另开一层canvas******************************/
	var canvas=document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width=ctx.width=w;
	canvas.height=ctx.height=h;
	component.append(canvas);
	//per 0~1之间的数据，会根据这个值的变化画出中间状态 阴影是由连线决定的所以不用加per
	function draw(per){//draw函数加在这里
		ctx.clearRect(0,0,w,h);//首先要清空画布
		ctx.beginPath();
		ctx.lineWidth=3;//比网格粗
		ctx.strokeStyle="#ff8878";

		var x=0;
		var y=0;
		var row_w=(w/(cfg.data.length+1));//共cfg.data.length+1份 每份的宽度为row_w
		//画点
		for(i in cfg.data){
			var item=cfg.data[i];
			x=row_w*i+row_w;//最左边的点不画圆点
			y=h*(1-item[1]*per);//画点的per加这里

			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);
		}
		ctx.stroke();
		//连线
		//移动画笔到第一个点的位置
		ctx.moveTo(row_w,h*(1-cfg.data[0][1]*per));//连线的per加在这2个地方
		for(var i in cfg.data){
			x=row_w*i+row_w;//就是上面的点的位置
			y=h*(1-cfg.data[i][1]*per);
			ctx.lineTo(x,y);
		}
		ctx.stroke();
		//绘制阴影 相当于要用lineTo将阴影的部分围住 画完线后 画笔在最后一个点的位置 so
		ctx.lineTo(x,h);
		ctx.lineTo(row_w,h);
		ctx.fillStyle='rgba(255,120,120,0.4)';//设成有透明度的颜色
		ctx.fill();
		//写数据
		for(var i in cfg.data){
			x=row_w*i+row_w;//就是上面的点的位置
			y=h*(1-cfg.data[i][1]*per);//数据的per加这里
			ctx.fillStyle=item[2]?item[2]:"#595959";
			ctx.fillText((cfg.data[i][1]*100)+"%",x-10,y-10);
		}
	}

	component.on('onload',function(){
		//折线图的生长动画 开始时所有的点都在底部，逐渐向上生长
		var s=0;//per的初始值为0
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s+=0.01;
				draw(s);
			},i*10+500);//用for循环 每隔10毫秒触发一次setTimeout 共一百次 加500ms是为了先让component容器的动画做完再生长 注意现在就是相当于第500ms 第510ms..执行一次 即总共的执行时间只加了500ms 它是基数
		}
	});

	component.on('onleave',function(){
		//折线图的退场动画 
		var s=1;//per的初始值为0
		for(var i=0;i<100;i++){
			setTimeout(function(){
				s-=0.01;
				draw(s);
			},i*10);
		}
	});


	return component;
}