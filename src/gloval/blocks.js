var Enemy1 = cc.Sprite.extend({
  shape: null,
  body: null,
  count: null,
  anim: null,
  ctor: function(parent, posX, posY){
    this._super();
    this.count = 0;
    this.anim = 0;
    this.initWithFile(res.en10_png);
    var sprite_size = this.getContentSize(); // スプライトのサイズを取得
    this.body = new cp.Body(1,cp.momentForBox(1, 30, 30));

    this.body.setPos(cp.v(posX, posY));
    parent.addChild(  this, 0);
    this.setPosition(posX, posY);

    this.shape = new cp.BoxShape(this.body, sprite_size.width, sprite_size.height);
    this.shape.setFriction(0.5);
    this.shape.setElasticity(0.7);
    this.shape.tag = SpriteTag.en1;
    this.shape.setCollisionType(this.shape.tag);
    this.shape.image = this;
    world.addBody(this.body);
    world.addShape(this.shape);
    this.scheduleUpdate();
  },
  update: function(dt){
    this.x = this.body.p.x;
    this.y = this.body.p.y;
    this.count++;
    this.anim++;
    if (this.anim == 200) this.setTexture(res.en11_png);
    if (this.anim == 230) this.setTexture(res.en10_png);
    if (this.anim == 260) this.setTexture(res.en11_png);
    if (this.anim == 290) {
      this.setTexture(res.en10_png);
      this.anim = 0;
    }
    if (this.count == 150) {
      this.body.applyImpulse(cp.v(0, 100), cp.v(0, 0));
      this.count = 0;
    }
  }
});
var Enemy2 = cc.Sprite.extend({
  shape: null,
  body: null,
  count: null,
  anim: null,
  ctor: function(parent, posX, posY){
    this._super();
    this.count = 0;
    this.anim = 0;
    this.initWithFile(res.en20_png);
    var sprite_size = this.getContentSize(); // スプライトのサイズを取得
    this.body = new cp.Body(1,cp.momentForBox(1, 30, 30));

    this.body.setPos(cp.v(posX, posY));
    parent.addChild(  this, 0);
    this.setPosition(posX, posY);

    this.shape = new cp.BoxShape(this.body, sprite_size.width, sprite_size.height);
    this.shape.setFriction(0.5);
    this.shape.setElasticity(0.7);
    this.shape.tag = SpriteTag.en2;
    this.shape.setCollisionType(this.shape.tag);
    this.shape.image = this;
    world.addBody(this.body);
    world.addShape(this.shape);
    this.scheduleUpdate();
  },
  update: function(dt){
    this.x = this.body.p.x;
    this.y = this.body.p.y;
    this.anim++;
    this.count++;
    if (this.anim == 200) this.setTexture(res.en21_png);
    if (this.anim == 230) this.setTexture(res.en20_png);
    if (this.anim == 260) this.setTexture(res.en21_png);
    if (this.anim == 290) {
      this.setTexture(res.en20_png);
      this.anim = 0;
    }
    if (this.count == 280) {
      this.body.applyImpulse(cp.v(0, 200), cp.v(0, 0));
      this.count = 0;
    }
  }
});
var Block_EL = cc.Sprite.extend({
  shape: null,
  body: null,
  ctor: function(parent, posX, posY, mov1, mov2, cnt1, cnt2){
    this._super();
    this.initWithFile(res.box_e);
    var sprite_size = this.getContentSize(); // スプライトのサイズを取得
    this.body = new cp.Body(Infinity, Infinity);

    this.body.setPos(cp.v(posX, posY));
    parent.addChild(  this, 0);
    this.setPosition(posX, posY);

    this.shape = new cp.BoxShape(this.body, sprite_size.width, sprite_size.height);
    this.shape.setFriction(1);
    this.shape.setElasticity(0);
    this.shape.tag = SpriteTag.el;
    this.shape.setCollisionType(this.shape.tag);
    this.shape.image = this;

    var move1 = cc.MoveTo.create(cnt1 ,cc.p(this.getPositionX(), this.getPositionY() + mov1));
    var move2 = cc.MoveTo.create(cnt2 ,cc.p(this.getPositionX(), this.getPositionY() - mov2));
    var seq = cc.sequence(move1, move2);
    var rep = cc.repeatForever(seq);
    this.runAction(rep);

    world.addShape(this.shape);
    this.scheduleUpdate();
  },
  update: function(dt){
    this.body.p.x = this.x;
    this.body.p.y = this.y;
  }
});
