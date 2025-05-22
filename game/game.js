const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");    

function circle(x, y, r){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
}

function ycircle(x, y, r){
    ctx.fillStyle = "#ffde34";
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fill();
    ctx.fillStyle= "white";
}

function mouth(x,y,r){
    ctx.beginPath();
    ctx.arc(x, y, r , 0, 1 * Math.PI);
    ctx.stroke();
}

function emoji(x,y,r){
    ycircle(x,y,r);
    circle(x-8.5, y-10, 5);
    circle(x+8.5, y-10, 5);
    ctx.fillStyle = "black";
    mouth(x, y+2, 5);
    circle(x+8.5, y-10, 2);
    circle(x-8.5, y-10, 2);
}

function Rectangle (x, y, width, height, color){
    this.x=x;
    this.y=y;
    this.width= width;
    this.height = height;
    this.color=color;
}

const rectangles = [];

rectangles.push(new Rectangle(0,0,1350,700, "skyblue"));
rectangles.push(new Rectangle(0,650,80,100,"#388004"));
rectangles.push(new Rectangle(0,660,80,100,"#70543E"));
rectangles.push(new Rectangle(5,660,5,12,"#388004"));
rectangles.push(new Rectangle(15,660,5,12,"#388004"));
rectangles.push(new Rectangle(27,660,5,12,"#388004"));
rectangles.push(new Rectangle(36,660,5,12,"#388004"));
rectangles.push(new Rectangle(49,660,5,12,"#388004"));
rectangles.push(new Rectangle(57,660,5,12,"#388004"));
rectangles.push(new Rectangle(68,660,5,12,"#388004"));
rectangles.push(new Rectangle(80,660,1280,40,"red"));
rectangles.push(new Rectangle(550,520,40,40,"red"));
rectangles.push(new Rectangle(670,520,40,40,"red"));
rectangles.push(new Rectangle(790,520,40,40,"red"));
rectangles.push(new Rectangle(100,80,20,200,"red"));
rectangles.push(new Rectangle(180,600,40,10,"gray"));
rectangles.push(new Rectangle(350,560,40,10,"gray"));
rectangles.push(new Rectangle(450,560,500,10,"gray"));
rectangles.push(new Rectangle(1090,540,40,10,"gray"));
rectangles.push(new Rectangle(1290,500,40,10,"gray"));
rectangles.push(new Rectangle(1190,350,40,10,"gray"));
rectangles.push(new Rectangle(900,310,60,10,"gray"));
rectangles.push(new Rectangle(690,250,40,10,"gray"));
rectangles.push(new Rectangle(450,190,40,10,"gray"));
rectangles.push(new Rectangle(210,190,40,10,"gray"));
rectangles.push(new Rectangle(0,390,40,10,"gold"));
let dx = 10;
let dy = 11;
let game = true;
let win = false;
const keys={};


const player = {
    x : 50,
    y: 600,
    radius: 25,
    walkSpeed: 20,
    jumpSpeed: 3,
};

function animate() {
    if (!game) {
        if(win){
            drawWin();
            return;
        }
        else{
            console.warn("Game Over!");
            drawLose();
            return;
        }
    }

    drawRectangles();
    drawPlayer();
    applyGravity();
    requestAnimationFrame(animate);
}

function drawRectangles(){
    for (let i = 0; i < rectangles.length; i++) {
        const rect = rectangles[i];

        ctx.fillStyle=rect.color;
        ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
    }  
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    emoji(player.x,player.y, player.radius);
    ctx.fill();
}

function drawLose(){
    ctx.fillStyle='rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0,0, canvas.width, canvas.height,);

    ctx.font = '60px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
}
function drawWin(){
    ctx.fillStyle='rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0,0, canvas.width, canvas.height,);

    ctx.font = '60px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('You Win!', canvas.width / 2, canvas.height / 2);
}


function handleKeyPress(e) {
    //console.log(e.key);
    keys[e.key.toLowerCase()]=true;

    let moveToX = player.x;
    let moveToY = player.y;

    if(keys['w'] || keys[' ']){
        if (velocityY==0){
            velocityY = -8;
            moveToY = player.y-player.jumpSpeed;
            move(null, moveToY);
        }
    }
    if(keys['a']){
        walk(-1);
    }
    if(keys['d']){
        walk(1);
    }
}

const gravity = 0.2;
let velocityY = 0;

function applyGravity() {
    velocityY += gravity;
    if (checkCollision(player.x, player.y + velocityY))
        velocityY = 0;
    else
        player.y += velocityY;

}

function checkCollision(moveToX, moveToY){
    for (let i = 1; i < rectangles.length; i++) {
        const rect = rectangles[i];
        const rLeft = rect.x;
        const rRight = rect.x + rect.width;
        const rTop = rect.y;
        const rBottom = rect.y + rect.height;
        const pLeft = moveToX - player.radius;
        const pRight = moveToX + player.radius;
        const pTop = moveToY - player.radius;
        const pBottom = moveToY + player.radius;

        let xCollide = false;
        let yCollide = false;

        if (pRight > rLeft && pLeft < rRight)
            xCollide = true;

        if (pTop < rBottom && pBottom > rTop)
            yCollide = true;
       
        if (xCollide && yCollide){
            if (rect.color === "red") {
                game = false;
                win = false;
            }
            else if (rect.color == "gold") {
                game = false;
                win = true;
            }

            return true;
        }
    }
}

function walk(direction){
    let moveToX = player.x;

    if (direction > 0){
        moveToX += player.walkSpeed;
    }
    else {
        moveToX -= player.walkSpeed;
    }

    move(moveToX, null);        
   
}

function move(moveToX, moveToY){
    if (!moveToX)
        moveToX = player.x;

    if (!moveToY)
        moveToY = player.y;
   
    if (checkCollision(moveToX, moveToY)){
        velocityY = 0;
    }
    else {
        player.x = moveToX;
        player.y = moveToY;

        if(player.x> 1350){
            player.x= 1350;
        }
        if(player.x< 1){
            player.x = 1;
        }
        if(player.y< 1){
            player.y = 1;
        }
        if(player.y> 700){
            player.y = 700;
        }
    }
}


document.addEventListener('keydown',handleKeyPress)
document.addEventListener('keyup', (e)=>{keys[e.key.toLowerCase()]=false;});


//call our function
animate();
