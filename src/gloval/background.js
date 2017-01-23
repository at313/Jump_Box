var BackGroundLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    var back = new cc.LayerColor(cc.color(156, 167, 226, 255));
    this.addChild(back);
    cloudlayer = cc.Layer.create();
    this.addChild(cloudlayer);
    this.schedule(this.addcloud, 1.5);
  },
  addcloud: function(){
    var cloud = new Cloud();
    cloudlayer.addChild(cloud);
  }
});

var Cloud = cc.Sprite.extend({
  ctor: function(){
    this._super();
    this.initWithFile(res.cloud_png);
    this.setOpacity(120);
    this.setScale(2);
  },
  onEnter: function(){
    this._super();
    var rand = Math.floor( Math.random() * 8 ) ;
    this.setPosition(1100, rand * 70);
    var moveAction = cc.MoveTo.create(8, new cc.Point(-250, rand * 70));
    this.runAction(moveAction);
    this.scheduleUpdate();
  },
  update: function(dt){
    if(this.getPosition().x < -150){
      cloudlayer.removeChild(this);
    }
  }
});
