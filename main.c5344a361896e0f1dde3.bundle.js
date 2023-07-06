(()=>{"use strict";var e,t={223:(e,t,s)=>{var i=s(260),a=s.n(i);const r={JUMP:{key:"virtual-guy-jump",path:"assets\\sprites\\Main Characters\\Virtual Guy\\Jump.png"},FALL:{key:"virtual-guy-fall",path:"assets\\sprites\\Main Characters\\Virtual Guy\\Fall.png"},HIT:{key:"virtual-guy-hit",path:"assets\\sprites\\Main Characters\\Virtual Guy\\Hit.png"},IDLE:{key:"virtual-guy-idle",path:"assets\\sprites\\Main Characters\\Virtual Guy\\Idle.png"},RUN:{key:"virtual-guy-run",path:"assets\\sprites\\Main Characters\\Virtual Guy\\Run.png"},WALL_JUMP:{key:"virtual-guy-wall-jump",path:"assets\\sprites\\Main Characters\\Virtual Guy\\Wall Jump.png"},DOUBLE_JUMP:{key:"virtual-guy-double-jump",path:"assets\\sprites\\Main Characters\\Virtual Guy\\Double Jump.png"}},n="base-terrain",h="assets\\sprites\\Terrain\\Terrain.png",p="base-background-brown",l="assets\\sprites\\Background\\Brown.png",o="base-background-blue",c="assets\\sprites\\Background\\Blue.png",d="base-background-gray",y="assets\\sprites\\Background\\Gray.png",u="base-background-green",g="assets\\sprites\\Background\\Green.png",m="base-background-pink",v="assets\\sprites\\Background\\Pink.png",L="base-background-purple",f="assets\\sprites\\Background\\Purple.png",b="base-background-yellow",S="assets\\sprites\\Background\\Yellow.png",k="item-apple",w="assets\\sprites\\Items\\Fruits\\Apple.png",M="spike",F="assets\\sprites\\Traps\\Spikes\\Idle.png";var E;!function(e){e.LOADING="loading",e.MENU="menu",e.GAME_OVER="game-over",e.LEVEL1="level-1",e.LEVEL2="level-2",e.LEVEL3="level-3"}(E||(E={}));class P extends Phaser.Scene{preload(){const e=500,t=this.add.graphics(),s=this.add.graphics();s.fillStyle(0,1),s.fillRect((this.scale.canvas.width-e)/2,(this.scale.canvas.height-50)/2,e,50),this.load.on("progress",(s=>{t.clear(),t.fillStyle(16250871,1),t.fillRect((this.scale.canvas.width-e)/2,(this.scale.canvas.height-50)/2,e*s,50).setDepth(6)})),this.load.on("complete",(()=>{t.destroy(),s.destroy(),this.scene.start(E.LEVEL1)})),this.load.spritesheet(r.JUMP.key,r.JUMP.path,{frameWidth:32,frameHeight:32}),this.load.spritesheet(r.DOUBLE_JUMP.key,r.DOUBLE_JUMP.path,{frameWidth:32,frameHeight:32}),this.load.spritesheet(r.WALL_JUMP.key,r.WALL_JUMP.path,{frameWidth:32,frameHeight:32}),this.load.spritesheet(r.FALL.key,r.FALL.path,{frameWidth:32,frameHeight:32}),this.load.spritesheet(r.HIT.key,r.HIT.path,{frameWidth:32,frameHeight:32}),this.load.spritesheet(r.IDLE.key,r.IDLE.path,{frameWidth:32,frameHeight:32}),this.load.spritesheet(r.RUN.key,r.RUN.path,{frameWidth:32,frameHeight:32}),this.load.image(k,w),this.load.image(M,F),this.load.image(n,h),this.load.image(p,l),this.load.image(o,c),this.load.image(d,y),this.load.image(u,g),this.load.image(L,f),this.load.image(b,S),this.load.image(m,v)}}const U={type:Phaser.AUTO,width:window.innerWidth,height:window.innerHeight,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},physics:{default:"arcade",arcade:{gravity:{y:500},debug:!0}},scene:[P],pixelArt:!0},D={JUMP:"jump",FALL:"fall",HIT:"hit",IDLE:"idle",RUN:"run",WALL_JUMP:"wall-jump",DOUBLE_JUMP:"double-jump"};class I{static get Instance(){return I.instance||(I.instance=new I),I.instance}initialize(e){null!==e.input.keyboard&&(this.keyboard=e.input.keyboard,this.cursor=this.keyboard.createCursorKeys())}isSpaceKeyDown(){return Phaser.Input.Keyboard.JustDown(this.cursor.space)}isLeftKeyDown(){return this.cursor.left.isDown}isRightKeyDown(){return this.cursor.right.isDown}}class A{constructor(e){this.parent=e}}class O extends A{constructor(){super(...arguments),this.moveForce=100}Enter(){this.parent.jumpCount=0,this.parent.play(D.RUN)}Update(){this.parent.persistenceForce(),I.Instance.isLeftKeyDown()?(this.parent.applyForceX(-this.moveForce),this.parent.flipPlayerLeft()):I.Instance.isRightKeyDown()?(this.parent.applyForceX(this.moveForce),this.parent.flipPlayerRight()):this.parent.isGrounded?this.parent.gotoState(D.IDLE):this.parent.gotoState(D.FALL),I.Instance.isSpaceKeyDown()&&this.parent.gotoState(D.JUMP)}Exit(){this.parent.stop()}}class j extends A{constructor(){super(...arguments),this.inAirMoveForce=75}Enter(){this.parent.play(D.FALL)}Update(){this.parent.persistenceForce(),this.parent.isGrounded?this.parent.gotoState(D.IDLE):this.parent.isTouchingWall?this.parent.gotoState(D.WALL_JUMP):1==this.parent.jumpCount&&I.Instance.isSpaceKeyDown()?this.parent.gotoState(D.DOUBLE_JUMP):0==this.parent.jumpCount&&I.Instance.isSpaceKeyDown()&&this.parent.gotoState(D.JUMP),I.Instance.isLeftKeyDown()?(this.parent.applyForceX(-this.inAirMoveForce),this.parent.flipPlayerLeft()):I.Instance.isRightKeyDown()&&(this.parent.applyForceX(this.inAirMoveForce),this.parent.flipPlayerRight())}Exit(){this.parent.stop()}}class x extends A{Enter(){this.parent.jumpCount=0,this.parent.play(D.IDLE)}Update(){this.parent.persistenceForce(),I.Instance.isLeftKeyDown()?(this.parent.flipPlayerLeft(),this.parent.gotoState(D.RUN)):I.Instance.isRightKeyDown()&&(this.parent.flipPlayerRight(),this.parent.gotoState(D.RUN)),I.Instance.isSpaceKeyDown()&&this.parent.gotoState(D.JUMP)}Exit(){this.parent.stop()}}class T extends A{Enter(){this.parent.play(D.HIT)}Update(){}jump(){}Exit(){this.parent.stop()}}class J extends A{constructor(){super(...arguments),this.jumpForce=-250,this.inAirMoveForce=75}Enter(){this.parent.setVelocityY(0),this.parent.play(D.JUMP),++this.parent.jumpCount,this.jump()}Update(){I.Instance.isLeftKeyDown()?(this.parent.applyForceX(-this.inAirMoveForce),this.parent.flipPlayerLeft()):I.Instance.isRightKeyDown()&&(this.parent.applyForceX(this.inAirMoveForce),this.parent.flipPlayerRight()),this.parent.jumpCount<this.parent.maxJumpCount&&I.Instance.isSpaceKeyDown()&&this.parent.gotoState(D.DOUBLE_JUMP),null!==this.parent.body&&this.parent.body.velocity.y>0&&this.parent.gotoState(D.FALL)}jump(){this.parent.setVelocityY(this.jumpForce)}Exit(){this.parent.stop()}}class R extends A{constructor(){super(...arguments),this.jumpForce=-175,this.inAirMoveForce=50}Enter(){this.parent.play(D.DOUBLE_JUMP),++this.parent.jumpCount,this.jump()}Update(){I.Instance.isLeftKeyDown()?(this.parent.applyForceX(-this.inAirMoveForce),this.parent.flipPlayerLeft()):I.Instance.isRightKeyDown()&&(this.parent.applyForceX(this.inAirMoveForce),this.parent.flipPlayerRight()),null!==this.parent.body&&this.parent.body.velocity.y>0&&this.parent.gotoState(D.FALL)}jump(){this.parent.setVelocityY(this.jumpForce)}Exit(){this.parent.stop()}}class W extends A{constructor(){super(...arguments),this.worldGravity=0,this.inAirMoveForce=10}Enter(){var e;null===(e=this.parent.body)||void 0===e||e.velocity.set(0,0),this.worldGravity=this.parent.scene.physics.world.gravity.y,this.parent.scene.physics.world.gravity.y=.05*this.worldGravity,this.parent.jumpCount=0,this.parent.play(D.WALL_JUMP)}Update(){this.parent.persistenceForce(),this.parent.isTouchingWall||this.parent.gotoState(D.FALL),this.parent.isGrounded&&this.parent.gotoState(D.IDLE),I.Instance.isSpaceKeyDown()&&this.parent.gotoState(D.JUMP),I.Instance.isRightKeyDown()&&this.parent.isTouchingWallLeft?(this.parent.applyForceX(this.inAirMoveForce),this.parent.flipPlayerRight()):I.Instance.isLeftKeyDown()&&!this.parent.isTouchingWallLeft&&(this.parent.applyForceX(-this.inAirMoveForce),this.parent.flipPlayerLeft())}Exit(){this.parent.scene.physics.world.gravity.y=this.worldGravity,this.parent.stop()}}class _{constructor(){this.data=[]}push(e){this.data.push(e)}pop(){return this.data.pop()}top(){return this.data[this.data.length-1]}length(){return this.data.length}}class C extends Phaser.Physics.Arcade.Sprite{constructor(e,t,s,i){super(e,t,s,i.IDLE.key),this.playerStateStack=new _,this.playerState=new Map,this.BODY_SCALE_FACTOR={x:.5,y:.5},this.BODY_OFFSET={x:7.5,y:15},this.isGrounded=!0,this.isTouchingWall=!1,this.isTouchingWallLeft=!1,this.isFacingLeft=!1,this.jumpCount=0,this.maxJumpCount=2,this.playerSpriteObj=i,this.create(),this.scene.add.existing(this),this.scene.physics.world.enable(this),null!==this.body&&this.body.setSize(.5*this.width,.8*this.height).setOffset(7.5,5)}create(){this.createAnimations(),this.createState()}createState(){this.playerState.set(D.RUN,new O(this)),this.playerState.set(D.FALL,new j(this)),this.playerState.set(D.IDLE,new x(this)),this.playerState.set(D.HIT,new T(this)),this.playerState.set(D.JUMP,new J(this)),this.playerState.set(D.WALL_JUMP,new W(this)),this.playerState.set(D.DOUBLE_JUMP,new R(this));const e=this.playerState.get(D.IDLE);void 0!==e&&this.playerStateStack.push(e)}createAnimations(){Object.values(D).forEach((e=>{this.scene.anims.exists(e)&&this.scene.anims.remove(e)})),this.anims.create({key:D.JUMP,frames:this.anims.generateFrameNumbers(this.playerSpriteObj.JUMP.key,{start:0,end:-1}),frameRate:15,repeat:-1}),this.anims.create({key:D.DOUBLE_JUMP,frames:this.anims.generateFrameNumbers(this.playerSpriteObj.DOUBLE_JUMP.key,{start:0,end:-1}),frameRate:15,repeat:0}),this.anims.create({key:D.WALL_JUMP,frames:this.anims.generateFrameNumbers(this.playerSpriteObj.WALL_JUMP.key,{start:0,end:-1}),frameRate:15,repeat:0}),this.anims.create({key:D.HIT,frames:this.anims.generateFrameNumbers(this.playerSpriteObj.HIT.key,{start:0,end:-1}),frameRate:15,repeat:0}),this.anims.create({key:D.FALL,frames:this.anims.generateFrameNumbers(this.playerSpriteObj.FALL.key,{start:0,end:-1}),frameRate:15,repeat:0}),this.anims.create({key:D.IDLE,frames:this.anims.generateFrameNumbers(this.playerSpriteObj.IDLE.key,{start:0,end:-1}),frameRate:15,repeat:-1}),this.anims.create({key:D.RUN,frames:this.anims.generateFrameNumbers(this.playerSpriteObj.RUN.key,{start:0,end:-1}),frameRate:15,repeat:-1}),this.play(D.IDLE)}gotoState(e){var t,s;this.playerStateStack.length()>1&&(null===(t=this.playerStateStack.top())||void 0===t||t.Exit(),this.playerStateStack.pop());const i=this.playerState.get(e);void 0!==i&&(this.playerStateStack.push(i),null===(s=this.playerStateStack.top())||void 0===s||s.Enter())}applyForceX(e){this.setVelocityX(e)}flipPlayerLeft(){this.flipX=!0,this.isFacingLeft=!0}flipPlayerRight(){this.flipX=!1,this.isFacingLeft=!1}update(){var e;null===(e=this.playerStateStack.top())||void 0===e||e.Update(),this.updateFlags()}persistenceForce(){this.isFacingLeft?this.applyForceX(-1e-8):this.isFacingLeft||this.applyForceX(1e-8)}updateFlags(){var e,t,s;(null===(e=this.body)||void 0===e?void 0:e.blocked.down)?this.isGrounded=!0:this.isGrounded=!1,(null===(t=this.body)||void 0===t?void 0:t.blocked.left)?(this.isTouchingWall=!0,this.isTouchingWallLeft=!0):(null===(s=this.body)||void 0===s?void 0:s.blocked.right)?(this.isTouchingWall=!0,this.isTouchingWallLeft=!1):this.isTouchingWall=!1}}var G=s(4),B=s.n(G);class K extends Phaser.Scene{constructor(){super(...arguments),this.backgroundScrollSpeed=.01}preload(){this.load.tilemapTiledJSON("level-1","assets\\level\\Level1.json"),this.load.scenePlugin("animatedTiles",B(),"animatedTiles","animatedTiles")}create(){I.Instance.initialize(this),this.createPlayer(),this.createMap(),this.setupCamera()}createMap(){var e,t,s;this.levelMap=this.make.tilemap({key:"level-1",tileWidth:16,tileHeight:16});const i=this.levelMap.addTilesetImage("Terrain",n),a=this.levelMap.addTilesetImage("Apple",k),r=this.levelMap.addTilesetImage("Spike",M);null!==i&&null!==a&&null!==r&&(this.platform=null===(e=this.levelMap.createLayer("Ground",i,0,0))||void 0===e?void 0:e.setOrigin(0),this.spike=null===(t=this.levelMap.createLayer("Spike",r,0,0))||void 0===t?void 0:t.setOrigin(0),this.collectibles=null===(s=this.levelMap.createLayer("Collectibles",a,0,0))||void 0===s?void 0:s.setOrigin(0),void 0!==this.platform&&void 0!==this.collectibles&&void 0!==this.spike&&(this.physics.world.bounds.width=this.platform.width,this.platform.setCollision([94,95,96,97,98,116,117,118,119,120,138,139,140]),this.physics.add.collider(this.player,this.platform,void 0,void 0,this),this.spike.forEachTile((e=>{if(-1!=e.index){const t=e.getTileData();let s=0,i=0,a=0,r=0;if(t){const n=t.objectgroup.objects[0];e.rotation==Phaser.Math.PI2/4?(s=e.pixelX,i=e.pixelY,a=n.height,r=n.width):e.rotation==Phaser.Math.PI2/(4/3)?(s=e.pixelX+n.y,i=e.pixelY,a=n.height,r=n.width):(s=e.pixelX,i=e.pixelY+n.y,a=n.width,r=n.height);const h=this.add.rectangle(s,i,a,r).setOrigin(0);this.physics.add.existing(h,!0),this.physics.add.collider(h,this.player,(()=>{this.player.gotoState(D.JUMP)}),void 0,this)}}})),this.physics.add.overlap(this.player,this.collectibles,(()=>{var e;if(null!==this.player.body){const t=new Phaser.Geom.Rectangle(this.player.body.position.x,this.player.body.position.y,.735*this.player.body.width,.75*this.player.body.height),s=null===(e=this.collectibles)||void 0===e?void 0:e.getTilesWithinShape(t);void 0!==s&&s.forEach((e=>{null!==e&&-1!=e.index&&e.setVisible(!1)}))}}),void 0,this))),this.sys.animatedTiles.init(this.levelMap),this.background=this.add.tileSprite(0,0,1e4,1e4,p).setDepth(-1)}setupCamera(){this.cameras.main.setBounds(0,0,this.levelMap.widthInPixels,this.levelMap.heightInPixels),this.cameras.main.setZoom(4),this.cameras.main.startFollow(this.player)}createPlayer(){this.player=new C(this,1400,100,r).setDepth(10),this.player.setCollideWorldBounds(!0)}update(e,t){this.background.tilePositionY-=this.backgroundScrollSpeed*t,this.player.update()}}window.addEventListener("load",(()=>{const e=new(a().Game)(U);e.scene.add(E.LOADING,P),e.scene.add(E.MENU,P),e.scene.add(E.LEVEL1,K),e.scene.add(E.LEVEL2,P),e.scene.add(E.LEVEL3,P),e.scene.add(E.GAME_OVER,P)}))}},s={};function i(e){var a=s[e];if(void 0!==a)return a.exports;var r=s[e]={exports:{}};return t[e].call(r.exports,r,r.exports,i),r.exports}i.m=t,e=[],i.O=(t,s,a,r)=>{if(!s){var n=1/0;for(o=0;o<e.length;o++){for(var[s,a,r]=e[o],h=!0,p=0;p<s.length;p++)(!1&r||n>=r)&&Object.keys(i.O).every((e=>i.O[e](s[p])))?s.splice(p--,1):(h=!1,r<n&&(n=r));if(h){e.splice(o--,1);var l=a();void 0!==l&&(t=l)}}return t}r=r||0;for(var o=e.length;o>0&&e[o-1][2]>r;o--)e[o]=e[o-1];e[o]=[s,a,r]},i.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};i.O.j=t=>0===e[t];var t=(t,s)=>{var a,r,[n,h,p]=s,l=0;if(n.some((t=>0!==e[t]))){for(a in h)i.o(h,a)&&(i.m[a]=h[a]);if(p)var o=p(i)}for(t&&t(s);l<n.length;l++)r=n[l],i.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return i.O(o)},s=self.webpackChunktype_project_template=self.webpackChunktype_project_template||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var a=i.O(void 0,[216],(()=>i(223)));a=i.O(a)})();