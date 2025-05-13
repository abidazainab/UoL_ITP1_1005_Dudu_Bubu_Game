/*
Final Game project

Game story: 
In a realm not so distant, a charming duo, Dudu and Bubu, shared their lives. 
One fateful evening, as Dudu/Bubu returned home with a trove of chocolates, 
they discovered an unsettling silence. Their cherished partner (Dudu/Bubu) was 
nowhere to be found. Panic set in, and the search began. Hours passed, and by midnight,
 every friend's abode had been scoured to no avail. The search led Dudu/Bubu to a mystical realm
known as the Pink World. Braving enchanted rivers, dense forests, and towering mountains,
they confronted adversaries at every turn. Their determination culminated in a chilling discovery:
their beloved was trapped in a sinister mansion. With courage and love guiding them, they finally reunited.

Game features:
* Choosing different characters
* Have three game levels
* Levels unlocking system
* Instructions for how to play
* Pleasing sound effects
* Challenging enemies
* Chance to get extra life
* Timer

*/

//Declaring variables for positions and interactions
var myCharacter_X;
var myCharacter_Y;
var ground_y;

var left_side;
var right_side;
var falling;
var jumping;
var found;
var reached;

var scroll_position_x;
var game_Point;
var score_store;
var victoryFlag;
var lives;

var pole_bar;
var road_track;
var angle = 0;

//Declaring variable for objects
var selectCharacter;
var messages;
var timer;
var goBack;
var instruction;

//Declaring variable for tracking
var setWorld;
var setCharacter;
var levelState = [0, 0, 0];

//Declaring variable for scenery
var river;
var chocolates;
var big_chocolate;
var tree_position_x;
var tree_position_y;
var clouds = [];
var mount_alp;
var mountain_top;
var stars = [];
var house;
var chocolate;
var liveScore;
var platforms;
var enemy;
var emit;
var celebrate;

//Declaring variables for sounds
var gameSound;
var sunSetSound;
var midNightSound;
var pinkWorldSound;
var jumpSound;
var winSound;
var endLevelSound;
var chocolateSound;
var bigChocolateSound;
var getLifeSound;
var game_overSound;
var fallInWaterSound;
var enemySound;
var fireSound;
var soundPlayed = false;

//Declaring variables for background images
var homeBackground;
var pinkBackground;
var sunsetBackground;
var gameNameBackground;
var characterPageBackground;

//Declaring variables for font styles
var font1;
var font2;
var font3;
var font4;
var font5;

function preload() {
  //Uploading images
  gameNameBackground = loadImage("pictures/gameName.jpg");
  characterPageBackground = loadImage("pictures/characterPage.jpg");
  homeBackground = loadImage("pictures/homepages.jpg");
  sunsetBackground = loadImage("pictures/set.jpg");

  //Uploading fonts
  font1 = loadFont("fonts/molle.ttf");
  font2 = loadFont("fonts/tangerine.ttf");
  font3 = loadFont("fonts/greatVibes.ttf");
  font4 = loadFont("fonts/lobster.ttf");
  font5 = loadFont("fonts/monoton.ttf");

  //Using p5.sound extension//
  //Uploading sounds
  soundFormats("mp3", "wav");

  gameSound = loadSound("assets/gameSound.mp3");
  gameSound.setVolume(0.1);

  jumpSound = loadSound("assets/jump.wav");
  jumpSound.setVolume(0.05);

  winSound = loadSound("assets/win.mp3");
  winSound.setVolume(0.05);

  endLevelSound = loadSound("assets/endLevel.mp3");
  endLevelSound.setVolume(0.05);

  chocolateSound = loadSound("assets/chocolate.mp3");
  chocolateSound.setVolume(0.02);

  bigChocolateSound = loadSound("assets/bigChocolate.mp3");
  bigChocolateSound.setVolume(0.02);

  getLifeSound = loadSound("assets/getLife.mp3");
  getLifeSound.setVolume(0.05);

  fallInWaterSound = loadSound("assets/fallInWaterSound.mp3");
  fallInWaterSound.setVolume(0.05);

  enemySound = loadSound("assets/enemy.mp3");
  enemySound.setVolume(0.1);

  fireSound = loadSound("assets/fire.mp3");
  fireSound.setVolume(0.1);

  game_overSound = loadSound("assets/game_over.mp3");
  game_overSound.setVolume(0.1);
}

function setup() {
  createCanvas(1024, 576);

  lives = 5;
  game_Point = 0;
  setWorld = 6;

  //Calling function to start the game
  startNewGame();
  //Calling function for background sound
  backgroundSound();
}

function draw() {
  //It will call game's cover page
  if (setWorld == 6) {
    game_name();
  }

  //It will call game's character changing option page
  if (setWorld == 5) {
    character_page();
  }

  //It will call game's home page. There will be three worlds.
  if (setWorld == 4) {
    home_page();
  }

  //It will call the first level of the game named 'Sunset World'
  if (setWorld == 3) {
    Sun_set_World();
  }

  //It will call the second level of the game named 'Midnight World'
  if (setWorld == 2) {
    Mid_night_World();
  }

  //It will call the last level of the game named 'Pink World'
  if (setWorld == 1) {
    Pink_World();
  }
}

function keyPressed() {
  if (!jumping) {
    //Move to the left
    if (keyCode == 37 || keyCode == 65) {
      left_side = true;
    }

    //Move to the right
    else if (keyCode == 39 || keyCode == 68) {
      right_side = true;
    }

    //Jump, and a jump sound will be played.
    if (keyCode == 38 || keyCode == 87) {
      if (!falling) {
        myCharacter_Y -= 200;
        jumpSound.play();
      }
    }
  }

  //After reaching the end point, pressing 'space bar' will take the game to the home page
  if (victoryFlag.reached) {
    if (key == " ") {
      returnToStart();
    }
    //After reaching the end point, pressing 'n' key will take the game to the next level
    else if (key == "n") {
      //If the game is at first level, it will go to the second level.
      if (setWorld == 3) {
        setWorld = 2;
        startNewGame();
      }
      //If the game is at second level, it will go to the third level.
      else if (setWorld == 2) {
        setWorld = 1;
        startNewGame();
      }
    }
  }
  //When all lives are depleted, The game will be over. And then pressing 'space bar' will lead the game to the home page.
  else if (lives == 0 && key == " ") {
    returnToStart();
  }
  //When the time runs out, the game will be over. And then pressing 'space bar' will lead the game to the home page.
  if (timer.timeMinute == 0 && timer.timeSecond == 0 && key == " ") {
    returnToStart();
  }
}

function keyReleased() {
  //Stop moving left
  if (keyCode == 37 || keyCode == 65) {
    left_side = false;
  }
  //Stop moving right
  else if (keyCode == 39 || keyCode == 68) {
    right_side = false;
  }
}

function mousePressed() {
  //Click button for going to 'Select character page'
  if (
    mouseX > 800 &&
    mouseX < 925 &&
    mouseY > 450 &&
    mouseY < 500 &&
    setWorld == 6
  ) {
    setWorld = 5;
  }

  //Click button to select a game character
  //To select game character-1
  else if (
    mouseX > selectCharacter.bubuX - 150 &&
    mouseX < selectCharacter.bubuX + 150 &&
    mouseY > selectCharacter.bubuY - 130 &&
    mouseY < selectCharacter.bubuY + 220 &&
    setWorld == 5
  ) {
    setWorld = 4;
    setCharacter = 1;
  }

  //To select game character-2
  else if (
    mouseX > selectCharacter.duduX - 150 &&
    mouseX < selectCharacter.duduX + 150 &&
    mouseY > selectCharacter.duduY - 130 &&
    mouseY < selectCharacter.duduY + 220 &&
    setWorld == 5
  ) {
    setWorld = 4;
    setCharacter = 2;
  }

  //Click button for entering into level-1: The Sunset World
  else if (
    mouseX > 150 &&
    mouseX < 450 &&
    mouseY > 150 &&
    mouseY < 200 &&
    setWorld == 4
  ) {
    setWorld = 3;
  }

  //Click button for entering into level-2: The Midnight World
  else if (
    mouseX > 365 &&
    mouseX < 660 &&
    mouseY > 250 &&
    mouseY < 300 &&
    setWorld == 4
  ) {
    if (levelState[0] == 2) {
      setWorld = 2;
    }
  }

  //Click button for entering into level-3: The Pink World
  else if (
    mouseX > 550 &&
    mouseX < 850 &&
    mouseY > 350 &&
    mouseY < 400 &&
    setWorld == 4
  ) {
    if (levelState[1] == 2) {
      setWorld = 1;
    }
  }

  //To go back to the main page
  else if (
    mouseX > goBack.x - 250 &&
    mouseX < goBack.x - 130 &&
    mouseY > goBack.y + 250 &&
    mouseY < goBack.y + 300 &&
    setWorld == 5
  ) {
    setWorld = 6;
  }

  //To go back to the 'Select character page'
  else if (
    mouseX > goBack.x - 250 &&
    mouseX < goBack.x - 130 &&
    mouseY > goBack.y + 250 &&
    mouseY < goBack.y + 300 &&
    setWorld == 4
  ) {
    setWorld = 5;
  }

  //To go back to home page
  else if (
    mouseX > goBack.x - 250 &&
    mouseX < goBack.x - 150 &&
    mouseY > goBack.y + 250 &&
    mouseY < goBack.y + 300 &&
    (setWorld == 3 || setWorld == 2 || setWorld == 1)
  ) {
    returnToStart();
  }

  //To access game instructions popup box
  else if (
    mouseX > instruction.x - 50 &&
    mouseX < instruction.x + 85 &&
    mouseY > instruction.y &&
    mouseY < instruction.y + 50 &&
    (setWorld == 3 || setWorld == 2 || setWorld == 1)
  ) {
    instruction.visible = true;
  }

  //To close game instructions popup box
  else if (
    dist(mouseX, mouseY, instruction.x - 100, instruction.y - 400) < 20
  ) {
    instruction.visible = false;
  }
}

//* Function for game's background sound *//
function backgroundSound() {
  gameSound.play();
  gameSound.loop();
}

//* Function for creating game's cover page *//
function game_name() {
  //Background image of this page
  background(gameNameBackground);

  //Drawing the game name
  textFont(font1);
  textSize(70);
  fill(75, 0, 130);
  text("Dudu Bubu Adventure", 120, 120);

  //When mouse is on the 'Next' button, it changes color.
  if (mouseX > 800 && mouseX < 925 && mouseY > 450 && mouseY < 500) {
    fill(0, 206, 209);
  } else {
    fill(255, 100);
  }
  //Drawing the 'Next' button.
  rect(800, 450, 125, 50, 5);
  textSize(40);
  fill(75, 0, 130);
  text("NEXT", 800, 490);
}

//* Function for creating game's character page *//
function character_page() {
  //Background image of this page
  background(characterPageBackground);

  //Headline of this page
  textFont(font1);
  textSize(70);
  fill(255, 215, 0);
  text(
    "Select your game character",
    selectCharacter.bubuX - 220,
    selectCharacter.bubuY - 180
  );

  //When the mouse is on the 'Back' button, it changes color.
  if (
    mouseX > goBack.x - 250 &&
    mouseX < goBack.x - 130 &&
    mouseY > goBack.y + 250 &&
    mouseY < goBack.y + 300 &&
    setWorld == 5
  ) {
    fill(100, 149, 237, 150);
  } else {
    fill(255, 150);
  }
  //Drawing the 'Back' button
  rect(goBack.x - 250, goBack.y + 250, 120, 50, 5);
  textSize(40);
  fill(255, 215, 0);
  text("Back", goBack.x - 240, goBack.y + 290);

  //Drawing the characters' face
  pinkHappy();
  brownHappy();
}

