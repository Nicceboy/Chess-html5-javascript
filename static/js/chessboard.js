var Chessboard = class Chessboard {
    constructor(height, width) {
        this.letters = "abcdefgh";
        this.height = height;
        this.width = width;
        

        // this.timerLenght = parseInt(document.getElementById("Timer").value) * 1000 * 60; //Timer lenght in milliseconds
        var self = this;
        self.terminalT = document.getElementById("TerminalText");
        self.currentTurn = 'white';
        self.gamestate = 'play';
        self.timerLenght = document.getElementById("Timer").value * 1000 * 60; //Timer lenght in milliseconds
        self.whiteTimer = self.timerLenght;
        self.blackTimer = self.timerLenght;
        self.timerIncrease = document.getElementById("TimerIncrease").value * 1000; //Timer lenght in milliseconds
      
        self.difficulty = document.getElementById("StyledSelect").options[document.getElementById("StyledSelect").selectedIndex].value;
        self.terminalT.innerHTML = self.currentTurn.toUpperCase() + ' is starting';
        // self.terminalT.innerHTML = self.timerIncrease;
        // var $tempobj = $("<div>").css('display', 'none').addClass("square");
        // $("body").append($tempobj);
        // console.log($tempobj.css("border-width"));
        this.sq_borderwidth = 2;
        // $tempobj.remove();
        var boarddiv = document.getElementById("mainChessBoard");
        //console.log(boarddiv);
        boarddiv.style.height = this.height + 'px';
        boarddiv.style.width = this.width + 'px';


        this.createBoard(); // Creates gameboard

        console.log(self.timerLenght);
        this.startTimer(); // Starts timers


    }
    saveSettings() { // Once settings are saved, new values stored also to object.
    self.timerLenght = document.getElementById("Timer").value  * 1000 * 60;
    self.timerIncrease = document.getElementById("TimerIncrease").value * 1000;
    self.difficulty = document.getElementById("StyledSelect").options[document.getElementById("StyledSelect").selectedIndex].value;
    console.log("Settings saved. " + self.timerLenght + " " + self.timerIncrease + " " + self.difficulty);

    }
    startTimer(){
        self = this;
        
        // self.terminalT.innerHTML = "hahahahah";
       
        self.ongoing = setInterval(function() {
        var timer;

          if (self.currentTurn == 'white'){ //Declare timer used based on current turn
            timer = 'whiteTimer';
          }
          if (self.currentTurn == 'black'){
            timer = 'blackTimer';
          }
          //Use names to point correct variables, code reuseability


          // Time calculations f, minutes and seconds
          var hours = Math.floor((self[timer] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((self[timer] % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((self[timer] % (1000 * 60)) / 1000);
        
          //Add extra zero for short numbers
            if (seconds.toString().length == 1){
                seconds = "0" + seconds;
            }
            if (minutes.toString().length == 1){
                minutes = "0" + minutes;
            }
           
          // Display the result in the information terminal
          document.getElementById("timerWindow").innerHTML =  hours + ":" + minutes + ":" + seconds;
            
          // If the count down is finished, game has ended
          if (self[timer] < 0) {
            clearInterval(self.ongoing);
            self.terminalT.innerHTML = "Your time has ended. Game lost.";
            self.currentTurn = 'none';
          }
          if (self.gamestate == 'play'){ //Timer on, if game not paused
            self[timer] = self[timer] - 1000; //Reduce time from correct timer
          }

          
        }, 1000);
    }
    pauseTimer(){ // Method for pausing/unpausing timer 
        if (self.gamestate == 'play')
        self.gamestate = 'paused';
        else {
            self.gamestate = 'play';
        }
    }
    newGame() {
        //Let's remove all the pieces from the Chessboard. We have own function for it
        document.getElementsByClassName("piece").remove();

        // addPieces();
        this.createBoard();
        self.currentTurn = 'white';
        clearInterval(self.ongoing); //Stop previous timer
        self.whiteTimer = self.timerLenght;
        self.blackTimer = self.timerLenght;
        self.terminalT.innerHTML = self.currentTurn.toUpperCase() + ' is starting';
        this.startTimer(); // Starts timers
    }
    createBoard() {

        for (var i = 0; i < 64; i++) {
            //            var idnumber = 1;

            var square = document.createElement("div");
            square.classList.add('square');

            square.style.height = ((this.height / 8) - (2 * this.sq_borderwidth)) + 'px';
            // console.log(square.style.height);
            square.style.width = ((this.height / 8) - (2 * this.sq_borderwidth)) + 'px';
            // console.log(square.style.width);
            square.classList.add('unselectable');


            //  square.ondragover = stopDefault;
            square.ondragover = this.handleSquareDragOverDefault;
            square.ondragleave = this.handleSquareDragLeave;
            square.ondrop = this.handleSquareDragDrop;
            var test = this.letters[i % 8] + (8 - parseInt(i / 8));
            square.id = test;
            /*Generating correct id for each square*/
            // dragElement(test);
            //Board has 64 childs: squares
            square.style.backgroundColor = parseInt((i / 8) + i)
                % 2 == 0 ? 'white' : '#ababab';
            square.setAttribute("color", parseInt((i / 8) + i)
                % 2 == 0 ? 'white' : 'black');

            document.getElementById("mainChessBoard").appendChild(square);
            var number = document.createTextNode(test);
            // square.appendChild(number);
            //            #ababab
        }
        this.addPieces();
        document.getElementById("mainChessBoard").style.display = 'block';

    }

    addPieces() {


        //Images of pieces

        var wpawn = "static/chesspieces/Chess_plt45.svg";
        var bpawn = "static/chesspieces/Chess_pdt45.svg";
        var wrook = "static/chesspieces/Chess_rlt45.svg";
        var brook = "static/chesspieces/Chess_rdt45.svg";
        var wknight = "static/chesspieces/Chess_nlt45.svg";
        var bknight = "static/chesspieces/Chess_ndt45.svg";
        var wbishop = "static/chesspieces/Chess_blt45.svg";
        var bbishop = "static/chesspieces/Chess_bdt45.svg";
        var wqueen = "static/chesspieces/Chess_qlt45.svg";
        var bqueen = "static/chesspieces/Chess_qdt45.svg";
        var wking = "static/chesspieces/Chess_klt45.svg";
        var bking = "static/chesspieces/Chess_kdt45.svg";

        //New game positions

        var white_pawns = ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"];
        var black_pawns = ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"];
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
                var id = this.letters[i] + (x + 1);
                // document.write(id);
                var elem = document.createElement("img");

                if (white_pawns.indexOf(id) > -1) {
                    elem.setAttribute("src", wpawn);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "wpawn");
                    wpawn_counter++;
                    elem.id = "wpawn" + wpawn_counter;
                }
                else if (black_pawns.indexOf(id) > -1) {
                    elem.setAttribute("src", bpawn);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "bpawn");
                    bpawn_counter++;
                    elem.id = "bpawn" + bpawn_counter;
                }
                else if (white_rooks.indexOf(id) > -1) {
                    elem.setAttribute("src", wrook);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "rook");
                    wrook_counter++;
                    elem.id = "wrook" + wrook_counter;
                }
                else if (black_rooks.indexOf(id) > -1) {
                    elem.setAttribute("src", brook);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "rook");
                    brook_counter++;
                    elem.id = "brook" + brook_counter;
                }
                else if (white_knights.indexOf(id) > -1) {
                    elem.setAttribute("src", wknight);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "knight");
                    wknight_counter++;
                    elem.id = "wknight" + wknight_counter;
                }
                else if (black_knights.indexOf(id) > -1) {
                    elem.setAttribute("src", bknight);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "knight");
                    bknight_counter++;
                    elem.id = "bknight" + bknight_counter;
                }
                else if (black_bishops.indexOf(id) > -1) {
                    elem.setAttribute("src", bbishop);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "bishop");
                    bbishop_counter++;
                    elem.id = "bbishop" + bbishop_counter;
                }
                else if (white_bishops.indexOf(id) > -1) {
                    elem.setAttribute("src", wbishop);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "bishop");
                    wbishop_counter++;
                    elem.id = "wbishop" + wbishop_counter;
                }
                else if (white_queen.indexOf(id) > -1) {
                    elem.setAttribute("src", wqueen);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "queen");
                    elem.id = "wqueen";
                }
                else if (black_queen.indexOf(id) > -1) {
                    elem.setAttribute("src", bqueen);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "queen");
                    elem.id = "bqueen";
                }
                else if (white_king.indexOf(id) > -1) {
                    elem.setAttribute("src", wking);
                    elem.setAttribute("side", "white");
                    elem.setAttribute("type", "king");
                    elem.id = "wking";
                }
                else if (black_king.indexOf(id) > -1) {
                    elem.setAttribute("src", bking);
                    elem.setAttribute("side", "black");
                    elem.setAttribute("type", "king");
                    elem.id = "bking";
                }
                else {
                    break;
                }


                //Properties of piece
                elem.className = "piece unselectable";
                elem.style.height = this.height / 8 - (2 * this.sq_borderwidth) + 'px';
                elem.style.width = this.width / 8 - (2 * this.sq_borderwidth) + 'px';


                this.dragElement(elem);
                var hmm = document.getElementById(id);
                hmm.appendChild(elem);

            }
        }
        //
    }



    handleSquareDragOverDefault() { //Just for coloring targeted square
        if (!this.classList.contains("over")) {
            this.classList.add('over');
        }
    }

    handleSquareDragOver(e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        // this.classList.add('over');

    }

    handleSquareDragLeave(e) {

        this.classList.remove('over');

    }

    handleSquareDragDrop() {
        this.classList.remove('over'); // Remove 'over' effect from square
     

    }

    dragElement(elmnt) { // Set different methods for different situations
        elmnt.ondragstart = this.elementDragStart.bind(this);
        elmnt.ondragend = this.elementDragEnd;
        document.ondrop = this.closeDragElement;
        elmnt.onclick = this.onElementclick.bind(this);    }
    onElementclick(e){
        console.log(e);
        if( e.target.parentElement.classList.contains("legal")){
            this.elementDragEnd();
        }
        else {
        e.target.parentElement.classList.add('legal');
        this.isLegalMove(e.target.parentElement, false);
        }
    }
    testclick(){
        self.terminalT.innerHTML = 'klikkasin';
    }


    elementDragStart(e) {

        e = e || window.event;
        e.dataTransfer.setData("Text", e.target.id);
        e.dataTransfer.effectAllowed = "move";
        this.isLegalMove(e.target.parentElement, false); // Check legal moves from starting position

    }

    elementDragEnd(e) {
        var squares = document.getElementsByClassName("square");

        for (var i = 0; i < squares.length; i++) { //Reset allowed actions

            squares[i].ondragover = this.handleSquareDragOverDefault
            squares[i].classList.remove("legal");
            // console.log(squares[i].classList);
        }
    }

    closeDragElement(e) {
        /* stop moving when mouse button is released:*/
        e.preventDefault();
        var data = e.dataTransfer.getData("Text");
        // document.write(e.target.id);
        // if (document.getElementById(data).getAttribute("side") == 'white'){ //Changes turn
        //     self.currentTurn = 'black';
        // }
        // else {
        //     self.currentTurn = 'white';
        // }

        if (e.target.id != (document.getElementById(data).id) && e.target.classList.contains("square")) {
            e.target.appendChild(document.getElementById(data));
            
        }
        else if (e.target.getAttribute("side") != document.getElementById(data).getAttribute("side")) {
            e.target.parentElement.appendChild(document.getElementById(data));
            e.target.remove();

        }

      
    //    setTimeout(self.afterTwoSeconds, 2000);
       if (document.getElementById(data).getAttribute("side") == 'white'){ //Changes turn
        self.whiteTimer = self.whiteTimer + self.timerIncrease; //Add more time to the timer at the end of the turn
        self.currentTurn = 'black';
        $('#timerWindow').addClass('blackTimer');
    }
    else {
        self.blackTimer = self.blackTimer + self.timerIncrease;
        self.currentTurn = 'white';
        $('#timerWindow').removeClass('blackTimer');
    }
    self.terminalT.innerHTML = self.currentTurn.toUpperCase()+ ' TURN';
    self.isCheck();
    }
   
    
    isCheck (){
        var squares = document.getElementsByClassName("square");
        console.log(squares.length);
        var kingcounter = 0;
        var king;
        var i = 0;
                while (kingcounter < 2) { //Reset allowed actions
                    if(squares[i].hasChildNodes()){
        
                    if (squares[i].children[0].getAttribute("type") == 'king'   ){ 
                        // console.log((squares[i].children[0].getAttribute("side")));
                        // && squares[i].children[0].getAttribute("side") == this.currentTurn
                        king = squares[i].children[0];
                        console.log(king);
                        this.isLegalMove(king.parentElement, true);
                        kingcounter++;
                    }
              
                }
                i++;// console.log(squares[i].classList);
                }


    }

    isLegalMove(e, testCheck) {
        
        var startPosition;

        var new_horiz;
        var new_vert;
        var new_pos;
        
        
      

        self = this // Bind this ChessBoard to variable self. Chessboard Methods usable with self variable, in case 'this' changes inside function
       
        var piece_type = e.children[0].getAttribute("type");
        if (self.gamestate != 'play'){
            self.terminalT.innerHTML = 'Game paused or ended. Unable to move pieces.';
            return 0;
        }
        if (e.children[0].getAttribute("side") != self.currentTurn && !testCheck)//Controls correct turn
        {
            self.terminalT.innerHTML = self.currentTurn.toUpperCase() + ' TURN';
            return 0;
        }
        var current = e.id.match(/[a-zA-Z]+|[0-9]+/g);
        var horizontal = current[0];
        var vertical = current[1];

        var loop_enabler = true; //Helps to reuse code of rook/bishop movetesters. While true, allows as to check as many squares as move is leag
        //By setting FALSE, only squares next to are checked. Ideal to king moveset

        


        var i = 1;

        //'Skipvariables' change true, when loop faces a chess piece. Rest of the squares in that direction will be skipped.

        //Rook/Queen move possibilities
        self.skipup = false;
        self.skipdown = false;
        self.skipright = false;
        self.skipleft = false;

        //Bishop/Queen move possibilities
        self.skiprightup = false;
        self.skiprightdown = false;
        self.skipleftdown = false;
        self.skipleftup = false;
       
        var isKingDanger = function (ce, cposition, type) { //Check legal positions and add css for marking
            
                        if (cposition != null && cposition.hasChildNodes()) { // Cases when there is already piece
                            console.log(cposition.children[0].getAttribute("type")+type);
                            if (cposition.children[0].getAttribute("side") != ce.children[0].getAttribute("side") && cposition.children[0].getAttribute("type") == type) {// If pieces are different color and movetable matches, it is check
                                console.log('CHESS');
                    
                                self.terminalT.innerHTML = 'CHECK';
                                 return true; // Returns true only, when there is piece 
                             }
                           
                            // cposition.classList.add('legal');  //Show legal moves
                            // cposition.ondragover = self.handleSquareDragOver; //Enable dropping
                    
                            // console.log(cposition.children[0].getAttribute("side"));
                            // console.log(cposition.children[0].getAttribute("type"));
                            return true;
                          
                            
                        }
                        return false;
                    }


        var checkMove = function (ce, cposition) { //Check legal positions and add css for marking

            if (cposition != null && !cposition.hasChildNodes()) { // Move is probably legal, if  there is no piece already

                cposition.classList.add('legal');  //Show legal moves
                cposition.onclick = self.testclick;
                cposition.ondragover = self.handleSquareDragOver; //Enable dropping
                return false;
            }
            if (cposition != null && cposition.hasChildNodes()) { // Cases when there is already piece
                // console.log(cposition.children[0].getAttribute("side"));
                if (cposition.children[0].getAttribute("side") != ce.children[0].getAttribute("side")) {// If pieces are different color, move is probably legal{
                    cposition.classList.add('legal');
                   
                    cposition.ondragover = self.handleSquareDragOver;
                }
                return true; // Returns true only, when there is piece 
            }
            return false;
        }
       
        var changeCoord = function (horizontal, vertical, moveset, i, skip, type) { //Changes coordinate, checks state of new coordinate. Marks directions checked afterwards


            switch (moveset) {
                //Case 1: Go Upwards
                //Case 2: Go Downwards
                //Case 3: Go Right
                //Case 4: Go Left
                //Case 5: Go TopRight
                //Case 6: Go RightDown
                //Case 7: Go Downleft
                //Case 8: Go LeftUp

                case 1:
                    new_vert = parseInt(vertical) + i;
                    new_pos = horizontal + new_vert; //Position, i amount squares upwards
                    break;

                case 2:
                    new_vert = parseInt(vertical) - i;
                    new_pos = horizontal + new_vert; //Position, i amount squares downwards
                    break;

                case 3:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) + i];
                    new_pos = new_horiz + vertical; //Position, i amount squares right
                    break;

                case 4:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) - i];
                    new_pos = new_horiz + vertical; //Position, i amount squares left
                    break;

                case 5:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) + i];
                    new_vert = parseInt(vertical) + i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares rightup
                    break;

                case 6:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) + i];
                    new_vert = parseInt(vertical) - i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares rightdown
                    break;

                case 7:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) - i];
                    new_vert = parseInt(vertical) - i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares leftdown
                    break;

                case 8:
                    new_horiz = self.letters[self.letters.indexOf(horizontal) - i];
                    new_vert = parseInt(vertical) + i;
                    new_pos = new_horiz + new_vert; //Position, i amount squares leftup
                    break;


            }
            var position = document.getElementById(new_pos);
            if (position == null) { // Null means we are out of board
                self[skip] = true; //Sets class parameter true by given variable name. Last legal move reached
            }
            if (testCheck){

                // console.log(type);


               if ( isKingDanger(e, position, type)){
                    self[skip] = true;
                //    console.log("Check!");
               }

            }
            
            else if (checkMove(e, position)) { // True means, we have reached a piece. Legal move colored and allowed
                self[skip] = true;
            }
            else {
                console.log("At least one move for free square.");
            }
        }

        var rook_func = function () {

            //Case 1: Go Upwards
            //Case 2: Go Downwards
            //Case 3: Go Right
            //Case 4: Go Left

            do {

                if (!self.skipup) { //Let's scheck next position upwards, if it is not allowed to skip yet. And so on.

                    changeCoord(horizontal, vertical, 1, i, 'skipup', 'rook');
                }

                if (!self.skipdown) {

                    changeCoord(horizontal, vertical, 2, i, 'skipdown', 'rook');
                }

                if (!self.skipright) {

                    changeCoord(horizontal, vertical, 3, i, 'skipright', 'rook');
                }
                if (!self.skipleft) {

                    changeCoord(horizontal, vertical, 4, i, 'skipleft', 'rook');
                }


                if (self.skipdown && self.skipleft && self.skipright && self.skipup) { //Checks if every direction is handled
                    break;
                }

                i++;
            } while (loop_enabler);
        }

        var bishop_func = function () {

            //Case 5: Go TopRight
            //Case 6: Go RightDown
            //Case 7: Go Downleft
            //Case 8: Go LeftUp

            do {

                if (!self.skiprightup) { //Let's scheck next position upwards, if it is not allowed to skip yet. And so on.

                    changeCoord(horizontal, vertical, 5, i, 'skiprightup', 'bishop');
                }

                if (!self.skiprightdown) {

                    changeCoord(horizontal, vertical, 6, i, 'skiprightdown', 'bishop');
                }

                if (!self.skipleftdown) {

                    changeCoord(horizontal, vertical, 7, i, 'skipleftdown', 'bishop');
                }
                if (!self.skipleftup) {

                    changeCoord(horizontal, vertical, 8, i, 'skipleftup', 'bishop');
                }
                if (self.skiprightup && self.skiprightdown && self.skipleftdown && self.skipleftup) { //Checks if every direction is handled
                    break;
                }

                i++;

            } while (loop_enabler);

        }
       
        var pawn_func = function (startNumber, moves, sideVar, moveNames) {

            if (current[1] == startNumber) {
                startPosition = true; //Pawn hasn't been moved yet
            } else {
                startPosition = false; //Pawn has been moved. Special move isn't allowed.
            }

            if (!document.getElementById(horizontal + (parseInt(vertical) + sideVar)).hasChildNodes()) {
                console.log(horizontal, vertical);
                changeCoord(horizontal, vertical, moves[0], i, moveNames[0]);

                if (!document.getElementById(horizontal + (parseInt(vertical) + (2 * sideVar))).hasChildNodes() && startPosition) {//Can move 2 squares at once at first move
                    changeCoord(horizontal, vertical, moves[0], 2, moveNames[0]);
                }
            }
            //Following moves allow capturing
            try {
                if (document.getElementById(self.letters[self.letters.indexOf(horizontal) + sideVar] + (parseInt(vertical) + sideVar)).hasChildNodes()) {
                    changeCoord(horizontal, vertical, moves[1], i, moveNames[1]);
                }
            } catch (e1) {
                console.log("Piece in right border.");
            }
            try {
                if (document.getElementById(self.letters[self.letters.indexOf(horizontal) - sideVar] + (parseInt(vertical) + sideVar)).hasChildNodes()) {
                    changeCoord(horizontal, vertical, moves[2], i, moveNames[2]);
                }
            } catch (e2) {
                console.log("Piece in left border.");
            }



        }
        var knight_func = function() {
            var knight_moves = {
                upleft: [-1, 2],
                upright: [1, 2],
                rightup: [2, 1],
                rightdown: [2, -1],
                downright: [1, -2],
                downleft: [-1, -2],
                leftdown: [-2, -1],
                leftup: [-2, 1]
            };
            console.log(knight_moves);
            for (const i in knight_moves) {
                try {
                    new_horiz = self.letters[self.letters.indexOf(horizontal) + knight_moves[i][0]]; //Viable horizontal position
                } catch (e) {
                    console.log(e + " " + "outofbound");

                }
                new_vert = parseInt(vertical) + knight_moves[i][1]; //Viable vertical position
                new_pos = new_horiz + new_vert; //Create div name
                var position = document.getElementById(new_pos); //Get element with that div. It is null if not existing
                checkMove(e, position); //Check if position is legal and add css for marking
            }

        }
        // Check for check-state
        if (testCheck) {
            console.log('checking for check');
            // isKingDanger();
            rook_func();
            i = 1; //Reset i for easy re-use of older functions. Checking moves of rook and bishop
            bishop_func();
        }



        // Rules, white pawn
        if (piece_type == "wpawn") {
            var moveMethods = [1, 5, 8];
            var moveNames = ['skipup', 'skiprightup', 'skipleftup']

            pawn_func(2, moveMethods, 1, moveNames);
        }
        //Rules, black pawn
        if (piece_type == "bpawn") {

            var moveMethods = [2, 7, 6];
            var moveNames = ['skipdown', 'skipleftdown', 'skiprightdown']
            pawn_func(7, moveMethods, -1, moveNames);

        }


        // Legal moves for Knight
        if (piece_type == "knight") { //Special case

            knight_func();

        }
        //Legal moves for Rook
        if (piece_type == "rook") {
            rook_func();
        }
        if (piece_type == "bishop") {
            bishop_func();
        }
        if (piece_type == "queen") {
            rook_func();
            i = 1; //Reset i for easy re-use of older functions. Checking moves of rook and bishop
            bishop_func();
        }
        if (piece_type == "king") {
            loop_enabler = false;
            rook_func();
            i = 1; //Reset i because previous function still increases it once.
            bishop_func();

        }
        
    

    }
}