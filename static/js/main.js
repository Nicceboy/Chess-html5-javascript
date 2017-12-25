// $(document).ready(function(){
//     $("#haha").click(function(){
//         $("#ngopt").slideDown("slow");
//     });
// });
function ngameOpt(test) {
    //  document.getElementById("newgame").style.hight = "50px";

    var divs = document.getElementsByClassName("newgame");
    for (var i = 0; i < divs.length; i = i + 1) {
        $(divs[i]).slideUp("slow");
    }

    // $(test).slideDown("slow");

    if ($(test).css("display") === "none") {
        $(test).slideDown("slow");
        var sliders = document.getElementsByClassName('SliderPopUp');
        for (var i = 0; i < sliders.length; i++){ //Close all sliders
        sliders[i].classList.remove("show");
        }

        // x.style.display = "block";
    } else {
        $(test).slideUp("slow");
        var sliders = document.getElementsByClassName('SliderPopUp');//Close volume slider
        for (var i = 0; i < sliders.length; i++){
            sliders[i].classList.remove("show");
        }
    }
}

function addSlider() {

    var slider = document.getElementById("VolumeSlider");
    var output = document.getElementById("VolumeValue");
    var timerslider = document.getElementById("Timer");
    var timeroutput = document.getElementById("TimerLength");
    var increaseslider = document.getElementById("TimerIncrease");
    var increaseoutput = document.getElementById("IncreaseAmount");

    output.innerHTML = slider.value + "%";
    timeroutput.innerHTML = timerslider.value + "min";
   increaseoutput.innerHTML = increaseslider.value + "s";
    // $('input').popup();
    slider.oninput = function () {
        output.innerHTML = this.value + "%";
        document.getElementById('background_audio').volume = this.value / 100; //Adjust background volume

    }
    timerslider.oninput = function () {
        timeroutput.innerHTML = this.value + "min";


    }
    increaseslider.oninput = function () {
        increaseoutput.innerHTML = this.value + "s";


    }

}


function closeNav() {
    if (!$(this).data('clicked')) {
        document.getElementById("mySidenav").style.left = "-200px";
        var sliders = document.getElementsByClassName('SliderPopUp');
        for (var i = 0; i < sliders.length; i++){ //Close all sliders
            sliders[i].classList.remove("show");
        }
        $(this).click(function () {
            $(this).data('clicked', true);
        });
    }
    else {
        document.getElementById("mySidenav").style.left = "0px";
        $(this).click(function () {
            $(this).data('clicked', false);
        });
    }
    // document.getElementById("mySidenav").style.down = "100px";
    //document.getElementById("mySidenav").style.left = "200px";
}

function muteAudio() {
    if (document.getElementById("background_audio").muted == true) {
        document.getElementById("background_audio").muted = false;
    }
    else {
        document.getElementById("background_audio").muted = true;
    }

}


Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}


function stopDefault(e) {
    console.log("hahahahaha");
    e.preventDefault(); //JQuery prevent default

}







var chesstable = new Chessboard(800, 800);



addSlider(); //Functionality of sliders

$("#VolumeValue").click(function () { //Toggling for Volume slider
    document.getElementById('Volume').classList.toggle("show");
})
$("#TimerLength").click(function () { //Toggling for Timer slider
    document.getElementById('TimerSlider').classList.toggle("show");
})
$("#IncreaseAmount").click(function () { //Toggling for Timer increse slider
    document.getElementById('IncreaseSlider').classList.toggle("show");
})
$( function() { //Special tooltiptext show-up. Themed and custom position
    $( document ).tooltip({
        position: {
          my: "left right",
          at: "right+10 center",
        }
      });
  } );

  $( function() { //Change look of default selectmenus with JQuery
    $( "#savegameselect" ).selectmenu()
    .addClass( "overflow" );
 
    $( "#loadgameselect" ).selectmenu()
    .addClass( "overflow" );
 
  } );
