function H5ComponentBar_v(name,cfg){
	var component=new H5ComponentBase(name,cfg);

	$.each(cfg.data,function(key,item){
		var line=$('<div class="line">');
		var name=$('<div class="name">');
		var rate=$('<div class="rate">');
		var per=$('<div class="per">');

		var bgStyle="";
		if(item[2]){
			bgStyle=' style="background-color:'+item[2]+'"';
		} 
		rate.html('<div class="bg"'+bgStyle+'></div>');
		var height=item[1]*100+"%";
		rate.css('height',height);//高度单独放在这里设置

		name.text(item[0]);

		per.text(height);

		line.append(per).append(rate).append(name);

		component.append(line);
	});

	return component;
}