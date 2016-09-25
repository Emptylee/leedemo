var H5ComponentBar=function(cfg){
	var component=$('<div class="midPage_wrap">');

	var colors=['#00A2E8','#83E51F','#FFF200','#F2344D'];

	var arr=['爱情','事业','财富','综合'];
	for(var i=0;i<arr.length;i++){
		var color=colors[i];

		var line=$('<div class="line">');
		
		var name=$('<div class="name">');
		name.text(arr[i]);
		name.css('color',color);
		
		var rate=$('<div class="rate">');
		rate.html('<div class="bg" style="background:'+color+'">');
		var width=cfg[arr[i]]*0.8+'%';//因为这个百分比是相对于line父元素的 为避免太长 所有的都乘0.8
		rate.css('width',width);

		var percent=$('<div class="percent">');
		percent.text(cfg[arr[i]]+'%');
		percent.css('color',color);

		line.append(name).append(rate).append(percent);
		component.append(line);
	}

	return component;
}