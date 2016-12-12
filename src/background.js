var BackGroundLayer = cc.Layer.extend({
  ctor: function(){
    this._super();
    var back = new cc.LayerColor(cc.color(156, 167, 226, 255));
    this.addChild(back);

    

  }
});
