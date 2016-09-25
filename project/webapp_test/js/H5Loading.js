var H5Loading=function(images,num){
	var id=this.id;
	if(this._images===undefined){
		this._images=images.length;
		this._loaded=0;
		window[id]=this;
		for(i in images){
			var img=new Image();
			img.src=images[i];
			img.onload=function(){
				window[id].loader();
			}
		}
		$("#rate").text('30%');
		return this;
	}else{
		this._loaded++;
		$("#rate").text(this._loaded/this._images*100>>0+'%');
		if(this._loaded<this._images){
			return this;
		}
	}

	window[id]=null;

	this.el.fullpage({
		onLeave:function(){
			$(this).find('.midPage_wrap').addClass('leave').removeClass('load');
			$(this).find('.circle1').trigger('onleave');
			$(this).find('.circle2').trigger('onleave');
			$(this).find('.share').trigger('onleave');
		},
		afterLoad:function(){
			$(this).find('.midPage_wrap').addClass('load').removeClass('leave');
			$(this).find('.circle1').trigger('onload');
			$(this).find('.circle2').trigger('onload');
			$(this).find('.share').trigger('onload');
			$(this).find('.back').trigger('up');
		}
	});
	this.el.show();
	if(num){
		$.fn.fullpage.moveTo(num);
	}
}