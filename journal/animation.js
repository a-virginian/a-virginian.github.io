const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = 60;
let y = 5;
let dx = 10;
let dy = 11;
let score = 0;
let game=true;


const player = {
x : 0,
y: 0, 
color: 'green',
speed: 3
};
const keys = {};

//define functions
function drawRect(x,y) {
    //console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
}
function drawscore(){
	ctx.font = "10px arial";
	ctx.fillText(score, 10, 10);
}
function checkcollision (){
let box_min_x=x;
let box_min_y=y;
let box_max_x=x+50;
let box_max_y=y+50;
let player_min_x= player.x - 20;
let player_min_y= player.y -20;
let player_max_x= player.x +20;
let player_max_y= player.y +20;

if(box_max_y > player_min_y &&
 box_min_y < player_max_y && 
box_max_x > player_min_x && 
box_min_x < player_max_x){
game = flase; 
}
}
if(game=true){
function animate() {
score++;
x=x+dx;
y=y+dy;    
drawRect(x,y);
drawplayer();
drawscore();
 moveplayer();
checkcollision(); 
// TODO: Add some code here 
    //  that will change the rectangle's position
if(x> 350) {
dx = dx * -1 ;
}
if(x<0) {
dx = dx * -1 ;
}
if(y> 350) {
dy = dy * -1 ;
}
if(y< 0) { 
dy = dy * -1 ;
}
    requestAnimationFrame(animate);
}
function handleKeyPress(e) {
	//console.log(e.key);
	keys[e.key]=true;
}
function drawplayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, 20, 0, 2 * Math.PI);
    ctx.fill();
}
function moveplayer(){
//player.x = player.x+1;
//player.x+=player.speed;
if(keys['ArrowDown']){
	player.y= player.y+player.speed;
}
if(keys['ArrowUp']){
player.y= player.y-player.speed;
}
if(keys['ArrowLeft']){
player.x= player.x-player.speed;
}
if(keys['ArrowRight']){
player.x= player.x+player.speed;
}
if(player.x> 400) {
player.x= 1;
} 
if(player.x< 1){
player.x = 400;
}
if(player.y< 1){
player.y = 400;
}
if(player.y> 400){
player.y = 1;
}
if (score > 1000){
game=flase;

}
}
}
document.addEventListener('keydown',handleKeyPress)
document.addEventListener('keyup', (e)=>{keys[e.key]=false;});


//call our function
animate();
