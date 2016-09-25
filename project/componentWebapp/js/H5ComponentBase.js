/*基本图文组件对象*/

var H5ComponentBase=function(name,cfg){
	var cfg=cfg||{};//没有传入参数就保持一个空对象
	var id=( 'h5_c_'+Math.random() ).replace('.','_');//给每个DOM元素即component设一个id 点变为_
	var cls=' h5_component_'+cfg.type;//把当前的组件类型加到样式中进行编辑
	
	var component=$('<div class="h5_component '+'h5_component_name_'+name+cls+'" id="'+id+'"></div>');

	cfg.text   && component.text(cfg.text);
	cfg.width  && component.width(cfg.width/2);//直接.width
	cfg.height && component.height(cfg.height/2);//直接.height
	cfg.css    && component.css(cfg.css);//位于cfg.bg之前
	cfg.bg     && component.css('backgroundImage','url('+cfg.bg+')');

	if(cfg.center===true){
		//说明要将这个component水平居中显示
		component.css({
			marginLeft:(cfg.width/4*-1)+'px',//因为真实的图片大小是屏幕中所限制的图片大小的两倍，这样让大图放入小框中，看起来更清晰 上面的除以二就是这个意思
			left:'50%'//这个css在后，会覆盖前面设的left
		});
	}

	//给组件加上click事件 即返回首页事件
	if(typeof cfg.onclick==='function'){
		component.on('click',cfg.onclick);
	}
	//接下来将当前component绑定onLeave和onload事件
	component.on("onload",function(){
		setTimeout(function(){
			component.addClass(cls+'_load').removeClass(cls+'_leave');//不会删掉原来的而是覆盖上去 多处的部分加上即h5_component_base_load
			cfg.animateIn && component.animate(cfg.animateIn);//每个状态的出现都是逐渐的效果 直接调用jquery的animate方法
		},cfg.delay||0);//为了让不同组件先后出来才用setTimeout 
		return false;
	});
	component.on("onleave",function(){
		setTimeout(function(){
			component.addClass(cls+'_leave').removeClass(cls+'_load');//离开时增加一个叫h5_component_leave的类,那么load类就没用了 因为已经离开还怎么加载 所以把这个类删掉 上面也是同理 
			cfg.animateOut && component.animate(cfg.animateOut);
		},cfg.delay||0);
		return false;
	});

	return component;//返回一个DOM元素 之后就可对其随便操作
}