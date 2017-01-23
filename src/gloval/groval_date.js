var world;
var size;
var audio;
//矢印表示用関数
var Graphic;
var Arrow;
var farst_pos;
var current_pos;
//雲表示用関数
var cloudlayer
//select画面に関するフラグ
//配列 [0:ステージ1],[1:ステージ2],[2:ステージ3],[3:ステージ4],[4:ステージ5]
var stage_layer = [4];
var stage_sprite = [4];
var stage_flg = [4];
var select_touch = [4];
//各ステージごとのブロック配置用関数
var l1_n = [];
var l2_n = [];
var l3_n = [];
var l4_n = [];
var l5_n = [];
//各ステータスラベル・数値
var score;
var bonus;
var jump;
var score_label;
var bonus_label;
var jump_label;
//ステータスボタン配列
//配列 [0:BGM],[1:MENU],[2:RESET],[3:Try Again]
var status_button = [3];
var status_box = [3];
var status_flg = [3];
var return_scene;
//player設定用配列
//配列 [0:Sprite],[1:Body],[2:Shape],[3:BoundingBox]
var player_set = [3];
var touching;
//playerを飛ばすための力
var pw_x;
var pw_y;
//リザルト画面表示用関数
var r_bonus;
var r_jump;
//衝突判定用Type設定
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.pl = 11;
    SpriteTag.nomal = 0;
    SpriteTag.gool = 1;
    SpriteTag.boro = 2;
    SpriteTag.el = 3;
};
