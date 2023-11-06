let data;
let westCoastWinners = [];
let eastCoastWinners = [];
let years = [];
let basketballImg;
let swooshSound;
let courtImg; 
let selectedWinner = null;

function preload() {
  data = loadJSON('NBA MVP.json');
  basketballImg = loadImage('Basketball_Clipart.png');
  swooshSound = loadSound('mixkit-basketball-ball-bouncing-2085.mp3');
  courtImg = loadImage('ecbdb3a9d505c08bbb70592be6eeaa53.png'); 
}

function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent('data');

  for (let year in data.winners) {
    const winner = data.winners[year];
    const winnerData = { year: int(year), name: winner.name, coast: winner.coast, clicked: false };

    if (winner.coast === 'West') {
      westCoastWinners.push(winnerData);
    } else if (winner.coast === 'East') {
      eastCoastWinners.push(winnerData);
    }
    years.push(int(year));
  }

  westCoastWinners.sort((a, b) => a.year - b.year);
  eastCoastWinners.sort((a, b) => a.year - b.year);
}

function drawWinners(winners, yPos, winnerColor) {
  const imgSize = 20;

  for (let i = 0; i < winners.length; i++) {
    const x = map(winners[i].year, min(years), max(years), 50, width - 50);

    if (winners[i].clicked) {
      image(basketballImg, x - imgSize / 2, yPos - imgSize / 2, imgSize, imgSize);
    } else {
      fill(winnerColor);
      noStroke();
      ellipse(x, yPos, 10, 10);
    }
  }
}

function drawTimeline(startYear, endYear, yPos) {
  const timelineX1 = 50;
  const timelineX2 = width - 50;
  stroke(0, 0, 139);
  strokeWeight(1);
  line(timelineX1, yPos, timelineX2, yPos);

  for (let year = startYear; year <= endYear; year += 5) {
    const x = map(year, startYear, endYear, timelineX1, timelineX2);
    fill(0, 0, 139); 
    textAlign(CENTER);
    textSize(12);
    text(year, x, yPos + 20);
  }
}

function mousePressed() {
  userStartAudio().then(() => {
    westCoastWinners.forEach(winner => winner.clicked = false);
    eastCoastWinners.forEach(winner => winner.clicked = false);
    selectedWinner = null;

    for (let winner of [...westCoastWinners, ...eastCoastWinners]) {
      const yPos = winner.coast === 'West' ? height * 0.25 : height * 0.75;
      const x = map(winner.year, min(years), max(years), 50, width - 50);
      const d = dist(mouseX, mouseY, x, yPos);
      if (d < 10) {
        winner.clicked = true;
        selectedWinner = winner.name;
        if (!swooshSound.isPlaying()) {
          swooshSound.play();
        }
        break;
      }
    }
  });
}

function draw() {
  background(courtImg); 

  drawWinners(westCoastWinners, height * 0.25, color(255, 69, 0)); 
  drawWinners(eastCoastWinners, height * 0.75, color(30, 144, 255)); 

  if (selectedWinner !== null) {
    fill(0, 0, 139); 
    textSize(16);
    textAlign(CENTER);
    text(selectedWinner, width / 2, height - 20);
  }

  let totalWinners = westCoastWinners.length + eastCoastWinners.length;
  let westCoastPercentage = (westCoastWinners.length / totalWinners * 100).toFixed(2);
  let eastCoastPercentage = (eastCoastWinners.length / totalWinners * 100).toFixed(2);

  fill(0, 0, 139); 
  textSize(14);
  textAlign(LEFT, TOP);
  text(`West Coast MVP Winners: ${westCoastPercentage}%`, 10, 10); 
  text(`East Coast MVP Winners: ${eastCoastPercentage}%`, 10, 380); 
}


setup();
