var SelectScene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    size = cc.director.getWinSize();
    var select_layer = new Select_Layer();
    this.addChild(select_layer);
  }
});

var Select_Layer = cc.Layer.extend({
  ctor: function(){
    this._super();

    score = 0;
    s1_tachi = false;
    s2_tachi = false;
    s3_tachi = false;
    s4_tachi = false;
    s5_tachi = false;

    var background = new BackGroundLayer();
    this.addChild(background);

    var title_label = cc.LabelTTF.create("Level Select", "Arial", 70);
    title_label.setColor(cc.color(0, 0, 0, 255));
    title_label.setPosition(size.width * 0.5, size.height * 0.8);
    this.addChild(title_label);

    s1 = new cc.Sprite.create(res.button1_png);
    s1.setPosition(size.width * 0.15, size.height * 0.5);
    this.addChild(s1);

    s2 = new cc.Sprite.create(res.button2_png);
    s2.setPosition(size.width * 0.3, size.height * 0.5);
    this.addChild(s2);

    s3 = new cc.Sprite.create(res.button3_png);
    s3.setPosition(size.width * 0.45, size.height * 0.5);
    this.addChild(s3);

    s4 = new cc.Sprite.create(res.button4_png);
    s4.setPosition(size.width * 0.6, size.height * 0.5);
    this.addChild(s4);

    s5 = new cc.Sprite.create(res.button5_png);
    s5.setPosition(size.width * 0.75, size.height * 0.5);
    this.addChild(s5);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);
      if (s1_flg == true) s1.setOpacity(255);
      else s1.setOpacity(0);
      if (s2_flg == true) s2.setOpacity(255);
      else s2.setOpacity(0);
      if (s3_flg == true) s3.setOpacity(255);
      else s3.setOpacity(0);
      if (s4_flg == true) s4.setOpacity(255);
      else s4.setOpacity(0);
      if (s5_flg == true) s5.setOpacity(255);
      else s5.setOpacity(0);
  },
  onTouchBegan: function(touch, event){
    var s1_box = s1.getBoundingBox();
    var s2_box = s2.getBoundingBox();
    var s3_box = s3.getBoundingBox();
    var s4_box = s4.getBoundingBox();
    var s5_box = s5.getBoundingBox();

    if (cc.rectContainsPoint(s1_box, touch.getLocation()) && s1_flg == true){
      s1.setOpacity(120);
      s1_tachi = true;
    }
    if (cc.rectContainsPoint(s2_box, touch.getLocation()) && s2_flg == true){
      s2.setOpacity(120);
      s2_tachi = true;
    }
    if (cc.rectContainsPoint(s3_box, touch.getLocation()) && s3_flg == true){
      s3.setOpacity(120);
      s3_tachi = true;
    }
    if (cc.rectContainsPoint(s4_box, touch.getLocation()) && s4_flg == true){
      s4.setOpacity(120);
      s4_tachi = true;
    }
    if (cc.rectContainsPoint(s5_box, touch.getLocation()) && s5_flg == true){
      s5.setOpacity(120);
      s5_tachi = true;
    }
    return true;
  },
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    if (s1_tachi == true) {
      s1_tachi = false;
      s1.setOpacity(255);
      cc.director.runScene(cc.TransitionFade.create(1,new level1_Scene()));
    }
    if (s2_tachi == true) {
      s2_tachi = false;
      s2.setOpacity(255);
      //cc.director.runScene(new level2_Scene);
    }
    if (s3_tachi == true) {
      s3_tachi = false;
      s3.setOpacity(255);
      //cc.director.runScene(new level3_Scene);
    }
    if (s4_tachi == true) {
      s4_tachi = false;
      s4.setOpacity(255);
      //cc.director.runScene(new level4_Scene);
    }
    if (s5_tachi == true) {
      s5_tachi = false;
      s5.setOpacity(255);
      //cc.director.runScene(new level5_Scene);
    }
  }
});
