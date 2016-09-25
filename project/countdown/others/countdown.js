/*window.onload---render---renderDigit*/


var WINDOW_WIDTH=document.documentElement.clientWidth;
var WINDOW_HEIGHT=document.documentElement.clientHeight;
var RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
// 第一个数字的起始点
var MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
var MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);

var balls=[];//专门用来装小球
const colors=["#fff143","#c9dd22","#fa8c35","#3de1ad","#ff2d51","#ed5736","#003472","#ff2121","#4c7dae","#ef7a82"];
var arr1=[];
window.onload=function(){
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");

	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;

// setInterval要放onload函数里面才生效 因为ctx是onload函数内定义的而非全局函数
	timer=setInterval(function(){
		render(ctx);
		updateBalls();
	},50);
}
/*render用来画 render 即渲染 render函数专用于画图部分*/
function render(ctx){
	//每次画的时候要清除之前画的痕迹 避免叠加
	ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);	
	
	var curTime=new Date();
	var h=curTime.getHours();
	var m=curTime.getMinutes();
	var s=curTime.getSeconds();

	//判断时分秒是否变化 变化则生成小球
	arr1.push(curTime.getTime());
	if(arr1[arr1.length-1]-arr1[0]>1000){
		//创建彩色小球 因为小球的点阵要由秒数的点阵决定
		addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(s%10));
		arr1[0]=arr1[arr1.length-1];
	}

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(h/10),ctx);
	// 每个点阵是7X10 即每个数字之间隔着14个（radius+1）为增加间隔改为15个
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(h%10),ctx);
	//画冒号
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(m/10),ctx);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(m%10),ctx);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(s/10),ctx);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(s%10),ctx);

	//接下来画彩色小球 
	for(var i=0;i<balls.length;i++){
		ctx.fillStyle=balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fill();
	}
}
/*因为画出具体点阵中的小圆球要传不止一个参数 所以要设另一个renderDigit函数 另外也起到将时间h m s分开 之后单独设时间的逻辑*/
function renderDigit(x,y,num,ctx){
	ctx.fillStyle="rgb(0,102,153)";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}

//update函数负责数据的改变 这里仅装小球的数据改变 因为时间的数据改变合并入render函数中了
function update(){

}

//addballs函数专门画小球 和render原理很像
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				//如果点阵是1则创建一个小球对象
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					//加速度
					g:1.5+Math.random(),
					//x方向的速度 下面是正1或负1 乘以4
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*5,
					vy:-5,
					//彩色小球颜色也是随机的
					color:colors[Math.floor(Math.random()*colors.length)]
				};
				//把小球保存起来
				balls.push(aBall);
				//console.log(balls.length);
			}
		}
	}
}

//改变小球状态
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		//碰撞检测 即触壁反弹效果
		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			//先把y坐标定住不使小球出界
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			//反弹是改变其速度
			balls[i].vy=-balls[i].vy*0.7;

		}
	}
	//判断小球是否出界 若是则删除 否则内存受不了
	//这里的x y 指的是小球的球心
	for(var i=0;i<balls.length;i++){
		if(!(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH)){
			balls.splice(i,1);
		}
	}

}








