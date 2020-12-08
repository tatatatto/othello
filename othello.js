const tarn_msg = document.getElementById('view_tarn');
const ban = document.getElementById('field');

var turn = 1; // どちらの番か 1:黒、-1:白

var turnCount = 1; // 経過ターン(スタートは1で白、黒それぞれのターンで1ずつ増える)

//hpを表示するエリア
const hp_1Area = document.getElementById('hp_1');
const hp_2Area = document.getElementById('hp_2');

//デッキの残り枚数を表示するエリア
const deck_1_length = document.getElementById('deck1-length');
const deck_2_length = document.getElementById('deck2-length');

//手札を表示する場所
const hand1_A = document.getElementById('hand1-1');
const hand1_B = document.getElementById('hand1-2');
const hand1_C = document.getElementById('hand1-3');
const hand1_D = document.getElementById('hand1-4');
const hand2_A = document.getElementById('hand2-1');
const hand2_B = document.getElementById('hand2-2');
const hand2_C = document.getElementById('hand2-3');
const hand2_D = document.getElementById('hand2-4');

//手札の配列
var hand_1 = [];
var hand_2 = [];

//昼か夜かを表示するエリア
const dayAndNight = document.getElementById('day-and-night');

//そのターンに使ったコマの枚数　1ターンのうちに1度しかカードを使えなくする関数
var cardCount;

//キャラクターデータ
const character002 = {
  name: "蚊",
  cardNumber: 2,
  skill: "vampire",
  skillNumber: 3,
  comboSkill: "vampire",
  comboNumber: 2,
  skillFunc: function vampire(hp,damage_recovery,power){
    switch(hp){
      case hp_1:
        hp_1 = hp_1 + damage_recovery;
        hp_2 = hp_2 - damage_recovery;
        hp_2 = hp_2 - power;
        break;
      case hp_2:
        hp_2 = hp_2 + damage_recovery;
        hp_1 = hp_1 - damage_recovery;
        hp_1 = hp_1 - power;
        break;}
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
  },
  power: 4,
  black: "./img/ka-black.png",
  white: "./img/ka-white.png",
};
const character003 = {
  name: "キリン",
  cardNumber: 3,
  skill: "damage",
  skillNumber: 5,
  comboSkill: "damage",
  comboNumber: 4,
  skillFunc: function damage(hp,damage,power){
    switch(hp){
      case hp_1:
        hp_2 = hp_2 - damage;
        hp_2 = hp_2 - power;
        break;
      case hp_2:
        hp_1 = hp_1 - damage;
        hp_1 = hp_1 - power;
        break;}
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
  },
  power: 7,
  black: "./img/kirin-black.png",
  white: "./img/kirin-white.png",
};
const character004 = {
  name: "ウーパールーパー",
  cardNumber: 4,
  skill: "recover",
  skillNumber: 8,
  comboSkill: "recover",
  comboNumber: 5,
  skillFunc: function recover(hp,recovery,power){
    switch(hp){
      case hp_1:
        hp_1 = hp_1 + recovery;
        hp_2 = hp_2 - power;
        break;
      case hp_2:
        hp_2 = hp_2 + recovery;
        hp_1 = hp_1 - power;
        break;}
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
  },
  power: 2,
  black: "./img/u-pa-ru-pa-black.png",
  white: "./img/u-pa-ru-pa-white.png",
};
const character005 = {
  name: "ミミズ",
  cardNumber: 5,
  skill: "all_recover",
  skillNumber: 10,
  comboSkill: "all_recover",
  comboNumber: 2,
  skillFunc: function all_recover(hp,recovery,power){
    switch(hp){
      case hp_1:
        hp_1 = hp_1 + recovery;
        hp_2 = hp_2 + recovery;
        hp_2 = hp_2 - power;
        break;
      case hp_2:
        hp_2 = hp_2 + recovery;
        hp_1 = hp_1 + recovery;
        hp_1 = hp_1 - power;
        break;}
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
  },
  power: 4,
  black: "./img/mimizu-black.png",
  white: "./img/mimizu-white.png",
};
const character006 = {
  name: "フクロウ",
  cardNumber: 6,
  skill: "night_damage",
  skillNumber: 15,
  comboSkill: "damage",
  comboNumber: 1,
  skillFunc: function damage(hp,damage,power){
    switch(hp){
      case hp_1:
        hp_2 = hp_2 - damage;
        hp_2 = hp_2 - power;
        break;
      case hp_2:
        hp_1 = hp_1 - damage;
        hp_1 = hp_1 - power;
        break;}
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
  },
  power: 5,
  black: "./img/owl-black.png",
  white: "./img/owl-white.png",
};


