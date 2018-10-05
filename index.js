class Tile {
  constructor(imageData, x, y, width, height, stats, side) {
    this.x = x;
    this.y = y;

    this.width = width || 50;
    this.height = height || 50;

    this.image = imageData;
    this.side = side || 0;

    this.stats = stats || {};

    this.selected = false;
  }

  draw() {
    image(this.image, this.x, this.y, this.width, this.height);
    if (this.selected) {
      noFill();
      stroke(100,100,200);
      strokeWeight(2);
      rect(this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.selected) {
      this.x = floor(mouseX/tilesize)*tilesize;
      this.y = floor(mouseY/tilesize)*tilesize;
    }
  }
}

var tilesize = 50;
var tiles = [];
var startTile = null;
var mageStats = {
  str: 4,
  dex: 14,
  con: 11,
  int: 17,
  wis: 12,
  cha: 11,
  lv: 1,
  hp: 40,
  ac: 15
}
var skelMageStats = {
  str: 4,
  dex: 10,
  con: 8,
  int: 14,
  wis: 10,
  cha: 8,
  lv: 1,
  hp: 20,
  ac: 10
}
var skelWarriorStats = {
  str: 14,
  dex: 11,
  con: 10,
  int: 8,
  wis: 8,
  cha: 8,
  lv: 1,
  hp: 30,
  ac: 12
}
var selectedTile = null;

function preload() {
  mageImage = loadImage("https://i.imgur.com/8aWj0Sn.png");
  skelMageImage = loadImage("https://i.imgur.com/PuDcJ7i.png");
  skelWarriorImage = loadImage("https://i.imgur.com/JMmR3PS.png");
  dungeon1Background = loadImage("https://i.imgur.com/V5LYZAC.png")
}

function setup() {
  createCanvas(500, 500);
  tiles.push(new Tile(mageImage, 200, 100, 50, 50, mageStats));
  tiles.push(new Tile(skelMageImage, 50, 50, 50, 50, skelMageStats));
  tiles.push(new Tile(skelWarriorImage, 100, 100, 50, 50, skelWarriorStats));
}

function draw() {
  background(0);
  image(dungeon1Background,0,0,500,383);
  noFill();

  if (startTile) {
    stroke(100,200,100);
    strokeWeight(2);
    rect(startTile.x, startTile.y, tilesize, tilesize);
  }

  stroke(0);
  strokeWeight(1);
  rect(0,0,499,350);
  for (var tile of tiles) {
    tile.draw();
    tile.move();
  }
  showStats();
}

function showStats() {
  if (!selectedTile || !selectedTile.stats) {return;}
  let stats = selectedTile.stats;
  stroke(0);
  strokeWeight(1);
  let line = 0;
  fill(255);
  textSize(24);
  for(key in stats) {
    let xx = floor(line/3) * 125;
    let yy = line%3 * 40 + 410;
    text(key, 25+xx, yy);
    text(stats[key], 25+xx+50, yy);
  }
}

function mousePressed() {
  if (mouseButton == "left") {
    for(var tile of tiles) {
      if (floor(mouseX/tilesize)*tilesize == tile.x &&
          floor(mouseY/tilesize)*tilesize == tile.y) {
            tile.selected = true;
            selectedTile = tile;
            startTile = {x: floor(mouseX/tilesize)*tilesize,
                        y: floor(mouseY/tilesize)*tilesize}
            return
          }
    }
  }
}

function mouseReleased() {
  if (mouseButton == "left") {
    startTile = null;
    for(var tile of tiles) {
        tile.selected = false;
    }
  }
}
