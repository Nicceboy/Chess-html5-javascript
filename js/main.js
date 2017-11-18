



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
    // x.style.display = "block";
  } else {
    $(test).slideUp("slow");
  }
}

function closeNav() {
	if (!$(this).data('clicked')){
  document.getElementById("mySidenav").style.left = "-200px";
  $(this).click(function(){
    $(this).data('clicked', true);
});
	}
	else {
		 document.getElementById("mySidenav").style.left = "0px";
		 $(this).click(function(){
    $(this).data('clicked', false);
});
	}
   // document.getElementById("mySidenav").style.down = "100px";
  //document.getElementById("mySidenav").style.left = "200px";
}

function muteAudio(){
  if (  document.getElementById("background_audio").muted == true){
    document.getElementById("background_audio").muted = false;}
    else {
      document.getElementById("background_audio").muted = true;
    }

  }
  function createBoard() {



    for (var i=0; i< 64; i++){
      //            var idnumber = 1;
      var letters = "abcdefgh";
      square = document.createElement("div");

      square.classList.add('square', 'unselectable');
      square.ondragover = stopDefault;
      // square.ondragover = handleSquareDragOver;
      // square.ondragleave = handleSquareDragLeave;
      test = letters[i % 8] + (8 - parseInt(i/8));
      square.id = test; /*Generating correct id for each square*/
      // dragElement(test);
      document.getElementById("mainChessBoard").appendChild(square)
      .style.backgroundColor = parseInt((i / 8) + i)
      % 2 == 0 ? 'white' : '#ababab';
      number = document.createTextNode(test);
      // square.appendChild(number);
      //            #ababab
    }
    addPieces();
    document.getElementById("mainChessBoard").style.display = 'block';

  }

 
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

  
  function stopDefault(e) {
      console.log("hahahahaha");
    e.preventDefault(); //JQuery prevent default
  }
  function handleSquareDragOver(e) {
    // console.log("hahahahaha");
      e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');
    // e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    // return false;
  }
  function handleSquareDragLeave(e) {
    console.log("hahahahaha");
      e = e || window.event;
    // if (e.preventDefault) {
    //   e.preventDefault(); // Necessary. Allows us to drop.
    // }
    this.classList.remove('over');
    // e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    // return false;
  }
  var dragging = function dragElement(elmnt) {
  // var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // $('body').on('mousedown mousemove', '.' + "piece", stopDefault); //prevet image drag
  // if (document.getElementById(elmnt.id)) {
    // document.write(elmnt);
    /* if present, the header is where you move the DIV from:*/
    elmnt.ondragstart = elementDragStart;
    document.ondrop = closeDragElement;
    // document.ondragenter = handleDragEnter;

    // document.ondragover = handleDragOver;
  // }
  // else {
  //   /* otherwise, move the DIV from anywhere inside the DIV:*/
  //   elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;


  }


  function elementDragStart(e) {
    e = e || window.event;
    // document.write(e);
      // this.style.opacity = '0.2';  // this / e.target is the source node.
    e.dataTransfer.setData("Text", e.target.id);
	e.dataTransfer.effectAllowed = "move";
    // calculate the new cursor position:
    // pos1 = pos3 - e.clientX;
    // pos2 = pos4 - e.clientY;
    // pos3 = e.clientX;
    // pos4 = e.clientY;
    // // set the element's new position:
    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }


  function handleDragEnter(e) {
      e = e || window.event;
    // this / e.target is the current hover target.
    // this.classList.add('over');
  }

  function closeDragElement(e) {
    /* stop moving when mouse button is released:*/
    e.preventDefault();
    var data = e.dataTransfer.getData("Text");
    // document.write(e.target.id);
    if (e.target.id != (document.getElementById(data).id) && e.target.classList.contains("square")){
    e.target.appendChild(document.getElementById(data));
  }
  else if (e.target.getAttribute("side") != document.getElementById(data).getAttribute("side")) {
    e.target.parentElement.appendChild(document.getElementById(data));
    e.target.remove();

  }
  //
    // e.target.side != document.getElementById(data).side)
    // document.getElementById("demo").innerHTML = "The p element was dropped";

    // document.onmouseup = null;
    // document.onmousemove = null;
  }
}
class Chessboard {
	 constructor(height, width) {
    this.height = height;
    this.width = width;
	// var $tempobj = $("<div>").css('display', 'none').addClass("square");
    // $("body").append($tempobj);
	// console.log($tempobj.css("border-width"));
	this.sq_borderwidth = 2;
	// $tempobj.remove();
	var boarddiv = document.getElementById("mainChessBoard");
	//console.log(boarddiv);
	boarddiv.style.height = this.height + 'px';
	boarddiv.style.width = this.width + 'px';
	
	
	this.createBoard();
	
	
	
  }
    createBoard() {

    for (var i=0; i< 64; i++){
      //            var idnumber = 1;
      var letters = "abcdefgh";
      var square = document.createElement("div");
      square.classList.add('square');
	  
	  square.style.height = ((this.height/8)-(2*this.sq_borderwidth)) + 'px';
	  // console.log(square.style.height);
	  square.style.width = ((this.height/8)-(2*this.sq_borderwidth)) + 'px';
    // console.log(square.style.width);
    square.classList.add('unselectable');
	  
	  
	  
       square.ondragover = stopDefault;
     // square.ondragover = handleSquareDragOver;
      //square.ondragleave = handleSquareDragLeave;
      var test = letters[i % 8] + (8 - parseInt(i/8));
      square.id = test; /*Generating correct id for each square*/
      // dragElement(test);
      document.getElementById("mainChessBoard").appendChild(square)
      .style.backgroundColor = parseInt((i / 8) + i)
      % 2 == 0 ? 'white' : '#ababab';
      var number = document.createTextNode(test);
      // square.appendChild(number);
      //            #ababab
    }
    this.addPieces();
    document.getElementById("mainChessBoard").style.display = 'block';

  }
  addPieces() {

    var letters = "abcdefgh"; //valid letters in board
    //

    var wpawn = "chesspieces/Chess_plt45.svg";
    var bpawn = "chesspieces/Chess_pdt45.svg";
    var wrook = "chesspieces/Chess_rlt45.svg";
    var brook = "chesspieces/Chess_rdt45.svg";
    var wknight = "chesspieces/Chess_nlt45.svg";
    var bknight = "chesspieces/Chess_ndt45.svg";
    var wbishop = "chesspieces/Chess_blt45.svg";
    var bbishop = "chesspieces/Chess_bdt45.svg";
    var wqueen = "chesspieces/Chess_qlt45.svg";
    var bqueen = "chesspieces/Chess_qdt45.svg";
    var wking = "chesspieces/Chess_klt45.svg";
    var bking = "chesspieces/Chess_kdt45.svg";

    //New game positions

    var white_pawns = ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"];
    var black_pawns = ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7" ];
    var white_rooks = ["a1", "h1"];
    var black_rooks = ["a8", "h8"];
    var white_knights = ["b1", "g1"];
    var black_knights = ["b8", "g8"];
    var white_bishops = ["c1", "f1"];
    var black_bishops = ["c8", "f8"];
    var white_queen = ["d1"];
    var black_queen = ["d8"];
    var white_king = ["e1"];
    var black_king = ["e8"];

    var wpawn_counter = 0;
    var bpawn_counter = 0;
    var wrook_counter = 0;
    var brook_counter = 0;

    var wknight_counter = 0;
    var bknight_counter = 0;
    var wbishop_counter = 0;
    var bbishop_counter = 0;

    // document.write("hahahahah");
    for (var x = 0; x < 8; x++) {
      for (var i = 0; i < 8; i++) {


        // var id = '#';
        // document.write("hahahahah");
        var id =  letters[i] + (x + 1);
        // document.write(id);
        var elem = document.createElement("img");

        if (white_pawns.indexOf(id) > -1){
          elem.setAttribute("src", wpawn);
          elem.setAttribute("side", "white");
          elem.setAttribute("type", "wpawn");
          wpawn_counter++;
          elem.id = "wpawn" + wpawn_counter;
        }
       else  if (black_pawns.indexOf(id) > -1){
          elem.setAttribute("src", bpawn);
            elem.setAttribute("side", "black");
            elem.setAttribute("type", "bpawn");
            bpawn_counter++;
            elem.id = "bpawn" + bpawn_counter;
        }
        else if (white_rooks.indexOf(id) > -1){
          elem.setAttribute("src", wrook);
            elem.setAttribute("side", "white");
            elem.setAttribute("type", "rook");
            wrook_counter++;
            elem.id = "wrook" + wrook_counter;
        }
        else if (black_rooks.indexOf(id) > -1){
          elem.setAttribute("src", brook);
            elem.setAttribute("side", "black");
            elem.setAttribute("type", "rook");
            brook_counter++;
            elem.id = "brook" + brook_counter;
        }
        else if (white_knights.indexOf(id) > -1){
          elem.setAttribute("src", wknight);
            elem.setAttribute("side", "white");
            elem.setAttribute("type", "knight");
            wknight_counter++;
            elem.id = "wknight" + wknight_counter;
        }
        else if (black_knights.indexOf(id) > -1){
          elem.setAttribute("src", bknight);
            elem.setAttribute("side", "black");
            elem.setAttribute("type", "knight");
            bknight_counter++;
            elem.id = "bknight" + bknight_counter;
        }
        else if (black_bishops.indexOf(id) > -1){
          elem.setAttribute("src", bbishop);
            elem.setAttribute("side", "black");
            elem.setAttribute("type", "bishop");
            bbishop_counter++;
            elem.id = "bbishop" + bbishop_counter;
        }
        else if (white_bishops.indexOf(id) > -1){
          elem.setAttribute("src", wbishop);
            elem.setAttribute("side", "white");
            elem.setAttribute("type", "bishop");
            wbishop_counter++;
            elem.id = "wbishop" + wbishop_counter;
        }
        else if (white_queen.indexOf(id) > -1){
          elem.setAttribute("src", wqueen);
            elem.setAttribute("side", "white");
            elem.setAttribute("type", "queen");
            elem.id ="wqueen";
        }
        else if (black_queen.indexOf(id) > -1){
          elem.setAttribute("src", bqueen);
            elem.setAttribute("side", "black");
            elem.setAttribute("type", "queen");
            elem.id ="bqueen";
        }
        else if (white_king.indexOf(id) > -1){
          elem.setAttribute("src", wking);
            elem.setAttribute("side", "white");
            elem.setAttribute("type", "king");
              elem.id ="wking";
        }
        else if (black_king.indexOf(id) > -1){
          elem.setAttribute("src", bking);
            elem.setAttribute("side", "black");
            elem.setAttribute("type", "king");
            elem.id ="bking";
        }
        else {
          break;
        }



        elem.className = "piece unselectable";
		elem.classList.add('piece');
		elem.style.height = this.height/8 + 'px';
		elem.style.width = this.width/8 + 'px';
		elem.classList.add('unselectable');

        //              document.write(id);
        //              document.write($(id).html());
        dragging(elem);
        var hmm = document.getElementById(id);
        // dragElement(hmm);
        hmm.appendChild(elem);
        // dragElement(hmm);
        // $(id).html(elem);
      }
    }
    //
  }
   newGame(){
    // var list = document.getElementById("mainChessBoard");
    // list.removeChild(list.childNodes());
    document.getElementsByClassName("piece").remove();

    // addPieces();
    this.createBoard();
  }
	
}
//openNav();
// newGame();
var chesstable = new Chessboard(800, 800);
