var H5=function(){
	this.finalSrc='images/baiyang.png';
	this.finalName='白羊座';
	this.id=(Math.random()).toString().replace('.','_');
	this.el=$('<div class="h5" id="h5_'+this.id+'"></div>').hide();
	$('body').append(this.el);

	this.addFirstPage=function(){
		var page=$('<div class="page section" id="firstPage"></div>');//一定要section 否则无法全屏滑动
		this.el.append(page);

		var titleBg=$('<div class="titleBg">');
		var text=$('<div class="title">');
		text.text('发现你的2016星座运势');
		titleBg.append(text);
		page.append(titleBg);
		return this;
	}

	this.addSecondPage=function(images){
		var page=$('<div class="page section" id="secondPage"></div>');
		this.el.append(page);
		
		for(var i=0;i<images.length;i++){
			var wrap=$('<div class="wrap"></div>');

			var imgBg=$('<div class="imgBg">');
			imgBg.css('backgroundImage','url('+images[i].src+')');

			var text=$('<div class="secondPage_text"></div>');
			text.text(images[i].name);

			wrap.append(imgBg).append(text);
			$("#secondPage").append(wrap);
		}

		/*给每个imgBg加click事件*/
		var wrapList=$('.wrap');//为什么直接$('.wrap').each没有用 要这样先赋给一个变量
			wrapList.each(function(i){
				$(this).click(function(){
					$.fn.fullpage.moveTo(i+3);
				});
			});

		return this;
	}

	this.addMidPage=function(cfg){
		var page=$('<div class="page section midPage"></div>');

		var logo=new Image();
		logo.src=cfg.src;

		var text=$('<div class="text"></div>');
		text.text(cfg.name);

		var componentBar=new H5ComponentBar(cfg);

		var componentCircle=new H5ComponentCircle();

		page.append(logo).append(text).append(componentBar).append(componentCircle);
		this.el.append(page);
		return this;
	}

	this.addFinalPage=function(){
		var page=$('<div class="page section" id="finalPage">');

		var logo=$('<img id="finalImage"src="'+this.finalSrc+'">');

		var text=$('<div class="text" id="finalName"></div>');
		text.text(this.finalName);

		var share=$('<img src="images/tail_share.png" class="share">');
		share.on('onload',function(){
			$(this).addClass('load').removeClass('leave');
		});
		share.on('onleave',function(){
			$(this).addClass('leave').removeClass('load');
		});

		var back=$('<div class="back">');
		back.text('返回首页');
		back.on('up',function(){
			$(this).animate({opacity:1,bottom:'10px'},800);
		});
		back.click(function(){
			$.fn.fullpage.moveTo(1);
		});

		var content=$('<div id="finalContent">');
		content.text('白羊座进入2016年，在上半年里，流年太阳停留在隐藏宫中，使得白羊座必须花更多时间处理旧有问题与新来的麻烦，此时接触医院的机会也大幅增加(如看病或探病)。无独有偶，流年水星将在2016年进入隐藏宫，不利于沟通、文案、策划，做事会有很多阻碍麻烦，很多事情不能明说，没有明文合约，只得私下承诺，为日后的违约埋下伏笔。在天冥凶相效应持续发酵的影响下，白羊座将面临事业冲击或对上关系紧张，也许工作上会出现结束、转型、竞争的危机，也可能是与部门主管、公司的理念不合，小则关系不和谐，大则容易争吵、冷战、绝裂，此时最考验白羊座的耐心和承受能力。整个上半年，白羊们工作辛苦，身体劳顿，要有目标与策略，才能提高效率。');

		page.append(logo).append(text).append(share).append(content).append(back);
		this.el.append(page);
		return this;

	}

	this.loader=function(num){
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
	this.loader=(typeof H5Loading=='function')?H5Loading:this.loader;
}