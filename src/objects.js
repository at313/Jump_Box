//オブジェクトクラス
var Objects = cc.Class.extend({ // cc.Classを継承
   sprite: null, // スプライトを保持
   spriteSheet: null,
   body: null, // bodyを保持
   shape: null, // Shapeを保持

   ctor: function(parent, posX, posY ,tag) { // コンストラクタ
     this.spriteSheet = new cc.SpriteBatchNode("res/img/maptile.png");
     // ランニングアクションを初期化
     var animFrames = [];
     for (var i = 0; i < 7; i++) {
        var spriteFrame = new cc.SpriteFrame( "res/img/maptile.png", cc.rect(24 * i, 0, 24, 24));
          var str = "object" + i;
        cc.spriteFrameCache.addSpriteFrame(spriteFrame,  str);
      }
      console.log("tag:",tag)
      switch(tag) {
        case SpriteTag.nomal :
          this.sprite = cc.Sprite.create('#object0');
          console.log("object0");
          break;
        case SpriteTag.gool :
          this.sprite = cc.Sprite.create('#object1');
          console.log("#object1");
          break;
        case SpriteTag.boro :
          this.sprite = cc.Sprite.create('#object2');
          console.log("#object2");
          break;
        case SpriteTag.el :
          this.sprite = cc.Sprite.create('#object3');
          console.log("#object3");
          break;
        case SpriteTag.hata :
          this.sprite = cc.Sprite.create('#object6');
          console.log("#object6");
          break;
        defalut :
          //this.sprite = cc.Sprite.create('#object0');
          //console.log("#object00");
          break;
      }

      var sprite_size = this.sprite.getContentSize(); // スプライトのサイズを取得
      var body = new cp.Body(Infinity, Infinity);

      body.setPos(cp.v(posX, posY));
      parent.addChild(  this.sprite, 0);
      this.sprite.setPosition(posX, posY);

      this.shape = new cp.BoxShape(body, sprite_size.width, sprite_size.height);
      this.shape.setFriction(1);
      this.shape.setElasticity(0);
      this.shape.tag = tag;
      this.shape.setCollisionType(this.shape.tag);
      this.shape.image = this.sprite;
      if (tag == SpriteTag.hata) {
        this.shape.setSensor(true);
        var animation = new cc.Animation(anim_hata, 0.3);
        var runningAction = new cc.RepeatForever(new cc.animate(animation));
        this.sprite.runAction(runningAction);
      }
      world.addStaticShape(this.shape);

      shapeArray.push(this.shape);
      objectArray.push(this);
   },
   update: function(dt) {},
   removeFromParent:function () {
       world.removeStaticShape(this.shape);
       this.shape = null;
       this.sprite.removeFromParent();
       this.sprite = null;
   },
});