//デッキの配列(後々、サーバーなどを立てたときにはアカウントのオブジェクトを使う)
var deck_1_data = [character002,character002,character003,character003,character004,character004,character005,character005,character006,character006];
var deck_2_data = [character002,character002,character003,character003,character004,character004,character005,character005,character006,character006];

var deck_1 = deck_1_data;
var deck_2 = deck_2_data;

for (let i; i <= deck_1.length; i++){
var res = document.createElement("link");
res.rel = "preload";
res.as = "img";
res.href = deck_1[i].black;
document.head.appendChild(res);
}
for (let i; i <= deck_2.length; i++){
var res = document.createElement("link");
res.rel = "preload";
res.as = "img";
res.href = deck_1[i].white;
document.head.appendChild(res);
}
for (let i; i <= deck_1.length; i++){
var res = document.createElement("link");
res.rel = "preload";
res.as = "img";
res.href = deck_2[i].black;
document.head.appendChild(res);
}
for (let i; i <= deck_2.length; i++){
  var res = document.createElement("link");
  res.rel = "preload";
  res.as = "img";
  res.href = deck_2[i].white;
  document.head.appendChild(res);
}



sellect_instruction = 10;

//手札の配列の変更をリストに反映する
function piese_set1(){
  hand1_A.innerText = hand_1[0].name;
  hand1_B.innerText = hand_1[1].name;
  hand1_C.innerText = hand_1[2].name;
  hand1_D.innerText = hand_1[3].name;
}
function piese_set2(){
  hand2_A.innerText = hand_2[0].name;
  hand2_B.innerText = hand_2[1].name;
  hand2_C.innerText = hand_2[2].name;
  hand2_D.innerText = hand_2[3].name;
}
//ドローをする
function draw(deck_number){
  switch(deck_number){
    case deck_1:
      var quantity = 3 - hand_1.length + 1;
      console.log("プレイヤー1のドロー開始");
      break;
    case deck_2:
      var quantity = 3 - hand_2.length + 1;
      console.log("プレイヤー2のドロー開始");
      break;
  }
  console.log(quantity);
  for(let i = 0; i < quantity; i++){
  //console.log(deck_number);
  var random = deck_number[Math.floor(Math.random() * deck_number.length)];
  console.log(random);
  var index = deck_number.indexOf(random);
  console.log(index);
if (index > -1) {
  deck_number.splice(index, 1);
  if(!deck_1.length){judge(1);}
  if(!deck_2.length){judge(-1);}
}
  console.log(deck_number);
  switch(deck_number){
    case deck_1:
      hand_1.push(random);
      console.log("プレイヤー1のドロー開始");
      break;
    case deck_2:
      hand_2.push(random);
      console.log("プレイヤー2のドロー開始");
      break;
  }
  console.log(i);
  console.log(hand_1[i]);}
  switch(deck_number){
    case deck_1:
      piese_set1();
      console.log(deck_1);
      break;
    case deck_2:
      piese_set2();
      console.log(deck_2);
      break;
  }
  deck_1_length.innerText = "プレイヤー1の残りデッキ枚数は" + deck_1.length;
  deck_2_length.innerText = "プレイヤー1の残りデッキ枚数は" + deck_2.length;
}

draw(deck_1);
draw(deck_2);
console.log(deck_1);
console.log(deck_2);

var hp_1 = 100;
var hp_2 = 100;
hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
hp_2Area.innerText = "プレイヤー2　残り" + hp_2;

function vampire(hp,damage_recovery,power){
  switch(hp){
    case hp_1:
      hp_1 = hp_1 + damage_recovery;
      hp_2 = hp_2 - damage_recovery;
      hp_2 = hp_2 - power;
      break;
    case hp_2:
      hp_2 = hp_2 + damage_recovery;
      hp_1 = hp_1 - damage_recovery;
      hp_1 = hp_1 - power;
      break;}
      if(hp_1 < 0){
        hp_1 = 0;
      }
      if(hp_2 < 0){
        hp_2 = 0;
      }
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
      if(hp_1 == 0 || hp_2 == 0){
        judge();
      }
}

