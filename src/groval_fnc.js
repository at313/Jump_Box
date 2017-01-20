function set_World(scene){
  world = new cp.Space();
  world.gravity = cp.v(0, -600);
  var debugDraw = cc.PhysicsDebugNode.create(world);
  debugDraw.setVisible(true);
  scene.addChild(debugDraw, 3);
};

function create_obj(layer){
  Graphic = new cc.DrawNode();
  layer.addChild(Graphic);
  Arrow = [cc.p(0, 0), cc.p(-50, -60), cc.p(-10, -60),cc.p(0, -130) , cc.p(10, -60), cc.p(50, -60)];
  Graphic.drawPoly(Arrow, cc.color(255, 0, 0, 255), 3, cc.color(255, 128, 128, 255));
  Graphic.setPosition(pl_sprite.getPosition());
};

function calcDirection(){
  var distX = current_pos.x - farst_pos.x ;
  var distY = current_pos.y - farst_pos.y ;
  var distZ = Math.sqrt(distX * distX + distY * distY);
  if (distZ > 140) {
    Arrow = [cc.p(0, 0), cc.p(-50, -60), cc.p(-10, -60),cc.p(0, -distZ) , cc.p(10, -60), cc.p(50, -60)];
    Graphic.drawPoly(Arrow, cc.color(255, 0, 0, 255), 3, cc.color(255, 128, 128, 255));
  }
  //角度（ラジアン）を求める
  var angle= Math.atan2(distY , distX );
  //角度（ラジアン）を角度（度数）に変換
  angle = angle * 180 / Math.PI ;
  //矢印を回転させる
  Graphic.setRotation(270 - angle);

  pw_x = distX;
  pw_y = distY;
};