//* Function for creating game's home page *//
function home_page() {
  //Background image of this page
  background(homeBackground);

  noStroke();
  textFont(font2);
  textSize(40);

  //Drawing the button for level-1: The Sunset world
  fill(255, 100);
  rect(150, 150, 300, 50, 150);
  if (mouseX > 150 && mouseX < 450 && mouseY > 150 && mouseY < 200) {
    fill(255);
  } else {
    fill(255, 255, 0);
  }
  text("Sunset World", 200, 190);
  //Showing level completion
  if (levelState[0] == 2) {
    fill(255, 0, 0);
    textFont(font5);
    textSize(20);
    translate(-270, 350);
    rotate(-3.1416 / 4);
    text("Completed", 380, 200);
    resetMatrix();
  }

  //Drawing the button for level-2: The Midnight world
  fill(255, 100);
  textFont(font2);
  textSize(40);
  rect(365, 250, 290, 50, 150);
  if (levelState[0] == 2) {
    if (mouseX > 365 && mouseX < 660 && mouseY > 250 && mouseY < 300) {
      fill(255);
    } else {
      fill(25, 25, 112);
    }
    text("Midnight World", 390, 290);
  } else {
    fill(255, 0, 0);
    textFont(font1);
    text("Level Locked", 380, 290);
  }
  //Showing level completion
  if (levelState[1] == 2) {
    fill(255, 0, 0);
    textFont(font5);
    textSize(20);
    translate(-290, 530);
    rotate(-3.1416 / 4);
    text("Completed", 600, 300);
    resetMatrix();
  }

  //Drawing the  button for level-3: The Pink world
  fill(255, 100);
  textFont(font2);
  textSize(40);
  rect(550, 350, 290, 50, 150);
  if (levelState[1] == 2) {
    if (mouseX > 550 && mouseX < 850 && mouseY > 350 && mouseY < 400) {
      fill(255);
    } else {
      fill(255, 0, 255);
    }
    text("Pink World", 600, 390);
  } else {
    fill(255, 0, 0);
    textFont(font1);
    text("Level Locked", 570, 390);
  }
  //Showing level completion
  if (levelState[2] == 2) {
    fill(255, 0, 0);
    textFont(font5);
    textSize(20);
    translate(-290, 680);
    rotate(-3.1416 / 4);
    text("Completed", 760, 400);
    resetMatrix();
  }

  //When the mouse is on the 'Back' button, it changes color.
  if (
    mouseX > goBack.x - 250 &&
    mouseX < goBack.x - 130 &&
    mouseY > goBack.y + 250 &&
    mouseY < goBack.y + 300 &&
    setWorld == 4
  ) {
    fill(0, 255, 255);
  } else {
    fill(255, 150);
  }

  //Drawing the 'Back' button
  rect(goBack.x - 250, goBack.y + 250, 120, 50, 5);
  textSize(40);
  textFont(font1);
  fill(75, 0, 130);
  text("Back", goBack.x - 240, goBack.y + 290);
}

//* Function for go back to the home page *//
function backtoHome() {
  //Drawing the 'Back' button
  fill(255, 100);
  rect(goBack.x - 250, goBack.y + 250, 100, 50, 5);
  textSize(40);
  textFont(font2);

  //When the mouse is on the 'Back' button, it changes color.
  if (
    mouseX > goBack.x - 250 &&
    mouseX < goBack.x - 150 &&
    mouseY > goBack.y + 250 &&
    mouseY < goBack.y + 300 &&
    (setWorld == 3 || setWorld == 2 || setWorld == 1)
  ) {
    fill(255);
  } else {
    fill(0);
  }
  text("Back", goBack.x - 240, goBack.y + 290);
}

//* Function for drawing the 'instructions' button *//
function drawInstruction() {
  //Drawing the button
  fill(255, 100);
  rect(instruction.x - 50, instruction.y, 135, 50, 10);
  textSize(40);
  textFont(font2);

  //When the mouse is on the 'Instructions' button, it changes color.
  if (
    mouseX > instruction.x - 50 &&
    mouseX < instruction.x + 85 &&
    mouseY > instruction.y &&
    mouseY < instruction.y + 50 &&
    (setWorld == 3 || setWorld == 2 || setWorld == 1)
  ) {
    fill(255);
  } else {
    fill(0);
  }
  text("Instructions", instruction.x - 50, instruction.y + 35);
}

//* Function for game's instruction *//
function gameInstruction() {
  //After 'instructions' button is clicked, a box is shown with all instructions for this game.
  if (!gameInstruction.visible) {
    //Drawing the instructions popup box
    fill(0, 128, 128, 230);
    rect(instruction.x - 700, instruction.y - 400, 600, 300, 20);

    //Drawing all texts of instructions
    textSize(50);
    textFont(font4);
    fill(255);
    text("INSTRUCTIONS", instruction.x - 600, instruction.y - 350);
    textSize(30);
    textFont(font4);
    text(
      "1. Press 'A' or 'LEFT ARROW' to move LEFT",
      instruction.x - 680,
      instruction.y - 280
    );
    text(
      "2. Press 'D' or 'RIGHT ARROW' to move RIGHT",
      instruction.x - 680,
      instruction.y - 230
    );
    text(
      "3. Press 'W' or 'UP ARROW' to JUMP",
      instruction.x - 680,
      instruction.y - 180
    );

    //Drawing a close button for the instructions popup box
    ellipse(instruction.x - 100, instruction.y - 400, 40);

    //When the mouse is on the close button, it changes color.
    if (dist(mouseX, mouseY, instruction.x - 100, instruction.y - 400) < 20) {
      fill(255, 0, 0);
    } else {
      fill(0);
    }
    text("X", instruction.x - 110, instruction.y - 390);
  }
}

//* Function for drawing clouds *//
function draw_clouds() {
  for (var p = 0; p < 100; p++) {
    //Drawing clouds
    noStroke();

    //Drawing clouds in the level-1: The Sunset World
    if (setWorld == 3) {
      fill(70, 0, 0);
      ellipse(clouds[p].x, clouds[p].y, clouds[p].bigSize);
      ellipse(
        clouds[p].x + clouds[p].bigSize * 0.5,
        clouds[p].y,
        clouds[p].bigSize * 0.7
      );
      ellipse(
        clouds[p].x - clouds[p].bigSize * 0.5,
        clouds[p].y,
        clouds[p].bigSize * 0.7
      );

      //After reaching the end point, level-1's clouds respawn from the specified point
      if (clouds[p].x - clouds[p].bigSize * 0.5 > 8000) {
        clouds[p].x = -2000;
      }
    }
    //Changing clouds' color in the level-2: The Midnight World
    else if (setWorld == 2) {
      fill(180);
    }
    //Drawing clouds in the level-3: The Pink World
    else if (setWorld == 1) {
      fill(255, 228, 225, 250);
    }
    ellipse(clouds[p].x, clouds[p].y, clouds[p].size);
    ellipse(
      clouds[p].x + clouds[p].size * 0.5,
      clouds[p].y,
      clouds[p].size * 0.7
    );
    ellipse(
      clouds[p].x - clouds[p].size * 0.5,
      clouds[p].y,
      clouds[p].size * 0.7
    );
    //After reaching the end point, level-2's and level-3's clouds respawn from the specified point
    if (clouds[p].x - clouds[p].size * 0.5 > 8000) {
      clouds[p].x = -2000;
    }

    //Code for clouds' movements
    clouds[p].x += 0.5;
  }
}

//* Function for drawing trees *//
function draw_trees() {
  for (var p = 0; p < tree_position_x.length; p++) {
    //Drawing trees for level-1: The Sunset World
    if (setWorld == 3) {
      fill(0, 200);
      rect(tree_position_x[p] - 55, tree_position_y - 80, 18, 80);
      fill(255, 0, 0, 200);
      ellipse(tree_position_x[p] - 20, tree_position_y - 90, 70, 50);
      fill(255, 69, 0, 200);
      ellipse(tree_position_x[p] - 70, tree_position_y - 90, 70, 50);
      fill(255, 215, 0, 200);
      ellipse(tree_position_x[p] - 45, tree_position_y - 120, 70, 50);
    }

    //Drawing trees for level-2: The Midnight World
    else if (setWorld == 2) {
      fill(51, 25, 0);
      rect(tree_position_x[p] - 55, tree_position_y - 80, 18, 80);
      fill(51, 102, 0);

      ellipse(tree_position_x[p] - 20, tree_position_y - 90, 70, 50);
      ellipse(tree_position_x[p] - 70, tree_position_y - 90, 70, 50);
      ellipse(tree_position_x[p] - 45, tree_position_y - 120, 70, 50);
    }

    //Drawing trees for level-3: The Pink World
    else if (setWorld == 1) {
      fill(25, 25, 112);
      rect(tree_position_x[p] - 55, tree_position_y - 80, 18, 80);
      fill(72, 61, 139);
      ellipse(tree_position_x[p] - 20, tree_position_y - 90, 70, 50);
      fill(106, 90, 205);
      ellipse(tree_position_x[p] - 70, tree_position_y - 90, 70, 50);
      fill(123, 104, 238);
      ellipse(tree_position_x[p] - 45, tree_position_y - 120, 70, 50);
    }
  }
}

//* Function for drawing mountains *//
function draw_mountain() {
  for (var p = 0; p < mount_alp.length; p++) {
    //Setting mountain color for level-1: The Sunset World
    if (setWorld == 3) {
      fill(139, 0, 0);
    }

    //Setting mountain color for level-2: The Midnight world
    else if (setWorld == 2) {
      fill(90);
    }
    //Setting mountain color for level-3: The Pink World
    else if (setWorld == 1) {
      fill(0, 128, 128);
    }

    //Drawing mountains
    triangle(
      mount_alp[p].x_pos,
      mount_alp[p].y_pos,
      mount_alp[p].x_pos1,
      mount_alp[p].y_pos1,
      mount_alp[p].x_pos2,
      mount_alp[p].y_pos2
    );
  }

  //*Mountain Shadow
  for (var p = 0; p < mountain_top.length; p++) {
    //Setting mountain shadow color for level-1: The Sunset World
    if (setWorld == 3) {
      fill(255, 69, 0, 150);
    }
    //Setting mountain shadow color for level-2: The Midnight World
    else if (setWorld == 2) {
      fill(150);
    }
    //Setting mountain shadow color for level-3: The Pink World
    else if (setWorld == 1) {
      fill(0, 206, 209, 150);
    }

    //Drawing mountain shadow
    triangle(
      mountain_top[p].x_pos,
      mountain_top[p].y_pos,
      mountain_top[p].x_pos1,
      mountain_top[p].y_pos1,
      mountain_top[p].x_pos2,
      mountain_top[p].y_pos2
    );
  }
}

//* Function for drawing the river of the sunset world *//
function sun_set_river(g_river) {
  //Drawing river's water
  fill(150, 0, 0, 200);
  rect(g_river.x_pos, g_river.y_pos, g_river.width, height - ground_y);
  //Drawing river's border
  fill(0, 200);
  rect(g_river.x_pos - 10, ground_y, 10, height - ground_y);
  fill(0, 200);
  rect(g_river.x_pos + g_river.width, ground_y, 10, height - ground_y);
}

//* Function for drawing the river of the midnight world *//
function mid_night_river(g_river) {
  //Drawing midnight colored background same as sky.
  fill(25, 25, 112);
  rect(g_river.x_pos, ground_y, g_river.width, height - ground_y);
  //Drawing river's water
  fill(0, 128, 128);
  rect(g_river.x_pos, g_river.y_pos + 30, g_river.width, height - ground_y);
  //Water tides and ebbs
  g_river.y_pos -= sin(angle) * 0.5;
  angle -= 0.002;
}

//* Function for drawing the river of the pink world *//
function pink_river(g_river) {
  //Drawing pink background like sky
  fill(238, 130, 238);
  rect(g_river.x_pos, ground_y, g_river.width, height - ground_y);
  //Drawing river's water
  fill(255, 0, 255);
  rect(g_river.x_pos, g_river.y_pos + 80, g_river.width, height - ground_y);
  //Water tides and ebbs
  g_river.y_pos += sin(angle) * 0.5;
  angle -= 0.001;
}

//* Function for interaction with river in all worlds *//
function checkRiver(g_river) {
  if (
    myCharacter_X > g_river.x_pos &&
    myCharacter_X < g_river.x_pos + g_river.width &&
    myCharacter_Y >= ground_y
  ) {
    jumping = true;
  }
}