function damage(hp,damage,power){
  switch(hp){
    case hp_1:
      hp_2 = hp_2 - damage;
      hp_2 = hp_2 - power;
      break;
    case hp_2:
      hp_1 = hp_1 - damage;
      hp_1 = hp_1 - power;
      break;}
      if(hp_1 < 0){
        hp_1 = 0;
      }
      if(hp_2 < 0){
        hp_2 = 0;
      }
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
      if(hp_1 == 0 || hp_2 == 0){
        judge();
      }
}

function recover(hp,recovery,power){
  switch(hp){
    case hp_1:
      hp_1 = hp_1 + recovery;
      hp_2 = hp_2 - power;
      break;
    case hp_2:
      hp_2 = hp_2 + recovery;
      hp_1 = hp_1 - power;
      break;}
      if(hp_1 < 0){
        hp_1 = 0;
      }
      if(hp_2 < 0){
        hp_2 = 0;
      }
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
      if(hp_1 == 0 || hp_2 == 0){
        judge();
      }
}

function all_recover(hp,recovery,power){
  switch(hp){
    case hp_1:
      hp_1 = hp_1 + recovery;
      hp_2 = hp_2 + recovery;
      hp_2 = hp_2 - power;
      break;
    case hp_2:
      hp_2 = hp_2 + recovery;
      hp_1 = hp_1 + recovery;
      hp_1 = hp_1 - power;
      break;}
    if(hp_1 < 0){
      hp_1 = 0;
    }
    if(hp_2 < 0){
      hp_2 = 0;
    }
    hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
    hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
    if(hp_1 == 0 || hp_2 == 0){
      judge();
    }
}

function night_damage(hp,damage,power){
  switch(hp){
    case hp_1:
      if(dayAndNight.innerText == "夜"){
      hp_2 = hp_2 - damage;}
      hp_2 = hp_2 - power;
      break;
    case hp_2:
      if(dayAndNight.innerText == "夜"){
      hp_1 = hp_1 - damage;}
      hp_1 = hp_1 - power;
      break;}
    if(hp_1 < 0){
      hp_1 = 0;
    }
    if(hp_2 < 0){
      hp_2 = 0;
    }
    hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
    hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
    if(hp_1 == 0 || hp_2 == 0){
      judge();
    }
}

function explain(character){
  var skillName = character.skill;
  var skillExplanation = "";
  var comboName = character.comboSkill;
  var comboExplanation = "";
  var powerNumber = character.power;
  var skillNumber = character.skillNumber;
  var comboNumber = character.comboNumber;
  switch(skillName){
    case "vampire":
      skillExplanation = "敵のHPを" + skillNumber +　"減らし、自分のHPを" + skillNumber + "回復する";
      break;
    case "damage":
      skillExplanation = "敵に" + skillNumber +　"のダメージを与える";
      break;
    case "recover":
      skillExplanation = "自分のHPを" + skillNumber +　"回復する";
      break;
    case "all_recover":
      skillExplanation = "互いのHPを" + skillNumber +　"回復する";
      break;
  }
  switch(comboName){
    case "vampire":
      comboExplanation = "敵のHPを" + comboNumber +　"減らし、自分のHPを" + comboNumber + "回復する";
      break;
    case "damage":
      comboExplanation = "敵に" + comboNumber +　"のダメージを与える";
      break;
    case "recover":
      comboExplanation = "自分のHPを" + comboNumber +　"回復する";
      break;
    case "all_recover":
      comboExplanation = "互いのHPを" + comboNumber +　"回復する";
      break;
  }
  var explaination = character.name + "　攻撃力" + powerNumber + "　スキル：" + skillExplanation + "　コンボスキル：" + comboExplanation;
  return explaination;
}

//クリック時にキャラの効果などを表示する

hand1_A.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_1[0]));
}
hand1_B.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_1[1]));
}
hand1_C.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_1[2]));
}
hand1_D.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_1[3]));
}
hand2_A.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_2[0]));
}
hand2_B.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_2[1]));
}
hand2_C.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_2[2]));
}
hand2_D.onclick = () =>{
  console.log("効果などを表示");
  console.log(explain(hand_2[3]));
}

//ダブルクリックでキャラを選択し、その後置く場所を指定する（指定ができるようになるのは選択後）

