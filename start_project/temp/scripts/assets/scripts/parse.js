"use strict";
cc._RFpush(module, '8f5e5wdNbZDyoXG+kI48hx0', 'parse');
// scripts\parse.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},
    buttonclicked: function buttonclicked(event) {
        cc.log("parse clicked!");
        this.game.parse();
    },

    // use this for initialization
    onLoad: function onLoad() {
        //为事件监听注册
        this.node.on(cc.Node.EventType.TOUCH_END, this.buttonclicked);
    },

    onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.buttonclicked);
    }
});

cc._RFpop();