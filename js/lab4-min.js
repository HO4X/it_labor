class spriteShipDrawer{init(){this.ship500=new Image,this.ship500.src="./assets/img/ship_500.png",this.ship400=new Image,this.ship400.src="./assets/img/ship_400.png",this.ship300=new Image,this.ship300.src="./assets/img/ship_300.png",this.ship200=new Image,this.ship200.src="./assets/img/ship_200.png"}drawShipAt(e,t,i,s){let a=this.ship500;e.save(),e.translate(i,s),4==t.size&&(a=this.ship400),3==t.size&&(a=this.ship300),2==t.size&&(a=this.ship200),"u"==t.orientation?(e.rotate(-Math.PI/2),e.drawImage(a,-100,0,100,a.height)):e.drawImage(a,0,0,100,a.height),e.restore()}}class sinkShip{constructor(){this.shipYard=[{size:5,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:4,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:4,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:3,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:3,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:3,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0}]}initPlayerDrawing(){this.playerCanvas=document.getElementById("canvas-player"),this.playerCtx=this.playerCanvas.getContext("2d"),this.fieldDimension=this.playerCanvas.offsetWidth,this.playerCanvas.style.height=this.fieldDimension+"px",this.playerCtx.setTransform(this.playerCanvas.width/this.width,0,0,this.playerCanvas.height/this.height,0,0),console.log("this.playerCanvas.width "+this.playerCanvas.width),console.log("this.playerCanvas.height "+this.height)}initServerDrawing(){this.serverCanvas=document.getElementById("canvas-server"),this.serverCtx=this.serverCanvas.getContext("2d"),this.serverCanvas.style.height=this.fieldDimension+"px",this.serverCtx.setTransform(this.serverCanvas.width/this.width,0,0,this.serverCanvas.height/this.fieldDimension,0,0)}drawEmptyBoard(e){e.fillStyle="rgb(3, 240, 252)",e.fillRect(0,0,1e3,1e3);for(var t=10;t<1e3;t+=10)e.beginPath(),e.moveTo(0,10*t),e.lineTo(1e3,10*t),e.stroke();for(var i=10;i<1e3;i+=10)e.beginPath(),e.moveTo(10*i,0),e.lineTo(10*i,1e3),e.stroke()}drawSquare(e,t,i,s){e.fillStyle=s,e.fillRect(100*t,100*i,100,100),e.strokeRect(100*t,100*i,100,100)}drawShip(e){let t=e.x,i=e.y;for(let s=0;s<e.size;s++){let a=e.x,r=e.y;"u"==e.orientation?t=a+s:i=r+s}this.spriteShip.drawShipAt(this.playerCtx,e,100*e.x,100*e.y)}drawShipAt(e,t,i,s){let a=t,r=i;for(let n=0;n<e.size;n++)"u"==e.orientation?a=t+n:r=i+n,this.drawSquare(this.playerCtx,a,r,s);this.spriteShip.drawShipAt(this.playerCtx,e,100*t,100*i)}drawShips(){for(let e=0;e<10;e++){let t=this.shipYard[e];1==t.isPlaced&&this.drawShip(t)}}shipAt(e,t){for(let i=0;i<10;i++){let s=this.shipYard[i];if(1==s.isPlaced){let i=s.x,a=s.y;for(let r=0;r<s.size;r++)if("u"==s.orientation?i=s.x+r:a=s.y+r,i==e&&a==t)return s}}}biggestUnplacedShip(){for(let e=0;e<10;e++)if(0==this.shipYard[e].isPlaced)return this.shipYard[e]}isAwayFromOtherShips(e,t){for(let i=0;i<10;i++)if(1==this.shipYard[i].isPlaced){let s=this.shipYard[i];for(let i=0;i<s.size;i++){let a=s.x,r=s.y;"u"==s.orientation?a+=i:r+=i;for(let i=-1;i<=1;i++){if(a+i==e&&r==t)return!1;if(a==e&&r+i==t)return!1}}}return!0}isWithinBorders(e,t){return!(e>9||t>9)}canPlaceShipAt(e,t,i){let s=t,a=i;for(let r=0;r<e.size;r++){if("u"==e.orientation?s=t+r:a=i+r,!this.isAwayFromOtherShips(s,a))return!1;if(!this.isWithinBorders(s,a))return!1}return!0}drawPossibleFields(){if(null!=this.biggestUnplacedShip()){let e=this.biggestUnplacedShip();for(let t=0;t<10;t++)for(let i=0;i<10;i++)this.canPlaceShipAt(e,t,i)&&this.drawSquare(this.playerCtx,t,i,"rgb(0, 255,0)")}}redrawPlayer(){this.drawEmptyBoard(this.playerCtx),this.drawShips(),this.drawPossibleFields()}redrawServer(){this.drawEmptyBoard(this.serverCtx)}onPlayerCanvasClicked(e,t,i){let s=this.biggestUnplacedShip();if(0!=i.button&&s)this.switchOrientation(s);else{let i=this.shipAt(e,t);i?this.rotateOrRemove(i):this.canPlaceShipAt(s,e,t)&&(s.x=e,s.y=t,s.isPlaced=!0),null==this.biggestUnplacedShip()&&(this.startAutoplaceButton.style="display: none",this.startOnlineButton.style="display: block")}}onServerCanvasClicked(e,t,i){console.log("Shoot at"+e+" "+t),this.isPlayersTurn&&(this.isPlayersTurn=!1,$.getJSON(this.serverUrl,{request:"start"},this.serverResponseHandler),this.serverBattlefield[e][t]=!0)}rotateOrRemove(e){this.switchOrientation(e),e.isPlaced=!1,this.canPlaceShipAt(e,e.x,e.y)&&(e.isPlaced=!0),this.redrawPlayer()}switchOrientation(e){"u"==e.orientation?e.orientation="v":e.orientation="u"}onPlayerCanvasHover(e,t){this.redrawPlayer();let i=this.biggestUnplacedShip();if(null!=i){let s="rgba(255,0,0, 0.5)";this.canPlaceShipAt(i,e,t)?(s="rgba(0,122,122, 0.85)",this.unsetWarningMessage()):this.setWarningMessage(),this.drawShipAt(i,e,t,s)}}serverResponseHandler(e){console.log(e)}initServer(){this.serverUrl="http://www2.hs-esslingen.de/~melcher/sinkship/",$.getJSON(this.serverUrl,{request:"status"},this.serverResponseHandler)}init(){console.log("Spiel läuft"),this.playerCanvas=null,this.serverCanvas=null,this.playerCtx=null,this.serverCtx=null,this.fieldDimension=0,this.isPlayersTurn=!0,this.serverBattlefield=new Array(10);for(let e=0;e<10;e++)this.serverBattlefield[e]=new Array(10);this.initPlayerDrawing(),this.initServerDrawing(),this.redrawPlayer(),this.redrawServer(),this.playerCanvas.onmousedown=this.canvasHandlerGenerator(this.playerCanvas,this.onPlayerCanvasClicked),this.serverCanvas.onmousedown=this.canvasHandlerGenerator(this.serverCanvas,this.onServerCanvasClicked),this.playerCanvas.onmousemove=this.canvasHandlerGenerator(this.playerCanvas,this.onPlayerCanvasHover),this.playerCanvas.oncontextmenu=function(e){e.preventDefault()},this.startButton=document.getElementById("start-btn"),this.startButton.onclick=this.HandlerGenerator(this.gameStart),this.startAutoplaceButton=document.getElementById("autoplace"),this.startOnlineButton=document.getElementById("start-online-game"),this.startOnlineButton.style="display: none",this.startOnlineButton.onclick=this.HandlerGenerator(this.onlineGameStart),this.infoMessageField=document.getElementsByClassName("info-msg")[0],this.warning_msg=document.getElementsByClassName("warning-msg")[0],this.spriteShip=new spriteShipDrawer,this.spriteShip.init(),this.initServer(),this.state=0}unsetWarningMessage(){this.warning_msg.style="opacity: 0"}setWarningMessage(e){null!=e&&(this.warning_msg.innerHTML=e),this.warning_msg.style="opacity: 1"}setInfoMessage(e){this.infoMessageField.innerHTML=e}gameStart(){console.log("Starting Game");let e=document.getElementById("game-menu-overlay");e.classList.add("fade-out");let t=document.getElementById("video-wall");t.classList.add("fade-out"),document.getElementById("main-container").classList.add("game-active");let i=document.getElementsByClassName("game-field-player")[0];this.MessageBox=document.getElementsByClassName("message-box")[0];let s=this.MessageBox;setTimeout(function(){e.style="display: none",t.style="display:none",i.style="opacity: 1",s.style="opacity: 1"},2e3)}onlineGameStart(){0==this.state&&($.getJSON(this.serverUrl,{request:"start"},this.serverResponseHandler),this.state=1),1==this.state&&($.getJSON(this.serverUrl,{request:"shoot",x:10,y:10},this.serverResponseHandler),this.state=0),document.getElementsByClassName("game-field-server")[0].style="opacity: 1",this.setInfoMessage("Du bist dran!")}HandlerGenerator(e){var t=this;return function(i){return e.call(t,i)}}canvasHandlerGenerator(e,t){var i=this;return function(s){var a=e.getBoundingClientRect(),r=Math.floor((s.clientX-a.left)/a.width*10),n=Math.floor((s.clientY-a.top)/a.height*10);return t.call(i,r,n,s)}}}window.onload=function(){(new sinkShip).init()};