hand1_A.ondblclick = () =>{
  if(turn == 1 && cardCount == 0){
  cardCount = 1;
  console.log("プレイヤー1の1を選択");
  var index = hand_1.indexOf(hand_1[0]);
  console.log(index);
  var name = hand_1[0].skill;
  var number = hand_1[0].skillNumber;
  var power = hand_1[0].power;
  var characterNumber = hand_1[0].cardNumber;
if (index > -1) {
  hand_1.splice(index, 1);}
  draw(deck_1);
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_1",number,power,characterNumber);
  return;}
}
hand1_B.ondblclick = () =>{
  if(turn == 1 && cardCount ==0){
  cardCount = 1;
  console.log("プレイヤー1の2を選択");
  var index = hand_1.indexOf(hand_1[1]);
  console.log(index);
  var name = hand_1[1].skill;
  var number = hand_1[1].skillNumber;
  var power = hand_1[1].power;
  var characterNumber = hand_1[1].cardNumber;
if (index > -1) {
  hand_1.splice(index, 1);}
  draw(deck_1)
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_1",number,power,characterNumber);
  return;}
}
hand1_C.ondblclick = () =>{
  if(turn == 1 && cardCount ==0){
  cardCount = 1;
  console.log("プレイヤー1の3を選択");
  var index = hand_1.indexOf(hand_1[2]);
  console.log(index);
  var name = hand_1[2].skill;
  var number = hand_1[2].skillNumber;
  var power = hand_1[2].power;
  var characterNumber = hand_1[2].cardNumber;
if (index > -1) {
  hand_1.splice(index, 1);}
  draw(deck_1);
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_1",number,power,characterNumber);
  return;}
}
hand1_D.ondblclick = () =>{
  if(turn == 1 && cardCount ==0){
  cardCount = 1;
  console.log("プレイヤー1の4を選択");
  var index = hand_1.indexOf(hand_1[3]);
  console.log(index);
  var name = hand_1[3].skill;
  var number = hand_1[3].skillNumber;
  var power = hand_1[3].power;
  var characterNumber = hand_1[3].cardNumber;
if (index > -1) {
  hand_1.splice(index, 1);}
  draw(deck_1);
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_1",number,power,characterNumber);
  return;}
}
hand2_A.ondblclick = () =>{
  if(turn == -1 && cardCount ==0){
  cardCount = 1;
  console.log("プレイヤー2の1を選択");
  var index = hand_2.indexOf(hand_2[0]);
  console.log(index);
  var name = hand_2[0].skill;
  var number = hand_2[0].skillNumber;
  var power = hand_2[0].power;
  var characterNumber = hand_2[0].cardNumber * -1;
if (index > -1) {
  hand_2.splice(index, 1);}
  draw(deck_2);
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_2",number,power,characterNumber);
  return;}
}
hand2_B.ondblclick = () =>{
  if(turn == -1 && cardCount ==0){
  cardCount = 1;
  console.log("プレイヤー2の2を選択");
  var index = hand_2.indexOf(hand_2[1]);
  console.log(index);
  var name = hand_2[1].skill;
  var number = hand_2[1].skillNumber;
  var power = hand_2[1].power;
  var characterNumber = hand_2[1].cardNumber * -1;
if (index > -1) {
  hand_2.splice(index, 1);}
  draw(deck_2);
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_2",number,power,characterNumber);
  return;}
}
hand2_C.ondblclick = () =>{
  if(turn == -1 && cardCount ==0){
    cardCount = 1;
  console.log("プレイヤー2の3を選択");
  var index = hand_2.indexOf(hand_2[2]);
  console.log(index);
  var name = hand_2[2].skill;
  var number = hand_2[2].skillNumber;
  var power = hand_2[2].power;
  var characterNumber = hand_2[2].cardNumber * -1;
if (index > -1) {
  hand_2.splice(index, 1);}
  draw(deck_2);
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_2",number,power,characterNumber);
  return;}
}
hand2_D.ondblclick = () =>{
  if(turn == -1 && cardCount == 0){
  cardCount = 1;
  console.log("プレイヤー2の4を選択");
  var index = hand_2.indexOf(hand_2[3]);
  console.log(index);
  var name = hand_2[3].skill;
  var number = hand_2[3].skillNumber;
  var power = hand_2[3].power;
  var characterNumber = hand_2[3].cardNumber * -1;
if (index > -1) {
  hand_2.splice(index, 1);}
  draw(deck_2);
  sellect_instruction = 1;
  console.log(sellect_instruction);
  sellect_on(name,"hp_2",number,power,characterNumber);
  return;}
}

