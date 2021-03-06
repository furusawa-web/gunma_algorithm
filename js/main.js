// encode 'UTF-8'
//使用したフレームワーク : enchant.js

//ステージ上各パネルの値設定------------------------------------
var stageStartPanel = 4;
var stageHoleAndRockPanel = 5;
var stageGoalPanel = 6;//（6以上のパネルはすべてゴール）
var stageRockPanel = 2;
var stageHolePanel = 1;
var stageWallPanel = 3;
var stageFloorPanel = 0;
//---------------------------------------

var mX;
var mY;
var nowStage = 0;

var stagePanel = new Array(); //ステージ描画用
var imageFileName = './img/stagePanel.png';

//ぐんまちゃん位置情報
var gunmaIndexX = 0;
var gunmaIndexY = 0;
var gunma;

var startIndexX = 0;
var startIndexY = 0;
var startX = 0;
var startY = 0;

var comList = new Array(); //フローチャート保存用可変長配列

//ウィンドウサイズ取得
var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

//横長画面への対応
var winWidth_Use = winWidth;
if (winWidth > winHeight * 3 / 5) winWidth_Use = winHeight * 3 / 5;


//ステージ情報-------------------------------
var stageAry = [];
var stageWidth = 5;
var stageHeight = 5;


var selectName = [
    "(かんたん) 第1話 「下仁田ネギをゲットしよう」",
    "(かんたん) 第2話 「高崎だるまに会いにいこう」",
    "(かんたん) 第3話 「焼きまんじゅうをゲットしよう」",
    "(ふつう) 第1話 「すきやきを食べよう」",
    "(ふつう) 第2話 「富岡製糸場へ行ってみよう」",
    "(ふつう) 第3話 「赤城山で桜を見よう」",
    "(むずかしい) 第1話 「群馬で一番高いビルを目指そう」"
];
//---------------------------------


//デザイン情報----------------

//スタートシーンの設定
var startScene_backgroundColor = '#fcc800';//スタートシーンの背景色

var paddingSpace = winHeight / 40;

//タイトルラベルの設定
var title_text = 'ぐんまちゃんのぐんま旅';
var title_textAlign = 'center';
var title_color = '#ffffff';
var title_fontSize = Math.min(winWidth_Use, winHeight) / title_text.length * 0.8;
var title_font = title_fontSize + 'px sans-serif';
var title_width = title_fontSize * title_text.length;
var title_sizeX = 280;
var title_sizeY = 111;
var title_scale = title_width / title_sizeX * 0.5;
var title_posX = winWidth / 2 - title_sizeX / 2;
var title_posY = paddingSpace - (1 - title_scale) * title_sizeY / 2;

//サブタイトルラベルの設定
//var subTitle_text = '- アルゴリズムをまなぼう -';
//var subTitle_textAlign = 'center';
//var subTitle_fontSize = title_fontSize * 0.5;
//var subTitle_font = subTitle_fontSize + 'px sans-serif';
//var subTitle_width = subTitle_fontSize * subTitle_text.length;
//var subTitle_posX = winWidth / 2 - subTitle_width / 2;
//var subTitle_posY = title_posY + title_sizeY * title_scale + paddingSpace;


//許可番号の設定
var licLabel_text = '許可番号：１２３４５６７８';
var licLabel_textAlign = 'center';
var licLabel_fontSize = title_fontSize * 0.3;
var licLabel_font = licLabel_fontSize + 'px sans-serif';
var licLabel_width = licLabel_fontSize * licLabel_text.length;
var licLabel_posX = winWidth / 2 - licLabel_width / 2;
var licLabel_posY = title_posY + title_sizeY * title_scale * 1.4 + paddingSpace;//subTitle_posY + subTitle_fontSize + paddingSpace;


//thunderbird.incの設定
var creditName_text = 'Produced by Thunderbird, inc.';
var creditName_textAlign = 'center';
var creditName_fontSize = title_fontSize * 0.3;
var creditName_font = creditName_fontSize + 'px sans-serif';
var creditName_width = creditName_fontSize * creditName_text.length;
var creditName_posX = winWidth / 2 - creditName_width / 2;
var creditName_posY = winHeight - creditName_fontSize - paddingSpace;

//お問い合わせの設定
var contactLabel_text = 'お問い合わせ';
var contactLabel_textAlign = 'center';
var contactLabel_fontSize = title_fontSize * 0.6;
var contactLabel_font = contactLabel_fontSize + 'px sans-serif';
var contactLabel_width = winWidth_Use;
var contactLabel_posX = winWidth / 2 - contactLabel_width / 2;
var contactLabel_posY = creditName_posY - contactLabel_fontSize - paddingSpace;

//staff役職の設定
var staffLabelRole_text = 'Director  <br>Programmer  <br>Designer  <br>Tester  ';
var staffLabelRole_textAlign = 'right';
var staffLabelRole_fontSize = title_fontSize * 0.4;
var staffLabelRole_font = staffLabelRole_fontSize + 'px sans-serif';
var staffLabelRole_width = staffLabelRole_fontSize * 12;
var staffLabelRole_posX = winWidth / 2 - staffLabelRole_width;
var staffLabelRole_posY = contactLabel_posY - staffLabelRole_fontSize * 4 - paddingSpace * 5;

//staff名前の設定
var staffLabelName_text = 'Yohei Yamane<br>Ryuya Furusawa<br>Tsuruga <br>Kengo Wada';
var staffLabelName_textAlign = 'left';
var staffLabelName_fontSize = title_fontSize * 0.4;
var staffLabelName_font = staffLabelName_fontSize + 'px sans-serif';
var staffLabelName_width = staffLabelName_fontSize * 20;
var staffLabelName_posX = winWidth / 2;
var staffLabelName_posY = staffLabelRole_posY;

//staffの設定
var staffLabel_text = 'S T A F F';
var staffLabel_textAlign = 'center';
var staffLabel_fontSize = title_fontSize * 0.5;
var staffLabel_font = staffLabel_fontSize + 'px sans-serif';
var staffLabel_width = staffLabel_fontSize * staffLabel_text.length / 2;
var staffLabel_posX = winWidth / 2 - staffLabel_width / 2;
var staffLabel_posY = staffLabelRole_posY - staffLabel_fontSize - paddingSpace;

//スタート画像の設定
//画像サイズ
var startImage_sizeX = 300;
var startImage_sizeY = 106;
//画像描画位置
var startImage_scale = winWidth_Use * 0.5 / startImage_sizeX;
var startImage_posX = winWidth / 2 - startImage_sizeX / 2;
var startImage_posY = winHeight / 2 - startImage_sizeY * startImage_scale - (1 - startImage_scale) * startImage_sizeY / 2;//licLabel_posY + licLabel_fontSize + paddingSpace * 3;

var licLabel_title_posY = startImage_posY - licLabel_fontSize - paddingSpace;

