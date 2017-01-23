//オブジェクトクラス
var Objects = cc.Class.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持

   ctor: function(parent, posX, posY ,tag) { // コンストラクタ
     this.spriteSheet = new cc.SpriteBatchNode("res/maptile.png");
     // ランニングアクションを初期化
     var animFrames = [];
     for (var i = 0; i < 5; i++) {
        var spriteFrame = new cc.SpriteFrame( "res/maptile.png", cc.rect(24 * i, 0, 24, 24));
          var str = "object" + i;
        cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
      }
      console.log("tag:",tag)
      switch(tag) {
        case SpriteTag.bomb :
          this.sprite = cc.Sprite.create('#object0');
          console.log("object0");
          break;
        case SpriteTag.koban :
          this.sprite = cc.Sprite.create('#object1');
          console.log("#object1");
          break;
        case SpriteTag.food :
          this.sprite = cc.Sprite.create('#object2');
          console.log("#object2");
          break;
        case SpriteTag.monster1 :
          this.sprite = cc.Sprite.create('#object3');
          console.log("#object3");
          break;
        case SpriteTag.monster2 :
          this.sprite = cc.Sprite.create('#object4');
          console.log("#object4");
          break;
        defalut :
          this.sprite = cc.Sprite.create('#object0');
          console.log("#object00");
          break;
      }

      var size =   this.sprite.getContentSize(); // スプライトのサイズを取得
      var body = new cp.Body(Infinity, Infinity);

      body.setPos(cp.v(posX, posY));
      parent.addChild(  this.sprite, 0);
      this.sprite.setPosition(posX, posY);

      this.shape = new cp.BoxShape(body, size.width, size.height);
      this.shape.setFriction(1);
      this.shape.setElasticity(0);
      this.shape.tag = tag;
      this.shape.setCollisionType(this.shape.tag);
      this.shape.image = this.sprite;
      space.addStaticShape(this.shape);

      shapeArray.push(this.shape);
      objectArray.push(this);
   },
   update: function(dt) {},
   removeFromParent:function () {
       space.removeStaticShape(this.shape);
       this.shape = null;
       this.sprite.removeFromParent();
       this.sprite = null;
   },
});
