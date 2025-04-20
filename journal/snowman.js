const canvas =	
	document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle="blue";
ctx.fillRect(0,0,400,400);

ctx.fillStyle= "white";
ctx.fillRect(0,300,400,100);


function circle(x, y, r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
}
function snowman(x,y){
	circle(x,x,25);
	circle(x,x+50,40);
	circle(x,x+110,55);
}
function ycircle(x, y, r){
	ctx.fillStyle = "yellow";
    	ctx.beginPath();
        ctx.arc(x,y,r,0,2*Math.PI);
        ctx.fill();
	ctx.fillStyle= "white";
}
function mounth(x,y,r){
ctx.beginPath();
ctx.arc(x, y, r , 0, 1 * Math.PI);
ctx.stroke();
}

function emoji(x,y){
ycircle(x,y,50);
circle(x-15, y-20, 10);
circle(x+15, y-20, 10);
ctx.fillStyle = "black";
mounth(x ,y+2 , 10);
}
emoji(200,100);

emoji(300,200);
