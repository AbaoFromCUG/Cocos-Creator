cc.Class({
    extends: cc.Component,

    properties: {
        button:{
            type:cc.Node,
            default:null,
        },
        label:{
            type:cc.Label,
            default:null,
        }
       
    },

    // use this for initialization
    onLoad: function () {
        
        this.label.string=Global.whoWin;
        this.button.on(cc.Node.EventType.TOUCH_END,function(){
            cc.director.loadScene("Home");
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
