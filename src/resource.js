//resource.js
var res = {
  cloud_png: "res/img/cloud.png",
  box_n: "res/img/base2.png",
  box_g: "res/img/base3.png",
  box_d: "res/img/base1.png",
  box_e: "res/img/base4.png",
  bgm_png: "res/img/bgm.png",
  se_png: "res/img/se.png",
  button1_png: "res/img/button1.png",
  button2_png: "res/img/button2.png",
  button3_png: "res/img/button3.png",
  button4_png: "res/img/button4.png",
  button5_png: "res/img/button5.png",
  button_manu: "res/img/manu_button.png",
  button_reset: "res/img/reset_button.png",
  button_again: "res/img/again_button.png",
  en1_png: "res/img/en1.png",
  en2_png: "res/img/en2.png",
  pl_png: "res/img/pl.png",
  hata1_png: "res/img/hata1.png",
  test_tmx: "res/img/test.tmx",
  bgm: "res/bgm_se/bgm.mp3"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