//* Function for drawing chocolates as collectable items *//
function drawChocolate(g_chocolate) {
  //State before chocolates are collected
  if (!g_chocolate.found) {
    //chocolate body
    fill(255, 20, 147);
    rect(
      g_chocolate.x_pos,
      g_chocolate.y_pos - 30,
      g_chocolate.size - 10,
      g_chocolate.size - 30
    );
    //Stripes on chocolate body
    fill(128, 0, 128);
    rect(g_chocolate.x_pos + 5, g_chocolate.y_pos - 30, 5, 20);
    rect(g_chocolate.x_pos + 15, g_chocolate.y_pos - 30, 5, 20);
    rect(g_chocolate.x_pos + 25, g_chocolate.y_pos - 30, 5, 20);
    rect(g_chocolate.x_pos + 35, g_chocolate.y_pos - 30, 5, 20);

    //Left bow of the chocolate
    triangle(
      g_chocolate.x_pos + 3,
      g_chocolate.y_pos - 20,
      g_chocolate.x_pos - 10,
      g_chocolate.y_pos - 30,
      g_chocolate.x_pos - 10,
      g_chocolate.y_pos - 10
    );
    //Right bow of the chocolate
    triangle(
      g_chocolate.x_pos + 40,
      g_chocolate.y_pos - 20,
      g_chocolate.x_pos + 50,
      g_chocolate.y_pos - 30,
      g_chocolate.x_pos + 50,
      g_chocolate.y_pos - 10
    );
    // Code for making the chocolates hover
    g_chocolate.y_pos += sin(angle) * 1;
    angle -= 0.005;
  }
}

//* Function for interaction with chocolates *//
function checkChocolate(g_chocolate) {
  //When the game character finds the chocolates
  if (
    dist(
      myCharacter_X,
      myCharacter_Y,
      g_chocolate.x_pos + 25,
      g_chocolate.y_pos
    ) <
    g_chocolate.size - 10
  ) {
    g_chocolate.found = true;
    //Gets point
    game_Point += 1;
    //Storing the point
    score_store = game_Point;
    //Play a sound of getting chocolate
    chocolateSound.play();
  }
}

//* Function for drawing big chocolates as another collectable items *//
function bigChocolate(g_chocolate) {
  //State before big chocolates are collected
  if (!g_chocolate.found) {
    //Unwrapped chocolate part
    fill(80, 0, 0);
    rect(g_chocolate.x_pos, g_chocolate.y_pos - 20, 10, 20);
    rect(g_chocolate.x_pos + 10, g_chocolate.y_pos - 20, 10, 20);
    rect(g_chocolate.x_pos + 20, g_chocolate.y_pos - 20, 10, 20);
    rect(g_chocolate.x_pos + 30, g_chocolate.y_pos - 20, 10, 20);
    //Dark portion of the unwrapped chocolate part
    fill(40, 0, 0);
    rect(g_chocolate.x_pos + 9, g_chocolate.y_pos - 20, 2, 20);
    rect(g_chocolate.x_pos + 19, g_chocolate.y_pos - 20, 2, 20);
    rect(g_chocolate.x_pos + 29, g_chocolate.y_pos - 20, 2, 20);
    //Wrapped chocolate part
    fill(250, 0, 0);
    rect(g_chocolate.x_pos - 1, g_chocolate.y_pos, 42, 40);
    fill(255);
    ellipse(g_chocolate.x_pos + 20, g_chocolate.y_pos + 22, 35, 20);
    //Chocolate name
    fill(255, 0, 0);
    textFont(font2);
    textSize(13);
    text("KitKat", g_chocolate.x_pos, g_chocolate.y_pos + 25);
    // Code for making the big chocolates hover
    g_chocolate.y_pos += sin(angle) * 1;
    angle -= 0.005;
  }
}

//* Function for interaction with big chocolates *//
function checkBigChocolate(g_chocolate) {
  //When the game character finds the big chocolate
  if (
    dist(
      myCharacter_X,
      myCharacter_Y - 50,
      g_chocolate.x_pos + 35,
      g_chocolate.y_pos
    ) < g_chocolate.size
  ) {
    g_chocolate.found = true;
    //Gets point
    game_Point += 10;
    //Storing the point
    score_store = game_Point;
    //Play a sound of getting big chocolate
    bigChocolateSound.play();
  }
}

//* Function for drawing an extra life *//
function extraLife(life) {
  //State before extra life is collected
  if (!life.isFound) {
    //Drawing life box
    fill(34, 139, 34);
    rect(life.x, life.y, life.size, life.size, 10);
    //Drawing medical plus sign on the life box
    fill(255);
    rect(life.x + 10, life.y + 20, life.size - 20, life.size - 40);
    rect(life.x + 20, life.y + 10, life.size - 40, life.size - 20);

    //Code for making the extra life hover
    life.y += sin(angle) * 1;
    angle -= 0.005;
  }
}

//* Function for interaction with extra life *//
function checkExtraLife(life) {
  //When the game character finds the extra life
  if (
    dist(myCharacter_X, myCharacter_Y - 50, life.x + 25, life.y + 25) <
    life.size
  ) {
    life.isFound = true;
    //Gets a life
    lives += 1;
    //Play a sound of getting an extra life
    getLifeSound.play();
  }
}

//* Function for drawing a flag at the endpoint *//
function drawVictoryFlag() {
  push();
  //Drawing the flag pole
  strokeWeight(5);
  stroke(180);
  line(victoryFlag.x_pos, ground_y, victoryFlag.x_pos, ground_y - 250);
  noStroke();
  fill(255, 0, 0);
  //When the game character reaches the flag pole, the flag goes up
  if (victoryFlag.reached) {
    rect(victoryFlag.x_pos, ground_y - 250, 50, 40);
  }
  //Flag-down state before the game character reaches the flag pole
  else {
    rect(victoryFlag.x_pos, ground_y - 40, 50, 40);
  }
  pop();
}

//* Function for interaction with the flag*//
function checkVictoryFlag() {
  //Mapping distance between the flag pole and the game character
  var d = abs(myCharacter_X - victoryFlag.x_pos);

  //When the game character reaches the flag pole
  if (d < 15) {
    victoryFlag.reached = true;
    //Play a sound of ending the level
    endLevelSound.play();
  }
}

//* Function for drawing a captive bear at the endpoint of the level-3 *//
function rescueBear() {
  push();

  //When the game character reaches the captive bear
  if (victoryFlag.reached) {
    //When the main playing game character is 1: Bubu
    if (setCharacter == 1) {
      //Captive bear, character 2: Dudu, gets free
      brownFree();
    }
    //When the main playing game character is 2: Dudu
    else if (setCharacter == 2) {
      //Captive bear, character 1: Bubu, gets free
      pinkFree();
    }
  }

  //Until the main game character reaches the end
  else {
    //When the main playing game character is 1: Bubu
    if (setCharacter == 1) {
      //Captive bear is game character-2: Dudu
      brownSad();
    }
    //When the main playing game character is 2: Dudu
    else if (setCharacter == 2) {
      //Captive bear is game character-1: Bubu
      pinkSad();
    }
  }
  pop();
}

//* Function for interaction with the captive bear *//
function checkRescueBear() {
  //Mapping distance between the captive bear and the game character
  var a = abs(myCharacter_X - victoryFlag.x_pos);

  //When the game character reaches the captive bear
  if (a < 30) {
    victoryFlag.reached = true;
    //Play a win sound of rescuing the bear
    winSound.play();
  }
}

