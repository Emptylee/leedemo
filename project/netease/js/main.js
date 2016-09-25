/*initial 函数---------------------------*/
window.onload=function(){
	showBanner();//轮播
	timer_scroll=setInterval('scrollUp()',2000);//热点排行滚动
	remind();//顶部通知条
	notice();//点击关注--showLogin显示登录框--logIn验证账号密码并设置cookie
}
function $(id){
	return document.getElementById(id);
}
//控制轮播----------------------------
function showBanner(){
	var banner_a=$('banner_a');
	var banner_img=$('banner_img');
	var lis=$('ul1').getElementsByTagName('li');
	var hrefs=['http://open.163.com','http://study.163.com','http://www.icourse163.org'];
	var srcs=['images/banner1.jpg','images/banner2.jpg','images/banner3.jpg'];
	var i=0;
	
	timer=setInterval(function(){
		banner_img.setAttribute('style','transition:all 0.2s;opacity:1');
		banner_a.href=hrefs[i];
		banner_img.src=srcs[i];

		for(var j=0;j<lis.length;j++){
			lis[j].setAttribute('class','white');
		}
		lis[i].setAttribute('class','black');

		i++;
		if(i>hrefs.length-1){
			i=0;
		}
		setTimeout(function(){
			banner_img.setAttribute('style','transition:all 0.2s;opacity:0');
		},3800);
	},4000);

}	
//序列化数据&获取数据的函数-------------------------------------------
function serialize(obj){
	var arr=[];	
	for(var attr in obj){
		if(attr.length>0 && obj.hasOwnProperty(attr)){
			arr.push(encodeURIComponent(attr)+"="+encodeURIComponent(obj[attr]));
		}
	}
	return arr.join("&");
}

function getData(myUrl,options,callback){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject(Microsoft.XMLHttp);
	}
	var url=myUrl;
	if(options){
		xhr.open('get',url+'?'+serialize(options),true);
	}else{
		xhr.open('get',url,true);
	}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var resText=xhr.responseText;
			callback(resText);
		}
	}
	xhr.send(null);
}
//获取main位置的列表--------------------------

//获得product列表
getData('http://study.163.com/webDev/couresByCategory.htm',{pageNo:1,psize:20,type:10},function(resText){
	var jsObj=JSON.parse(resText);

	for(var i=0;i<jsObj.list.length;i++){
		var myWrap=document.createElement('div');
		var img=document.createElement('img');
		var p=document.createElement('p');
		var div1=document.createElement('div');
		var div2=document.createElement('div');
		var div3=document.createElement('div');

		myWrap.className='mywrap';
		img.src=jsObj.list[i].middlePhotoUrl;
		p.innerHTML=jsObj.list[i].name;
		div1.className='name';
		div1.innerHTML=jsObj.list[i].provider;
		div2.className='count';
		div2.innerHTML=jsObj.list[i].learnerCount;
		div3.className='price';
		div3.innerHTML=jsObj.list[i].price==0?'免费':'￥'+jsObj.list[i].price;

		myWrap.appendChild(img);
		myWrap.appendChild(p);
		myWrap.appendChild(div1);
		myWrap.appendChild(div2);
		myWrap.appendChild(div3);
		$('wrap_product').appendChild(myWrap);
	}
});

//获得language列表
getData('http://study.163.com/webDev/couresByCategory.htm',{pageNo:1,psize:20,type:20},function(resText){
	var jsObj=JSON.parse(resText);

	for(var i=0;i<jsObj.list.length;i++){
		var myWrap=document.createElement('div');
		var img=document.createElement('img');
		var p=document.createElement('p');
		var div1=document.createElement('div');
		var div2=document.createElement('div');
		var div3=document.createElement('div');

		myWrap.className='mywrap';
		img.src=jsObj.list[i].middlePhotoUrl;
		p.innerHTML=jsObj.list[i].name;
		div1.className='name';
		div1.innerHTML=jsObj.list[i].provider;
		div2.className='count';
		div2.innerHTML=jsObj.list[i].learnerCount;
		div3.className='price';
		div3.innerHTML=jsObj.list[i].price==0?'免费':'￥'+jsObj.list[i].price;

		myWrap.appendChild(img);
		myWrap.appendChild(p);
		myWrap.appendChild(div1);
		myWrap.appendChild(div2);
		myWrap.appendChild(div3);
		$('wrap_language').appendChild(myWrap);
	}
});

//切换product和language
$('product').onclick=function(){
	this.style.background='#39A030';
	this.style.color='#fff';
	$('language').style.background='#fff';
	$('language').style.color='#444';
	//wrap_product显示 wrap_language隐藏
	$('wrap_product').style.display='block';
	$('wrap_language').style.display='none';
}
$('language').onclick=function(){
	this.style.background='#39A030';
	this.style.color='#fff';
	$('product').style.background='#fff';
	$('product').style.color='#444';
	//wrap_language显示 wrap_product隐藏 
	$('wrap_product').style.display='none';
	$('wrap_language').style.display='block';
}

