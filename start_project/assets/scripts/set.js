cc.Class({
    extends: cc.Component,

    properties: {
        
        // ...
        musicCheckBox:{
            type:cc.Toggle,
            default:null,
        },
        modelLabel:{
            type:cc.Label,
            default:null,
        },
        modelCheckBox:{
            type:cc.Toggle,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        var self=this;
        self.musicCheckBox.isChecked=Global.userMusic;
        self.modelCheckBox.isChecked=Global.userPlayFun;

        self.musicCheckBox.node.on("click",function(event){
            cc.log("onclick");
            if(Global.userMusic){
                Global.userMusic=false;
            }else{
                Global.userMusic=true;
            }

        })

        
        self.modelCheckBox.node.on("click",function(event){
            if(Global.userPlayFun){
                self.modelLabel.string="重力";
                Global.userPlayFun=false;
            }else{
                self.modelLabel.string="触摸";
                Global.userPlayFun=true;
            }
            
        })
    },
   
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