//*Using factory pattern to draw and interact with many platforms//
//* Function for drawing platforms *//
function drawPlatform(x, y, length, range) {
  var p = {
    x: x,
    y: y,
    length: length,
    range: range,

    currentX: x,
    inc: 0.5,

    //Updating the position of platforms
    update: function () {
      this.currentX += this.inc;
      if (this.currentX >= this.x + this.range) {
        this.inc = -0.5;
      } else if (this.currentX < this.x) {
        this.inc = 0.5;
      }
    },
    //Drawing the platforms
    draw: function () {
      this.update();
      fill(0);
      rect(this.currentX, this.y, this.length, 10);
    },
    //Interaction with platforms
    checkContact: function (gc_x, gc_y) {
      if (gc_x > this.currentX && gc_x < this.currentX + this.length + 10) {
        var d = this.y - gc_y;
        if (d >= 0 && d < 5) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}

//*Using constructor to draw and interact with many enemies//
//* Function for drawing enemies *//
function Enemies(x, y, range) {
  this.x = x;
  this.y = y;
  this.range = range;

  this.currentX = x;
  this.inc = 1;

  //Updating enemy position
  this.update = function () {
    this.currentX += this.inc;
    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  };
  //Drawing the enemy
  this.draw = function () {
    this.update();

    noStroke();
    //Enemy border circle
    fill(255, 50);
    ellipse(this.currentX, this.y - 35, 100);
    //Face
    fill(51, 0, 51);
    ellipse(this.currentX, this.y - 65, 20);
    //Body
    fill(51, 0, 51);
    rect(this.currentX - 10, this.y - 55, 20, 35);
    fill(0);
    //Legs
    ellipse(this.currentX - 5, this.y - 9, 7, 23);
    ellipse(this.currentX + 5, this.y - 9, 7, 23);
    //Hands
    ellipse(this.currentX - 12, this.y - 43, 7, 25);
    ellipse(this.currentX + 12, this.y - 43, 7, 25);
    //Eyes
    fill(255, 0, 0);
    ellipse(this.currentX - 3, this.y - 67, 3);
    ellipse(this.currentX + 3, this.y - 67, 3);

    noFill();
  };
  //Interaction with enemy
  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y, this.currentX, this.y);
    if (d < 50) {
      return true;
    }
  };
}

//* Function for drawing house *//
function drawHouse() {
  //House color for level-1: The Sunset World
  if (setWorld == 3) {
    fill(0, 102, 102);
  }
  //House color for level-2: The Midnight World
  else if (setWorld == 2) {
    fill(106, 90, 205);
  }
  //Main structure of the house
  rect(house.x, house.y, 150, 100);

  //Window of the house
  stroke(0);
  fill(200, 200, 0);
  rect(house.x + 30, house.y + 30, 30, 50);
  line(house.x + 45, house.y + 30, house.x + 45, house.y + 80);
  line(house.x + 30, house.y + 55, house.x + 60, house.y + 55);
  //Door of the house
  fill(200, 100, 0);
  rect(house.x + 90, house.y + 20, 30, 80);
  noStroke();
  //Roof of the house
  fill(102, 0, 51);
  triangle(
    house.x - 50,
    house.y,
    house.x + 200,
    house.y,
    house.x + 80,
    house.y - 80
  );

  fill(240, 255, 255);
  textFont(font2);
  textSize(40);
  //House nameplate of level-1: The Sunset World
  if (setWorld == 3) {
    text("Dudu Bubu House", house.x - 35, house.y);
  }
  //House nameplate of level-2: The Midnight World
  else if (setWorld == 2) {
    text("Friend's House", house.x - 20, house.y);
  }
}

//* Function for drawing a haunted house *//
function haunted_house() {
  //Main structural part of chimney
  fill(139, 0, 0);
  rect(house.x + 10, house.y - 120, 50, 90);
  //Crown of chimney
  fill(47, 79, 79);
  triangle(
    house.x - 30,
    house.y - 120,
    house.x + 100,
    house.y - 120,
    house.x + 30,
    house.y - 170
  );
  //Main structure of the haunted house
  fill(139, 0, 0);
  rect(house.x, house.y, 150, 100);
  //Window of the haunted house
  stroke(0);
  fill(255, 69, 0);
  rect(house.x + 30, house.y + 30, 30, 50);
  line(house.x + 45, house.y + 30, house.x + 45, house.y + 80);
  line(house.x + 30, house.y + 55, house.x + 60, house.y + 55);
  //Door of the haunted house
  fill(0);
  rect(house.x + 90, house.y + 20, 30, 80);
  noStroke();
  //Roof of the haunted house
  fill(47, 79, 79);
  triangle(
    house.x - 50,
    house.y,
    house.x + 200,
    house.y,
    house.x + 80,
    house.y - 80
  );
  //Nameplate of the haunted house
  fill(0);
  textSize(30);
  textFont(font1);
  text("Haunted house", house.x - 30, house.y);

  //*Haunted pumpkin besides the haunted house
  //Pumpkin stem
  fill(0);
  rect(house.x - 53, house.y + 50, 8, 20);
  //Pumpkin flesh
  fill(230, 69, 0);
  ellipse(house.x - 50, house.y + 85, 20, 40);
  ellipse(house.x - 60, house.y + 85, 20, 40);
  ellipse(house.x - 40, house.y + 85, 20, 40);
  //Pumpkin's eyes
  fill(0);
  triangle(
    house.x - 50,
    house.y + 85,
    house.x - 60,
    house.y + 85,
    house.x - 55,
    house.y + 75
  );
  triangle(
    house.x - 40,
    house.y + 85,
    house.x - 50,
    house.y + 85,
    house.x - 45,
    house.y + 75
  );
  //Pumpkin's mouth
  ellipse(house.x - 50, house.y + 95, 20, 10);
}

//* Function for drawing an indicator to go to the right *//
function drawWay() {
  //Drawing the indicator
  stroke(3);
  fill(204, 102, 0);
  beginShape();
  vertex(-600, 300);
  vertex(-600, 340);
  vertex(-500, 340);
  vertex(-460, 320);
  vertex(-500, 300);
  endShape();
  rect(-580, 340, 20, 92);
  //Text of the indicator
  fill(0);
  textSize(35);
  textFont(font2);
  text("This  way", -580, 328);
  noStroke();
}

//* Function for drawing a checkpoint that indicates halfway point of the level*//
function poleBar() {
  //Black pole
  fill(0);
  rect(pole_bar.x, pole_bar.y - 80, 10, 80);
  //White stripes
  fill(255);
  rect(pole_bar.x, pole_bar.y - 60, 10, 10);
  rect(pole_bar.x, pole_bar.y - 40, 10, 10);
  rect(pole_bar.x, pole_bar.y - 20, 10, 10);
}

//* Function for drawing the time*//
function timeCounter() {
  fill(255, 250, 240);
  textSize(30);
  textFont(font3);
  text(
    "Time: " + round(timer.timeMinute) + " : " + round(timer.timeSecond),
    800,
    70
  );
}

//* Function for drawing scores and lives count text *//
function liveScoreText() {
  //Text of score
  fill(255, 69, 0);
  textSize(30);
  textFont(font1);
  text("Score: ", liveScore.x, liveScore.y);
  text("X " + game_Point, liveScore.x + 160, liveScore.y + 5);

  //Text of lives count
  text("Lives: ", liveScore.x, liveScore.y + 30);

  //*Drawing chocolate as score
  //Chocolate body
  fill(255, 20, 147);
  rect(
    chocolate.x_pos,
    chocolate.y_pos - 30,
    chocolate.size - 10,
    chocolate.size - 30
  );
  //Chocolate body stripes
  fill(128, 0, 128);
  rect(chocolate.x_pos + 5, chocolate.y_pos - 30, 5, 20);
  rect(chocolate.x_pos + 15, chocolate.y_pos - 30, 5, 20);
  rect(chocolate.x_pos + 25, chocolate.y_pos - 30, 5, 20);
  rect(chocolate.x_pos + 35, chocolate.y_pos - 30, 5, 20);

  //Left bow of the chocolate
  triangle(
    chocolate.x_pos + 3,
    chocolate.y_pos - 20,
    chocolate.x_pos - 10,
    chocolate.y_pos - 30,
    chocolate.x_pos - 10,
    chocolate.y_pos - 10
  );
  //Right bow of the chocolate
  triangle(
    chocolate.x_pos + 40,
    chocolate.y_pos - 20,
    chocolate.x_pos + 50,
    chocolate.y_pos - 30,
    chocolate.x_pos + 50,
    chocolate.y_pos - 10
  );
}

//* Function for drawing game completion text*//
function gameComplete() {
  fill(75, 0, 130);
  stroke(255);
  textSize(60);
  textFont(font1);
  text("GAME COMPLETED", width / 2 - 280, height / 2);

  textSize(40);
  stroke(75, 0, 130);
  fill(255);
  text("Press space to continue", width / 2 - 170, height / 2 + 50);
  noStroke();
}

//* Function for drawing next level text*//
function nextLevel() {
  fill(65, 105, 225);
  textSize(50);
  textFont(font3);
  text("Press 'n' to go to the next level", width / 2 - 300, height / 2 - 100);

  text(
    "Press 'space bar' to back to home page",
    width / 2 - 300,
    height / 2 - 50
  );
}

//* Function for drawing a message at the end *//
function message() {
  //Drawing the message box
  fill(255, 150);
  rect(messages.x - 20, messages.y - 20, 210, 50, 50);
  //Texts in the box
  fill(0);
  textSize(30);
  textFont(font2);
  //Text in level-1: The Sunset World
  if (setWorld == 3) {
    text("I am home, Bear.", messages.x, messages.y);
    text("But where is my bear?", messages.x, messages.y + 20);
  }
  //Text in level-2: The Midnight World
  else if (setWorld == 2) {
    text("Bear isn't here also.", messages.x, messages.y);
    text("Where to find my bear?", messages.x, messages.y + 20);
  }
  //Text in level-3: The Pink World
  else if (setWorld == 1) {
    text("Here is my bear.", messages.x, messages.y);
    text("Finally I found you", messages.x, messages.y + 20);
  }
}

//* Function for drawing game over text*//
function gameOver() {
  fill(255, 255, 0);
  textSize(60);
  textFont(font2);
  text("GAME  OVER", width / 2 - 170, height / 2);

  textSize(40);
  text("Press space to continue", width / 2 - 90, height / 2 + 50);
  //Playing a game over sound
  if (!soundPlayed) {
    game_overSound.play();
    soundPlayed = true;
  }
}

//* Function for drawing the game character-1 *//
function pinkCharacter() {
  //* JUMPING-LEFT CODE
  if (left_side && falling) {
    noStroke();
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X - 5, myCharacter_Y - 45, 25, 20);
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.bubuDimple));
    ellipse(myCharacter_X - 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X + 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X - 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X - 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X + 15, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.bubuFace);
    rect(myCharacter_X - 13, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X - 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X + 5, myCharacter_Y - 40, 15, 25);
    noStroke();
    ellipse(myCharacter_X + 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  //* JUMPING-RIGHT CODE
  else if (right_side && falling) {
    noStroke();
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X + 5, myCharacter_Y - 45, 25, 20);
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.bubuDimple));
    ellipse(myCharacter_X + 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X + 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 13, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.bubuFace);
    rect(myCharacter_X - 12, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X + 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 5, myCharacter_Y - 40, 15, 25);
    noStroke();
    ellipse(myCharacter_X - 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  //* WALKING LEFT CODE
  else if (left_side) {
    noStroke();
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X - 5, myCharacter_Y - 45, 25, 20);
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.bubuDimple));
    ellipse(myCharacter_X - 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X + 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X - 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X - 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X + 15, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.bubuFace);
    rect(myCharacter_X - 13, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X - 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X + 5, myCharacter_Y - 20, 10, 15);
    noStroke();
    ellipse(myCharacter_X + 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  //* WALKING RIGHT CODE
  else if (right_side) {
    noStroke();
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X + 5, myCharacter_Y - 45, 25, 20);
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.bubuDimple));
    ellipse(myCharacter_X + 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X + 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 13, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.bubuFace);
    rect(myCharacter_X - 12, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X + 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X + 5, myCharacter_Y - 20, 10, 15);
    noStroke();
    ellipse(myCharacter_X + 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  //* JUMPING FACING FORWARDS
  else if (falling || jumping) {
    noStroke();

    //Ears
    fill(0);
    ellipse(myCharacter_X - 20, myCharacter_Y - 65, 20);
    ellipse(myCharacter_X + 20, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 40);
    ellipse(myCharacter_X, myCharacter_Y - 45, 40, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.bubuDimple));
    ellipse(myCharacter_X - 10, myCharacter_Y - 48, 8);
    ellipse(myCharacter_X + 10, myCharacter_Y - 48, 8);
    //Lip
    stroke(1);
    fill(0);
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X - 3,
      myCharacter_Y - 50
    );
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X + 3,
      myCharacter_Y - 50
    );

    //Legs
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 10, myCharacter_Y - 5, 13, 15);
    ellipse(myCharacter_X + 10, myCharacter_Y - 5, 13, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 10, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 10, myCharacter_Y + 1, 10, 3);
    noStroke();

    //Body
    fill(selectCharacter.bubuFace);
    rect(myCharacter_X - 15, myCharacter_Y - 34, 30, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X, myCharacter_Y - 35, 30, 5);
    rect(myCharacter_X, myCharacter_Y - 35, 5, 8, 3);
    rect(myCharacter_X - 5, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 15, myCharacter_Y - 35, 10, 25);
    ellipse(myCharacter_X + 15, myCharacter_Y - 35, 10, 25);
    noFill();
  }
  //* STANDING FACING FORWARD
  else {
    noStroke();
    //Ears
    fill(0);
    ellipse(myCharacter_X - 20, myCharacter_Y - 65, 20);
    ellipse(myCharacter_X + 20, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 40);
    ellipse(myCharacter_X, myCharacter_Y - 45, 40, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.bubuDimple));
    ellipse(myCharacter_X - 10, myCharacter_Y - 48, 8);
    ellipse(myCharacter_X + 10, myCharacter_Y - 48, 8);
    //Lip
    stroke(1);
    fill(0);
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X - 3,
      myCharacter_Y - 50
    );
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X + 3,
      myCharacter_Y - 50
    );

    //Legs
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 6, myCharacter_Y - 5, 13, 15);
    ellipse(myCharacter_X + 6, myCharacter_Y - 5, 13, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 6, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 6, myCharacter_Y + 1, 10, 3);
    noStroke();

    //Body
    fill(selectCharacter.bubuFace);
    rect(myCharacter_X - 15, myCharacter_Y - 34, 30, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X, myCharacter_Y - 35, 30, 5);
    rect(myCharacter_X, myCharacter_Y - 35, 5, 8, 3);
    rect(myCharacter_X - 5, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.bubuFace);
    ellipse(myCharacter_X - 15, myCharacter_Y - 25, 10, 18);
    ellipse(myCharacter_X + 15, myCharacter_Y - 25, 10, 18);
    noFill();
  }
}

