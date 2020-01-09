class spriteShipDrawer{init(){this.ship500=new Image,this.ship500.src="./assets/img/ship_500.png",this.ship400=new Image,this.ship400.src="./assets/img/ship_400.png",this.ship300=new Image,this.ship300.src="./assets/img/ship_300.png",this.ship200=new Image,this.ship200.src="./assets/img/ship_200.png"}drawShipAt(i,e,t,s){let a=this.ship500;i.save(),i.translate(t,s),4==e.size&&(a=this.ship400),3==e.size&&(a=this.ship300),2==e.size&&(a=this.ship200),"u"==e.orientation?(i.rotate(-Math.PI/2),i.drawImage(a,-100,0,100,a.height)):i.drawImage(a,0,0,100,a.height),i.restore()}}class sinkShip{constructor(){this.shipYard=[{size:5,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:4,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:4,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:3,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:3,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:3,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0},{size:2,isPlaced:!1,x:void 0,y:void 0,orientation:void 0}]}initPlayerDrawing(){this.playerCanvas=document.getElementById("canvas-player"),this.playerCtx=this.playerCanvas.getContext("2d"),this.fieldDimension=this.playerCanvas.offsetWidth,this.playerCanvas.style.height=this.fieldDimension+"px",this.playerCtx.setTransform(this.playerCanvas.width/this.width,0,0,this.playerCanvas.height/this.height,0,0),console.log("this.playerCanvas.width "+this.playerCanvas.width),console.log("this.playerCanvas.height "+this.height)}initServerDrawing(){this.serverCanvas=document.getElementById("canvas-server"),this.serverCtx=this.serverCanvas.getContext("2d"),this.serverCanvas.style.height=this.fieldDimension+"px",this.serverCtx.setTransform(this.serverCanvas.width/this.width,0,0,this.serverCanvas.height/this.fieldDimension,0,0)}drawEmptyBoard(i){i.fillStyle="rgb(3, 240, 252)",i.fillRect(0,0,1e3,1e3);for(var e=10;e<1e3;e+=10)i.beginPath(),i.moveTo(0,10*e),i.lineTo(1e3,10*e),i.stroke();for(var t=10;t<1e3;t+=10)i.beginPath(),i.moveTo(10*t,0),i.lineTo(10*t,1e3),i.stroke()}drawSquare(i,e,t,s){i.fillStyle=s,i.fillRect(100*e,100*t,100,100),i.strokeRect(100*e,100*t,100,100)}drawShip(i){let e=i.x,t=i.y;for(let s=0;s<i.size;s++){let a=i.x,r=i.y;"u"==i.orientation?e=a+s:t=r+s}this.spriteShip.drawShipAt(this.playerCtx,i,100*i.x,100*i.y)}drawShipAt(i,e,t,s){let a=e,r=t;for(let n=0;n<i.size;n++)"u"==i.orientation?a=e+n:r=t+n,this.drawSquare(this.playerCtx,a,r,s);this.spriteShip.drawShipAt(this.playerCtx,i,100*e,100*t)}drawShips(){for(let i=0;i<10;i++){let e=this.shipYard[i];1==e.isPlaced&&this.drawShip(e)}}shipAt(i,e){for(let t=0;t<10;t++){let s=this.shipYard[t];if(1==s.isPlaced){let t=s.x,a=s.y;for(let r=0;r<s.size;r++)if("u"==s.orientation?t=s.x+r:a=s.y+r,t==i&&a==e)return s}}}biggestUnplacedShip(){for(let i=0;i<10;i++)if(0==this.shipYard[i].isPlaced)return this.shipYard[i]}isAwayFromOtherShips(i,e){for(let t=0;t<10;t++)if(1==this.shipYard[t].isPlaced){let s=this.shipYard[t];for(let t=0;t<s.size;t++){let a=s.x,r=s.y;"u"==s.orientation?a+=t:r+=t;for(let t=-1;t<=1;t++){if(a+t==i&&r==e)return!1;if(a==i&&r+t==e)return!1}}}return!0}isWithinBorders(i,e){return!(i>9||e>9)}canPlaceShipAt(i,e,t){let s=e,a=t;for(let r=0;r<i.size;r++){if("u"==i.orientation?s=e+r:a=t+r,!this.isAwayFromOtherShips(s,a))return!1;if(!this.isWithinBorders(s,a))return!1}return!0}drawPossibleFields(){if(null!=this.biggestUnplacedShip()){let i=this.biggestUnplacedShip();for(let e=0;e<10;e++)for(let t=0;t<10;t++)this.canPlaceShipAt(i,e,t)&&this.drawSquare(this.playerCtx,e,t,"rgb(0, 255,0)")}}redrawPlayer(){this.drawEmptyBoard(this.playerCtx),this.drawShips(),this.drawPossibleFields()}redrawServer(){this.drawEmptyBoard(this.serverCtx)}onPlayerCanvasClicked(i,e,t){console.log(t);let s=this.biggestUnplacedShip();if(0!=t.button&&s)this.switchOrientation(s);else{let t=this.shipAt(i,e);t?this.rotateOrRemove(t):this.canPlaceShipAt(s,i,e)&&(s.x=i,s.y=e,s.isPlaced=!0)}}rotateOrRemove(i){this.switchOrientation(i),i.isPlaced=!1,this.canPlaceShipAt(i,i.x,i.y)&&(i.isPlaced=!0),this.redrawPlayer()}switchOrientation(i){"u"==i.orientation?i.orientation="v":i.orientation="u"}onPlayerCanvasHover(i,e){this.redrawPlayer();let t=this.biggestUnplacedShip();if(null!=t){let s="rgba(255,0,0, 0.5)";this.canPlaceShipAt(t,i,e)?(s="rgba(0,122,122, 0.85)",this.unsetWarningMessage()):this.setWarningMessage(),this.drawShipAt(t,i,e,s)}}init(){console.log("Spiel läuft"),this.playerCanvas=null,this.serverCanvas=null,this.playerCtx=null,this.serverCtx=null,this.fieldDimension=0,this.initPlayerDrawing(),this.initServerDrawing(),this.redrawPlayer(),this.redrawServer(),this.playerCanvas.onmousedown=this.canvasHandlerGenerator(this.playerCanvas,this.onPlayerCanvasClicked),this.playerCanvas.onmousemove=this.canvasHandlerGenerator(this.playerCanvas,this.onPlayerCanvasHover),this.playerCanvas.oncontextmenu=function(i){i.preventDefault()},this.startButton=document.getElementById("start-btn"),this.startButton.onclick=this.HandlerGenerator(this.gameStart),this.warning_msg=document.getElementsByClassName("warning-msg")[0],this.spriteShip=new spriteShipDrawer,this.spriteShip.init()}unsetWarningMessage(){this.warning_msg.style="opacity: 0"}setWarningMessage(i){null!=i&&(this.warning_msg.innerHTML=i),this.warning_msg.style="opacity: 1"}gameStart(){console.log("Starting Game");let i=document.getElementById("game-menu-overlay");i.classList.add("fade-out");let e=document.getElementById("video-wall");e.classList.add("fade-out"),document.getElementById("main-container").classList.add("game-active");let t=document.getElementsByClassName("game-field-player")[0];document.getElementsByClassName("game-field-server")[0];this.MessageBox=document.getElementsByClassName("message-box")[0];let s=this.MessageBox;setTimeout(function(){i.style="display: none",e.style="display:none",t.style="opacity: 1",s.style="opacity: 1"},2e3)}HandlerGenerator(i){var e=this;return function(t){return i.call(e,t)}}canvasHandlerGenerator(i,e){var t=this;return function(s){var a=i.getBoundingClientRect(),r=Math.floor((s.clientX-a.left)/a.width*10),n=Math.floor((s.clientY-a.top)/a.height*10);return e.call(t,r,n,s)}}}window.onload=function(){(new sinkShip).init()};