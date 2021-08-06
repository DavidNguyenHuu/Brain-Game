var buttonColors= ["green", "red", "purple","pink","yellow","blue","chocolate","cyan","darkkhaki","gold","grey","magenta","mediumspringgreen","orangered","paleturquoise","yellowgreen"];
var gamePattern=[];
var userClickedPattern=[];

var started=true;
var level = 0;

//To start the game
$(document).keypress(function() {
  if (started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = false;
  }
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 1000);

          $("#level-title").text("GAME OVER!");
              setTimeout(function () {
                $("#level-title").text("Press Any Key to Restart");
              },1000);

              startOver();
    }


}

//This function determines what the next sequence will be for the memory game.
function nextSequence(){
userClickedPattern = [];
$("#high-score").text("High Score :" + level*100);
level++;
$("#level-title").text("Remember the " + level+" previous color(s).");

var randomNumber = Math.floor(Math.random() * 16);
var randomChosenColour = buttonColors[randomNumber];
gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

//If button is clicked, the following function will be activated , this is the handler function
$(".btn").click(function(){
//Store the id of the button that got clicked.
var userChosenColour = $(this).attr("id");

userClickedPattern.push(userChosenColour);

animatePress(userChosenColour);
playSound(userChosenColour);

checkAnswer(userClickedPattern.length-1);
//This can be used to check in the console from Chrome's developer tool to see what has been selected.
//console.log(userClickedPattern);
});

//Function to play sound when button is pressed
function playSound(name) {
  if (name=="wrong"){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }
  else{
  var audio = new Audio("sounds/right.mp3");
  audio.play();
}
}

//Function to animate the button when pressed
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  //to set timeout for button
  setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}

// Function to restart game
function startOver() {

  level = 0;
  gamePattern = [];
  started = true;
}
