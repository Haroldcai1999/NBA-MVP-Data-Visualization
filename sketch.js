let data; // JSON data
let westCoastWinners = [];
let eastCoastWinners = [];
let years = [];

let selectedWinner = null;

function preload() {
  // Load your JSON data
  data = loadJSON('NBA MVP.json'); // Replace 'your_data.json' with the path to your JSON file
}

function setup() {
  background(220);
    let canvas = createCanvas(800, 400);
    canvas.parent('data');
    //noLoop();

  // Separate the MVP winners into West Coast and East Coast categories
  for (let year in data.winners) {
    const winner = data.winners[year];
    if (winner.coast === 'West') {
      westCoastWinners.push({ year: int(year), name: winner.name });
    } else if (winner.coast === 'East') {
      eastCoastWinners.push({ year: int(year), name: winner.name });
    }
    years.push(int(year));
  }

  // Sort the MVP winners by year
  westCoastWinners.sort((a, b) => a.year - b.year);
  eastCoastWinners.sort((a, b) => a.year - b.year);

  // Draw West Coast winners on the top half
  drawWinners(westCoastWinners, height * 0.25, color(255, 0, 0)); // Use your preferred color

  // Draw East Coast winners on the bottom half
  drawWinners(eastCoastWinners, height * 0.75, color(0, 0, 255)); // Use your preferred color

  // Draw the timeline in the middle
  drawTimeline(min(years), max(years), height / 2);
}

function drawWinners(winners, yPos, winnerColor) {
  const spacing = 20;
  for (let i = 0; i < winners.length; i++) {
    fill(winnerColor);
    noStroke();
    const x = map(winners[i].year, min(years), max(years), 50, width - 50);
    const d = dist(mouseX, mouseY, x, yPos);
    if (d < 10) {
      fill(255, 0, 0); // Highlight on hover
      selectedWinner = winners[i].name;
    }
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

function mouseMoved() {
  // Clear selection when not hovering over a data point
  selectedWinner = null;
}

function draw() {
  // Display the selected winner's name (if any)
  if (selectedWinner !== null) {
    textSize(16);
    fill(0);
    textAlign(CENTER);
    text(selectedWinner, width / 2, height - 20);
  }
}
