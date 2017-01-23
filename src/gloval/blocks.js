var NBrock = cc.PhysicsSprite.extend({
  ctor: function(pos){
    this._super();
    this.initWithFile(res.box_n);
    var body = new cp.StaticBody();
    body.setPos(pos);
    this.setBody(body);

    this.shape = new cp.BoxShape(body, 104, 30);
    //this.shape.setSensor(true);

    this.shape.setFriction(0.5);
    this.shape.setElasticity(0.7);

    world.addStaticShape(this.shape);
  }
});

var GBrock = cc.PhysicsSprite.extend({
  ctor: function(pos){
    this._super();
    this.initWithFile(res.box_g);
    var body = new cp.StaticBody();
    body.setPos(pos);
    this.setBody(body);

    this.shape = new cp.BoxShape(body, 104, 30);

    this.shape.setFriction(0.5);
    this.shape.setElasticity(0.7);
    world.addStaticShape(this.shape);

    var hata = cc.PhysicsSprite.create(res.hata1_png);
    var g_body = new cp.StaticBody();
    this.addChild(hata);
    //g_body.setPos(cc.p(65, 55));
    hata.setBody(g_body);

    hata.shape = new cp.BoxShape(g_body, 33, 50);
    this.shape.setCollisionType(SpriteTag.gool);
    hata.shape.setSensor(true);

    world.addStaticShape(hata.shape);
  }
});

var DBrock = cc.PhysicsSprite.extend({
  ctor: function(pos){
    this._super();
    this.initWithFile(res.box_d);
    var body = new cp.StaticBody();
    body.setPos(pos);
    this.setBody(body);

    this.shape = new cp.BoxShape(body, 104, 30);
    //this.shape.setSensor(true);
    this.shape.setCollisionType(SpriteTag.boro);

    this.shape.setFriction(0.5);
    this.shape.setElasticity(0.7);
    world.addStaticShape(this.shape);
  }
});

var EBrock = cc.PhysicsSprite.extend({
  ctor: function(pos){
    this._super();
    this.initWithFile(res.box_e);
    var body = new cp.StaticBody();
    body.setPos(pos);
    this.setBody(body);

    this.shape = new cp.BoxShape(body, 104, 30);

    this.shape.setFriction(0.5);
    this.shape.setElasticity(0.7);
    world.addStaticShape(this.shape);
  }
});

var Enemy = cc.PhysicsSprite.extend({
  ctor: function(pos){
    this._super();
    this.initWithFile(res.en1_png);
  }
});
