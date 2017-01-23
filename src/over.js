var OverScene = cc.Scene.extend({
  ctor: function(scene){
    this._super();
    return_scene = scene;
  },
  onEnter: function(){
    this._super();
    size = cc.director.getWinSize();
    var over_layer = new OverLayer(this.return_scene);
    this.addChild(over_layer);
  }
});

var OverLayer = cc.Layer.extend({
  ctor: function(scene){
    this._super();

    var background = new BackGroundLayer();
    this.addChild(background);

    var panel = new cc.LayerColor(cc.color(0, 0, 0, 150));
    this.addChild(panel);

    var over_label = cc.LabelTTF.create("Game Over", "Arial", 100);
    over_label.setColor(cc.color(39, 38, 114, 255));
    over_label.setPosition(size.width * 0.5, size.height * 0.8);
    this.addChild(over_label);

    var score_label = cc.LabelTTF.create("SCORE : " + score, "Arial", 50);
    score_label.setColor(cc.color(0, 0, 0, 255));
    score_label.setPosition(size.width * 0.5, size.height * 0.5);
    this.addChild(score_label);

    status_button[1] = cc.Sprite.create(res.button_manu);
    status_button[1].setPosition(size.width * 0.35, size.height * 0.3);
    status_button[1].setScale(2);
    this.addChild(status_button[1]);

    status_button[3] = cc.Sprite.create(res.button_again);
    status_button[3].setPosition(size.width * 0.65, size.height * 0.3);
    status_button[3].setScale(2);
    this.addChild(status_button[3]);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);
  },
  onTouchBegan: function(touch, event){
    status_box[1] = status_button[1].getBoundingBox();
    status_box[3] = status_button[3].getBoundingBox();
    if (cc.rectContainsPoint(status_box[1], touch.getLocation())) {
      status_button[1].setOpacity(120);
      status_flg[1] = true;
    }
    if (cc.rectContainsPoint(status_box[3], touch.getLocation())) {
      status_button[3].setOpacity(120);
      status_flg[3] = true;
    }
    return true;
  },
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    if (status_flg[1] == true) {
      status_flg[1] = false;
      status_button[1].setOpacity(255);
      cc.director.runScene(cc.TransitionFade.create(1, new SelectScene()));
    }
    if (status_flg[3] == true) {
      status_flg[3] = false;
      status_button[3].setOpacity(255);
      cc.director.runScene(cc.TransitionFade.create(1, return_scene));
    }
  }
});
