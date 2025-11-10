document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // 🖱️ Grab HTML elements
  // -------------------------------
  const list = document.getElementById("game-list");
  const viewer = document.getElementById("game-viewer");

  // -------------------------------
  // 🔘 Initial games with thumbnails and inline Rainbow Snake
  // -------------------------------
  let games = [
    { name: "Snake", type: "file", file: "snake.html", thumbnail: "images/snake.png" },
    { name: "Pong", type: "file", file: "pong.html", thumbnail: "images/pong.png" },
    {
      name: "Rainbow Snake",
      type: "inline",
      thumbnail: "images/rainbow_snake.png",
      code: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rainbow Snake</title>
<style>
body{background:#000;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;color:#fff;font-family:sans-serif;}
canvas{background:#111;display:block;margin:auto;border:2px solid #0f0;}
</style>
</head>
<body>
<canvas id="game" width="400" height="400"></canvas>
<script>
const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
const grid=20;let count=0;let snake=[{x:160,y:160}];let dx=grid;let dy=0;let apple={x:320,y:320};let score=0;
const colors=["#ff0000","#ff7f00","#ffff00","#00ff00","#0000ff","#4b0082","#8f00ff"];
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min)/grid)*grid;}
function gameLoop(){requestAnimationFrame(gameLoop);if(++count<4)return;count=0;ctx.clearRect(0,0,canvas.width,canvas.height);
const head={x:snake[0].x+dx,y:snake[0].y+dy};snake.unshift(head);
if(head.x===apple.x&&head.y===apple.y){score+=1;apple.x=getRandomInt(0,canvas.width);apple.y=getRandomInt(0,canvas.height);}else{snake.pop();}
ctx.fillStyle="#ff00ff";ctx.fillRect(apple.x,apple.y,grid,grid);
snake.forEach((s,index)=>{ctx.fillStyle=colors[index%colors.length];ctx.fillRect(s.x,s.y,grid-1,grid-1);});
if(head.x<0||head.x>=canvas.width||head.y<0||head.y>=canvas.height||snakeCollision(head)){
ctx.fillStyle="white";ctx.font="20px sans-serif";ctx.fillText("Game Over! Score: "+score,50,canvas.height/2);snake=[{x:160,y:160}];dx=grid;dy=0;score=0;}}
function snakeCollision(head){for(let i=1;i<snake.length;i++){if(head.x===snake[i].x&&head.y===snake[i].y)return true;}return false;}
document.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"&&dx===0){dx=-grid;dy=0;}if(e.key==="ArrowUp"&&dy===0){dx=0;dy=-grid;}if(e.key==="ArrowRight"&&dx===0){dx=grid;dy=0;}if(e.key==="ArrowDown"&&dy===0){dx=0;dy=grid;}});
requestAnimationFrame(gameLoop);
</script>
</body>
</html>`
    }
  ];

  // -------------------------------
  // 🖍️ Create a game card (thumbnail + play + remove)
  // -------------------------------
  function createGameCard(game) {
    const card = document.createElement("div");
    card.style.background = "#1c1c1c";
    card.style.borderRadius = "10px";
    card.style.padding = "10px";
    card.style.textAlign = "center";
    card.style.marginBottom = "10px";

    // Thumbnail
    if(game.thumbnail){
      const img = document.createElement("img");
      img.src = game.thumbnail;
      img.style.width = "100%";
      img.style.borderRadius = "8px";
      card.appendChild(img);
    }

    // Game title
    const title = document.createElement("div");
    title.textContent = game.name;
    title.style.margin = "5px 0";
    title.style.fontWeight = "bold";
    card.appendChild(title);

    // Play button
    const playBtn = document.createElement("button");
    playBtn.textContent = "Play";
    playBtn.style.width = "100%";
    playBtn.onclick = () => {
      if(game.type==="inline"){
        viewer.srcdoc = game.code;
      } else if(game.file.startsWith("http")){
        viewer.src = game.file;
      } else {
        viewer.src = `games/${game.file}`;
      }
    };
    card.appendChild(playBtn);

    // Remove button (session only)
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.width = "100%";
    removeBtn.style.marginTop = "5px";
    removeBtn.onclick = () => {
      const index = games.findIndex(g => g.name === game.name);
      if(index !== -1){
        games.splice(index, 1);
        loadGames();
      }
    };
    card.appendChild(removeBtn);

    list.appendChild(card);
  }

  // -------------------------------
  // 🏁 Load all games
  // -------------------------------
  function loadGames() {
    list.innerHTML = "";
    games.forEach(createGameCard);
    list.appendChild(addGameBtn);
  }

  // -------------------------------
  // ➕ Add New Game Button with password
  // -------------------------------
  const addGameBtn = document.createElement("button");
  addGameBtn.textContent = "➕ Add New Game";
  addGameBtn.style.background = "#444";
  addGameBtn.style.color = "#fff";
  addGameBtn.style.width = "100%";
  addGameBtn.style.marginTop = "10px";
  addGameBtn.style.padding = "0.8em";

  addGameBtn.onclick = () => {
    const password = prompt("Enter password to add a new game:");
    if(password !== "2012"){
      alert("Incorrect password! You cannot add a new game.");
      return;
    }

    const name = prompt("Enter the game name:");
    const file = prompt("Enter the HTML file name (in games/ folder or leave blank for inline):");
    const thumb = prompt("Enter thumbnail file path (optional, leave blank if none):");
    const code = prompt("Paste the HTML code here if you want inline game (optional):");

    if(name){
      const newGame = { name, thumbnail: thumb || "", file, type: code ? "inline" : "file", code: code || "" };
      games.push(newGame);
      loadGames();
      alert(`Game "${name}" added!`);
    }
  };

  // -------------------------------
  // 📝 Default iframe message
  // -------------------------------
  viewer.srcdoc = `<body style="display:flex;justify-content:center;align-items:center;height:100%;background:#000;color:white;font-family:sans-serif;">
  <h2>Select a game from the list!</h2></body>`;

  // -------------------------------
  // Initial load
  // -------------------------------
  loadGames();

}); 