//* Function for drawing the game character-2 *//
function brownCharacter() {
  //* JUMPING-LEFT CODE
  if (left_side && falling) {
    noStroke();
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X - 5, myCharacter_Y - 45, 25, 20);
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.duduDimple));
    ellipse(myCharacter_X - 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X + 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X - 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X - 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X + 15, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.duduFace);
    rect(myCharacter_X - 13, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X - 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X + 5, myCharacter_Y - 40, 15, 25);
    noStroke();
    ellipse(myCharacter_X + 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  //* JUMPING-RIGHT CODE
  else if (right_side && falling) {
    noStroke();
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X + 5, myCharacter_Y - 45, 25, 20);
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.duduDimple));
    ellipse(myCharacter_X + 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X + 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 13, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.duduFace);
    rect(myCharacter_X - 12, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X + 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 5, myCharacter_Y - 40, 15, 25);
    noStroke();
    ellipse(myCharacter_X - 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  // WALKING LEFT CODE
  else if (left_side) {
    noStroke();
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X - 5, myCharacter_Y - 45, 25, 20);
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.duduDimple));
    ellipse(myCharacter_X - 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X + 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X - 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X - 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X + 15, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.duduFace);
    rect(myCharacter_X - 13, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X - 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X + 5, myCharacter_Y - 20, 10, 15);
    noStroke();
    ellipse(myCharacter_X + 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  //* WALKING RIGHT CODE
  else if (right_side) {
    noStroke();
    //Left ear
    fill(0);
    ellipse(myCharacter_X + 10, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 35, 40);
    ellipse(myCharacter_X + 5, myCharacter_Y - 45, 25, 20);
    //Right ear
    fill(0);
    ellipse(myCharacter_X - 15, myCharacter_Y - 65, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.duduDimple));
    ellipse(myCharacter_X + 3, myCharacter_Y - 45, 8);

    //Legs
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 3, myCharacter_Y - 5, 10, 15);
    ellipse(myCharacter_X + 10, myCharacter_Y - 8, 10, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 3, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 12, myCharacter_Y - 1, 10, 3);
    //Tail
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 13, myCharacter_Y - 15, 7, 5);
    noStroke();

    //Body
    fill(selectCharacter.duduFace);
    rect(myCharacter_X - 12, myCharacter_Y - 34, 28, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X + 3, myCharacter_Y - 35, 23, 5);
    rect(myCharacter_X + 12, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X + 5, myCharacter_Y - 20, 10, 15);
    noStroke();
    ellipse(myCharacter_X + 5, myCharacter_Y - 25, 10, 10);
    noFill();
  }
  //* JUMPING FACING FORWARDS
  else if (falling || jumping) {
    noStroke();

    //Ears
    fill(0);
    ellipse(myCharacter_X - 20, myCharacter_Y - 65, 20);
    ellipse(myCharacter_X + 20, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 40);
    ellipse(myCharacter_X, myCharacter_Y - 45, 40, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.duduDimple));
    ellipse(myCharacter_X - 10, myCharacter_Y - 48, 8);
    ellipse(myCharacter_X + 10, myCharacter_Y - 48, 8);
    //Lip
    stroke(1);
    fill(0);
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X - 3,
      myCharacter_Y - 50
    );
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X + 3,
      myCharacter_Y - 50
    );

    //Legs
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 10, myCharacter_Y - 5, 13, 15);
    ellipse(myCharacter_X + 10, myCharacter_Y - 5, 13, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 10, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 10, myCharacter_Y + 1, 10, 3);
    noStroke();

    //Body
    fill(selectCharacter.duduFace);
    rect(myCharacter_X - 15, myCharacter_Y - 34, 30, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X, myCharacter_Y - 35, 30, 5);
    rect(myCharacter_X, myCharacter_Y - 35, 5, 8, 3);
    rect(myCharacter_X - 5, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 15, myCharacter_Y - 35, 10, 25);
    ellipse(myCharacter_X + 15, myCharacter_Y - 35, 10, 25);
    noFill();
  }
  //* STANDING FACING FORWARD
  else {
    noStroke();
    //Ears
    fill(0);
    ellipse(myCharacter_X - 20, myCharacter_Y - 65, 20);
    ellipse(myCharacter_X + 20, myCharacter_Y - 65, 20);
    //Face
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X, myCharacter_Y - 55, 40);
    ellipse(myCharacter_X, myCharacter_Y - 45, 40, 20);
    //Eyes
    fill(0);
    ellipse(myCharacter_X - 7, myCharacter_Y - 55, 5);
    ellipse(myCharacter_X + 7, myCharacter_Y - 55, 5);
    //Dimple
    fill(color(selectCharacter.duduDimple));
    ellipse(myCharacter_X - 10, myCharacter_Y - 48, 8);
    ellipse(myCharacter_X + 10, myCharacter_Y - 48, 8);
    //Lip
    stroke(1);
    fill(0);
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X - 3,
      myCharacter_Y - 50
    );
    line(
      myCharacter_X,
      myCharacter_Y - 47,
      myCharacter_X + 3,
      myCharacter_Y - 50
    );

    //Legs
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 6, myCharacter_Y - 5, 13, 15);
    ellipse(myCharacter_X + 6, myCharacter_Y - 5, 13, 15);
    //Shoes
    fill(0);
    ellipse(myCharacter_X - 6, myCharacter_Y + 1, 10, 3);
    ellipse(myCharacter_X + 6, myCharacter_Y + 1, 10, 3);
    noStroke();

    //Body
    fill(selectCharacter.duduFace);
    rect(myCharacter_X - 15, myCharacter_Y - 34, 30, 25, 10);
    //Collar
    fill(0);
    ellipse(myCharacter_X, myCharacter_Y - 35, 30, 5);
    rect(myCharacter_X, myCharacter_Y - 35, 5, 8, 3);
    rect(myCharacter_X - 5, myCharacter_Y - 35, 5, 8, 3);
    //Hands
    stroke(0);
    fill(selectCharacter.duduFace);
    ellipse(myCharacter_X - 15, myCharacter_Y - 25, 10, 18);
    ellipse(myCharacter_X + 15, myCharacter_Y - 25, 10, 18);
    noFill();
  }
}

//* Function for drawing the game character-1 at the 'Character selection page' *//
function pinkHappy() {
  //When mouse is inside the frame, it changes color
  if (
    mouseX > selectCharacter.bubuX - 150 &&
    mouseX < selectCharacter.bubuX + 150 &&
    mouseY > selectCharacter.bubuY - 130 &&
    mouseY < selectCharacter.bubuY + 220 &&
    setWorld == 5
  ) {
    fill(100, 149, 237, 150);
  } else {
    fill(255, 100);
  }
  //Drawing frame for character-1
  rect(selectCharacter.bubuX - 150, selectCharacter.bubuY - 130, 300, 350);

  //Text of character's name
  textFont(font1);
  textSize(50);
  fill(148, 0, 211);
  text("BUBU", selectCharacter.bubuX - 80, selectCharacter.bubuY + 200);
  noStroke();
  //*Drawing the face of character-1: Bubu
  //Ears
  fill(0);
  ellipse(selectCharacter.bubuX - 100, selectCharacter.bubuY - 65, 60);
  ellipse(selectCharacter.bubuX + 100, selectCharacter.bubuY - 65, 60);
  //Face
  fill(selectCharacter.bubuFace);
  ellipse(selectCharacter.bubuX, selectCharacter.bubuY, 200);
  ellipse(selectCharacter.bubuX, selectCharacter.bubuY + 50, 200, 100);
  //Eyes
  fill(0);
  ellipse(selectCharacter.bubuX - 27, selectCharacter.bubuY, 20);
  ellipse(selectCharacter.bubuX + 27, selectCharacter.bubuY, 20);
  //Dimple
  fill(selectCharacter.bubuDimple);
  ellipse(selectCharacter.bubuX - 60, selectCharacter.bubuY + 50, 30);
  ellipse(selectCharacter.bubuX + 60, selectCharacter.bubuY + 50, 30);
  //Lip
  stroke(1);
  fill(0);
  line(
    selectCharacter.bubuX + 20,
    selectCharacter.bubuY + 30,
    selectCharacter.bubuX,
    selectCharacter.bubuY + 50
  );
  line(
    selectCharacter.bubuX - 20,
    selectCharacter.bubuY + 30,
    selectCharacter.bubuX,
    selectCharacter.bubuY + 50
  );
}

//* Function for drawing the game character-2 at the 'Character selection page' *//
function brownHappy() {
  //When mouse is inside the frame, it changes color
  if (
    mouseX > selectCharacter.duduX - 150 &&
    mouseX < selectCharacter.duduX + 150 &&
    mouseY > selectCharacter.duduY - 130 &&
    mouseY < selectCharacter.duduY + 220 &&
    setWorld == 5
  ) {
    fill(100, 149, 237, 150);
  } else {
    fill(255, 100);
  }
  //Drawing frame for character-2
  rect(selectCharacter.duduX - 150, selectCharacter.duduY - 130, 300, 350);

  //Text of character's name
  textFont(font1);
  textSize(50);
  fill(148, 0, 211);
  text("DUDU", selectCharacter.duduX - 80, selectCharacter.duduY + 200);
  noStroke();

  //*Drawing the face of character-2: Dubu
  //Ears
  fill(0);
  ellipse(selectCharacter.duduX - 100, selectCharacter.duduY - 65, 60);
  ellipse(selectCharacter.duduX + 100, selectCharacter.duduY - 65, 60);
  //Face
  fill(selectCharacter.duduFace);
  ellipse(selectCharacter.duduX, selectCharacter.duduY, 200);
  ellipse(selectCharacter.duduX, selectCharacter.duduY + 50, 200, 100);
  //Eyes
  fill(0);
  ellipse(selectCharacter.duduX - 27, selectCharacter.duduY, 20);
  ellipse(selectCharacter.duduX + 27, selectCharacter.duduY, 20);
  //Dimple
  fill(selectCharacter.duduDimple);
  ellipse(selectCharacter.duduX - 60, selectCharacter.duduY + 50, 30);
  ellipse(selectCharacter.duduX + 60, selectCharacter.duduY + 50, 30);
  //Lip
  stroke(1);
  fill(0);
  line(
    selectCharacter.duduX + 20,
    selectCharacter.duduY + 30,
    selectCharacter.duduX,
    selectCharacter.duduY + 50
  );
  line(
    selectCharacter.duduX - 20,
    selectCharacter.duduY + 30,
    selectCharacter.duduX,
    selectCharacter.duduY + 50
  );
}

//* Function for drawing the game character-1 in captivity*//
function pinkSad() {
  noStroke();
  //Ears
  fill(0);
  ellipse(victoryFlag.x_pos - 20, ground_y - 65, 20);
  ellipse(victoryFlag.x_pos + 20, ground_y - 65, 20);
  //Face
  fill(selectCharacter.bubuFace);
  ellipse(victoryFlag.x_pos, ground_y - 55, 40);
  ellipse(victoryFlag.x_pos, ground_y - 45, 40, 20);
  //Eyes
  fill(0);
  ellipse(victoryFlag.x_pos - 7, ground_y - 55, 5);
  ellipse(victoryFlag.x_pos + 7, ground_y - 55, 5);
  //Dimple
  fill(color(selectCharacter.bubuDimple));
  ellipse(victoryFlag.x_pos - 10, ground_y - 48, 8);
  ellipse(victoryFlag.x_pos + 10, ground_y - 48, 8);
  //Lip
  stroke(1);
  fill(0);
  line(victoryFlag.x_pos, ground_y - 50, victoryFlag.x_pos - 3, ground_y - 47);
  line(victoryFlag.x_pos, ground_y - 50, victoryFlag.x_pos + 3, ground_y - 47);

  //Legs
  fill(selectCharacter.bubuFace);
  ellipse(victoryFlag.x_pos - 6, ground_y - 5, 13, 15);
  ellipse(victoryFlag.x_pos + 6, ground_y - 5, 13, 15);
  //Shoes
  fill(0);
  ellipse(victoryFlag.x_pos - 6, ground_y + 1, 10, 3);
  ellipse(victoryFlag.x_pos + 6, ground_y + 1, 10, 3);
  noStroke();
  //Body
  fill(selectCharacter.bubuFace);
  rect(victoryFlag.x_pos - 15, ground_y - 34, 30, 25, 10);
  //Collar
  fill(0);
  ellipse(victoryFlag.x_pos, ground_y - 35, 30, 5);
  rect(victoryFlag.x_pos, ground_y - 35, 5, 8, 3);
  rect(victoryFlag.x_pos - 5, ground_y - 35, 5, 8, 3);
  //Hands
  stroke(0);
  fill(selectCharacter.bubuFace);
  ellipse(victoryFlag.x_pos - 15, ground_y - 25, 10, 18);
  ellipse(victoryFlag.x_pos + 15, ground_y - 25, 10, 18);
  noFill();

  //Rope to tie up
  stroke(0);
  strokeWeight(3);
  line(
    victoryFlag.x_pos - 20,
    ground_y - 25,
    victoryFlag.x_pos + 15,
    ground_y - 15
  );
  line(
    victoryFlag.x_pos - 15,
    ground_y - 15,
    victoryFlag.x_pos + 20,
    ground_y - 25
  );
  line(
    victoryFlag.x_pos - 20,
    ground_y - 45,
    victoryFlag.x_pos + 20,
    ground_y - 35
  );
  noStroke();
}

