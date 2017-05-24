"use strict";
cc._RFpush(module, 'f3782lglzpCrq8AHEKB71/a', 'home');
// scripts\home.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},
    buttonclicked: function buttonclicked(event) {
        cc.log("button clicked!");
        cc.director.loadScene("begin");
    },

    // use this for initialization
    onLoad: function onLoad() {
        var a = 12;
        //为事件监听注册
        this.node.on(cc.Node.EventType.TOUCH_END, this.buttonclicked);
    },

    onDestroy: function() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.buttonclicked);
    }
});

cc._RFpop();