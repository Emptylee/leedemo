/*内容管理对象H5*/
//var jdata=[];这个是用来获取json数据的 获取完黏贴到data.json中 这个就不需要了

var H5=function(){
	this.id=('h5_'+Math.random()).replace('.','_');
	this.el=$('<div class="h5" id="'+this.id+'">').hide();//相当于是根div  先隐藏起来
	$('body').append(this.el);

	this.page=[];

	/**
	 *新增一个页
	 *@param {string} name 组件的名称，会加入到className中
	 *@param {[type]} text 页内的默认文本 
	 *@return {H5} H5对象 可以重复使用H5对象支持的方法
	 */
	this.addPage=function(name,text){
		//jdata.push({isPage:true,name:name,text:text});
		var page=$('<div class="h5_page section">');//注意这里有section
		if(name!=undefined){
			page.addClass('h5_page_'+name);
		}
		if(text!=undefined){
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);//每次创建一个page都会push进数组
		if(typeof this.whenAddPage==='function'){
			this.whenAddPage();//用来添加每页底部的slideup
		}
		return this;
	}
	/*新建一个组件*/
	this.addComponent=function(name,cfg){//H5ComponentBase里也是这俩参数
		//jdata.push({isPage:false,name:name,cfg:cfg});
		var cfg=cfg||{};
		cfg=$.extend({//将新增的数据以对象的形式传入cfg
			type:'base'
		},cfg);

		var component;//定义一个变量存储组件元素
		var page=this.page.slice(-1)[0];//将数组中最后一个page取出来
		switch(cfg.type){
			case 'base':
				component=new H5ComponentBase(name,cfg);//专门创建组件的js放这里用
				break;
			case 'bar':
				component=new H5ComponentBar(name,cfg);
				break;
			case 'bar_v':
				component=new H5ComponentBar_v(name,cfg);
				break;
			case 'point':
				component=new H5ComponentPoint(name,cfg);
				break;
			case 'polyline':
				component=new H5ComponentPolyline(name,cfg);
				break;
			case 'radar':
				component=new H5ComponentRadar(name,cfg);
				break;
			case 'pie':
				component=new H5ComponentPie(name,cfg);
				break;
			case 'ring':
				component=new H5ComponentRing(name,cfg);
				break;
		}
		page.append(component);	//把component加到最新建立的page里
		return this;
	}

	/*H5对象初始化呈现 专门负责加载 所以前面要先hide*/
	this.loader=function(){//给最外层的div加上fullpage功能，同时还要给子div加上section类名
		//第一步肯定要让根div调用fullpage 并且根据fullpage的行为调用所有具体组件的onleave和onload方法
		this.el.fullpage({
			onLeave:function(index,nextIndex,direction){
				$(this).find('.h5_component').trigger('onleave');
			},
			afterLoad:function(anchorLink,index){
				$(this).find('.h5_component').trigger('onload');
			}	
		});
		//这里是显示根div，则append在其下的page和component也会跟着显示
		this.el.show();
	}
	this.loader=typeof H5_loading=='function'?H5_loading:this.loader;
	//return this;
}