//タイトル画面のおおきいタイトルの設定
var bigTitle_sizeX = 544;
var bigTitle_sizeY = 213;
var bigTitle_scale = winWidth_Use * 0.8 / bigTitle_sizeX;
var bigTitle_posX = winWidth / 2 - bigTitle_sizeX / 2;
var bigTitle_posY = licLabel_title_posY - paddingSpace - bigTitle_sizeY * bigTitle_scale - (1 - bigTitle_scale) * bigTitle_sizeY / 2;


//ルール確認画面
var selectScene_backgroundColor = '#fcc800';

var rule_sizeX = 990;
var rule_sizeY = 1171;
var rule_scale = winWidth_Use / rule_sizeX;
var rule_posX = (winWidth / 2 - rule_sizeX / 2);
var rule_posY = licLabel_fontSize + licLabel_posY + paddingSpace - (1 - rule_scale) * rule_sizeY / 2;



//ステージ選択画面の設定

var selectScene_backgroundColor = '#fcc800';
var selectStage_textAlign = 'center';
var selectStage_color = '#ffffff';

var selectStage_sizeX = 359;
var selectStage_sizeY = 80;

var selectStage_fontSize = title_fontSize * 0.5;
var selectStage_lineSpacing = 0;//paddingSpace;//selectStage_fontSize * 2.5; //行間設定用：（フォントサイズ+行間サイズで指定）
var selectStage_marginTop = licLabel_posY + licLabel_fontSize + paddingSpace;//上の余白設定

var selectStage_range = contactLabel_posY - (licLabel_posY + licLabel_fontSize + selectStage_marginTop);
var selectStage_scale = (selectStage_range / 7 - selectStage_lineSpacing) / selectStage_sizeY;

var selectStage_font = selectStage_fontSize + 'px sans-serif';
var selectStage_width = winWidth;


//ゲームシーンの設定
var gameScene_BackgroundColor = '#fcc800';//'#fcc8f0';

//ステージを描画する範囲(以下はステージ描画用領域として、全体の6.5割のサイズの正方形で確保)
var stageRangeWidth = Math.min(winWidth_Use, winHeight) * 0.65;
var stageRangeHeight = stageRangeWidth;

//パネルの画像サイズ
var panelImageWidth = 48;
var panelImageHeight = 48;

//パネルの描画サイズ
var stagePanelWidth = stageRangeWidth / stageWidth;
var stagePanelHeight = stageRangeHeight / stageHeight;

//矢印ボタンの描画サイズ
var arrowPanelWidth = stageRangeWidth / 5;
var arrowPanelHeight = stageRangeHeight / 5;
//矢印ボタンとステージの隙間
var arrowYpadding = 8;

//ステージ領域の描画開始横位置
var outStageWidth = (winWidth - stageRangeWidth) / 2;

//ホームへ戻るボタンの設定
var backHomeScene_text = 'ホームへ';
var backHomeScene_textAlign = 'center';
var backHomeScene_fontSize = title_fontSize * 0.3;
var backHomeScene_font = backHomeScene_fontSize + 'px sans-serif';
var backHomeScene_width = stageRangeWidth / 5;
var backHomeScene_posX = outStageWidth;
var backHomeScene_posY = licLabel_posY + licLabel_fontSize + paddingSpace;
var backHomeScene_sizeX = 48;
var backHomeScene_sizeY = 56;
var backHomeScene_scale = backHomeScene_width / backHomeScene_sizeX;

//ステージ選択へボタンの設定
var backSelectScene_text = 'ステージ選択へ';
var backSelectScene_textAlign = 'center';
var backSelectScene_fontSize = backHomeScene_fontSize;
var backSelectScene_font = backHomeScene_font;
var backSelectScene_width = backHomeScene_width;
var backSelectScene_posX = backHomeScene_posX + backHomeScene_width * 2;
var backSelectScene_posY = backHomeScene_posY;
var backSelectScene_sizeX = 48;
var backSelectScene_sizeY = 56;
var backSelectScene_scale = backSelectScene_width / backSelectScene_sizeX;



//リセットボタンの設定
var backArrow_text = 'やりなおす';
var backArrow_textAlign = 'center';
var backArrow_fontSize = backHomeScene_fontSize;
var backArrow_font = backHomeScene_font;
var backArrow_width = backHomeScene_width;
var backArrow_posX = backSelectScene_posX + backSelectScene_width * 2;
var backArrow_posY = backHomeScene_posY;
var backArrow_sizeX = 48;
var backArrow_sizeY = 56;
var backArrow_scale = backArrow_width / backArrow_sizeX;


//現在ステージ情報表示用イメージの設定
var stageInfo_sizeX = 359;
var stageInfo_sizeY = 80;
var stageInfo_scale = winWidth_Use * 0.5 / stageInfo_sizeX;
var stageInfo_posX = winWidth / 2 - stageInfo_sizeX / 2;
var stageInfo_posY = (backHomeScene_posY + backHomeScene_scale * backHomeScene_sizeY + paddingSpace) + (1 - backHomeScene_scale) * backHomeScene_sizeY / 2 - (1 - stageInfo_scale) * stageInfo_sizeY / 2;

//移動回数表示用ラベルの設定
var moveCountLabel_fontSize = backHomeScene_fontSize * 1.5;
var moveCountLabel_font = moveCountLabel_fontSize + 'px sans-serif';
var moveCountLabel_x = 0;
var moveCountLabel_y = stageInfo_posY + stageInfo_scale * stageInfo_sizeY + paddingSpace;
var moveCountLabel_width = winWidth;
var moveCountLabel_textAlign = 'center';

//ステージ領域の描画開始縦位置
var outStageHeight = moveCountLabel_y + paddingSpace * 1.5;

//フローチャート表示用ラベルの設定
var comArrow_fontSize = title_fontSize * 0.6;
var comArrow_font = comArrow_fontSize + 'px sans-serif';
var comArrow_color = '#ffffff';
var comArrow_x = outStageWidth + stageRangeWidth + paddingSpace;
var comArrow_y = outStageHeight;
var comArrow_width = comArrow_fontSize;

//ゲームオーバーシーンの設定
var gameoverScene_backgroundColor = '#fcc800';//'#fcc8f0';

//クリア画像の設定
var gameoverImage_width = 300;
var gameoverImage_height = 100;
var gameoverImage_x = winWidth / 2 - gameoverImage_width / 2;
var gameoverImage_y = licLabel_posY + licLabel_fontSize + paddingSpace * 2;

//結果基準配列
var resultLabel_index = [20, 10, 0];
//結果表示ラベルの設定
var resultLabel_sizeX = 348;
var resultLabel_sizeY = 96;
var resultLabel_scale = stageRangeWidth * 0.8 / resultLabel_sizeX;
var resultLabel_text = ["★☆☆", "★★☆", "★★★"];
var resultLabel_textAlign = 'center';
var resultLabel_color = '#ffd700';
var resultLabel_width = winWidth;
var resultLabel_x = winWidth / 2 - resultLabel_sizeX / 2;//0;
var resultLabel_y = gameoverImage_y + gameoverImage_height + paddingSpace * 1.5 - (1 - resultLabel_scale) * resultLabel_sizeY / 2;
var resultLabel_fontSize = resultLabel_sizeY * resultLabel_scale;//title_fontSize * 1.2;
var resultLabel_font = resultLabel_fontSize + 'px sans-serif';