//* Function for drawing the game character-2 in captivity *//
function brownSad() {
  noStroke();
  //Ears
  fill(0);
  ellipse(victoryFlag.x_pos - 20, ground_y - 65, 20);
  ellipse(victoryFlag.x_pos + 20, ground_y - 65, 20);
  //Face
  fill(selectCharacter.duduFace);
  ellipse(victoryFlag.x_pos, ground_y - 55, 40);
  ellipse(victoryFlag.x_pos, ground_y - 45, 40, 20);
  //Eyes
  fill(0);
  ellipse(victoryFlag.x_pos - 7, ground_y - 55, 5);
  ellipse(victoryFlag.x_pos + 7, ground_y - 55, 5);
  //Dimple
  fill(selectCharacter.duduDimple);
  ellipse(victoryFlag.x_pos - 10, ground_y - 48, 8);
  ellipse(victoryFlag.x_pos + 10, ground_y - 48, 8);
  //Lip
  stroke(1);
  fill(0);
  line(victoryFlag.x_pos, ground_y - 50, victoryFlag.x_pos - 3, ground_y - 47);
  line(victoryFlag.x_pos, ground_y - 50, victoryFlag.x_pos + 3, ground_y - 47);

  //Legs
  fill(selectCharacter.duduFace);
  ellipse(victoryFlag.x_pos - 6, ground_y - 5, 13, 15);
  ellipse(victoryFlag.x_pos + 6, ground_y - 5, 13, 15);
  //Shoes
  fill(0);
  ellipse(victoryFlag.x_pos - 6, ground_y + 1, 10, 3);
  ellipse(victoryFlag.x_pos + 6, ground_y + 1, 10, 3);
  noStroke();
  //Body
  fill(selectCharacter.duduFace);
  rect(victoryFlag.x_pos - 15, ground_y - 34, 30, 25, 10);
  //Collar
  fill(0);
  ellipse(victoryFlag.x_pos, ground_y - 35, 30, 5);
  rect(victoryFlag.x_pos, ground_y - 35, 5, 8, 3);
  rect(victoryFlag.x_pos - 5, ground_y - 35, 5, 8, 3);
  //Hands
  stroke(0);
  fill(selectCharacter.duduFace);
  ellipse(victoryFlag.x_pos - 15, ground_y - 25, 10, 18);
  ellipse(victoryFlag.x_pos + 15, ground_y - 25, 10, 18);
  noFill();
  //Rope to tie up
  stroke(0);
  strokeWeight(3);
  line(
    victoryFlag.x_pos - 20,
    ground_y - 25,
    victoryFlag.x_pos + 15,
    ground_y - 15
  );
  line(
    victoryFlag.x_pos - 15,
    ground_y - 15,
    victoryFlag.x_pos + 20,
    ground_y - 25
  );
  line(
    victoryFlag.x_pos - 20,
    ground_y - 45,
    victoryFlag.x_pos + 20,
    ground_y - 35
  );
  noStroke();
}

//* Function for drawing the game character-1 after rescue*//
function pinkFree() {
  noStroke();
  //Ears
  fill(0);
  ellipse(victoryFlag.x_pos - 20, ground_y - 65, 20);
  ellipse(victoryFlag.x_pos + 20, ground_y - 65, 20);
  //Face
  fill(selectCharacter.bubuFace);
  ellipse(victoryFlag.x_pos, ground_y - 55, 40);
  ellipse(victoryFlag.x_pos, ground_y - 45, 40, 20);
  //Eyes
  fill(0);
  ellipse(victoryFlag.x_pos - 7, ground_y - 55, 5);
  ellipse(victoryFlag.x_pos + 7, ground_y - 55, 5);
  //Dimple
  fill(color(selectCharacter.bubuDimple));
  ellipse(victoryFlag.x_pos - 10, ground_y - 48, 8);
  ellipse(victoryFlag.x_pos + 10, ground_y - 48, 8);
  //Lip
  stroke(1);
  fill(0);
  line(victoryFlag.x_pos, ground_y - 47, victoryFlag.x_pos - 3, ground_y - 50);
  line(victoryFlag.x_pos, ground_y - 47, victoryFlag.x_pos + 3, ground_y - 50);

  //Legs
  fill(selectCharacter.bubuFace);
  ellipse(victoryFlag.x_pos - 6, ground_y - 5, 13, 15);
  ellipse(victoryFlag.x_pos + 6, ground_y - 5, 13, 15);
  //Shoes
  fill(0);
  ellipse(victoryFlag.x_pos - 6, ground_y + 1, 10, 3);
  ellipse(victoryFlag.x_pos + 6, ground_y + 1, 10, 3);
  noStroke();
  //Body
  fill(selectCharacter.bubuFace);
  rect(victoryFlag.x_pos - 15, ground_y - 34, 30, 25, 10);
  //Collar
  fill(0);
  ellipse(victoryFlag.x_pos, ground_y - 35, 30, 5);
  rect(victoryFlag.x_pos, ground_y - 35, 5, 8, 3);
  rect(victoryFlag.x_pos - 5, ground_y - 35, 5, 8, 3);
  //Hands
  stroke(0);
  fill(selectCharacter.bubuFace);
  ellipse(victoryFlag.x_pos - 15, ground_y - 25, 10, 18);
  ellipse(victoryFlag.x_pos + 15, ground_y - 25, 10, 18);
  noFill();
}

//* Function for drawing the game character-2 after rescue *//
function brownFree() {
  noStroke();
  //Ears
  fill(0);
  ellipse(victoryFlag.x_pos - 20, ground_y - 65, 20);
  ellipse(victoryFlag.x_pos + 20, ground_y - 65, 20);
  //Face
  fill(selectCharacter.duduFace);
  ellipse(victoryFlag.x_pos, ground_y - 55, 40);
  ellipse(victoryFlag.x_pos, ground_y - 45, 40, 20);
  //Eyes
  fill(0);
  ellipse(victoryFlag.x_pos - 7, ground_y - 55, 5);
  ellipse(victoryFlag.x_pos + 7, ground_y - 55, 5);
  //Dimple
  fill(selectCharacter.duduDimple);
  ellipse(victoryFlag.x_pos - 10, ground_y - 48, 8);
  ellipse(victoryFlag.x_pos + 10, ground_y - 48, 8);
  //Lip
  stroke(1);
  fill(0);
  line(victoryFlag.x_pos, ground_y - 47, victoryFlag.x_pos - 3, ground_y - 50);
  line(victoryFlag.x_pos, ground_y - 47, victoryFlag.x_pos + 3, ground_y - 50);

  //Legs
  fill(selectCharacter.duduFace);
  ellipse(victoryFlag.x_pos - 6, ground_y - 5, 13, 15);
  ellipse(victoryFlag.x_pos + 6, ground_y - 5, 13, 15);
  //Shoes
  fill(0);
  ellipse(victoryFlag.x_pos - 6, ground_y + 1, 10, 3);
  ellipse(victoryFlag.x_pos + 6, ground_y + 1, 10, 3);
  noStroke();
  //Body
  fill(selectCharacter.duduFace);
  rect(victoryFlag.x_pos - 15, ground_y - 34, 30, 25, 10);
  //Collar
  fill(0);
  ellipse(victoryFlag.x_pos, ground_y - 35, 30, 5);
  rect(victoryFlag.x_pos, ground_y - 35, 5, 8, 3);
  rect(victoryFlag.x_pos - 5, ground_y - 35, 5, 8, 3);
  //Hands
  stroke(0);
  fill(selectCharacter.duduFace);
  ellipse(victoryFlag.x_pos - 15, ground_y - 25, 10, 18);
  ellipse(victoryFlag.x_pos + 15, ground_y - 25, 10, 18);
  noFill();
}

//*Using constructor function//
//* Function for drawing fire particles *//
function Particle(x, y, xSpeed, ySpeed, size, color) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.color = color;
  this.age = 0;

  //Drawing fire particles
  this.drawParticle = function () {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  };
  //Updating the position of particles
  this.updateParticle = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.age++;
  };
}

//*Using constructor function//
//* Function for emanating fire particles *//
function Emitter(x, y, xSpeed, ySpeed, size, color) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.color = color;

  this.lifetime = 0;
  this.startParticles = 0;

  this.particles = [];

  //Adding more particles
  this.addParticle = function () {
    var p = new Particle(
      random(this.x - 10, this.x + 10),
      random(this.y - 10, this.y + 10),
      random(this.xSpeed - 1, this.xSpeed + 1),
      random(this.ySpeed - 1, this.ySpeed + 1),
      random(this.size - 4, this.size + 4),
      this.color
    );
    return p;
  };
  //Start emitter with initial particle
  this.startEmitter = function (startParticles, lifetime) {
    this.startParticles = startParticles;
    this.lifetime = lifetime;

    for (var p = 0; p < startParticles; p++) {
      this.particles.push(this.addParticle());
    }
  };

  //Iterate through particles and draw to the screen
  this.updateParticles = function () {
    var deadParticles = 0;
    for (var p = this.particles.length - 1; p >= 0; p--) {
      this.particles[p].drawParticle();
      this.particles[p].updateParticle();
      if (this.particles[p].age > random(0, this.lifetime)) {
        this.particles.splice(p, 1);
        deadParticles++;
      }
    }
    //Condition for adding more particles
    if (deadParticles > 0) {
      for (var p = 0; p < deadParticles; p++) {
        this.particles.push(this.addParticle());
      }
    }
  };
}

//* Function for starting the game *//
function startNewGame() {
  //Calling function to start the game again
  startAgain();

  //Object for checkpoint
  pole_bar = {
    x: 3000,
    y: ground_y,
  };
  //the game character's starting position
  myCharacter_X = width / 2;
  //myCharacter_X = 6200;

  //Object in array for extra life
  get_life = [
    {
      x: 4100,
      y: ground_y - 350,
      size: 50,
      isFound: false,
    },
  ];
  //Objects in array for big chocolates
  big_chocolate = [
    {
      x_pos: 710,
      y_pos: 110,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 2250,
      y_pos: 170,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 5250,
      y_pos: 170,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 6350,
      y_pos: 300,
      size: 50,
      isFound: false,
    },
  ];

  //Objects in array for chocolates
  chocolates = [
    {
      x_pos: -150,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 190,
      y_pos: 190,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 200,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 1300,
      y_pos: 160,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 1400,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 900,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 1750,
      y_pos: 180,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 2200,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 2600,
      y_pos: 200,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 3200,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 3500,
      y_pos: 200,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 4100,
      y_pos: 300,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 4800,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 5400,
      y_pos: 300,
      size: 50,
      isFound: false,
    },
    {
      x_pos: 5800,
      y_pos: ground_y,
      size: 50,
      isFound: false,
    },
  ];
}

