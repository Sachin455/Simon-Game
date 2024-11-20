let userClickPattern = []
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence(){
    userClickPattern = []
    level++
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
   
}
function playSound(name){
    
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function() {
    $("#"+currentColour).removeClass('pressed');}, 50);
}
var level = 0
let started = false
$(document).keypress( function(){
    if(!started){
        $("#level-title").text("Level "+ level)
        nextSequence()
        started = true
    }
})

$(".btn").click(function(){
    var userChosenColor=this.id
    userClickPattern.push(userChosenColor)
    animatePress(userChosenColor)
    playSound(userChosenColor)
    checkAnswer(userClickPattern.lastIndexOf(userChosenColor))
})

function checkAnswer(){
    if (JSON.stringify(userClickPattern) === JSON.stringify(gamePattern)){
        console.log("sucess")
        setTimeout(function(){
            nextSequence()
        }, 1000)
    }

    else if (userClickPattern.length+1 > gamePattern.length){
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 1000)
        $("#level-title").text("Game Over, Press Any key to restart")
        started = false
        level = 0
        gamePattern = []
    }

}