var resultTips_text = [
    "グッド！もう少し近道はないかな？がんばろう！<br>",
    "ナイス！いい感じだね！<br>",
    "パーフェクト！最短ルートだ！<br>"
];
var resultTips_textAlign = 'center';
var resultTips_color = '#fff';
var resultTips_width = winWidth;
var resultTips_x = 0;
var resultTips_y = resultLabel_sizeY * resultLabel_scale + resultLabel_y + paddingSpace * 1.5;
var resultTips_fontSize = title_fontSize * 0.5;
var resultTips_font = resultTips_fontSize + 'px sans-serif';

var tips_text = "";
var tips_textAlign = 'center';

var tips_sizeX = [800, 615, 785, 638, 785, 673, 673];
var tips_sizeY = [211, 229, 188, 263, 262, 225, 225];
// 性質上直接記述

var tips_color = '#000';
var tips_width = stageRangeWidth;
var tips_x = (winWidth - tips_width) / 2;
var tips_y = resultTips_y + paddingSpace;
var tips_fontSize = title_fontSize * 0.5;
var tips_font = tips_fontSize + 'px sans-serif';

var backHomeScene_posY_under = contactLabel_posY - (backHomeScene_sizeY * backHomeScene_scale + paddingSpace);
var backSelectScene_posY_under = backHomeScene_posY_under;
//-----------------------


enchant();

//指定された位置からmoveXおよびmoveYだけ移動することが可能か判定する関数
var moveCheck = function (x, y, moveX, moveY) {
    //移動するとステージ外にはみ出す場合
    if (y + moveY < 0 || x + moveX < 0) return false;
    if (y + moveY >= stageHeight || x + moveX >= stageWidth) return false;

    //移動先が壁だった場合
    if (stageAry[y + moveY][x + moveX] == stageWallPanel) {
        return false;
        //移動先に岩があった場合
    } else if (stageAry[y + moveY][x + moveX] == stageRockPanel) {
        //moveY*2やmoveX*2によって岩が動く先を表している

        //ステージ外にはみ出す場合
        if (y + moveY * 2 < 0 || x + moveX * 2 < 0) return false;
        if (y + moveY * 2 >= stageHeight || x + moveX * 2 >= stageWidth) return false;

        //移動先が岩もしくは壁だった場合
        if (stageAry[y + moveY * 2][x + moveX * 2] == stageRockPanel || stageAry[y + moveY * 2][x + moveX * 2] == stageWallPanel) {
            return false;
        }
    }
    return true;
};

//移動できたかどうかを返す関数
//移動できる場合は、ステージ情報を表す配列を更新する。
var moveGunma = function (x, y, moveX, moveY) {
    //移動可否判定
    if (!moveCheck(x, y, moveX, moveY)) return false;

    //ゴール判定
    if (stageAry[y + moveY][x + moveX] >= stageGoalPanel) return true;

    //ぐんまちゃん移動先が岩だったとき
    if (stageAry[y + moveY][x + moveX] == stageRockPanel) {
        if (stageAry[y + moveY * 2][x + moveX * 2] == stageHolePanel) {
            //岩の移動先が穴なら、穴のパネルを床に変更する
            stageAry[y + moveY][x + moveX] = stageFloorPanel;
            stageAry[y + moveY * 2][x + moveX * 2] = stageHoleAndRockPanel;
        } else {
            //岩を次のパネルに移動させる
            stageAry[y + moveY][x + moveX] = stageFloorPanel;
            stageAry[y + moveY * 2][x + moveX * 2] = stageRockPanel;
        }
        updateStage(x + moveX * 2, y + moveY * 2);
        //移動先が穴だった場合
    } else if (stageAry[y + moveY][x + moveX] == stageHolePanel) {
        gunma.frame = 2;
    }
    updateStage(x + moveX, y + moveY);
    return true;
}


//ステージ情報配列を再描画
var updateStage = function (x, y) {
    var index = x + y * stageHeight;
    stagePanel[index].frame = stageAry[y][x];
}

//スリープ（ぐんまちゃんの動きの処理時間を考慮したスリープに変更したほうがよい）
function sleep(a) {
    var dt1 = new Date().getTime();
    var dt2 = new Date().getTime();
    while (dt2 < dt1 + a) {
        dt2 = new Date().getTime();
    }
    return;
}

function checkMouseOver(obj_top, obj_left, obj_height, obj_width) {
    if ((obj_left <= mX && (obj_left + obj_width) >= mX) && (obj_top <= mY && (obj_top + obj_height) >= mY)) {
        return true;
    } else {
        return false;
    }
}

function getStageAry(path) {
    var req = new XMLHttpRequest();                     // XMLHttpRequest オブジェクトを生成する
    req.onreadystatechange = function () {               // XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
        if (req.readyState == 4 && req.status == 200) {   // サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合

            var data = JSON.parse(req.responseText);    // 取得した JSON ファイルの中身を変数へ格納
            var len = data[0].length;                      // stage の行数を取得

            // JSON のデータ数分処理
            for (var i = 0; i < len; i++) {
                stageAry[i] = [];
                for (var j = 0; j < len; j++) stageAry[i][j] = data[0][i][j];
            }
            tips_text = data[1][0];
            imageFileName = data[2][0];

            for (var i = 0; i < 3; i++)resultLabel_index[i] = data[3][i];

            //ステージサイズ等の更新
            stageWidth = len;
            stageHeight = len;
            //パネルの描画サイズ
            stagePanelWidth = stageRangeWidth / stageWidth;
            stagePanelHeight = stageRangeHeight / stageHeight;

        }
    };
    req.open("GET", path, false);              // HTTPメソッドとアクセスするサーバーのURLを指定
    req.send(null);                                     // 実際にサーバーへリクエストを送信
}

