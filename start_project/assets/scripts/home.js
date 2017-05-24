cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    buttonclicked: function(event){
        cc.log("button clicked!");
        cc.director.loadScene("begin");
    },

    // use this for initialization
    onLoad: function () {
        var a=12;
        //为事件监听注册
        this.node.on(cc.Node.EventType.TOUCH_END,this.buttonclicked);
    },
    
    onDestroy: function(){
        this.node.off(cc.Node.EventType.TOUCH_END,this.buttonclicked);
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
