function H5ComponentPoint(name,cfg){
	//先对散点图的基本进行设置 通过data传入数据 
	//其中要先创建H5ComponentBase做为父元素 再建立point并append
	var component=new H5ComponentBase(name,cfg);
	
	var base=cfg.data[0][1];//以第一个数据的比例为大小的100%

	$.each(cfg.data,function(key,item){
		//输出每个point
		var point=$('<div class="point point_'+key+'">');

		//point.text(item[0]+'-'+item[1]);//item[0]保存的是项数 item[1]保存的是比例

		var per=(item[1]/base*100)+'%';//计算百分比
		
		point.width(per).height(per);

		if(item[2]){//item[2]存的是背景颜色
			point.css('backgroundColor',item[2]);
		}

		//定位置
		if(item[3]!==undefined && item[4]!==undefined){//注意值可能为0
			point.css('left',item[3]).css('top',item[4]);
		}
		
		var name=$('<div class="name">'+item[0]+'</div>');
		var rate=$('<div class="per">'+item[1]+'</div>');
		name.css('color','#fff').css('fontWeight','500');
		rate.css('color','#fff').css('fontWeight','500');
		name.append(rate);
		point.append(name);
		
		component.append(point);
	});

	return component;
}