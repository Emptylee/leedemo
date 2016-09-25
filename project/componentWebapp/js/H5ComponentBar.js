function H5ComponentBar(name,cfg){
	//先对柱状图的基本进行设置 通过data传入数据 
	//其中要先创建H5ComponentBase做为父元素 再建立point并append
	var component=new H5ComponentBase(name,cfg);
	
	$.each(cfg.data,function(key,item){
		//console.log(this);
		var line=$('<div class="line">');
		var name=$('<div class="name">');
		var rate=$('<div class="rate">');
		var per=$('<div class="per">');

		var bgStyle="";
		if(item[2]){
			bgStyle=' style="background-color:'+item[2]+'"';
		} 
		rate.html('<div class="bg"'+bgStyle+'></div>');
		var width=item[1]*100+"%";
		rate.css('width',width);

		name.text(item[0]);

		per.text(width);

		line.append(name).append(rate).append(per);

		component.append(line);
	});
	
	return component;
}