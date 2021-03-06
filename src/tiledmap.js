var Tiledmap = cc.Layer.extend({
   map: null,
   spriteBG: null,
   spriteBGwidth: 0,
   mapWidth: 0,
   bgIndex: 0,
   objects: [],

   ctor: function(parent, stg) {
     this._super();
     this.map = new cc.TMXTiledMap(stg);
     this.map.setPosition(cc.p(size.width * 0.5, this.map.getPositionY()));
     this.init(parent);
   },
   init: function(parent) {
      this._super();

      var tileWidth = this.map.getTileSize().width;
      var tileHeight = this.map.getTileSize().height;

      this.objects = [];

      var mapWidth = this.map.getMapSize().width;
      var mapHeight = this.map.getMapSize().height;

    //  console.log("---------------------------")
      var CollisionObj = this.map.getLayer("stage");
      for (i = 0; i < mapWidth; i++) {
         for (j = 0; j < mapHeight; j++) {
            //タイルコードを取得できる
            var tileCord = new cc.Point(i, j);
            //タイルコードからgidを取得する。もしgidが存在していれば
            var gid = CollisionObj.getTileGIDAt(tileCord);
            if (gid) {
               var properties = this.map.getPropertiesForGID(gid);
              //  console.log("gid:", gid, properties["category"]);
               // 当たり判定するオブジェクトがあるかどうかプロパティをチェックする
               if (properties["category"] < 5) {
                  // console.log("tXP", tileXPositon, "tYP", tileYPosition,"category:",properties["category"]);
                  var tileXPositon = i * tileWidth + tileWidth / 2;
                  var tileYPosition = (mapHeight * tileHeight) - ((j + 1) * tileHeight) + tileHeight / 2;
                  var objects = new Objects(parent, tileXPositon, tileYPosition,Number(properties["category"])  );
               }
            }
         }
      }

   },
});
