var H5_loading=function(images,firstPage){
	//注意这里的this在H5中是指H5
	//新加的功能 
	var id=this.id;//id是唯一的

	if(this._images===undefined){//第一次进入 肯定是undefined
		this._images=(images||[]).length;//传入的images数组长度
		this._loaded=0;//已经加载了0个资源

		window[id]=this;//把当前对象存储在window中，用来进行某个图片加载完成之后的回调

		for(s in images){
			var item=images[s];//图片路径
			var img=new Image();//new Image()
			img.src=item;
			img.onload=function(){//图片载入完成后的回调
				window[id].loader();
			}
		}

		$('#rate').text('0%');
		return this;
	}else{
		this._loaded++;
		$('#rate').text((this._loaded/this._images)*100>>0+'%');
		if(this._loaded<this._images){
			return;
		}
	}
	window[id]=null;
	
	//原来的功能
	this.el.fullpage({
		onLeave:function(index,nextIndex,direction){
			$(this).find('.h5_component').trigger('onleave');
		},
		afterLoad:function(anchorLink,index){
			$(this).find('.h5_component').trigger('onload');
		}	
	});
	this.page[0].find('.h5_component').trigger('onload');//使一开始的时候首页加载
	this.el.show();
	if(firstPage){
		$.fn.fullpage.moveTo(firstPage);
	}
}