window.onload = function () {
    //マウス移動時のイベントをBODYタグに登録する
    document.body.addEventListener("mousemove", function (e) {
        //座標を取得する
        mX = e.pageX;  //X座標
        mY = e.pageY;  //Y座標
    });
    //ゲーム画面（現在はウインドウサイズ取得してウインドウ全体）
    var game_ = new Game(winWidth, winHeight);

    //fpsは適当な値に設定
    game_.fps = 24;
    //事前読み込み（以下で表示する画像は必ずここに記述）
    game_.preload('./img/title.png', './img/bigTitle.png', './img/rule.png', './img/arrow.png', './img/backArrow.png', './img/stagePanel0.png', './img/stagePanel1.png', './img/stagePanel2.png', './img/stagePanel3.png', './img/stagePanel4.png', './img/stagePanel5.png', './img/stagePanel6.png', './img/gunma.png', './img/start.png', './img/clear.png', './img/go.png', './img/selectStage0.png', './img/selectStage1.png', './img/selectStage2.png', './img/selectStage3.png', './img/selectStage4.png', './img/selectStage5.png', './img/selectStage6.png', './img/star1.png', './img/star2.png', './img/star3.png', './img/tips0.png', './img/tips1.png', './img/tips2.png', './img/tips3.png', './img/tips4.png', './img/tips5.png', './img/tips6.png', './img/Home.png', './img/Retry.png', './img/Select.png');

    //読み込み終了次第ゲーム用処理
    game_.onload = function () {
        /**
         * start scene
         */
        var createStartScene = function () {
            //シーン全体の設定
            var scene = new Scene();
            scene.backgroundColor = startScene_backgroundColor;

            //スタート画像の設定
            var startImage = new Sprite(startImage_sizeX, startImage_sizeY);
            startImage.image = game_.assets['./img/start.png'];
            startImage.x = startImage_posX;
            startImage.y = startImage_posY;
            startImage.scale(startImage_scale, startImage_scale);
            scene.addChild(startImage);

            //タイトルラベルの設定
            var bigTitle = new Sprite(bigTitle_sizeX, bigTitle_sizeY);
            bigTitle.image = game_.assets['./img/bigTitle.png'];
            bigTitle.x = bigTitle_posX;
            bigTitle.y = bigTitle_posY;
            bigTitle.scale(bigTitle_scale, bigTitle_scale);
            scene.addChild(bigTitle);

            //許可番号の設定
            var licLabel = new Label(licLabel_text);
            licLabel.textAlign = licLabel_textAlign;
            licLabel.width = licLabel_width;
            licLabel.x = licLabel_posX;
            licLabel.y = licLabel_title_posY;
            licLabel.font = licLabel_font;
            scene.addChild(licLabel);

            //var title = new Sprite(title_sizeX, title_sizeY);
            //title.image = game_.assets['./img/title.png'];
            //title.x = title_posX;
            //title.y = title_posY;
            //title.scale(title_scale, title_scale);
            //var title = new Label(title_text);
            //title.textAlign = title_textAlign;
            //title.color = title_color;
            //title.width = title_width;
            //title.x = title_posX;
            //title.y = title_posY;
            //title.font = title_font;
            //scene.addChild(title);

            //サブタイトルラベルの設定
            //var subTitle = new Label(subTitle_text);
            //subTitle.textAlign = subTitle_textAlign;
            //subTitle.width = subTitle_width;
            //subTitle.x = subTitle_posX;
            //subTitle.y = subTitle_posY;
            //subTitle.font = subTitle_font;
            //scene.addChild(subTitle);




            //thunderbird.incの設定
            var creditName = new Label(creditName_text);
            creditName.textAlign = creditName_textAlign;
            creditName.width = creditName_width;
            creditName.x = creditName_posX;
            creditName.y = creditName_posY;
            creditName.font = creditName_font;
            scene.addChild(creditName);

            //お問い合わせの設定
            var contactLabel = new Label(contactLabel_text);
            contactLabel.textAlign = contactLabel_textAlign;
            contactLabel.width = contactLabel_width;
            contactLabel.x = contactLabel_posX;
            contactLabel.y = contactLabel_posY;
            contactLabel.font = contactLabel_font;
            scene.addChild(contactLabel);

            //お問い合わせボタンがタッチ（クリック）されたときのイベント
            contactLabel.addEventListener(Event.TOUCH_START, function (e) {
                window.open('https://www.thunderbird.co.jp/', '_blank');
            });
            //staffの設定
            var staffLabel = new Label(staffLabel_text);
            staffLabel.textAlign = staffLabel_textAlign;
            staffLabel.width = staffLabel_width;
            staffLabel.x = staffLabel_posX;
            staffLabel.y = staffLabel_posY;
            staffLabel.font = staffLabel_font;
            scene.addChild(staffLabel);

            //staff役職の設定
            var staffLabelRole = new Label(staffLabelRole_text);
            staffLabelRole.textAlign = staffLabelRole_textAlign;
            staffLabelRole.width = staffLabelRole_width;
            staffLabelRole.x = staffLabelRole_posX;
            staffLabelRole.y = staffLabelRole_posY;
            staffLabelRole.font = staffLabelRole_font;
            scene.addChild(staffLabelRole);

            //staff名前の設定
            var staffLabelName = new Label(staffLabelName_text);
            staffLabelName.textAlign = staffLabelName_textAlign;
            staffLabelName.width = staffLabelName_width;
            staffLabelName.x = staffLabelName_posX;
            staffLabelName.y = staffLabelName_posY;
            staffLabelName.font = staffLabelName_font;
            scene.addChild(staffLabelName);

            scene.addEventListener(Event.ENTER_FRAME, function () {
                var mouseOverFlg = false;
                mouseOverFlg = mouseOverFlg || checkMouseOver(contactLabel_posY, contactLabel_posX, contactLabel_fontSize, contactLabel_width);
                if (mouseOverFlg) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
            });


            //スタートイメージがタッチ（クリック）されたときのイベント
            startImage.addEventListener(Event.TOUCH_START, function (e) {
                //シーン遷移
                game_.replaceScene(createSelectScene());
            });

            /*var frameCount = 0;
            scene.addEventListener(Event.ENTER_FRAME, function () {
                //ぐんまちゃんが歩くアニメーション
                if (++frameCount >= 12) {
                    gunma.frame = Math.abs(gunma.frame - 1);//0と1を往復する
                    frameCount = 0;
                }
            });*/
            return scene;
        };



        /**
         * select scene
         */
        var createSelectScene = function () {
            //シーン全体の設定
            var scene = new Scene();
            scene.backgroundColor = selectScene_backgroundColor;

            //タイトルラベルの設定
            var title = new Sprite(title_sizeX, title_sizeY);
            title.image = game_.assets['./img/title.png'];
            title.x = title_posX;
            title.y = title_posY;
            title.scale(title_scale, title_scale);
            //var title = new Label(title_text);
            //title.textAlign = title_textAlign;
            //title.color = title_color;
            //title.width = title_width;
            //title.x = title_posX;
            //title.y = title_posY;
            //title.font = title_font;
            scene.addChild(title);

            //サブタイトルラベルの設定
            //var subTitle = new Label(subTitle_text);
            //subTitle.textAlign = subTitle_textAlign;
            //subTitle.width = subTitle_width;
            //subTitle.x = subTitle_posX;
            //subTitle.y = subTitle_posY;
            //subTitle.font = subTitle_font;
            //scene.addChild(subTitle);

            //許可番号の設定
            var licLabel = new Label(licLabel_text);
            licLabel.textAlign = licLabel_textAlign;
            licLabel.width = licLabel_width;
            licLabel.x = licLabel_posX;
            licLabel.y = licLabel_posY;
            licLabel.font = licLabel_font;
            scene.addChild(licLabel);

            //描画用配列
            var selectStage = new Array();

            for (var index = 0; index < 7; index++) {

                //ステージ選択ラベルの設定
                selectStage[index] = new Sprite(selectStage_sizeX, selectStage_sizeY);
                selectStage[index].image = game_.assets['./img/selectStage' + index + '.png'];
                selectStage[index].scale(selectStage_scale, selectStage_scale);
                selectStage[index].x = winWidth / 2 - selectStage_sizeX / 2;
                selectStage[index].y = selectStage_marginTop + (selectStage_sizeY * selectStage_scale + selectStage_lineSpacing) * index;
                //selectStage[index] = new Label(selectName[index]);
                //selectStage[index].textAlign = selectStage_textAlign;
                //selectStage[index].color = selectStage_color;
                //selectStage[index].y = selectStage_marginTop + selectStage_lineSpacing * index;
                //selectStage[index].font = selectStage_font;
                //selectStage[index].width = selectStage_width;
                //selectStage[index].x = winWidth / 2 - selectStage[index].width / 2;
                scene.addChild(selectStage[index]);

                selectStage[index].addEventListener('touchstart', function () {
                    //ここにindexによってファイルを読み込んで、配列を更新する処理を追加する
                    //ただし、indexの取得が困難なので、this.yを利用して、indexを逆算する必要がある
                    var index = Math.round((this.y - selectStage_marginTop) / (selectStage_sizeY * selectStage_scale + selectStage_lineSpacing));
                    getStageAry("./stage/stage" + index + ".json");
                    nowStage = index;
                    game_.replaceScene(createRuleScene());
                }, false);

            }

            //thunderbird.incの設定
            var creditName = new Label(creditName_text);
            creditName.textAlign = creditName_textAlign;
            creditName.width = creditName_width;
            creditName.x = creditName_posX;
            creditName.y = creditName_posY;
            creditName.font = creditName_font;
            scene.addChild(creditName);

            //お問い合わせの設定
            var contactLabel = new Label(contactLabel_text);
            contactLabel.textAlign = contactLabel_textAlign;
            contactLabel.width = contactLabel_width;
            contactLabel.x = contactLabel_posX;
            contactLabel.y = contactLabel_posY;
            contactLabel.font = contactLabel_font;
            scene.addChild(contactLabel);

            //お問い合わせボタンがタッチ（クリック）されたときのイベント
            contactLabel.addEventListener(Event.TOUCH_START, function (e) {
                window.open('https://www.thunderbird.co.jp/', '_blank');
            });
            scene.addEventListener(Event.ENTER_FRAME, function () {
                var mouseOverFlg = false;
                mouseOverFlg = mouseOverFlg || checkMouseOver(contactLabel_posY, contactLabel_posX, contactLabel_fontSize, contactLabel_width);
                if (mouseOverFlg) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
            });


            return scene;
        };

        //ルールシーン
        var createRuleScene = function () {
            //シーン全体の設定
            var scene = new Scene();
            scene.backgroundColor = selectScene_backgroundColor;

            //タイトルラベルの設定
            var title = new Sprite(title_sizeX, title_sizeY);
            title.image = game_.assets['./img/title.png'];
            title.x = title_posX;
            title.y = title_posY;
            title.scale(title_scale, title_scale);
            //var title = new Label(title_text);
            //title.textAlign = title_textAlign;
            //title.color = title_color;
            //title.width = title_width;
            //title.x = title_posX;
            //title.y = title_posY;
            //title.font = title_font;
            scene.addChild(title);

            //サブタイトルラベルの設定
            //var subTitle = new Label(subTitle_text);
            //subTitle.textAlign = subTitle_textAlign;
            //subTitle.width = subTitle_width;
            //subTitle.x = subTitle_posX;
            //subTitle.y = subTitle_posY;
            //subTitle.font = subTitle_font;
            //scene.addChild(subTitle);





            //許可番号の設定
            var licLabel = new Label(licLabel_text);
            licLabel.textAlign = licLabel_textAlign;
            licLabel.width = licLabel_width;
            licLabel.x = licLabel_posX;
            licLabel.y = licLabel_posY;
            licLabel.font = licLabel_font;
            scene.addChild(licLabel);

            //ルール画像の設置
            var rule = new Sprite(rule_sizeX, rule_sizeY);
            rule.image = game_.assets['./img/rule.png'];
            rule.x = rule_posX;
            rule.y = rule_posY;
            rule.scale(rule_scale, rule_scale);
            scene.addChild(rule);



            //thunderbird.incの設定
            var creditName = new Label(creditName_text);
            creditName.textAlign = creditName_textAlign;
            creditName.width = creditName_width;
            creditName.x = creditName_posX;
            creditName.y = creditName_posY;
            creditName.font = creditName_font;
            scene.addChild(creditName);

            //お問い合わせの設定
            var contactLabel = new Label(contactLabel_text);
            contactLabel.textAlign = contactLabel_textAlign;
            contactLabel.width = contactLabel_width;
            contactLabel.x = contactLabel_posX;
            contactLabel.y = contactLabel_posY;
            contactLabel.font = contactLabel_font;
            scene.addChild(contactLabel);

            //お問い合わせボタンがタッチ（クリック）されたときのイベント
            contactLabel.addEventListener(Event.TOUCH_START, function (e) {
                window.open('https://www.thunderbird.co.jp/', '_blank');
            });
            scene.addEventListener(Event.ENTER_FRAME, function () {
                var mouseOverFlg = false;
                mouseOverFlg = mouseOverFlg || checkMouseOver(contactLabel_posY, contactLabel_posX, contactLabel_fontSize, contactLabel_width);
                if (mouseOverFlg) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
            });
            scene.addEventListener(Event.TOUCH_START, function (e) {
                game_.replaceScene(createGameScene());
            });

            return scene;
        };
        /**
        * game Scene
        */
        var createGameScene = function () {
            //戻るに対応するための配列コピー
            var orgStage = JSON.parse(JSON.stringify(stageAry));

            //シーン全体の設定
            var scene = new Scene();
            scene.backgroundColor = gameScene_BackgroundColor;

            //移動回数保存用
            var score = 0;

            //実行中に操作不能にするためのflg
            var goFlg = false;

            var frameCount = 0;

            //フレームが進むたびに呼ばれる（描画も、実際はこのタイミングで、まとめて行われている）
            scene.addEventListener(Event.ENTER_FRAME, function () {

                var mouseOverFlg = false;
                mouseOverFlg = mouseOverFlg || checkMouseOver(contactLabel_posY, contactLabel_posX, contactLabel_fontSize, contactLabel_width);
                if (mouseOverFlg) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }

                //ぐんまちゃんが歩くアニメーション
                if (++frameCount >= 12 && gunma.frame != 2) {
                    gunma.frame = Math.abs(gunma.frame - 1);//0と1を往復する
                    frameCount = 0;
                }

                if (goFlg) {
                    //ゴールについていた場合
                    if (stageAry[gunmaIndexY][gunmaIndexX] >= stageGoalPanel) {
                        //フローチャートリセット
                        comList.length = 0;
                        comArrow.text = "";
                        //実行中フラグOFF
                        goflg = false;
                        //シーン遷移
                        game_.replaceScene(createGameoverScene(score));
                    }

                    //実行終了時
                    if (comList.length == 0) {
                        //実行中フラグOFF
                        goFlg = false;
                    } else {
                        if (gunma.frame == 2) {

                            if (frameCount >= 5) {
                                //ぐんまちゃんの移動
                                gunma.x = startX;
                                gunmaIndexX = startIndexX;
                                gunma.y = startY;
                                gunmaIndexY = startIndexY;
                                gunma.frame = 0;
                            }
                        } else {
                            var i = 0;
                            var index = comList[i];//フローチャート先頭を取得

                            //画面サイズに応じたぐんまちゃんのうごく長さ情報
                            var gunmaSpeedX = 0;
                            var gunmaSpeedY = 0;

                            //左右の矢印が0と2
                            //上下の矢印が1と3
                            //

                            //あとで素直にcase文に直す
                            if (index % 2 == 0) {
                                gunmaSpeedX = stagePanelWidth;
                                if (index == 0) gunmaSpeedX *= -1;
                            } else {
                                gunmaSpeedY = stagePanelHeight;
                                if (index == 1) gunmaSpeedY *= -1;
                            }

                            var moveX = 0;
                            var moveY = 0;

                            if (gunmaSpeedX != 0) {
                                //index単位での動く量の取得(1,0,-1)
                                moveX = gunmaSpeedX / Math.abs(gunmaSpeedX);
                            } else if (gunmaSpeedY != 0) {
                                //index単位での動く量の取得(1,0,-1)
                                moveY = gunmaSpeedY / Math.abs(gunmaSpeedY);
                            }

                            //うごける場合
                            if (moveGunma(gunmaIndexX, gunmaIndexY, moveX, moveY)) {

                                //ぐんまちゃんの移動
                                gunma.x += gunmaSpeedX;
                                gunmaIndexX += moveX;
                                gunma.y += gunmaSpeedY;
                                gunmaIndexY += moveY;

                                //移動回数更新
                                score++;
                                label.text = '移動回数： ' + score + '回';
                            }
                            //動けないやじるしの入力があった場合の処理はここにelseで追加
                            //首をかしげるとか、ペナルティをつけるとか

                            //フローチャート表示の先頭を5文字削除
                            //"<br>"の四文字と矢印の一文字で計五文字
                            comArrow.text = comArrow.text.slice(5);
                            comArrow.height = stageHeight * stagePanelHeight;
                            //フローチャート用配列の先頭削除
                            comList.shift();

                        }
                        //ステップごとの実行に必要
                        sleep(500);
                    }
                }
            });
            //タイトルラベルの設定
            var title = new Sprite(title_sizeX, title_sizeY);
            title.image = game_.assets['./img/title.png'];
            title.x = title_posX;
            title.y = title_posY;
            title.scale(title_scale, title_scale);
            //var title = new Label(title_text);
            //title.textAlign = title_textAlign;
            //title.color = title_color;
            //title.width = title_width;
            //title.x = title_posX;
            //title.y = title_posY;
            //title.font = title_font;
            scene.addChild(title);

            //サブタイトルラベルの設定
            //var subTitle = new Label(subTitle_text);
            //subTitle.textAlign = subTitle_textAlign;
            //subTitle.width = subTitle_width;
            //subTitle.x = subTitle_posX;
            //subTitle.y = subTitle_posY;
            //subTitle.font = subTitle_font;
            //scene.addChild(subTitle);

            //許可番号の設定
            var licLabel = new Label(licLabel_text);
            licLabel.textAlign = licLabel_textAlign;
            licLabel.width = licLabel_width;
            licLabel.x = licLabel_posX;
            licLabel.y = licLabel_posY;
            licLabel.font = licLabel_font;
            scene.addChild(licLabel);


            //ホームへ戻るの設定
            var backHomeScene = new Sprite(backHomeScene_sizeX, backHomeScene_sizeY);
            backHomeScene.image = game_.assets['./img/Home.png'];
            backHomeScene.scale(backHomeScene_scale, backHomeScene_scale);
            //var backHomeScene = new Label(backHomeScene_text);
            //backHomeScene.textAlign = backHomeScene_textAlign;
            //backHomeScene.width = backHomeScene_width;
            backHomeScene.x = backHomeScene_posX;
            backHomeScene.y = backHomeScene_posY;
            //backHomeScene.font = backHomeScene_font;
            scene.addChild(backHomeScene);
            backHomeScene.addEventListener(Event.TOUCH_START, function (e) {
                //シーン遷移
                game_.replaceScene(createStartScene());
            });


            //ステージ選択へ戻るの設定
            var backSelectScene = new Sprite(backSelectScene_sizeX, backSelectScene_sizeY);
            backSelectScene.image = game_.assets['./img/Select.png'];
            backSelectScene.scale(backSelectScene_scale, backSelectScene_scale);
            //var backSelectScene = new Label(backSelectScene_text);
            //backSelectScene.textAlign = backSelectScene_textAlign;
            //backSelectScene.width = backSelectScene_width;
            backSelectScene.x = backSelectScene_posX;
            backSelectScene.y = backSelectScene_posY;
            //backSelectScene.font = backSelectScene_font;
            scene.addChild(backSelectScene);
            backSelectScene.addEventListener(Event.TOUCH_START, function (e) {
                //シーン遷移
                game_.replaceScene(createSelectScene());
            });



            var stageInfo = new Sprite(stageInfo_sizeX, stageInfo_sizeY);
            stageInfo.image = game_.assets['./img/selectStage' + nowStage + '.png'];
            stageInfo.x = stageInfo_posX;
            stageInfo.y = stageInfo_posY;
            stageInfo.scale(stageInfo_scale, stageInfo_scale);
            scene.addChild(stageInfo);



            //リセットボタンの設定
            //image版
            //var backArrow = new Sprite(panelImageWidth, panelImageHeight);
            //backArrow.image = game_.assets['./img/backArrow.png'];
            //backArrow.x = backArrow_x;
            //backArrow.y = backArrow_y;
            //label版

            var backArrow = new Sprite(backArrow_sizeX, backArrow_sizeY);
            backArrow.image = game_.assets['./img/Retry.png'];
            backArrow.scale(backArrow_scale, backArrow_scale);
            //var backArrow = new Label(backArrow_text);
            //backArrow.textAlign = backArrow_textAlign;
            //backArrow.width = backArrow_width;
            backArrow.x = backArrow_posX;
            backArrow.y = backArrow_posY;
            //backArrow.font = backArrow_font;
            scene.addChild(backArrow);
            backArrow.addEventListener('touchstart', function () {
                if (!goFlg) {
                    //元ステージ情報を読み込み
                    stageAry = JSON.parse(JSON.stringify(orgStage));
                    comArrow.text = "";
                    //ステージ情報を画面描画に対応
                    for (var indexY = 0; indexY < stageHeight; indexY++) {
                        for (var indexX = 0; indexX < stageWidth; indexX++) {
                            var index = indexX + indexY * stageHeight;
                            stagePanel[index].frame = stageAry[indexY][indexX];
                            if (stageAry[indexY][indexX] == 4) {
                                gunmaIndexX = indexX;
                                gunmaIndexY = indexY;
                                gunma.x = outStageWidth + gunmaIndexX * stagePanelWidth;
                                gunma.y = outStageHeight + gunmaIndexY * stagePanelHeight;
                                startIndexX = gunmaIndexX;
                                startIndexY = gunmaIndexY
                                startX = gunma.x;
                                startY = gunma.y;
                            }

                        }
                    }
                }
            }, false);


            //移動回数表示ラベルの設定
            var label = new Label('移動回数： ' + score + '回');
            label.textAlign = moveCountLabel_textAlign;
            label.font = moveCountLabel_font;
            label.x = moveCountLabel_x;
            label.y = moveCountLabel_y;
            label.width = moveCountLabel_width;
            scene.addChild(label);

            //フローチャート表示用ラベルの設定
            var comArrow = new Label("");
            comArrow.font = comArrow_font;
            comArrow.x = comArrow_x;
            comArrow.y = comArrow_y;
            comArrow.width = comArrow_width;
            comArrow.height = stageHeight * stagePanelHeight;
            //comArrow.color = comArrow_color;
            scene.addChild(comArrow);


            //各パネル画像の設定
            for (var indexY = 0; indexY < stageHeight; indexY++) {//stage
                for (var indexX = 0; indexX < stageWidth; indexX++) {

                    var index = indexX + indexY * stageHeight;

                    stagePanel[index] = new Sprite(panelImageWidth, panelImageHeight);
                    stagePanel[index].image = game_.assets[imageFileName];
                    stagePanel[index].frame = stageAry[indexY][indexX];
                    stagePanel[index].x = outStageWidth + indexX * stagePanelWidth;
                    stagePanel[index].y = outStageHeight + indexY * stagePanelHeight;
                    //画面にあわせてスケーリング(スケーリングに伴い若干xとyで指定した位置がずれる(おそらく仕様))
                    //この行のあとにxyを指定しなおしても意味がないので、できるかぎり、元画像のサイズは合わせたい
                    stagePanel[index].scale(stagePanelWidth / panelImageWidth, stagePanelHeight / panelImageHeight);

                    //スタートの番地を取得し、ぐんまちゃんの初期位置を決定
                    if (stageAry[indexY][indexX] == stageStartPanel) {
                        gunmaIndexX = indexX;
                        gunmaIndexY = indexY;
                        startIndexX = gunmaIndexX;
                        startIndexY = gunmaIndexY
                        startX = stagePanel[index].x;
                        startY = stagePanel[index].y;
                    }

                    scene.addChild(stagePanel[index]);
                }
            }

            //ぐんまちゃんの設定
            gunma = new Sprite(panelImageWidth, panelImageHeight);
            gunma.image = game_.assets['./img/gunma.png'];
            gunma.scale(stagePanelWidth / panelImageWidth, stagePanelHeight / panelImageHeight);
            gunma.x = outStageWidth + gunmaIndexX * stagePanelWidth;
            gunma.y = outStageHeight + gunmaIndexY * stagePanelHeight;
            gunma.frame = 0;

            scene.addChild(gunma);

            //矢印入力パネルの設定
            var arrow = new Array();
            for (var index = 0; index < 4; index++) {

                //ステージパネルのサイズに合わせているが、このあたりも修正してもよい
                arrow[index] = new Sprite(panelImageWidth, panelImageHeight);
                arrow[index].image = game_.assets['./img/arrow.png'];
                arrow[index].frame = index;
                arrow[index].scale(arrowPanelWidth / panelImageWidth, arrowPanelHeight / panelImageHeight);
                scene.addChild(arrow[index]);
                arrow[index].x = outStageWidth + index * arrowPanelWidth;
                arrow[index].y = outStageHeight + stagePanelHeight * stageHeight + arrowYpadding;


                arrow[index].addEventListener('touchstart', function () {
                    if (!goFlg) {
                        //indexが取得できないようなので、x座標から逆算して強引に取得
                        //上を修正するならここも修正必須
                        var index = Math.round((this.x - outStageWidth) / arrowPanelWidth);
                        var indexChar = ['←', '↑', '→', '↓'];
                        comArrow.text = comArrow.text + indexChar[index] + '<br>';
                        comArrow.height = stageHeight * stagePanelHeight;
                        comList.push(index);
                    }
                }, false);

            }


            //実行ボタンの設定
            var goButton = new Sprite(panelImageWidth, panelImageHeight);
            goButton.image = game_.assets['./img/go.png'];
            goButton.scale(arrowPanelWidth / panelImageWidth, arrowPanelHeight / panelImageHeight);
            scene.addChild(goButton);
            goButton.x = outStageWidth + 4 * arrowPanelWidth;
            goButton.y = outStageHeight + stagePanelHeight * stageHeight + arrowYpadding;

            goButton.addEventListener('touchstart', function () {
                //実行中フラグをONにする
                goFlg = true;
            }, false);


            //thunderbird.incの設定
            var creditName = new Label(creditName_text);
            creditName.textAlign = creditName_textAlign;
            creditName.width = creditName_width;
            creditName.x = creditName_posX;
            creditName.y = creditName_posY;
            creditName.font = creditName_font;
            scene.addChild(creditName);

            //お問い合わせの設定
            var contactLabel = new Label(contactLabel_text);
            contactLabel.textAlign = contactLabel_textAlign;
            contactLabel.width = contactLabel_width;
            contactLabel.x = contactLabel_posX;
            contactLabel.y = contactLabel_posY;
            contactLabel.font = contactLabel_font;
            scene.addChild(contactLabel);

            //お問い合わせボタンがタッチ（クリック）されたときのイベント
            contactLabel.addEventListener(Event.TOUCH_START, function (e) {
                window.open('https://www.thunderbird.co.jp/', '_blank');
            });

            return scene;
        };
        /**
        * gameclear scene
        */
        var createGameoverScene = function (resultScore) {
            //シーン全体の設定
            var scene = new Scene();
            scene.backgroundColor = gameoverScene_backgroundColor;
            //タイトルラベルの設定
            var title = new Sprite(title_sizeX, title_sizeY);
            title.image = game_.assets['./img/title.png'];
            title.x = title_posX;
            title.y = title_posY;
            title.scale(title_scale, title_scale);
            //var title = new Label(title_text);
            //title.textAlign = title_textAlign;
            //title.color = title_color;
            //title.width = title_width;
            //title.x = title_posX;
            //title.y = title_posY;
            //title.font = title_font;
            scene.addChild(title);

            //サブタイトルラベルの設定
            //var subTitle = new Label(subTitle_text);
            //subTitle.textAlign = subTitle_textAlign;
            //subTitle.width = subTitle_width;
            //subTitle.x = subTitle_posX;
            //subTitle.y = subTitle_posY;
            //subTitle.font = subTitle_font;
            //scene.addChild(subTitle);

            //許可番号の設定
            var licLabel = new Label(licLabel_text);
            licLabel.textAlign = licLabel_textAlign;
            licLabel.width = licLabel_width;
            licLabel.x = licLabel_posX;
            licLabel.y = licLabel_posY;
            licLabel.font = licLabel_font;
            scene.addChild(licLabel);


            //クリア画像の設定
            //変数名をclearImageにすると、Imageのクリアを行う関数と紛らわしいのでgameoverに。
            var gameoverImage = new Sprite(gameoverImage_width, gameoverImage_height);
            gameoverImage.image = game_.assets['./img/clear.png'];
            gameoverImage.x = gameoverImage_x;
            gameoverImage.y = gameoverImage_y;
            scene.addChild(gameoverImage);

            //結果表示ラベルの設定
            var resultIndex;
            for (resultIndex = 0; resultScore < resultLabel_index[resultIndex]; resultIndex++);

            //var label = new Label(resultLabel_text[resultIndex]);
            var label = new Sprite(resultLabel_sizeX, resultLabel_sizeY);
            resultIndex++;

            label.image = game_.assets['./img/star' + resultIndex + '.png'];
            //label.textAlign = resultLabel_textAlign;
            //label.color = resultLabel_color;
            //label.width = resultLabel_width;
            label.x = resultLabel_x;
            label.y = resultLabel_y;

            label.scale(resultLabel_scale, resultLabel_scale);
            //label.font = resultLabel_font;
            scene.addChild(label);

            resultIndex--;
            var resultTips = new Label(resultTips_text[resultIndex]);
            resultTips.textAlign = resultTips_textAlign;
            resultTips.color = resultTips_color;
            resultTips.width = resultTips_width;
            resultTips.x = resultTips_x;
            resultTips.y = resultTips_y;
            resultTips.font = resultTips_font;
            scene.addChild(resultTips);

            //ホームへ戻るの設定
            var backHomeScene = new Sprite(backHomeScene_sizeX, backHomeScene_sizeY);
            backHomeScene.image = game_.assets['./img/Home.png'];
            backHomeScene.scale(backHomeScene_scale, backHomeScene_scale);
            //var backHomeScene = new Label(backHomeScene_text);
            //backHomeScene.textAlign = backHomeScene_textAlign;
            //backHomeScene.width = backHomeScene_width;
            backHomeScene.x = backHomeScene_posX;
            backHomeScene.y = backHomeScene_posY_under;
            //backHomeScene.font = backHomeScene_font;
            scene.addChild(backHomeScene);
            backHomeScene.addEventListener(Event.TOUCH_START, function (e) {
                //シーン遷移
                game_.replaceScene(createStartScene());
            });


            //ステージ選択へ戻るの設定
            var backSelectScene = new Sprite(backSelectScene_sizeX, backSelectScene_sizeY);
            backSelectScene.image = game_.assets['./img/Select.png'];
            backSelectScene.scale(backSelectScene_scale, backSelectScene_scale);
            //var backSelectScene = new Label(backSelectScene_text);
            //backSelectScene.textAlign = backSelectScene_textAlign;
            //backSelectScene.width = backSelectScene_width;
            backSelectScene.x = backArrow_posX;
            backSelectScene.y = backSelectScene_posY_under;
            //backSelectScene.font = backSelectScene_font;
            scene.addChild(backSelectScene);
            backSelectScene.addEventListener(Event.TOUCH_START, function (e) {
                //シーン遷移
                game_.replaceScene(createSelectScene());
            });

            //ホームへ戻るの設定
            //var backHomeScene = new Label(backHomeScene_text);
            //backHomeScene.textAlign = backHomeScene_textAlign;
            //backHomeScene.width = backHomeScene_width;
            //backHomeScene.x = backHomeScene_posX;
            //backHomeScene.y = backHomeScene_posY_under;
            //backHomeScene.font = backHomeScene_font;
            //scene.addChild(backHomeScene);
            //スタートイメージがタッチ（クリック）されたときのイベント
            //backHomeScene.addEventListener(Event.TOUCH_START, function (e) {
            //シーン遷移
            //game_.replaceScene(createStartScene());
            //});

            //ステージ選択へ戻るの設定
            //var backSelectScene = new Label(backSelectScene_text);
            //backSelectScene.textAlign = backSelectScene_textAlign;
            //backSelectScene.width = backSelectScene_width;
            //backSelectScene.x = backSelectScene_posX + backSelectScene_width;
            //backSelectScene.y = backSelectScene_posY_under;
            //backSelectScene.font = backSelectScene_font;
            //scene.addChild(backSelectScene);
            //スタートイメージがタッチ（クリック）されたときのイベント
            //backSelectScene.addEventListener(Event.TOUCH_START, function (e) {
            //シーン遷移
            //game_.replaceScene(createSelectScene());
            //});

            //tipsの設定
            var tips = new Sprite(tips_sizeX[nowStage], tips_sizeY[nowStage]);
            tips.image = game_.assets['./img/tips' + nowStage + '.png'];
            tips.scale(winWidth_Use / tips_sizeX[nowStage], winWidth_Use / tips_sizeX[nowStage]);
            tips.x = winWidth / 2 - tips_sizeX[nowStage] / 2;
            tips.y = tips_y - (1 - winWidth_Use / tips_sizeX[nowStage]) * tips_sizeY[nowStage] / 2;//outStageHeight + stagePanelHeight * stageHeight + arrowYpadding;
            //new Label(tips_text);
            //tips.textAlign = tips_textAlign;
            //tips.width = tips_width;
            //tips.x = tips_x;
            //tips.y = tips_y;
            //tips.font = tips_font;
            scene.addChild(tips);


            //thunderbird.incの設定
            var creditName = new Label(creditName_text);
            creditName.textAlign = creditName_textAlign;
            creditName.width = creditName_width;
            creditName.x = creditName_posX;
            creditName.y = creditName_posY;
            creditName.font = creditName_font;
            scene.addChild(creditName);

            //お問い合わせの設定
            var contactLabel = new Label(contactLabel_text);
            contactLabel.textAlign = contactLabel_textAlign;
            contactLabel.width = contactLabel_width;
            contactLabel.x = contactLabel_posX;
            contactLabel.y = contactLabel_posY;
            contactLabel.font = contactLabel_font;
            scene.addChild(contactLabel);

            scene.addEventListener(Event.ENTER_FRAME, function () {
                var mouseOverFlg = false;
                mouseOverFlg = mouseOverFlg || checkMouseOver(contactLabel_posY, contactLabel_posX, contactLabel_fontSize, contactLabel_width);
                if (mouseOverFlg) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
            });

            return scene;
        };

        //最初のシーン設定       
        game_.replaceScene(createStartScene());
    }

    game_.start();
};
