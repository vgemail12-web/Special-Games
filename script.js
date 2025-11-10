const games = [
  { name: "Snake", file: "games/snake.html", thumb: "images/snake.png" },
  { name: "Pong", file: "games/pong.html", thumb: "images/pong.png" },
  { name: "Flappy", file: "games/flappy.html", thumb: "images/flappy.png" }
];

const gameList = document.getElementById('game-list');

games.forEach(game => {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `<img src="${game.thumb}" alt="${game.name}"><p>${game.name}</p>`;
  card.onclick = () => window.location.href = game.file;
  gameList.appendChild(card);
}); 

{ title: "Snake", file: "games/snake.html", thumbnail: "images/snake.png" } 
