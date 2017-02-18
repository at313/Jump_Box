var level2_Scene =  cc.Scene.extend({
  onEnter: function(){
    this._super();
    size = cc.director.getWinSize();
    set_World(this);
    stage_layer[1] = new level2Layer();
    this.addChild(stage_layer[1]);
    this.scheduleUpdate();
  },
  update: function(dt){ world.step(dt); },
});

var level2Layer = cc.Layer.extend({
  ctor: function(){
    this._super();
    anim_pl = 0;
    jump = 0;
    bonus = 9999;
    pw_x = 0;
    pw_y = 0;
    touching = false;
    status_flg[1] = false;
    status_flg[2] = false;
    var back_layer = new BackGroundLayer();
    this.addChild(back_layer);

    var level_label = cc.LabelTTF.create("level:2", "Arial", 25);
    level_label.setColor(cc.color(255, 255, 255, 255));
    level_label.setPosition(size.width * 0.05, size.height * 0.95);
    this.addChild(level_label);

    score_label = cc.LabelTTF.create("score:" + score, "Arial", 25);
    score_label.setColor(cc.color(255, 255, 255, 255));
    score_label.setPosition(size.width * 0.15, size.height * 0.95);
    this.addChild(score_label);

    bonus_label = cc.LabelTTF.create("bonus:" + bonus, "Arial", 25);
    bonus_label.setColor(cc.color(255, 255, 255, 255));
    bonus_label.setPosition(size.width * 0.45, size.height * 0.95);
    this.addChild(bonus_label);

    jump_label = cc.LabelTTF.create("jump:" + jump, "Arial", 25);
    jump_label.setColor(cc.color(255, 255, 255, 255));
    jump_label.setPosition(size.width * 0.6, size.height * 0.95);
    this.addChild(jump_label);

    status_button[1] = cc.Sprite.create(res.button_manu);
    status_button[1].setPosition(size.width * 0.75, size.height * 0.95);
    status_button[1].setScale(1);
    this.addChild(status_button[1]);

    status_button[2] = cc.Sprite.create(res.button_reset);
    status_button[2].setPosition(size.width * 0.9, size.height * 0.95);
    status_button[2].setScale(1);
    this.addChild(status_button[2]);

    status_button[0] = cc.Sprite.create(res.bgm_png);
    status_button[0].setPosition(size.width * 0.05, size.height * 0.05);
    status_button[0].setScale(1);
    if (status_flg[0] == false) status_button[0].setOpacity(120);
      else status_button[0].setOpacity(255);
    this.addChild(status_button[0]);

    world.addCollisionHandler(SpriteTag.pl, SpriteTag.gool,
            this.game_clear.bind(this), null, null, null);
    world.addCollisionHandler(SpriteTag.pl, SpriteTag.boro,
            this.block_ban.bind(this), null, null, this.boro_block.bind(this));
    world.addCollisionHandler(SpriteTag.pl, SpriteTag.nomal,
            this.block_ban.bind(this), null, null, null);
    world.addCollisionHandler(SpriteTag.pl, SpriteTag.el,
            this.block_ban.bind(this), null, null, null);
    world.addCollisionHandler(SpriteTag.pl, SpriteTag.en2,
            this.game_over.bind(this), null, null, null);

    //var a = new Block_EL(this, 200, 200);
    //var b = new Enemy1(this, 200, 200);

    player_set[0] = new cc.Sprite.create(res.pl0_png);
    this.addChild(player_set[0]);
    player_set[0].setPosition(100, 200);
    player_set[1] = new cp.Body(1,cp.momentForBox(1, 30, 30));
    player_set[1].setPos(cp.v(100, 200));
    world.addBody(player_set[1]);
    player_set[2] = new cp.BoxShape(player_set[1], 30, 30);
    player_set[2].setFriction(0.5);
    player_set[2].setElasticity(0.7);
    player_set[2].image = player_set[0];
    world.addShape(player_set[2]);
    player_set[2].setCollisionType(SpriteTag.pl);

    cc.eventManager.addListener({
          event: cc.EventListener.TOUCH_ONE_BY_ONE,
          swallowTouches: true,
          onTouchBegan: this.onTouchBegan,
          onTouchMoved: this.onTouchMoved,
          onTouchEnded: this.onTouchEnded
      }, this);

    this.scheduleUpdate();

    var map = new Tiledmap(this, res.lv2_tmx);
    },
    block_ban: function(){
      var exp = new cc.ParticleSystem(res.block_plist);
      exp.setPosition(cc.p(player_set[0].getPositionX(), player_set[0].getPositionY()-12));
      this.addChild(exp, 5);
      exp.setAutoRemoveOnFinish(true);
      audio.playEffect(res.se_ban);
      return true;
    },
    game_clear: function(){
      r_bonus = bonus;
      r_jump = jump;
      stage_flg[2] = true;
      audio.playEffect(res.se_cler);
      cc.director.runScene(cc.TransitionFade.create(1, new ClearScene()));
      return true;
    },
    game_over: function(){
      audio.playEffect(res.se_over);
      cc.director.runScene(cc.TransitionFade.create(1, new OverScene(new level2_Scene())));
      return true;
    },
    boro_block: function(arbiter, space){
      if (arbiter.b.tag == SpriteTag.boro) {
            var collision_obj = arbiter.b; // 衝突したShapeの取得
         }
         //衝突したオブジェクトを消すのは、update関数で定期的に行う
         this.addCallback(function() {
            for (var int = 0; int < objectArray.length; int++) { // 衝突したコインを探す
               var object = objectArray[int]; // 配置済みオブジェクトの取得
               if (object.shape == collision_obj) { // 衝突したコインの場合
                  console.log("hit");
                  object.removeFromParent();
                  break; // 処理を抜ける
               }
            }
         }.bind(this));
      return true;
    },
    addCallback: function(callback) {
      callbacks.push(callback);
    },
    update: function(dt){
    player_set[2].image.x = player_set[2].body.p.x
    player_set[2].image.y = player_set[2].body.p.y
    var angle = Math.atan2(-player_set[2].body.rot.y, player_set[2].body.rot.x);
    player_set[2].image.rotation= angle*57.2957795;

    anim_pl++;
    if (anim_pl == 200) player_set[0].setTexture(res.pl1_png);
    if (anim_pl == 230) player_set[0].setTexture(res.pl0_png);
    if (anim_pl == 260) player_set[0].setTexture(res.pl1_png);
    if (anim_pl == 290) {
      player_set[0].setTexture(res.pl0_png);
      anim_pl = 0;
    }

    bonus--;
    bonus_label.setString("bonus:" + bonus, "Arial", 25);

    if (player_set[0].getPositionY() < 0) {
      if (over_flg == false) {
        audio.playEffect(res.se_over);
        over_flg = true;
      }
      cc.director.runScene(cc.TransitionFade.create(1, new OverScene(new level2_Scene())));
    }

    for (var i = shapeArray.length - 1; i >= 0; i--) {
         shapeArray[i].image.x = shapeArray[i].body.p.x;
         shapeArray[i].image.y = shapeArray[i].body.p.y;
      }

      for (var i = 0; i < callbacks.length; ++i) {
           callbacks[i]();
        }
        callbacks = [];

  },
  onTouchBegan: function(touch, event){
    player_set[3] = player_set[0].getBoundingBox();
    status_box[0] = status_button[0].getBoundingBox();
    for (var i = 0; i < status_button.length; i++) {
      status_box[i] = status_button[i].getBoundingBox();
    }
    if (cc.rectContainsPoint(player_set[3], touch.getLocation())) touching = true;
    if (touching == true) {
      farst_pos = touch.getLocation();
      current_pos = touch.getLocation();
      create_obj(stage_layer[1]);
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
    if (cc.rectContainsPoint(status_box[1], touch.getLocation())) {
      status_button[1].setOpacity(120);
      status_flg[1] = true;
    }
    if (cc.rectContainsPoint(status_box[2], touch.getLocation())) {
      status_button[2].setOpacity(120);
      status_flg[2] = true;
    }
      return true;
  },
  onTouchMoved: function(touch, event){
    if (touching == true) {
      current_pos = touch.getLocation();
      Graphic.clear();
      create_obj(stage_layer[1]);
      calcDirection();
    }
  },
  onTouchEnded: function(touch, event){
    if (touching == true) {
      current_pos = touch.getLocation();
      Graphic.clear();
      console.log(jump);
      player_set[1].applyImpulse(cp.v(-pw_x * 2, -pw_y * 2), cp.v(0, 0));
      pw_x = 0;
      pw_y = 0;
      jump+=1;
      jump_label.setString("jump:" + jump, "Arial", 25);
      audio.playEffect(res.se_shot);
      touching = false;
    }
    if (status_flg[1] == true) {
      status_flg[1] = false;
      status_button[1].setOpacity(255);
      cc.director.runScene(cc.TransitionFade.create(1, new SelectScene()));
    }
    if (status_flg[2] == true) {
      status_flg[2] = false;
      status_button[2].setOpacity(255);
      cc.director.runScene(new level2_Scene());
    }
  }
});
