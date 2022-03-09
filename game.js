
var gamePattern = [];
var buttonColours = ["red","blue", "green", "yellow"];

var level = 0;
var started = false;

var userClickedPattern = [];


$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level "+level );
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length -1);

});



function checkAnswer(currentlevel){
  if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){

    console.log("success");

    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
        nextSequence();
      } , 1000);
    }
  }
  else{
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }
}


function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("level "+ level);
  var randomNumber = Math.floor(Math.random()*(3+1));

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  } , 100);

}


function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
