var level1_Scene =  cc.Scene.extend({
  onEnter: function(){
    this._super();
    size = cc.director.getWinSize();
    set_World(this);
    layer1 = new level1Layer();
    this.addChild(layer1);
    this.scheduleUpdate();
  },
  update: function(dt){ world.step(dt); },
});

var level1Layer = cc.Layer.extend({
  //map: null,
  ctor: function(){
    this._super();
    jump = 0;
    bonus = 9000;
    pw_x = 0;
    pw_y = 0;
    touching = false;
    var back_layer = new BackGroundLayer();
    this.addChild(back_layer);

    var level_label = cc.LabelTTF.create("level:1", "Arial", 25);
    level_label.setColor(cc.color(255, 255, 255, 255));
    level_label.setPosition(size.width * 0.05, size.height * 0.95);
    this.addChild(level_label);

    score_label = cc.LabelTTF.create("score:" + score, "Arial", 25);
    score_label.setColor(cc.color(255, 255, 255, 255));
    score_label.setPosition(size.width * 0.15, size.height * 0.95);
    this.addChild(score_label);

    bonus_label = cc.LabelTTF.create("bonus:" + bonus, "Arial", 25);
    bonus_label.setColor(cc.color(255, 255, 255, 255));
    bonus_label.setPosition(size.width * 0.3, size.height * 0.95);
    this.addChild(bonus_label);

    jump_label = cc.LabelTTF.create("jump:" + jump, "Arial", 25);
    jump_label.setColor(cc.color(255, 255, 255, 255));
    jump_label.setPosition(size.width * 0.6, size.height * 0.95);
    this.addChild(jump_label);

    status_button[0] = cc.Sprite.create(res.button_manu);
    status_button[0].setPosition(size.width * 0.75, size.height * 0.95);
    this.addChild(status_button[0]);
    status_button[1] = cc.Sprite.create(res.button_reset);
    status_button[1].setPosition(size.width * 0.9, size.height * 0.95);
    this.addChild(status_button[1]);
    status_button[2] = cc.Sprite.create(res.bgm_png);
    status_button[2].setPosition(size.width * 0.05, size.height * 0.05);
    if (bgm_flg == false) status_button[2].setOpacity(120);
      else status_button[2].setOpacity(255);
    this.addChild(status_button[2]);

    l1_n[0] = new NBrock(cc.p(100, 150));
    this.addChild(l1_n[0]);
    l1_n[1] = new NBrock(cc.p(204, 150));
    this.addChild(l1_n[1]);
    l1_n[2] = new NBrock(cc.p(308, 150));
    this.addChild(l1_n[2]);
    l1_n[3] = new NBrock(cc.p(412, 150));
    this.addChild(l1_n[3]);
    l1_n[4] = new NBrock(cc.p(516, 150));
    this.addChild(l1_n[4]);

    var gool = new GBrock(cc.p(620,150));
    this.addChild(gool);

    world.addCollisionHandler(SpriteTag.pl, SpriteTag.gool,
            this.game_clear.bind(this), null, null, null);

    pl_sprite = new cc.Sprite.create(res.pl_png);
    this.addChild(pl_sprite);
    pl_sprite.setPosition(240, 200);
    pl_body = new cp.Body(1,cp.momentForBox(1, 30, 30));
    pl_body.setPos(cp.v(240, 200));
    world.addBody(pl_body);
    pl_shape = new cp.BoxShape(pl_body, 30, 30);
    pl_shape.setFriction(0.5);
    pl_shape.setElasticity(0.7);
    pl_shape.image = pl_sprite;
    world.addShape(pl_shape);
    pl_shape.setCollisionType(SpriteTag.pl);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);

      this.scheduleUpdate();

    /*
    this.map = new cc.TMXTiledMap(res.prt_tmx);
    this.addChild(this.map);

    var nboxGroup = this.map.getObjectGroup("coin");
    var nboxArray = nboxGroup.getObjects();
    for (var i = 0; i < nboxArray.length; i++) {
        var nbox = new nBox(this.space,cc.p(nboxArray[i]["x"],nboxArray[i]["y"]));
      }
      */
    },
    game_clear: function(){
      r_bonus = bonus;
      r_jump = jump;
      cc.director.runScene(cc.TransitionFade.create(1, new ClearScene()));
    },
    update: function(dt){
    pl_shape.image.x = pl_shape.body.p.x
    pl_shape.image.y = pl_shape.body.p.y
    var angle = Math.atan2(-pl_shape.body.rot.y, pl_shape.body.rot.x);
    pl_shape.image.rotation= angle*57.2957795;

    bonus--;
    bonus_label.setString("bonus:" + bonus, "Arial", 25);

  },
  onTouchBegan: function(touch, event){
    pl_box = pl_sprite.getBoundingBox();
    if (cc.rectContainsPoint(pl_box, touch.getLocation())) touching = true;
    if (touching == true) {
      farst_pos = touch.getLocation();
      current_pos = touch.getLocation();
      create_obj(layer1);
    }
      return true;
  },
  onTouchMoved: function(touch, event){
    if (touching == true) {
      current_pos = touch.getLocation();
      Graphic.clear();
      create_obj(layer1);
      calcDirection();
    }
  },
  onTouchEnded: function(touch, event){
    if (touching == true) {
      current_pos = touch.getLocation();
      Graphic.clear();
      console.log(jump);
      pl_body.applyImpulse(cp.v(-pw_x * 2, -pw_y * 2), cp.v(0, 0));
      pw_x = 0;
      pw_y = 0;
      jump+=1;
      jump_label.setString("jump:" + jump, "Arial", 25);
      touching = false;
    }
  }
});
