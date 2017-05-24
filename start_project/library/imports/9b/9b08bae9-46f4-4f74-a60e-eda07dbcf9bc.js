"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: {
            type: cc.Label,
            default: null
        }
    },
    buttonclicked: function buttonclicked(event) {
        cc.log("button clicked!");
        cc.director.loadScene("game");
    },

    // use this for initialization
    onLoad: function onLoad() {
        var a = 12;
        //为事件监听注册
        this.scoreLabel.string = "Score" + Global.userScore.toString();
        this.node.on(cc.Node.EventType.TOUCH_END, this.buttonclicked);
    },

    onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.buttonclicked);
    }
});