// -------------------------------
// 🖱️ Grab HTML elements
// -------------------------------
const list = document.getElementById("game-list");
const viewer = document.getElementById("game-viewer");

// -------------------------------
// 🔘 Initial built-in games
// -------------------------------
const games = [
  { name: "Snake", file: "snake.html" },
  { name: "Pong", file: "pong.html" },
  { name: "Rainbow Snake", file: "snake_rainbow.html" } // pre-added variant
];

// -------------------------------
// 🖍️ Function to create buttons
// -------------------------------
function createButton(game) {
  const btn = document.createElement("button");
  btn.textContent = game.name;

  btn.onclick = () => {
    // Open external URLs in new tab, local games in iframe
    if(game.file.startsWith("http")) {
      viewer.src = game.file; // attempt to open in iframe
    } else {
      viewer.src = `games/${game.file}`;
    }
  };
  list.appendChild(btn);
}

// -------------------------------
// 🏁 Load all initial games
// -------------------------------
function loadGames() {
  list.innerHTML = ""; // clear existing buttons
  games.forEach(createButton);
}
loadGames();

// -------------------------------
// ➕ Add New Game Button
// -------------------------------
const addBtn = document.createElement("button");
addBtn.textContent = "➕ Add New Game";
addBtn.style.background = "#444";
addBtn.style.marginTop = "10px";
addBtn.onclick = () => {
  const name = prompt("Enter the game name:");
  const file = prompt("Enter the HTML file name (in games/ folder):");
  if(name && file){
    const newGame = { name, file };
    games.push(newGame);
    createButton(newGame);
    alert(`Game "${name}" added! Make sure ${file} exists in the games/ folder.`);
  }
};
list.appendChild(addBtn);

// -------------------------------
// 📝 Default iframe message
// -------------------------------
viewer.srcdoc = `<body style="display:flex;justify-content:center;align-items:center;height:100%;background:#000;color:white;font-family:sans-serif;">
<h2>Select a game from the list!</h2></body>`; 
