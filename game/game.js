const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");    

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
}

function Rectangle (x, y, width, height, color){
    this.x=x;
    this.y=y;
    this.width= width;
    this.height = height;
    this.color=color;
}

const rectangles = [];

rectangles.push(new Rectangle(0,0,1350,700, "blue"));
rectangles.push(new Rectangle(0,650,80,100,"green"));
rectangles.push(new Rectangle(80,660,1280,40,"red"));
rectangles.push(new Rectangle(550,520,40,40,"red"));
rectangles.push(new Rectangle(670,520,40,40,"red"));
rectangles.push(new Rectangle(790,520,40,40,"red"));
rectangles.push(new Rectangle(180,600,40,10,"gray"));
rectangles.push(new Rectangle(350,560,40,10,"gray"));
rectangles.push(new Rectangle(450,560,500,10,"gray"));
rectangles.push(new Rectangle(1090,540,40,10,"gray"));
rectangles.push(new Rectangle(1290,500,40,10,"gray"));

let dx = 10;
let dy = 11;

let game=true;
const keys={};


const player = {
    x : 50,
    y: 600,
    radius: 25,
    speed: 3
};

if(game==true){
    function animate() {
        drawRectangles();
        drawPlayer();
       
        requestAnimationFrame(animate);
    }

    function drawRectangles(){
        for (let i = 0; i < rectangles.length; i++) {
            const rect = rectangles[i];
            //console.log(`Rectangle ${i + 1}: x=${rect.x}, y=${rect.y}, width=${rect.width}, height=${rect.height}`);

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
   
    function handleKeyPress(e) {
        //console.log(e.key);
        keys[e.key.toLowerCase()]=true;

        let moveToX = player.x;
        let moveToY = player.y;

        if(keys['s']){
            moveToY= player.y+player.speed;
        }

        if(keys['w']){
            moveToY = player.y-player.speed;
        }
        if(keys['a']){
            moveToX= player.x-player.speed;
        }
        if(keys['d']){
            moveToX= player.x+player.speed;
        }

        if (!checkCollision(moveToX, moveToY)){
            player.x = moveToX;
            player.y = moveToY;
        }

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
                console.warn("BONK!!", rect);
                return true;
            }
        }  
    }
}
document.addEventListener('keydown',handleKeyPress)
document.addEventListener('keyup', (e)=>{keys[e.key.toLowerCase()]=false;});


//call our function
animate();
