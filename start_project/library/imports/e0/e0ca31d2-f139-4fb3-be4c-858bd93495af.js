'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        settingPerfab: {
            type: cc.Prefab,
            default: null
        },
        ground: {
            default: null,
            type: cc.Node
        },
        parseButton: {
            default: null,
            type: cc.Button
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        leftLayout: {
            type: cc.Node,
            default: null
        },
        rightLayout: {
            type: cc.Node,
            default: null
        },
        maxStarDuration: 0,
        minStarDuration: 0
    },

    // use this for initialization
    onLoad: function onLoad() {

        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;

        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
        this.score = 0;
        /*******************************/
        this.leftLayout.player = this.player.getComponent('player');
        this.rightLayout.player = this.player.getComponent('player');
        this.parseButton.node.game = this;
        /*******************************/
        this.isParse = false;
    },

    parse: function parse() {
        if (this.isParse) {
            this.parseButton.getComponentInChildren(cc.Label).string = "暂停";
            this.player.getComponent('player').continueAvtion();
            this.isParse = false;
            this.setView.destroy();
            return;
        } else {
            this.player.getComponent('player').parseAction();
            this.isParse = true;

            this.setView = cc.instantiate(this.settingPerfab);

            this.node.addChild(this.setView);
            this.setView.setPosition(0, -80);
            this.parseButton.getComponentInChildren(cc.Label).string = "继续";
        }
    },
    spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);

        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('star').game = this;

        //当生成一个新的星星，则重新开始计时
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
    getNewStarPosition: function getNewStarPosition() {

        var randx = 0;
        var randy = this.groundY + cc.random0To1() * (this.player.getComponent('player').jumpHight + 100);
        //检查cc.random0To1()生成的是否是0到1的随机数
        //console.log(cc.random0To1(),randx);
        randx = this.node.width / 2 * cc.randomMinus1To1();
        return cc.p(randx, randy);
    },

    gainscore: function gainscore() {
        this.score += 1;
        this.scoreDisplay.string = "Score" + this.score.toString();
        if (Global.userMusic) {
            cc.audioEngine.playEffect(this.scoreAudio, false);
        } else {
            return;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.isParse) {
            return;
        }
        //console.log(this.timer,this.starDuration);
        if (this.timer > this.starDuration) {

            cc.director.loadScene("gameover");
            Global.userScore = this.score;
        }
        this.timer += dt;
    }
});