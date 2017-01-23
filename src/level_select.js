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
    for (var i = 0; i < select_touch.length; i++) {
      select_touch[i] = false;
    }

    var background = new BackGroundLayer();
    this.addChild(background);

    var title_label = cc.LabelTTF.create("Level Select", "Arial", 70);
    title_label.setColor(cc.color(0, 0, 0, 255));
    title_label.setPosition(size.width * 0.5, size.height * 0.8);
    this.addChild(title_label);

    stage_sprite[0] = cc.Sprite.create(res.button1_png);
    stage_sprite[0].setPosition(size.width * 0.15, size.height * 0.5);
    this.addChild(stage_sprite[0]);

    stage_sprite[1] = cc.Sprite.create(res.button2_png);
    stage_sprite[1].setPosition(size.width * 0.3, size.height * 0.5);
    this.addChild(stage_sprite[1]);

    stage_sprite[2] = cc.Sprite.create(res.button3_png);
    stage_sprite[2].setPosition(size.width * 0.45, size.height * 0.5);
    this.addChild(stage_sprite[2]);

    stage_sprite[3] = cc.Sprite.create(res.button4_png);
    stage_sprite[3].setPosition(size.width * 0.6, size.height * 0.5);
    this.addChild(stage_sprite[3]);

    stage_sprite[4] = cc.Sprite.create(res.button5_png);
    stage_sprite[4].setPosition(size.width * 0.75, size.height * 0.5);
    this.addChild(stage_sprite[4]);

    status_button[0] = cc.Sprite.create(res.bgm_png);
    status_button[0].setPosition(size.width * 0.05, size.height * 0.05);
    if (status_flg[0] == false) status_button[0].setOpacity(120);
      else status_button[0].setOpacity(255);
    this.addChild(status_button[0]);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);
      if (stage_flg[0] == true) stage_sprite[0].setOpacity(255);
      else stage_sprite[0].setOpacity(0);
      if (stage_flg[1] == true) stage_sprite[1].setOpacity(255);
      else stage_sprite[1].setOpacity(0);
      if (stage_flg[2] == true) stage_sprite[2].setOpacity(255);
      else stage_sprite[2].setOpacity(0);
      if (stage_flg[3] == true) stage_sprite[3].setOpacity(255);
      else stage_sprite[3].setOpacity(0);
      if (stage_flg[4] == true) stage_sprite[4].setOpacity(255);
      else stage_sprite[4].setOpacity(0);
  },
  onTouchBegan: function(touch, event){
    var select_box = [];
    for (var i = 0; i < stage_sprite.length; i++) {
      select_box[i] = stage_sprite[i].getBoundingBox();
    }
    status_box[0] = status_button[0].getBoundingBox();

    if (cc.rectContainsPoint(select_box[0], touch.getLocation()) && stage_flg[0] == true){
      stage_sprite[0].setOpacity(120);
      select_touch[0] = true;
    }
    if (cc.rectContainsPoint(select_box[1], touch.getLocation()) && stage_flg[1] == true){
      stage_sprite[1].setOpacity(120);
      select_touch[1] = true;
    }
    if (cc.rectContainsPoint(select_box[2], touch.getLocation()) && stage_flg[2] == true){
      stage_sprite[2].setOpacity(120);
      select_touch[2] = true;
    }
    if (cc.rectContainsPoint(select_box[3], touch.getLocation()) && stage_flg[3] == true){
      stage_sprite[3].setOpacity(120);
      select_touch[3] = true;
    }
    if (cc.rectContainsPoint(select_box[4], touch.getLocation()) && stage_flg[4] == true){
      stage_sprite[4].setOpacity(120);
      select_touch[4] = true;
    }
    if (cc.rectContainsPoint(status_box[0], touch.getLocation())){
      if (status_flg[0] == true) {
        status_button[0].setOpacity(120);
        audio.stopMusic();
        status_flg[0] = false;
      }else if (status_flg[0] == false) {
        status_button[0].setOpacity(255);
        audio.playMusic(res.bgm, true);
        status_flg[0] = true;
      }
    }
    return true;
  },
  onTouchMoved: function(touch, event){},
  onTouchEnded: function(touch, event){
    if (select_touch[0] == true) {
      select_touch[0] = false;
      stage_sprite[0].setOpacity(255);
      cc.director.runScene(cc.TransitionFade.create(1,new level1_Scene()));
    }
    if (select_touch[1] == true) {
      select_touch[1] = false;
      stage_sprite[1].setOpacity(255);
      //cc.director.runScene(new level2_Scene);
    }
    if (select_touch[2] == true) {
      select_touch[2] = false;
      stage_sprite[2].setOpacity(255);
      //cc.director.runScene(new level3_Scene);
    }
    if (select_touch[3] == true) {
      select_touch[3] = false;
      stage_sprite[3].setOpacity(255);
      //cc.director.runScene(new level4_Scene);
    }
    if (select_touch[4] == true) {
      select_touch[4] = false;
      stage_sprite[4].setOpacity(255);
      //cc.director.runScene(new level5_Scene);
    }
  }
});
