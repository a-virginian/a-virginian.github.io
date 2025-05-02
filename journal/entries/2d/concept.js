const canvas =	
	document.getElementById("mycanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle="blue";
ctx.fillRect(0,0,1350,700);

ctx.fillStyle= "green";
ctx.fillRect(0,650,80,100);

ctx.fillStyle="red";
ctx.fillRect(80,660,1280,40);
ctx.fillRect(550,520,40,40);
 ctx.fillRect(670,520,40,40);
ctx.fillRect(790,520,40,40);
ctx.fillStyle= "gray";
ctx.fillRect(180,600,40,10);
ctx.fillRect(350,560,40,10);
ctx.fillRect(450,560,500,10)
ctx.fillRect(1090,540,40,10)
ctx.fillRect(1290,500,40,10)
function circle(x, y, r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.fill();
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
ycircle(x,y,25);
circle(x-8.5, y-10, 5);
circle(x+8.5, y-10, 5);
ctx.fillStyle = "black";
mounth(x ,y+2 , 5);
}
emoji(30,625);