//盤面のマスが選択されたとき(クリックされたとき)に発動
function sellect_on(skillName,hp,skillNumber,power,characterNumber){
  for (var x = 0; x < 6; x++) {
    for (var y = 0; y < 6; y++) {
    var sellect_cell = ban.rows[x].cells[y];
    sellect_cell.onclick = function(){
    if(sellect_instruction == 1){
    console.log(sellect_instruction);
    // クリックされた場所に石がない場合は、その場所にターン側の石が置けるかチェックし
    // 置ける場合は、盤面を更新。相手のターンへ移る
    if (ban_ar[this.parentNode.rowIndex][this.cellIndex] == 0) {
    if (check_reverse(this.parentNode.rowIndex,this.cellIndex,characterNumber) > 0){
    //y軸
    console.log(this.parentNode.rowIndex);
    //x軸
    console.log(this.cellIndex);
    //スキル発動となんのスキルをどの数値で発動したのかのログを残す
    Function(skillName + "(" + hp + "," + skillNumber + "," + power + ");")();
    console.log(skillName + "　" + skillNumber);
    //二次元配列にしたがって画像を変更し、盤面に反映
    ban_set();
    //ターンの変更やゲームが続行できるのかの判定
    cheng_turn();}}}}}
  }
}


// 盤面の状況を二次元配列で定義
var ban_ar = new Array(6);
for (var x = 0; x < ban_ar.length; x++){
ban_ar[x] = new Array(6);
}

// テーブルで盤面と画像のタグを作成する処理
function ban_new(){
  for (var x = 0; x < 6; x++) {
  var tr = document.createElement("tr");
  ban.appendChild(tr);
  for (var y = 0; y < 6; y++) {
  var td = document.createElement("td")
  tr.appendChild(td);
  const img = document.createElement("img");
  img.classList.add("piece");
  ban.rows[x].cells[y].appendChild(img);
}}
}

// 盤面状況(配列)を実際の盤面へ反映させる処理
function ban_set(){
  for (var x = 0; x < 6; x++) {
  for (var y = 0; y < 6; y++) {
  switch(ban_ar[x][y]) {
  case 0:
  break;
  case -1:
  ban.rows[x].cells[y].firstChild.src = "./img/white.png";
  break;
  case 1:
  ban.rows[x].cells[y].firstChild.src = "./img/black.png";
  break;
  //0何もない、1普通の黒のコマ、-1普通の白のコマではないとき　＝＞　キャラカードの時　
  default:
  
  //そのコマの番号の符号からどちらの色かを判定する
  if(ban_ar[x][y] > 1){
    var player = "black";
  }else if(ban_ar[x][y] < -1){
    var player = "white";
  }

  //キャラカードのオブジェクト名の数字が001のように3つでできているので足りない場合は補ってオブジェクト名を表現できるようにする
  if(Math.abs(ban_ar[x][y])>99){
    var zero = "";
  }else if(Math.abs(ban_ar[x][y])>9){
    var zero = "0";
  }else if(Math.abs(ban_ar[x][y])>0){
    var zero = "00";
  }

  //写真のurlを変更する
  Function('ban.rows[' + x + '].cells[' + y + '].firstChild.src = character' + zero + Math.abs(ban_ar[x][y]) + '.' + player)();
  break;
  }}}
  return;
  }

  // ターンを変更とバックアップ、ゲームの続行、勝敗の判定
