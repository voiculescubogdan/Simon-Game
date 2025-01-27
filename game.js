var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var randomNumber = 0;
var userClickedPattern = [];
var k = 0;
var level = 0;

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  var userIndex = userClickedPattern.length - 1

  checkAnswer(userIndex);

  playSound(userChosenColour);
  animatePress(userChosenColour);
})

function nextSequence() {
  randomNumber = Math.round(Math.random() * 3);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);

  $("h1").text("Level " + level);
  level++;

}

function playSound(name) {

  var culoare = new Audio("./sounds/" + name + ".mp3");
  culoare.play();
  
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    }, 100)

}

function checkAnswer(currentLevel) {
  var ultimaUser = userClickedPattern[currentLevel];
  var ultimaGame = gamePattern[currentLevel];

    if(ultimaUser === ultimaGame) {

      if(currentLevel === gamePattern.length - 1) {

      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
  }

}

function startOver() {
  gamePattern = [];
  randomNumber = 0;
  userClickedPattern = [];
  k = 0;
  level = 0;
}

$(document).on("keydown", function() {

  if(k === 0) {
    k = 1;
    nextSequence();

  }

})











