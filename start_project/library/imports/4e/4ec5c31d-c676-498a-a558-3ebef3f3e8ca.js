"use strict";

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

    },

    // use this for initialization
    onLoad: function onLoad() {
        //为事件监听注册
        this.node.on(cc.Node.EventType.TOUCH_END, this.rightclick);
    },
    onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.rightclick);
    },
    rightclick: function rightclick(event) {
        //cc.log("right clicked!");
        if (Global.userPlayFun) {
            this.player.accRight = true;
            this.player.accLeft = false;
        }
    }

});