//调出视频-------------------------------
$('video').onclick=function(){
	$('showVideo').style.display="block";
}
$('close').onclick=function(){
	$('media').pause();
	$('showVideo').style.display="none";
}

//获取right的滚动数据----------------------
getData('http://study.163.com/webDev/hotcouresByCategory.htm',null,function(resText){
	var jsObj=JSON.parse(resText);
	for(var i=0;i<jsObj.length;i++){
		var hotWrap=document.createElement('div');
		var img=document.createElement('img');
		var div1=document.createElement('div');
		var div2=document.createElement('div');
		
		hotWrap.className='hotwrap';
		img.src=jsObj[i].smallPhotoUrl;
		div1.className='name';
		div1.innerHTML=jsObj[i].name;
		div2.className='count';
		div2.innerHTML=jsObj[i].learnerCount

		hotWrap.appendChild(img);
		hotWrap.appendChild(div1);
		hotWrap.appendChild(div2);
		$('scroll').appendChild(hotWrap);

	}
	$('scroll2').innerHTML=$('scroll').innerHTML;

});

//控制right的滚动效果
function scrollUp(){
	if($('scrollBox').scrollTop>=$('scrollBox').scrollHeight/2){
		$('scrollBox').scrollTop=0;
	}
		$('scrollBox').scrollTop+=72;
}
$('scrollBox').onmouseover=function(){
	clearInterval(timer_scroll);
}
$('scrollBox').onmouseout=function(){
	timer_scroll=setInterval('scrollUp()',2000);
}


//开头提示隐藏---------------------------------------------
var CookieUtil={
	get:function(name){
		var cookieName=encodeURIComponent(name)+"=";
		var cookieStart=document.cookie.indexOf(cookieName);
		var cookieValue=null;

		if(cookieStart>-1){
			var cookieEnd=document.cookie.indexOf(';',cookieStart);
			if(cookieEnd==-1){
				cookieEnd=document.cookie.length;
			}
			cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
		}
		return cookieValue;
	},

	set:function(name,value,expires,path,domain,secure){
		var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);

		if(expires instanceof Date){
			cookieText+=";expires="+expires.toGMTString();
		}

		if(path){
			cookieText+=";path="+path;
		}

		if(domain){
			cookieText+=";domain="+domain;
		}

		if(secure){
			cookieText+=";secure";
		}
		document.cookie=cookieText;
	},

	unset:function(name,path,domain,secure){
		this.set(name,"",new Date(0),path,domain,secure);
	}
};

function remind(){
	if(CookieUtil.get('close')=='yes'){
		$('reminder').style.display='none';
	}else{
		CookieUtil.set('close','yes',(new Date().getDate()+7));
		$('btn_reminder').onclick=function(){
			$('reminder').style.display='none';
		}
	}
}

//登录&关注------------------------------------------------
function notice(){
	$('btn_notice').onclick=function(){
		showLogin();
	}
}
function showLogin(){//显示登录框
	$('login').style.display='block';
	
	$('user').value='账号';
	$('pwd').value='密码';
	
	$('user').onfocus=function(){
		this.style.color='#333';
		this.value='';

	}
	$('user').onblur=function(){
		this.style.color='#aaa';
		if(!this.value){
			this.value='账号';
		}
	}
	$('pwd').onfocus=function(){
		this.style.color='#333';
		this.value='';

	}
	$('pwd').onblur=function(){
		this.style.color='#aaa';
		if(!this.value){
			this.value='密码';
		}
	}
	$('login_close').onclick=function(){
		$('login').style.display='none';
	}

	$('submit').onclick=function(){//点击登录后执行logIn
		logIn();
	}

}

function logIn(){
	var user_name=hex_md5($('user').value);
	var user_pwd=hex_md5($('pwd').value);
	var options={userName:user_name,password:user_pwd};//账号密码加密后传输
	getData('http://study.163.com/webDev/login.htm',options,function(resText){
		if(resText==1){//说明登录成功
			CookieUtil.set('loginSuc','true',(new Date().getDate()+7));//若输入正确，则保存账号密码
			CookieUtil.set('user',user_name,(new Date().getDate()+7));//可以保存账号密码 但是加密过的
			CookieUtil.set('pwd',user_pwd,(new Date().getDate()+7));
			$('login').style.display='none';
			getData('http://study.163.com/webDev/attention.htm',null,function(response){
				if(response==1){//说明关注成功
					CookieUtil.set('followSuc','true',(new Date().getDate()+7));
					$('btn_notice').value='已关注';
					$('btn_notice').disabled=true;
					$('btn_notice').className='alreadyNotice';
					$('cancel').style.display='block';
					$('fans').innerHTML='粉丝46';
				}
			});
		}else{
			alert('账号或密码输入有误！');
		}
	});
}