function cheng_turn () {

  //sellect_on（オセロ部分を担当する関数）を一回きりで止める関数
  sellect_instruction = 10;

  //カードのクリックを可能にする
  cardCount = 0;

  //ターンが0（最初）は黒の番にして終了
  if(turn == 0){
  turn = 1;
  tarn_msg.textContent = "黒の番です。";
  return;
  }

  // ターンを変更
  turn = turn * -1;

  //経過ターン数を計算
  turnCount = turnCount + 1;

  dayNight = Math.round(turnCount/2) % 2;
  if(dayNight == 0){
    dayAndNight.innerText = "夜";
  }else if(dayAndNight != 0){
    dayAndNight.innerText = "昼";
  }

  // 現状の配置をバックアップ
  var ban_bak = new Array(6);
  for (var i = 0; i < ban_ar.length; i++){
  ban_bak[i] = new Array(6);
  }
  for (var x = 0; x < 6; x++) {
  for (var y = 0; y < 6; y++) {
  ban_bak[x][y] = ban_ar[x][y];}}
  
  // ターンを交代して、置けるところがあるか確認する
  //次のターンで相手がひっくり返せる枚数
  var check_reverse_cnt = 0;
  // 左端からすべてのマスの確認を行う
  var white_cnt = 0;
  var black_cnt = 0;
  for (var x = 0; x < 6; x++) {
  for (var y = 0; y < 6; y++) {
  // 空白マスのみおけるのでチェック
  // それ以外は石の数を加算
  if(ban_ar[x][y] == 0){
  check_reverse_cnt = check_reverse_cnt + cnt_check_reverse(x,y);
  // バックアップから元に戻す
  for (var i = 0; i < 6; i++) {
  for (var ii = 0; ii < 6; ii++) {
  ban_ar[i][ii] = ban_bak[i][ii]
  }}
}else if(ban_ar[x][y] <=-1){
  white_cnt++;
}else if(ban_ar[x][y] >= 1){
  black_cnt++;
}}}
  // 白と黒の合計が6*6=36の場合は処理終了
  if (white_cnt + black_cnt == 36 || white_cnt == 0 || black_cnt == 0 || hp_1 == 0 || hp_2 == 0){
  judge();
  } else {
  // 置ける場所がない場合は、ターンを相手に戻す
  if(check_reverse_cnt == 0){
  switch( turn ) {
  case -1:
  alert("白の置ける場所がありません。続けて黒の番となります。")
  turn = turn * -1
  break;
  case 1:
  alert("黒の置ける場所がありません。続けて白の番となります。")
  turn = turn * -1
  break;}}}

  // ターンを表示する
  switch( turn ) {
  case -1:
  tarn_msg.textContent = "白の番です。";
  break;
  case 1:
  tarn_msg.textContent = "黒の番です。";
  break;}
}


// 指定したセルにターン側の石が置けるか確認
function check_reverse (row_index,cell_indx,characterNumber){
var reverse_cnt = 0
// 各方向へリーバース出来るか確認
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1, 0,characterNumber,"上"); //上
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1, 1,characterNumber,"右上"); //右上
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 0, 1,characterNumber,"右"); //右
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1, 1,characterNumber,"右下"); //右下
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1, 0,characterNumber,"下"); //下
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 1,-1,characterNumber,"左下"); //左下
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx, 0,-1,characterNumber,"左"); //左
reverse_cnt = reverse_cnt + line_reverse(row_index,cell_indx,-1,-1,characterNumber,"左上"); //左上

return reverse_cnt;
}


function cnt_check_reverse (row_index,cell_indx,characterNumber){
  var reverse_cnt = 0
  // 各方向へリーバース出来るか確認
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx,-1, 0,)//上
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx,-1, 1,)//右上
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx, 0, 1,)//右
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx, 1, 1,)//右下
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx, 1, 0,)//下
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx, 1,-1,)//左下
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx, 0,-1,)//左
  reverse_cnt = reverse_cnt + check_line_reverse(row_index,cell_indx,-1,-1,)//左上
  
  return reverse_cnt;
  }

// 指定したセルから指定した方向へreverseを行う
function check_line_reverse (row_index,cell_indx,add_x,add_y) {
  // 最初に今の盤状況を退避する
  var ban_bak = new Array(6);
  for (var i = 0; i < ban_ar.length; i++){
  ban_bak[i] = new Array(6);
  }
  for (var x = 0; x < 6; x++) {
  for (var y = 0; y < 6; y++) {
  ban_bak[x][y] = ban_ar[x][y];
  }
  }
  var line_reverse_cnt = 0; // 裏返した数
  var turn_flg = 0; // 自分の色の石があるのか
  var xx = row_index; // 指定したセルの位置(行)
  var yy = cell_indx; // 指定したセルの位置(列)
  // 指定したセルから指定された方向へ移動し
  // 完了条件になるまで石を裏返す
  while (true){
  xx = xx + add_x;
  yy = yy + add_y;
  // 盤の端に到達したら抜ける
  if(xx < 0 || xx > 5 || yy < 0 || yy > 5) {
  break;
  }
  // 移動先のセルに石がなかったら抜ける
  if(ban_ar[xx][yy] == 0) {
  break;
  }

  //黒のターンで黒のコマ
if(ban_ar[xx][yy] >= 1 && turn == 1) {
  turn_flg = 1;
  break;
  }

  //白のターンで白のコマ
  if(ban_ar[xx][yy] <= -1 && turn == -1) {
  turn_flg = 1;
  break;
  }
  
  //黒のターンで白のカード
  if(ban_ar[xx][yy] <= -1 && turn == 1){
    ban_ar[xx][yy] = 1;
  }
  
  //白のターンで黒のカード
  if(ban_ar[xx][yy] >= 1 && turn == -1){
    ban_ar[xx][yy] = -1;
  }
  line_reverse_cnt++
  }
  // 裏返しを行ったが、移動先に自分の石がなかった場合は元に戻す
  if(line_reverse_cnt > 0 ) {
  if(turn_flg == 0) {
  for (var i = 0; i < 6; i++) {
  for (var ii = 0; ii < 6; ii++) {
  ban_ar[i][ii] = ban_bak[i][ii]
  line_reverse_cnt = 0}}
  }else {
  // ちゃんと裏返しが出来たら、置いた所に自分の石を置く
  ban_ar[row_index][cell_indx] = turn;
  }}
  // 最後に裏返しを行った件数を戻す
  return line_reverse_cnt;
  }
  


