var TitleScene = cc.Scene.extend({
  onEnter: function(){
    this._super();
    var title_layer = new Title_Layer();
    this.addChild(title_layer);
  }
});

var Title_Layer = cc.Layer.extend({
  ctor: function(){
    this._super();

    var background = new BackGroundLayer();
    this.addChild(background);
  }
});