//* Function for starting the game again after losing a life *//
function startAgain() {
  //Object for checkpoint bar
  pole_bar = {
    x: 3000,
    y: ground_y,
  };
  //Setting floor position
  ground_y = (height * 3) / 4;

  //Starting x-position of the game character
  if (road_track > pole_bar.x && !victoryFlag.reached) {
    myCharacter_X = pole_bar.x;
  } else {
    myCharacter_X = width / 2;
    //myCharacter_X = 6200;
  }

  //Game character's y-position
  myCharacter_Y = ground_y;

  //Setting all movements to false
  left_side = false;
  right_side = false;
  falling = false;
  jumping = false;

  //Setting sound playing to false
  soundPlayed = false;

  //Setting x-position of scrolling
  scroll_position_x = 0;

  //Object for the game timer
  timer = {
    timeMinute: 5,
    timeSecond: 0,
    x: 59,
  };

  //Object for drawing game characters
  selectCharacter = {
    bubuX: 300,
    bubuY: 250,
    bubuFace: 255,
    bubuDimple: color(255, 182, 193),

    duduX: 700,
    duduY: 250,
    duduFace: color(205, 133, 63),
    duduDimple: color(222, 184, 135),
  };

  //Object for 'Back' button
  goBack = {
    x: 300,
    y: 250,
  };

  //Object for instructions
  instruction = {
    x: 900,
    y: 500,
    visible: false,
  };
  //Object for messages
  messages = {
    x: 300,
    y: 120,
  };
  //Object for scores and lives
  liveScore = {
    x: 30,
    y: 30,
  };
  //Object for drawing house
  house = {
    x: 6500,
    y: 332,
  };

  //Object in array for drawing rivers
  river = [
    {
      x_pos: -1500,
      y_pos: ground_y,
      width: 600,
      height: 150,
    },
    {
      x_pos: 0,
      y_pos: ground_y,
      width: 90,
      height: 150,
    },
    {
      x_pos: 550,
      y_pos: ground_y,
      width: 100,
      height: 150,
    },
    {
      x_pos: 1300,
      y_pos: ground_y,
      width: 80,
      height: 150,
    },
    {
      x_pos: 2000,
      y_pos: ground_y,
      width: 120,
      height: 150,
    },
    {
      x_pos: 2800,
      y_pos: ground_y,
      width: 100,
      height: 150,
    },
    {
      x_pos: 3400,
      y_pos: ground_y,
      width: 300,
      height: 150,
    },
    {
      x_pos: 4300,
      y_pos: ground_y,
      width: 150,
      height: 150,
    },
    {
      x_pos: 4900,
      y_pos: ground_y,
      width: 800,
      height: 150,
    },
  ];
  //Object for drawing chocolate
  chocolate = {
    x_pos: liveScore.x + 100,
    y_pos: 45,
    size: 50,
  };
  //Array for tree position
  tree_position_x = [
    -700, -200, 10, 200, 500, 900, 1150, 1500, 1900, 2500, 2700, 3000, 4000,
    4250, 4700, 6000, 6300, 6800,
  ];
  tree_position_y = ground_y;

  //Setting positions of the stars
  for (var p = 0; p < 1000; p++) {
    var star = {
      u: random(-3000, 8000),
      v: random(0, 420),
    };
    stars.push(star);
  }

  //Setting positions of the clouds
  for (var p = 0; p < 100; p++) {
    clouds.push({
      x: random(-1500, 8000),
      y: random(0, ground_y - 150),
      size: random(30, 70),
      bigSize: random(50, 150),
    });
  }
  //Object in array for mountains
  mount_alp = [
    {
      x_pos: 220,
      y_pos: ground_y,
      x_pos1: 520,
      y_pos1: ground_y,
      x_pos2: 370,
      y_pos2: ground_y - 200,
    },
    {
      x_pos: 1070,
      y_pos: ground_y - 200,
      x_pos1: 948,
      y_pos1: ground_y,
      x_pos2: 1192,
      y_pos2: ground_y,
    },
    {
      x_pos: 1770,
      y_pos: ground_y - 200,
      x_pos1: 1548,
      y_pos1: ground_y,
      x_pos2: 1992,
      y_pos2: ground_y,
    },
    {
      x_pos: 2470,
      y_pos: ground_y - 232,
      x_pos1: 2248,
      y_pos1: ground_y,
      x_pos2: 2692,
      y_pos2: ground_y,
    },
    {
      x_pos: 3970,
      y_pos: ground_y - 232,
      x_pos1: 3748,
      y_pos1: ground_y,
      x_pos2: 4192,
      y_pos2: ground_y,
    },
  ];
  //Object in array for mountain's shadow
  mountain_top = [
    {
      x_pos: 220,
      y_pos: ground_y,
      x_pos1: 300,
      y_pos1: ground_y,
      x_pos2: 370,
      y_pos2: ground_y - 200,
    },
    {
      x_pos: 1070,
      y_pos: ground_y - 200,
      x_pos1: 948,
      y_pos1: ground_y,
      x_pos2: 1040,
      y_pos2: ground_y,
    },
    {
      x_pos: 1770,
      y_pos: ground_y - 200,
      x_pos1: 1548,
      y_pos1: ground_y,
      x_pos2: 1730,
      y_pos2: ground_y,
    },
    {
      x_pos: 2470,
      y_pos: ground_y - 232,
      x_pos1: 2248,
      y_pos1: ground_y,
      x_pos2: 2492,
      y_pos2: ground_y,
    },
    {
      x_pos: 3970,
      y_pos: ground_y - 232,
      x_pos1: 3748,
      y_pos1: ground_y,
      x_pos2: 3992,
      y_pos2: ground_y,
    },
  ];

  //Setting position for platforms
  platforms = [];
  platforms.push(drawPlatform(680, 200, 100, 60));
  platforms.push(drawPlatform(1020, 200, 100, 60));
  platforms.push(drawPlatform(900, 250, 100, 30));
  platforms.push(drawPlatform(120, 200, 100, 70));
  platforms.push(drawPlatform(-10, 300, 100, 40));
  platforms.push(drawPlatform(1920, 232, 100, 50));
  platforms.push(drawPlatform(2420, 240, 100, 50));
  platforms.push(drawPlatform(3250, 300, 100, 70));
  platforms.push(drawPlatform(3450, 320, 100, 70));
  platforms.push(drawPlatform(4150, 320, 100, 60));
  platforms.push(drawPlatform(4750, 320, 80, 60));
  platforms.push(drawPlatform(4950, 340, 100, 60));
  platforms.push(drawPlatform(5100, 300, 100, 80));
  platforms.push(drawPlatform(5400, 340, 100, 50));
  platforms.push(drawPlatform(5550, 380, 100, 50));

  //Setting positions for enemies
  enemy = [];
  enemy.push(new Enemies(330, ground_y - 10, random(30, 70)));
  enemy.push(new Enemies(1000, ground_y - 10, random(70, 100)));
  enemy.push(new Enemies(1500, ground_y - 10, random(100, 120)));
  enemy.push(new Enemies(2500, ground_y - 10, random(70, 100)));
  enemy.push(new Enemies(3300, ground_y - 10, random(200, 230)));
  enemy.push(new Enemies(4150, ground_y - 10, random(200, 250)));
  enemy.push(new Enemies(5000, ground_y - 70, random(700, 600)));

  //Setting positions for fire pit
  emit = [];
  emit.push(new Emitter(-1450, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(-1225, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(-1000, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(45, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(600, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(1340, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(2060, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(2850, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(3500, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(3625, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(4375, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(5000, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(5200, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(5400, height - 10, 0, -2, 15, color(250, 150, 0, 50)));
  emit.push(new Emitter(5600, height - 10, 0, -2, 15, color(250, 150, 0, 50)));

  //Setting fire pit's lifetime
  for (var i = 0; i < emit.length; i++) {
    emit[i].startEmitter(200, 300);
  }
  //Object for Victory flag
  victoryFlag = {
    x_pos: 6700,
    reached: false,
  };
}

//* Function for start the game again from the beginning*//
function returnToStart() {
  createCanvas(1024, 576);

  lives = 5;
  game_Point = 0;
  setWorld = 4;
  //Starting the new game
  startNewGame();
}

//* Function for drawing the level-1: The Sunset World *//
function Sun_set_World() {
  //Adding background image
  background(sunsetBackground);

  //Drawing ground
  noStroke();
  fill(30, 0, 0, 250);
  rect(0, ground_y, width, height - ground_y);

  //Code for scrolling
  push();
  const new_scroll_position_x = myCharacter_X - width / 2;
  scroll_position_x = scroll_position_x * 0.95 + new_scroll_position_x * 0.05;

  translate(-scroll_position_x, 0);

  //Scrolling to left side
  if (left_side) {
    scroll_position_x -= 3;
  }
  //Scrolling to right side
  if (right_side) {
    scroll_position_x += 3;
  }

  //Drawing clouds
  draw_clouds();

  //Drawing mountains
  draw_mountain();

  //Drawing house
  drawHouse();

  //Drawing indicator
  drawWay();

  //Drawing trees
  draw_trees();

  //Drawing river
  for (var p = 0; p < river.length; p++) {
    sun_set_river(river[p]);
    //River interaction
    checkRiver(river[p]);
  }

  //Drawing fire pit
  for (var p = 0; p < emit.length; p++) {
    emit[p].updateParticles();
  }

  //Drawing chocolates as collectable items
  for (var p = 0; p < chocolates.length; p++) {
    if (!chocolates[p].found) {
      drawChocolate(chocolates[p]);
      //Interaction with collectable item
      checkChocolate(chocolates[p]);
    }
  }

  //Drawing big chocolates as another collectable items
  for (var p = 0; p < big_chocolate.length; p++) {
    if (!big_chocolate[p].found) {
      bigChocolate(big_chocolate[p]);
      //Interaction with collectable items
      checkBigChocolate(big_chocolate[p]);
    }
  }
  //Drawing extra life
  for (var p = 0; p < get_life.length; p++) {
    if (!get_life[p].isFound) {
      extraLife(get_life[p]);
      //Interaction with extra life
      checkExtraLife(get_life[p]);
    }
  }
  //Drawing platforms
  for (var p = 0; p < platforms.length; p++) {
    platforms[p].draw();
  }
  //Drawing checkpoint
  poleBar();

  //Drawing victory flag
  drawVictoryFlag();

  //Drawing the game character
  if (setCharacter == 1) {
    //If select character-1: Bubu
    pinkCharacter();
  } else if (setCharacter == 2) {
    //If select character-2: Dudu
    brownCharacter();
  }

  //Drawing enemies
  for (var p = 0; p < enemy.length; p++) {
    enemy[p].draw();

    //Interaction with enemies
    var isContact = enemy[p].checkContact(myCharacter_X, myCharacter_Y);
    if (isContact) {
      //Losing a live
      if (lives > 0) {
        lives -= 1;
        //Play a sound
        if (!soundPlayed) {
          enemySound.play();
          soundPlayed = true;
        }
        //Start the level again
        startAgain();
        break;
      }
    }
  }
  pop();

  //Drawing 'Back' button
  backtoHome();

  //Drawing 'Instructions' button
  drawInstruction();

  //Drawing all the instructions
  if (instruction.visible) {
    gameInstruction();
  }

  //Tracking game character's position
  road_track = myCharacter_X;

  //Drawing texts for score and lives
  liveScoreText();

  //Drawing level progress bar
  noFill();
  stroke(0);
  rect(liveScore.x + 250, liveScore.y - 10, 703, 20);
  fill(250, 0, 0, 150);
  if (myCharacter_X >= 0 && myCharacter_X <= 6700) {
    rect(liveScore.x + 250, liveScore.y - 10, myCharacter_X * 0.105, 20);
  }

  //Drawing game timer
  timeCounter();
  //Time count down
  timer.timeSecond -= 1 / 60;
  if (timer.timeSecond < 0) {
    timer.timeMinute -= 1;
    timer.timeSecond = timer.x;
  }
  //When the time runs out, the game is over
  if (timer.timeMinute < 0) {
    timer.timeMinute = 0;
    timer.timeSecond = 0;
    gameOver();
    return;
  }

  //Code for losing a live because of falling into the river
  if (myCharacter_Y > height) {
    if (lives != 0) {
      lives -= 1;
      //Starts the level again
      startAgain();
    }
  }
  //Play a sound when the game character falls into the river
  if (!soundPlayed && myCharacter_Y > height - 140) {
    fireSound.play();
    soundPlayed = true;
  }

  //Drawing lives
  for (var p = 0; p < lives; p++) {
    stroke(5);
    fill(255, 0, 0);
    ellipse(liveScore.x + 110 + p * 30, 55, 20);
  }

  //Game over condition
  if (lives < 1) {
    //Drawing game over text
    gameOver();
    //Setting timer to their starting status
    timer.timeMinute = 5;
    timer.timeSecond = 0;
    return;
  }
  //Game completion condition
  else if (victoryFlag.reached) {
    //Marking the level complete
    if (levelState[0] !== 2) {
      levelState[0] = 2;
    }
    //Unlock the next level
    if (levelState[1] === 0) {
      levelState[1] = 1;
    }
    //Setting timer to their starting status
    timer.timeMinute = 5;
    timer.timeSecond = 0;
    //Drawing text for next level
    nextLevel();
    //Drawing messages
    message();
    return;
  }
  //* Codes for controlling the game character
  //Code for going left
  if (left_side) {
    myCharacter_X -= 5;
  }
  //Code for going right
  else if (right_side) {
    myCharacter_X += 5;
  }

  //Code for jumping
  if (jumping) {
    left_side = false;
    right_side = false;
    myCharacter_Y += 3;
  }
  //Code for falling down
  if (myCharacter_Y < ground_y) {
    //Interaction with platforms
    var isContact = false;
    for (var p = 0; p < platforms.length; p++) {
      if (platforms[p].checkContact(myCharacter_X, myCharacter_Y) == true) {
        isContact = true;
        falling = false;
        //the game character moves with platforms
        myCharacter_X += platforms[p].inc;
        break;
      }
    }
    //Falling down from the platform
    if (isContact == false) {
      myCharacter_Y += 5;
      falling = true;
    }
  } else {
    falling = false;
  }
  //Interaction with victory flag
  if (victoryFlag.reached == false) {
    checkVictoryFlag();
  }
}

//* Function for drawing the level-2: The Midnight World *//
function Mid_night_World() {
  //Drawing the midnight blue sky
  background(25, 25, 112);

  //Drawing ground
  noStroke();
  fill(0, 100, 0);
  rect(0, ground_y, width, height - ground_y);

  //Drawing moon
  fill(255, 200);
  ellipse(220, 100, 60);

  //Code for scrolling
  push();
  const new_scroll_position_x = myCharacter_X - width / 2;
  scroll_position_x = scroll_position_x * 0.95 + new_scroll_position_x * 0.05;

  translate(-scroll_position_x, 0);

  //Scrolling to left side
  if (left_side) {
    scroll_position_x -= 3;
  }
  //Scrolling to right side
  if (right_side) {
    scroll_position_x += 3;
  }

  //Drawing stars
  for (var p = 0; p < 1000; p++) {
    var a = stars[p].u;
    var b = stars[p].v;
    fill(255);
    ellipse(a, b, random(1, 3));
  }

  //Drawing clouds
  draw_clouds();

  //Drawing mountains
  draw_mountain();

  //Drawing house
  drawHouse();

  //Drawing indicator
  drawWay();

  //Drawing trees
  draw_trees();

  //Drawing rivers
  for (var p = 0; p < river.length; p++) {
    mid_night_river(river[p]);
    //Interaction with rivers
    checkRiver(river[p]);
  }

  //Drawing chocolates as collectable items
  for (var p = 0; p < chocolates.length; p++) {
    if (!chocolates[p].found) {
      drawChocolate(chocolates[p]);
      //Interaction with collectable items
      checkChocolate(chocolates[p]);
    }
  }

  //Drawing big chocolates as another collectable items
  for (var p = 0; p < big_chocolate.length; p++) {
    if (!big_chocolate[p].found) {
      bigChocolate(big_chocolate[p]);
      //Interaction with collectable items
      checkBigChocolate(big_chocolate[p]);
    }
  }
  //Drawing extra life
  for (var p = 0; p < get_life.length; p++) {
    if (!get_life[p].isFound) {
      extraLife(get_life[p]);
      //Interaction with extra life
      checkExtraLife(get_life[p]);
    }
  }
  //Drawing platforms
  for (var p = 0; p < platforms.length; p++) {
    platforms[p].draw();
  }
  //Drawing checkpoint
  poleBar();

  //Drawing victory flag
  drawVictoryFlag();

  //Drawing the game character
  if (setCharacter == 1) {
    //If select character-1: Bubu
    pinkCharacter();
  } else if (setCharacter == 2) {
    //If select character-2: Dudu
    brownCharacter();
  }

  //Drawing enemies
  for (var p = 0; p < enemy.length; p++) {
    enemy[p].draw();

    //Interaction with enemies
    var isContact = enemy[p].checkContact(myCharacter_X, myCharacter_Y);
    if (isContact) {
      //Losing a live
      if (lives > 0) {
        lives -= 1;
        //Play a sound
        if (!soundPlayed) {
          enemySound.play();
          soundPlayed = true;
        }
        //Start the level again
        startAgain();
        break;
      }
    }
  }
  pop();

  //Drawing 'Back' button
  backtoHome();

  //Drawing 'Instructions' button
  drawInstruction();

  //Drawing all the instructions
  if (instruction.visible) {
    gameInstruction();
  }

  //Tracking game character's position
  road_track = myCharacter_X;

  //Drawing texts for score and lives
  liveScoreText();

  //Drawing level progress bar
  noFill();
  stroke(0);
  rect(liveScore.x + 250, liveScore.y - 10, 703, 20);
  fill(32, 178, 170, 150);
  if (myCharacter_X >= 0 && myCharacter_X <= 6700) {
    rect(liveScore.x + 250, liveScore.y - 10, myCharacter_X * 0.105, 20);
  }

  //Drawing game timer
  timeCounter();
  //Time count down
  timer.timeSecond -= 1 / 60;
  if (timer.timeSecond < 0) {
    timer.timeMinute -= 1;
    timer.timeSecond = timer.x;
  }
  //When the time runs out, the game is over
  if (timer.timeMinute < 0) {
    timer.timeMinute = 0;
    timer.timeSecond = 0;
    gameOver();
    return;
  }

  //Code for losing a live because of falling into the river
  if (myCharacter_Y > height) {
    if (lives != 0) {
      lives -= 1;
      //Starts the level again
      startAgain();
    }
  }
  //Play a sound when the game character falls into the river
  if (!soundPlayed && myCharacter_Y > height - 140) {
    fallInWaterSound.play();
    soundPlayed = true;
  }

  //Drawing lives
  for (var p = 0; p < lives; p++) {
    stroke(5);
    fill(205, 92, 92);
    ellipse(liveScore.x + 120 + p * 30, 55, 20);
  }

  //Game over condition
  if (lives < 1) {
    //Drawing game over text
    gameOver();
    //Setting timer to their starting status
    timer.timeMinute = 5;
    timer.timeSecond = 0;
    return;
  }
  //Game completion condition
  else if (victoryFlag.reached) {
    //Marking the level complete
    if (levelState[1] !== 2) {
      levelState[1] = 2;
    }
    //Unlock the next level
    if (levelState[2] === 0) {
      levelState[2] = 1;
    }
    //Setting timer to their starting status
    timer.timeMinute = 5;
    timer.timeSecond = 0;
    //Drawing text for next level
    nextLevel();
    //Drawing messages
    message();
    return;
  }
  //* Codes for controlling the game character
  //Code for going left
  if (left_side) {
    myCharacter_X -= 5;
  }
  //Code for going right
  else if (right_side) {
    myCharacter_X += 5;
  }

  //Code for jumping
  if (jumping) {
    left_side = false;
    right_side = false;
    myCharacter_Y += 3;
  }
  //Code for falling down
  if (myCharacter_Y < ground_y) {
    //Interaction with platforms
    var isContact = false;
    for (var p = 0; p < platforms.length; p++) {
      if (platforms[p].checkContact(myCharacter_X, myCharacter_Y) == true) {
        isContact = true;
        falling = false;
        //The game character moves with platforms
        myCharacter_X += platforms[p].inc;
        break;
      }
    }
    //Falling down from the platform
    if (isContact == false) {
      myCharacter_Y += 5;
      falling = true;
    }
  } else {
    falling = false;
  }
  //Interaction with victory flag
  if (victoryFlag.reached == false) {
    checkVictoryFlag();
  }
}

//* Function for drawing the level-3: The Pink World *//
function Pink_World() {
  //Drawing the pink sky
  background(238, 130, 238);

  //Drawing ground
  noStroke();
  fill(153, 50, 204);
  rect(0, ground_y, width, height - ground_y);

  //Drawing the sun
  fill(150, 0, 150, 20);
  ellipse(270, 70, 190);
  fill(205, 0, 205, 50);
  ellipse(270, 70, 120);
  fill(255, 0, 255, 100);
  ellipse(270, 70, 60);

  //Code for scrolling
  push();
  const new_scroll_position_x = myCharacter_X - width / 2;
  scroll_position_x = scroll_position_x * 0.95 + new_scroll_position_x * 0.05;

  translate(-scroll_position_x, 0);

  //Scrolling to left side
  if (left_side) {
    scroll_position_x -= 3;
  }
  //Scrolling to right side
  if (right_side) {
    scroll_position_x += 3;
  }
  //Drawing stars
  for (var p = 0; p < 1000; p++) {
    var a = stars[p].u;
    var b = stars[p].v;
    fill(255);
    ellipse(a, b, random(1, 3));
  }

  //Drawing clouds
  draw_clouds();

  //Drawing mountains
  draw_mountain();

  //Drawing house
  haunted_house();

  //Drawing indicator
  drawWay();

  //Drawing trees
  draw_trees();

  //Drawing rivers
  for (var p = 0; p < river.length; p++) {
    pink_river(river[p]);
    //Interaction with rivers
    checkRiver(river[p]);
  }

  //Drawing chocolates as collectable items
  for (var p = 0; p < chocolates.length; p++) {
    if (!chocolates[p].found) {
      drawChocolate(chocolates[p]);
      //Interaction with collectable items
      checkChocolate(chocolates[p]);
    }
  }

  //Drawing big chocolates as another collectable items
  for (var p = 0; p < big_chocolate.length; p++) {
    if (!big_chocolate[p].found) {
      bigChocolate(big_chocolate[p]);
      //Interaction with collectable items
      checkBigChocolate(big_chocolate[p]);
    }
  }
  //Drawing extra life
  for (var p = 0; p < get_life.length; p++) {
    if (!get_life[p].isFound) {
      extraLife(get_life[p]);
      //Interaction with extra life
      checkExtraLife(get_life[p]);
    }
  }
  //Drawing platforms
  for (var p = 0; p < platforms.length; p++) {
    platforms[p].draw();
  }
  //Drawing checkpoint
  poleBar();

  //Drawing the game character
  if (setCharacter == 1) {
    //If select character-1: Bubu
    pinkCharacter();
  } else if (setCharacter == 2) {
    //If select character-2: Dudu
    brownCharacter();
  }

  //Drawing rescued captive bear
  rescueBear();

  //Drawing enemies
  for (var p = 0; p < enemy.length; p++) {
    enemy[p].draw();

    //Interaction with enemies
    var isContact = enemy[p].checkContact(myCharacter_X, myCharacter_Y);
    if (isContact) {
      //Loosing a live
      if (lives > 0) {
        lives -= 1;
        //Play a sound
        if (!soundPlayed) {
          enemySound.play();
          soundPlayed = true;
        }
        //Start the level again
        startAgain();
        break;
      }
    }
  }
  pop();

  //Drawing 'Back' button
  backtoHome();

  //Drawing 'Instructions' button
  drawInstruction();

  //Drawing all the instructions
  if (instruction.visible) {
    gameInstruction();
  }

  //Tracking game character's position
  road_track = myCharacter_X;

  //Drawing texts for score and lives
  liveScoreText();

  //Drawing level progress bar
  noFill();
  stroke(0);
  rect(liveScore.x + 250, liveScore.y - 10, 703, 20);
  fill(32, 178, 170, 150);
  if (myCharacter_X >= 0 && myCharacter_X <= 6700) {
    rect(liveScore.x + 250, liveScore.y - 10, myCharacter_X * 0.105, 20);
  }

  //Drawing game timer
  timeCounter();
  //Time count down
  timer.timeSecond -= 1 / 60;
  if (timer.timeSecond < 0) {
    timer.timeMinute -= 1;
    timer.timeSecond = timer.x;
  }
  //When the time runs out, the game is over
  if (timer.timeMinute < 0) {
    timer.timeMinute = 0;
    timer.timeSecond = 0;
    gameOver();
    return;
  }

  //Code for losing a live because of falling into the river
  if (myCharacter_Y > height) {
    if (lives != 0) {
      lives -= 1;
      //Stars the level again
      startAgain();
    }
  }
  //Play a sound when the game character falls into the river
  if (!soundPlayed && myCharacter_Y > height - 90) {
    fallInWaterSound.play();
    soundPlayed = true;
  }
  //Drawing lives
  for (var p = 0; p < lives; p++) {
    stroke(5);
    fill(255, 20, 147);
    ellipse(liveScore.x + 110 + p * 30, 55, 20);
  }

  //Game over condition
  if (lives < 1) {
    //Drawing game over text
    gameOver();
    //Setting timer to their starting status
    timer.timeMinute = 5;
    timer.timeSecond = 0;
    return;
  }
  //Game completion condition
  else if (victoryFlag.reached) {
    //Marking the game complete
    if (levelState[2] !== 2) {
      levelState[2] = 2;
    }
    //Setting timer to their starting status
    timer.timeMinute = 5;
    timer.timeSecond = 0;
    //Drawing game completion text
    gameComplete();
    //Drawing messages
    message();

    return;
  }

  //* Codes for controlling the game character
  //Code for going left
  if (left_side) {
    myCharacter_X -= 5;
  }
  //Code for going right
  else if (right_side) {
    myCharacter_X += 5;
  }

  //Code for jumping
  if (jumping) {
    left_side = false;
    right_side = false;
    myCharacter_Y += 3;
  }
  //Code for falling down
  if (myCharacter_Y < ground_y) {
    //Interaction with platforms
    var isContact = false;
    for (var p = 0; p < platforms.length; p++) {
      if (platforms[p].checkContact(myCharacter_X, myCharacter_Y) == true) {
        isContact = true;
        falling = false;
        //the game character moves with platforms
        myCharacter_X += platforms[p].inc;
        break;
      }
    }
    //Falling down from the platform
    if (isContact == false) {
      myCharacter_Y += 5;
      falling = true;
    }
  } else {
    falling = false;
  }
  //Interaction with captive bear
  if (victoryFlag.reached == false) {
    checkRescueBear();
  }
}
