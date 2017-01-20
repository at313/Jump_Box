var world;

var size;
var Graphic;
var Arrow;
var farst_pos;
var current_pos;

var cloudlayer
var layer1;
var layer2;
var layer3;
var layer4;
var layer5;

var s1;
var s2;
var s3;
var s4;
var s5;
var s1_flg;
var s2_flg;
var s3_flg;
var s4_flg;
var s5_flg;
var bgm_flg;
var se_flg;
var s1_tachi;
var s2_tachi;
var s3_tachi;
var s4_tachi;
var s5_tachi;

var l1_n = [];
var l2_n = [];
var l3_n = [];
var l4_n = [];
var l5_n = [];

var score;
var bonus;
var jump;
var bonus_label;
var score_label;
var jump_label;
var status_button = [];
var status_box = [];

var pl_sprite;
var pl_body;
var pl_shape;
var pl_box;
var touching;

var pw_x;
var pw_y;

var r_bonus;
var r_jump;

if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.pl = 0;
    SpriteTag.gool = 1;
    SpriteTag.boro = 2;
};