// 指定したセルから指定した方向へひっくり返す。方向ごとに毎回行われる。コンボ関連を調整中
function line_reverse (row_index,cell_indx,add_x,add_y,characterNumber,direction) {
// 最初に今の盤状況を退避する
var ban_bak = new Array(6);
for (var i = 0; i < ban_ar.length; i++){
ban_bak[i] = new Array(6);
}
for (var x = 0; x < 6; x++) {
for (var y = 0; y < 6; y++) {
ban_bak[x][y] = ban_ar[x][y];
}
}
var line_reverse_cnt = 0; // 裏返した数
var turn_flg = 0; // 自分の色の石があるのか
var comboDiction = 0; //コンボの発動を確認するためにひっくり返したら増える
var combo_flg = 0; //コンボの発動の判定で使用。0はなし、1は黒、-1は白。
var xx = row_index; // 指定したセルの位置(行)
var yy = cell_indx; // 指定したセルの位置(列)
// 指定したセルから指定された方向へ移動し
// 完了条件になるまで石を裏返す
while (true){
xx = xx + add_x;
yy = yy + add_y;
// 盤の端に到達したら抜ける
if(xx < 0 || xx > 5 || yy < 0 || yy > 5) {
  if(comboDiction == 1 && combo_flg == 0){
    comboDiction = 0;}
break;
}
// 移動先のセルに石がなかったら抜ける
if(ban_ar[xx][yy] == 0) {
if(comboDiction == 1 && combo_flg == 0){
    comboDiction = 0;}
break;
}
// 移動先のセルが自分自身であれば、石があった事を判定し抜ける　turnは黒で1白で-1
if(ban_ar[xx][yy] == turn) {
turn_flg = 1;
break;
}
//黒のターンで黒のキャラカード
if(ban_ar[xx][yy] > 1 && turn == 1) {
turn_flg = 1;
if(comboDiction == 1){
combo_flg = 1;
comboCaracterNumber = ban_ar[xx][yy];
console.log("コンボのキャラクター番号" + comboCaracterNumber + " xx : " + xx + " yy: " + yy + " 方向: " + direction);
}
break;
}
//白のターンで白のカードでキャラカード
if(ban_ar[xx][yy] < -1 && turn == -1) {
turn_flg = 1;
if(comboDiction == 1){
combo_flg = -1;
comboCaracterNumber = ban_ar[xx][yy];
console.log("コンボのキャラクター番号" + comboCaracterNumber + " xx : " + xx + " yy: " + yy + " 方向: " + direction);
}
break;
}

//黒のターンで白のカード
if(ban_ar[xx][yy] <= -1 && turn == 1){
  ban_ar[xx][yy] = 1;
  comboDiction = 1;
}

//白のターンで黒のカード
if(ban_ar[xx][yy] >= 1 && turn == -1){
  ban_ar[xx][yy] = -1;
  comboDiction = 1;
}

line_reverse_cnt++;
}
// 裏返しを行ったが、移動先に自分の石がなかった場合は元に戻す
if(line_reverse_cnt > 0 ) {
if(turn_flg == 0) {
for (var i = 0; i < 6; i++) {
for (var ii = 0; ii < 6; ii++) {
ban_ar[i][ii] = ban_bak[i][ii]
line_reverse_cnt = 0}}
comboDiction = 0;
comboCaracterNumber = 0;
}else {
console.log("characterNumber　:　" + characterNumber);
// ちゃんと裏返しが出来たら、置いた所の番号をキャラクター番号に変える
ban_ar[row_index][cell_indx] = characterNumber;
// コンボを発動するのかの判定と発動
switch(combo_flg){
  case 0:
    break;
  case 1:
    if(Math.abs(comboCaracterNumber)>99){
      var zero = "";
    }else if(Math.abs(comboCaracterNumber)>9){
      var zero = "0";
    }else if(Math.abs(comboCaracterNumber)>0){
      var zero = "00";
    }
    Function("character" + zero + Math.abs(comboCaracterNumber) + ".skillFunc(hp_1," + "character" + zero + Math.abs(comboCaracterNumber) + ".comboNumber," + "0);")();
    Function("console.log(character" + zero + Math.abs(comboCaracterNumber) + ".name" + "+'のコンボが黒で発動')")();
    combo_flg = 0;
    comboDiction = 0;
    comboCaracterNumber = 0;
    if(hp_1 < 0){
      hp_1 = 0;
    }
    if(hp_2 < 0){
      hp_2 = 0;
    }
    hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
    hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
    if(hp_1 == 0 || hp_2 == 0){
      judge();
    }
    break;
  case -1:
      if(Math.abs(comboCaracterNumber)>99){
        var zero = "";
      }else if(Math.abs(comboCaracterNumber)>9){
        var zero = "0";
      }else if(Math.abs(comboCaracterNumber)>0){
        var zero = "00";
      }
      Function("character" + zero + Math.abs(comboCaracterNumber) + ".skillFunc(hp_2," + "character" + zero + Math.abs(comboCaracterNumber) + ".comboNumber," + "0);")();
      Function("console.log(character" + zero + Math.abs(comboCaracterNumber) + ".name" + "+'のコンボが白で発動')")();
      combo_flg = 0;
      comboDiction = 0;
      comboCaracterNumber = 0;
      if(hp_1 < 0){
        hp_1 = 0;
      }
      if(hp_2 < 0){
        hp_2 = 0;
      }
      hp_1Area.innerText = "プレイヤー1　残り" + hp_1;
      hp_2Area.innerText = "プレイヤー2　残り" + hp_2;
      if(hp_1 == 0 || hp_2 == 0){
        judge();
      }
    break;
}}}
// 最後に裏返しを行った件数を戻す
return line_reverse_cnt;
}

