document.addEventListener("DOMContentLoaded", () => {

  const list = document.getElementById("game-list");
  const viewer = document.getElementById("game-viewer");
  let isFullscreen = false;

  let games = [
    {
      name: "Rainbow Snake",
      type: "inline",
      thumbnail: "images/rainbow_snake.png",
      code: `<!DOCTYPE html>
<html>
<body style="margin:0;background:#000">
<canvas id="game" width="400" height="400"></canvas>
<script>
const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
const grid=20;
let count=0;
let snake=[{x:160,y:160}];
let dx=grid;
let dy=0;
let apple={x:320,y:320};
let score=0;
const colors=["#ff0000","#ff7f00","#ffff00","#00ff00","#0000ff","#4b0082","#8f00ff"];
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min)/grid)*grid;}
function gameLoop(){
  requestAnimationFrame(gameLoop);
  if(++count<8) return; // slower speed
  count=0;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const head={x:snake[0].x+dx,y:snake[0].y+dy};
  snake.unshift(head);
  if(head.x===apple.x&&head.y===apple.y){
    score+=1;
    apple.x=getRandomInt(0,canvas.width);
    apple.y=getRandomInt(0,canvas.height);
  }else{snake.pop();}
  ctx.fillStyle="#ff00ff";
  ctx.fillRect(apple.x,apple.y,grid,grid);
  snake.forEach((s,index)=>{
    ctx.fillStyle=colors[index%colors.length];
    ctx.fillRect(s.x,s.y,grid-1,grid-1);
  });
  if(head.x<0||head.x>=canvas.width||head.y<0||head.y>=canvas.height||snakeCollision(head)){
    ctx.fillStyle="white";
    ctx.font="20px sans-serif";
    ctx.fillText("Game Over! Score: "+score,50,canvas.height/2);
    snake=[{x:160,y:160}];
    dx=grid;
    dy=0;
    score=0;
  }
}
function snakeCollision(head){
  for(let i=1;i<snake.length;i++){
    if(head.x===snake[i].x&&head.y===snake[i].y) return true;
  }
  return false;
}
document.addEventListener("keydown",e=>{
  if(e.key==="ArrowLeft"&&dx===0){dx=-grid;dy=0;}
  if(e.key==="ArrowUp"&&dy===0){dx=0;dy=-grid;}
  if(e.key==="ArrowRight"&&dx===0){dx=grid;dy=0;}
  if(e.key==="ArrowDown"&&dy===0){dx=0;dy=grid;}
});
requestAnimationFrame(gameLoop);
</script>
</body>
</html>`
    }
    // You can add other games here like Snake, Pong, etc.
  ];

  function createGameCard(game) {
    const card = document.createElement("div");

    // Thumbnail
    if(game.thumbnail){
      const img = document.createElement("img");
      img.src = game.thumbnail;
      card.appendChild(img);
    }

    // Game title
    const title = document.createElement("div");
    title.textContent = game.name;
    title.style.marginBottom = "5px";
    card.appendChild(title);

    // Play/Close button
    const playBtn = document.createElement("button");
    playBtn.textContent = "Play";
    let isPlaying = false;

    playBtn.onclick = () => {
      if(!isPlaying){
        if(game.type==="inline"){
          viewer.srcdoc = game.code;
        } else {
          viewer.src = `games/${game.file}`;
        }
        playBtn.textContent = "Close";
        isPlaying = true;
      } else {
        viewer.srcdoc = `<body style="display:flex;justify-content:center;align-items:center;height:100%;background:#000;color:white;font-family:sans-serif;">
<h2>Select a game from the list!</h2></body>`;
        playBtn.textContent = "Play";
        isPlaying = false;
        if(isFullscreen){
          toggleFullscreen();
        }
      }
    };
    card.appendChild(playBtn);

    // Fullscreen button
    const fsBtn = document.createElement("button");
    fsBtn.textContent = "Fullscreen";
    fsBtn.onclick = () => {
      toggleFullscreen();
    };
    card.appendChild(fsBtn);

    // Remove button (password protected)
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      const password = prompt("Enter password to remove this game:");
      if(password !== "2012"){
        alert("Incorrect password! Cannot remove the game.");
        return;
      }
      const index = games.findIndex(g => g.name === game.name);
      if(index !== -1){
        games.splice(index, 1);
        loadGames();
      }
    };
    card.appendChild(removeBtn);

    list.appendChild(card);
  }

  function toggleFullscreen(){
    if(!isFullscreen){
      viewer.style.position = "fixed";
      viewer.style.top = "0";
      viewer.style.left = "0";
      viewer.style.width = "100%";
      viewer.style.height = "100%";
      viewer.style.zIndex = "9999";
      isFullscreen = true;
    } else {
      viewer.style.position = "relative";
      viewer.style.width = "100%";
      viewer.style.height = "100%";
      viewer.style.zIndex = "1";
      isFullscreen = false;
    }
  }

  function loadGames(){
    list.innerHTML = "";
    games.forEach(createGameCard);
    list.appendChild(addGameBtn);
  }

  // Add Game button
  const addGameBtn = document.createElement("button");
  addGameBtn.textContent = "➕ Add New Game";
  addGameBtn.onclick = () => {
    const password = prompt("Enter password to add a new game:");
    if(password !== "2012"){
      alert("Incorrect password!");
      return;
    }
    const name = prompt("Game name:");
    const file = prompt("HTML file (leave blank for inline):");
    const thumb = prompt("Thumbnail path (optional):");
    const code = prompt("Paste HTML code for inline game (optional):");
    if(name){
      const newGame = { name, thumbnail: thumb||"", file, type: code?"inline":"file", code: code||"" };
      games.push(newGame);
      loadGames();
      alert(`Game "${name}" added!`);
    }
  };

  // Default iframe
  viewer.srcdoc = `<body style="display:flex;justify-content:center;align-items:center;height:100%;background:#000;color:white;font-family:sans-serif;">
<h2>Select a game from the list!</h2></body>`;

  loadGames();
}); 
