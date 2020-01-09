class spriteShipDrawer {
    init() { 
        this.ship500 = new Image();
        this.ship500.src = './assets/img/ship_500.png';
        this.ship400 = new Image();
        this.ship400.src = './assets/img/ship_400.png';
        this.ship300 = new Image();
        this.ship300.src = './assets/img/ship_300.png';
        this.ship200 = new Image();
        this.ship200.src = './assets/img/ship_200.png';
    }

    drawShipAt(ctx, ship, x, y,) {
        let img = this.ship500;
        ctx.save();
        ctx.translate(x, y);
        if(ship.size == 4) img = this.ship400;
        if(ship.size == 3) img = this.ship300;
        if(ship.size == 2) img = this.ship200;
        if(ship.orientation == 'u') {
            ctx.rotate( - Math.PI / 2); //90deg
            ctx.drawImage(img,
                -100,
                0,
                100,
                img.height);
        } else {
            ctx.drawImage(img,
                0,
                0,
                100,
                img.height)
        }      
        ctx.restore();
    } 
}
class sinkShip {
    constructor() {
        this.shipYard = [
            {size: 5, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 4, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 4, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 3, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 3, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 3, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 2, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 2, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 2, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
            {size: 2, isPlaced: false, x: undefined, y: undefined, orientation: undefined},
        ];
    }
    initPlayerDrawing() {
        this.playerCanvas = document.getElementById("canvas-player"); 
        this.playerCtx = this.playerCanvas.getContext("2d");
        this.fieldDimension = this.playerCanvas.offsetWidth; 
        this.playerCanvas.style.height = this.fieldDimension+"px";
        this.playerCtx.setTransform(this.playerCanvas.width / this.width, 0, 0, this.playerCanvas.height / this.height, 0, 0);
        console.log("this.playerCanvas.width " + this.playerCanvas.width)
        console.log("this.playerCanvas.height " + this.height)
    }
    initServerDrawing() {
        this.serverCanvas = document.getElementById("canvas-server"); 
        this.serverCtx = this.serverCanvas.getContext("2d");
        this.serverCanvas.style.height = this.fieldDimension+"px";
        this.serverCtx.setTransform(this.serverCanvas.width / this.width, 0, 0, this.serverCanvas.height / this.fieldDimension, 0, 0);
    }
    drawEmptyBoard(ctx) {
        // Fill all
        ctx.fillStyle = "rgb(3, 240, 252)";
        ctx.fillRect(0,0, 1000, 1000);
        // Draw Lines
        for(var y = 10; y < 1000; y = y + 10) {
            ctx.beginPath(); 
            ctx.moveTo(0, y * 10);  
            ctx.lineTo(1000, y * 10);  
            ctx.stroke();  
        }
        for(var x = 10; x < 1000; x = x + 10) {
            ctx.beginPath();   
            ctx.moveTo(x * 10, 0);    
            ctx.lineTo(x * 10, 1000);  
            ctx.stroke();
        }
    }
    drawSquare(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * 100,y * 100, 100, 100);
        ctx.strokeRect(x * 100, y * 100, 100, 100);
    }
    drawShip(ship) {
        //print(ship_obj);
        let xCaluclated = ship.x; 
        let yCalculated = ship.y;
        for(let i = 0; i < ship.size; i++) {
            let x = ship.x;
            let y = ship.y; 
            if(ship.orientation == 'u') {
                xCaluclated = x + i;
            } else {
                yCalculated = y + i;
            }
            //this.drawSquare(this.playerCtx,xCaluclated, yCalculated, "rgba(255,0,0, 0.85)");
        }
        this.spriteShip.drawShipAt(this.playerCtx, ship, ship.x * 100, ship.y * 100);
    }
    drawShipAt(ship, x, y, color) {
        //print(ship_obj);
        let xCaluclated = x; 
        let yCalculated = y;
        for(let i = 0; i < ship.size; i++) {
            if(ship.orientation == 'u') {
                xCaluclated = x + i;
            } else {
                yCalculated = y + i;
            }
            this.drawSquare(this.playerCtx,xCaluclated, yCalculated, color);
        }
        this.spriteShip.drawShipAt(this.playerCtx, ship,x * 100, y * 100);
    }
    drawShips() {
        for(let i = 0; i < 10; i++) {
            let ship = this.shipYard[i]; 
            if(ship.isPlaced == true) {
                this.drawShip(ship);
            }
        }
    }
    shipAt(x,y) {
        for(let i = 0; i < 10; i++) {
            let ship = this.shipYard[i];
            if(ship.isPlaced == true) {
                let xCaluclated = ship.x; 
                let yCalculated = ship.y;
                for(let i = 0; i < ship.size; i++) {
                    if(ship.orientation == 'u') {
                        xCaluclated = ship.x + i;
                    } else {
                        yCalculated = ship.y + i;
                    }
                    if(xCaluclated == x && yCalculated == y) return ship
                }
            }
        }
        return undefined
    }
    biggestUnplacedShip() {
        for(let i = 0; i < 10; i++) {
            if(this.shipYard[i].isPlaced == false) {
                return this.shipYard[i];
            }
        }
        return undefined
    }
    isAwayFromOtherShips(xCanidate,yCanidate) {
        for(let i = 0; i < 10; i++) {
            if(this.shipYard[i].isPlaced == true) {
                let ship = this.shipYard[i];
                for(let s = 0; s < ship.size; s++) {
                    let x = ship.x;
                    let y = ship.y; 
                    if(ship.orientation == 'u') {
                        x = x + s;
                    } else {
                        y = y + s;
                    }
                    for(let offset = -1; offset <= 1; offset++) {
                        if(x + offset == xCanidate && y == yCanidate) {
                            return false;
                        } 
                        if(x == xCanidate && y + offset == yCanidate) {
                            return false;
                        } 
                    } 
                }
            }
        }
        return true;
    }
    isWithinBorders(x,y) {
        //Check if out of bounds 
        if(x > 9 || y > 9) return false; 
        return true;
    }
    canPlaceShipAt(ship, x, y) {
        let xCanidate = x;
        let yCanidate = y;
        for(let i = 0; i < ship.size; i++) {
            if(ship.orientation == 'u') {
                xCanidate = x + i;
            } else {
                yCanidate = y + i;
            }
            if(!this.isAwayFromOtherShips(xCanidate,yCanidate)) return false 
            //console.log(this.isWithinBorders(x,y));
            if(!this.isWithinBorders(xCanidate,yCanidate)) return false
        }
        return true
    }
    drawPossibleFields() {
        if(this.biggestUnplacedShip() != undefined) {
            //get ship 
            let ship = this.biggestUnplacedShip(); 
            //Mark possible fields
            for(let x = 0;x < 10; x++) {
                for(let y = 0; y < 10; y++) {
                    if(this.canPlaceShipAt(ship, x,y)) {
                        this.drawSquare(this.playerCtx, x, y,"rgb(0, 255,0)")
                    }
                }
            }
        }
    }
    redrawPlayer() {
        this.drawEmptyBoard(this.playerCtx);
        this.drawShips();
        this.drawPossibleFields();
    }
    redrawServer() {
        this.drawEmptyBoard(this.serverCtx);
    }
    onPlayerCanvasClicked(x,y, event) {
        let ship = this.biggestUnplacedShip()
        if(event.button != 0 && ship) {
            //Rechtsklick
            this.switchOrientation(ship)
        } else {
            //Linksklick
            let selectedShip = this.shipAt(x,y);
            if(selectedShip) {
                this.rotateOrRemove(selectedShip)
            } else { 
                if(this.canPlaceShipAt(ship, x,y)) {
                    ship.x = x; 
                    ship.y = y; 
                    ship.isPlaced = true;
                }
            } 
            if(this.biggestUnplacedShip() == undefined) {
                this.startAutoplaceButton.style = "display: none";
                this.startOnlineButton.style = "display: block";
            }
        }
    }
    onServerCanvasClicked(x,y, event) {
        console.log("Shoot at" + x + " " + y);
        if(this.isPlayersTurn ) {
            this.isPlayersTurn = false; 
            $.getJSON(this.serverUrl, {"request": "start"}, this.serverResponseHandler);
            //$.getJSON(this.serverUrl, {"request": "start"}, this.serverResponseHandler);
            //$.getJSON(this.serverUrl, {"request": "start"}, this.serverResponseHandler);
            
            this.serverBattlefield[x][y] = true;//
        }   
    }
    rotateOrRemove(ship) {
        this.switchOrientation(ship)
        ship.isPlaced = false;
        if(this.canPlaceShipAt(ship, ship.x, ship.y)){
            ship.isPlaced = true;
        } else {

        }
        this.redrawPlayer();
    }
    switchOrientation(ship) {
        if(ship.orientation == 'u') {
            ship.orientation = 'v';
        } else {
            ship.orientation = 'u';
        }
    }
    onPlayerCanvasHover(x,y) {
        this.redrawPlayer();
        let ship = this.biggestUnplacedShip();
        if(ship != undefined){
            let preview_color = "rgba(255,0,0, 0.5)";
            if(this.canPlaceShipAt(ship,x,y)) {
                preview_color = "rgba(0,122,122, 0.85)";
                this.unsetWarningMessage();
            } else {
                this.setWarningMessage();
            }
            this.drawShipAt(ship, x,y, preview_color)
        }
    }
    serverResponseHandler(data) {
        console.log(data);
        //$.getJSON(this.serverUrl, {"request": "shot", "x": 10, "y": 10}, this.serverResponseHandler);
    }
    initServer() {
        this.serverUrl = "http://www2.hs-esslingen.de/~melcher/sinkship/";
        $.getJSON(this.serverUrl, {"request": "status"}, this.serverResponseHandler);
    }
    init() {
        console.log("Spiel läuft"); 
        // Init Vars
        this.playerCanvas = null; 
        this.serverCanvas = null;
        this.playerCtx = null; 
        this.serverCtx = null;

        this.fieldDimension = 0; 
        this.isPlayersTurn = true;
        this.serverBattlefield  = new Array(10);
        for(let x = 0; x < 10; x++)
            this.serverBattlefield[x] = new Array(10);

        this.initPlayerDrawing(); 
        this.initServerDrawing();

        this.redrawPlayer();
        this.redrawServer();

        this.playerCanvas.onmousedown = this.canvasHandlerGenerator(this.playerCanvas, this.onPlayerCanvasClicked);
        this.serverCanvas.onmousedown = this.canvasHandlerGenerator(this.serverCanvas, this.onServerCanvasClicked);
        this.playerCanvas.onmousemove = this.canvasHandlerGenerator(this.playerCanvas, this.onPlayerCanvasHover);
        //Disable Rightclick Contectmenu
        this.playerCanvas.oncontextmenu = function(e) {
            e.preventDefault();
        }
        // Overlay Start Button
        this.startButton = document.getElementById("start-btn");
        this.startButton.onclick = this.HandlerGenerator(this.gameStart);
        // Autoplace Button
        this.startAutoplaceButton = document.getElementById("autoplace");
        // Start Online Game Button
        this.startOnlineButton = document.getElementById("start-online-game");
        this.startOnlineButton.style = "display: none";
        this.startOnlineButton.onclick = this.HandlerGenerator(this.onlineGameStart);
        // Message fields
        this.infoMessageField = document.getElementsByClassName("info-msg")[0];
        this.warning_msg = document.getElementsByClassName("warning-msg")[0]; 
        //Load sprites 
        this.spriteShip = new spriteShipDrawer();
        this.spriteShip.init();
        //Init Server Communication
        this.initServer();
        this.state = 0;
    }
    unsetWarningMessage() {
        this.warning_msg.style="opacity: 0";
    }
    setWarningMessage(msg) {
        if(msg != undefined)
            this.warning_msg.innerHTML = msg;
        this.warning_msg.style="opacity: 1";
    }
    setInfoMessage(msg) {
        this.infoMessageField.innerHTML = msg;
    }
    gameStart() {
        //Animation 
        console.log("Starting Game")
        let MenuOverlay = document.getElementById("game-menu-overlay");
        MenuOverlay.classList.add("fade-out");
        let VideoWall = document.getElementById("video-wall");
        VideoWall.classList.add("fade-out");
        let MainContainer = document.getElementById("main-container");
        MainContainer.classList.add("game-active");
        let PlayerCanvas = document.getElementsByClassName("game-field-player")[0];
        this.MessageBox = document.getElementsByClassName("message-box")[0];
        let MessageBox = this.MessageBox;
        setTimeout(function (){
            MenuOverlay.style = "display: none";
            VideoWall.style = "display:none";
            PlayerCanvas.style = "opacity: 1";
            MessageBox.style = "opacity: 1";
        }, 2000);
    }
    onlineGameStart() {
        //request start
        if(this.state == 0) {
            $.getJSON(this.serverUrl, {"request": "start"}, this.serverResponseHandler);
            this.state = 1;
        }
        if(this.state == 1) {
            $.getJSON(this.serverUrl, {"request": "shoot", "x": 10, "y": 10}, this.serverResponseHandler);
            this.state = 0;
        }
            
        let ServerCanvas = document.getElementsByClassName("game-field-server")[0];
        ServerCanvas.style = "opacity: 1";
        this.setInfoMessage("Du bist dran!");
    }
    HandlerGenerator(handler) {
        var that = this;
        return function (event) {
          return handler.call(that, event);
        }
    }
    canvasHandlerGenerator(canvas, handler) {
        var that = this;
        return function (event) {
          var bBox = canvas.getBoundingClientRect();
          var x = Math.floor((event.clientX - bBox.left)
                 / bBox.width * 10);
          var y = Math.floor((event.clientY - bBox.top)
                 / bBox.height * 10);
          return handler.call(that, x, y, event);
        }
    }
}

window.onload = function() {
    var game = new sinkShip();
    game.init()
}