// 盤面を初期化する処理　チェック済み
function ban_init () {
// 全てをクリア　全マスに0を代入
for (var x = 0; x < 6; x++) {
for (var y = 0; y < 6; y++) {
ban_ar[x][y] = 0
}
}
// 初期状態では、真ん中に白黒を配列
ban_ar[2][2] = -1
ban_ar[3][2] = 1
ban_ar[2][3] = 1
ban_ar[3][3] = -1
ban_set();

// ターンも初期化
turn = 0
cheng_turn()
}

function judge(error){
  turn = 100;
  var black_cnt = 0;
  var white_cnt = 0;
  for (var x = 0; x < 6; x++) {
  for (var y = 0; y < 6; y++) {
  if(ban_ar[x][y] <= -1){
    white_cnt = white_cnt + 5;
  }else if(ban_ar[x][y] >= 1){
    black_cnt = black_cnt + 5;
  }}}
  var black_point = hp_1 + black_cnt;
  var white_point = hp_2 + white_cnt;

  var judge_point = black_point - white_point;

  var black_error = "";
  var white_error = "";

  switch(error){
    case 1:
      var black_error = "デッキが0になったので負け";
      judge_point = -9999;
      break;
    case 2:
        var white_error = "デッキが0になったので負け";
        judge_point = 9999;
        break;
  }

  console.log("黒　hp:" + hp_1 + "　黒の枚数:" + black_cnt/5 + "　黒のコマの得点:" + black_cnt + "　黒の総得点:" + black_point + black_error);
  console.log("白　hp:" + hp_2 + "　白の枚数:" + white_cnt/5 + "　白のコマの得点:" + white_cnt + "　白の総得点:" + white_point + white_error);

  if(judge_point > 0){
    console.log(judge_point + "点差で黒の勝ち");
  }else if(judge_point < 0){
    console.log(Math.abs(judge_point) + "点差で白の勝ち");
  }else if(judge_point == 0){
    console.log("引き分け");
  }
}


// 取得したテーブルに盤面生成
ban_new();
// 盤面を初期化する
ban_init();

