let data; 
let westCoastWinners = [];
let eastCoastWinners = [];
let years = [];

let selectedWinner = null;

function preload() {
  data = loadJSON('NBA MVP.json');
}

function setup() {
  background(220);
  let canvas = createCanvas(800, 400);
  canvas.parent('data');

  for (let year in data.winners) {
    const winner = data.winners[year];
    const winnerData = { year: int(year), name: winner.name, clicked: false }; 

    if (winner.coast === 'West') {
      westCoastWinners.push(winnerData);
    } else if (winner.coast === 'East') {
      eastCoastWinners.push(winnerData);
    }
    years.push(int(year));
  }

  westCoastWinners.sort((a, b) => a.year - b.year);
  eastCoastWinners.sort((a, b) => a.year - b.year);

  drawWinners(westCoastWinners, height * 0.25, color(255, 0, 0));

  drawWinners(eastCoastWinners, height * 0.75, color(0, 0, 255));

  drawTimeline(min(years), max(years), height / 2);
}

function drawWinners(winners, yPos, winnerColor) {
  const spacing = 20;
  for (let i = 0; i < winners.length; i++) {
    const x = map(winners[i].year, min(years), max(years), 50, width - 50);
    const d = dist(mouseX, mouseY, x, yPos);

    if (winners[i].clicked) {
      fill(winnerColor.levels[0], winnerColor.levels[1], winnerColor.levels[2], 128);
    } else if (d < 10) {
      fill(255, 0, 0);
      selectedWinner = winners[i].name;
    } else {
      fill(winnerColor);
    }

    noStroke();
    ellipse(x, yPos, 10, 10);
  }
}

function drawTimeline(startYear, endYear, yPos) {
  const timelineX1 = 50;
  const timelineX2 = width - 50;
  stroke(0);
  strokeWeight(1);
  line(timelineX1, yPos, timelineX2, yPos);
  
  for (let year = startYear; year <= endYear; year += 5) {
    const x = map(year, startYear, endYear, timelineX1, timelineX2);
    textAlign(CENTER);
    textSize(12);
    text(year, x, yPos + 20);
  }
}

function mousePressed() {
  for (let winner of westCoastWinners) {
    const x = map(winner.year, min(years), max(years), 50, width - 50);
    const d = dist(mouseX, mouseY, x, height * 0.25);
    if (d < 10) {
      winner.clicked = !winner.clicked;
      return;
    }
  }
  
  for (let winner of eastCoastWinners) {
    const x = map(winner.year, min(years), max(years), 50, width - 50);
    const d = dist(mouseX, mouseY, x, height * 0.75);
    if (d < 10) {
      winner.clicked = !winner.clicked;
      return;
    }
  }
}

function mouseMoved() {
  selectedWinner = null;
}

function draw() {
  background(220); 
  drawWinners(westCoastWinners, height * 0.25, color(255, 0, 0));
  drawWinners(eastCoastWinners, height * 0.75, color(0, 0, 255));
  drawTimeline(min(years), max(years), height / 2);
  
  if (selectedWinner !== null) {
    textSize(16);
    fill(0);
    textAlign(CENTER);
    text(selectedWinner, width / 2, height - 20);
  }
}
