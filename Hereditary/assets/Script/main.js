cc.Class({
    extends: cc.Component,

    properties: {
        examplePrefab:{
            type:cc.Prefab,
            default:null,
        },
        black:{
            type:cc.SpriteFrame,
            default:null,
        },
        white:{
            type:cc.SpriteFrame,
            default:null,
        },
        yellow:{
            type:cc.SpriteFrame,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        var self=this;
        this.exampleArrary=[
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]];
        
        
        for(var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                var newNode=cc.instantiate(self.examplePrefab);
                this.node.addChild(newNode);
                newNode.getComponent(cc.Sprite).spriteFrame=this.black;
                newNode.setPosition(cc.p(-300+i*60,-300+j*60));
            }
        }

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
