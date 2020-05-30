var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var hints=5;
$(".start-btn").on("click",function(){
  if(level===0){
  nextSequence();
  }
});
$(".end-btn").click(function(){
  if(hints>0)
  {
    var string="";
    for(var i=0;i<gamePattern.length;i++)
    {
      if(gamePattern[i]=="red"){string+="🔴"};
      if(gamePattern[i]=="yellow"){string+="🟡"};
      if(gamePattern[i]=="green"){string+="🟢"};
      if(gamePattern[i]=="blue"){string+="🔵"};
      // string=string+" "+gamePattern[i];
    }
    $(".hint").text(string);
    if(level!==0){hints--;}

    $(".end-btn").text("Hints("+hints+")");
  }
  else{
    $(".end-btn").text("Hints Over");
  }
});

$(".btn").on("click",function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name){
  $("#"+name).addClass("pressed");
  setTimeout(function(){
    $("#"+name).removeClass("pressed")
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
  }
  else {
    var audio= new Audio("sounds/wrong.mp3");
    audio.play();
    startOver();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Start Button to Restart");
    console.log("failure");
  }
  if(currentLevel===level-1){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}
function startOver(){
  level=0;
  gamePattern=[];
}
