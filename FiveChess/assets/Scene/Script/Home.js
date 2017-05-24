cc.Class({
    extends: cc.Component,

    properties: {
        ai:{
            type: cc.Node,
            default:null,
        },
        pp:{
            type:cc.Node,
            default:null,
        },
        share:{
            default:null,
            type:cc.Node,
        },
        
    },

    
    onLoad: function () {
        this.ai.on(cc.Node.EventType.TOUCH_END, this.startAiGame);
        this.pp.on(cc.Node.EventType.TOUCH_END,this.startPPGame);
        
    },
    startAiGame: function(event){
        cc.director.loadScene("AiGame");
    },
    startPPGame:function(event){
        cc.log("is desigin");
    },
    onDestroy: function(event){
        this.ai.off(cc.Node.EventType.TOUCH_END, this.rightclick);
        this.pp.off(cc.Node.EventType.TOUCH_END,this.startPPGame);
    }
    // update: function (dt) {

    // },
});
