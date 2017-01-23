var TitleScene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    size = cc.director.getWinSize();
    var title_layer = new Title_Layer();
    this.addChild(title_layer);

    var title_label = cc.LabelTTF.create("Jamp Block", "Arial", 100);
    title_label.setColor(cc.color(0, 0, 0, 255));
    title_label.setPosition(size.width * 0.5, size.height * 0.8);
    this.addChild(title_label);

    var start_label = cc.LabelTTF.create("Touch on Start!!", "Arial", 50);
    start_label.setColor(cc.color(255, 255, 255, 255));
    start_label.setPosition(size.width * 0.5, size.height * 0.2);
    start_label.runAction(cc.repeatForever(cc.Blink.create(1,1)));
    this.addChild(start_label);
  }
});

var Title_Layer = cc.Layer.extend({
  ctor: function(){
    this._super();

    audio = cc.audioEngine;
    audio.playMusic(res.bgm, true);
    status_flg[0] = true;

    stage_flg[0] = true;
    stage_flg[1] = false;
    stage_flg[2] = false;
    stage_flg[3] = false;
    stage_flg[4] = false;

    var background = new BackGroundLayer();
    this.addChild(background);

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
