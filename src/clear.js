var ClearScene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    size = cc.director.getWinSize();
    var clear_layer = new ClearLayer();
    this.addChild(clear_layer);
  }
});

var ClearLayer = cc.Layer.extend({
  ctor: function(){
    this._super();

    over_flg = false;
    var background = new BackGroundLayer();
    this.addChild(background);

    var clear_label = cc.LabelTTF.create("Game Clear!!", "Arial", 100);
    clear_label.setColor(cc.color(243, 213, 26, 255));
    clear_label.setPosition(size.width * 0.5, size.height * 0.8);
    this.addChild(clear_label);

    var oldscore_label = cc.LabelTTF.create("OLDSCORE : " + score, "Arial", 50);
    oldscore_label.setColor(cc.color(0, 0, 0, 255));
    oldscore_label.setPosition(size.width * 0.5, size.height * 0.6);
    this.addChild(oldscore_label);

    var bonus_label = cc.LabelTTF.create("BONUS : " + r_bonus, "Arial", 50);
    bonus_label.setColor(cc.color(0, 0, 0, 255));
    bonus_label.setPosition(size.width * 0.5, size.height * 0.45);
    this.addChild(bonus_label);

    var jump_label = cc.LabelTTF.create("JUMP : " + ((r_jump * -100) + 100), "Arial", 50);
    jump_label.setColor(cc.color(0, 0, 0, 255));
    jump_label.setPosition(size.width * 0.5, size.height * 0.3);
    this.addChild(jump_label);

    score = score + r_bonus + r_jump;
    var score_label = cc.LabelTTF.create("SCORE : " + score, "Arial", 50);
    score_label.setColor(cc.color(0, 0, 0, 255));
    score_label.setPosition(size.width * 0.5, size.height * 0.15);
    this.addChild(score_label);

    var next_label = cc.LabelTTF.create("Touch on NextStage", "Arial", 30);
    next_label.setColor(cc.color(255, 255, 255, 255));
    next_label.setPosition(size.width * 0.5 , size.height * 0.05);
    next_label.runAction(cc.repeatForever(cc.Blink.create(1,1)));
    this.addChild(next_label);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);
  },
  onTouchBegan: function(touch, event){return true;},
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    cc.director.runScene(cc.TransitionFade.create(1, new SelectScene()));
  }
});
