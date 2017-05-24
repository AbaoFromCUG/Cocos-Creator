cc.Class({
    extends: cc.Component,

    properties: {

        pickR:0,
        
    },

    // use this for initialization
    onLoad: function () {
        this.game=null;
    },
    
    getPlayerDistance: function(){
        var playp=this.game.player.getPosition();
        return cc.pDistance(this.node.getPosition(),playp);
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
       //console.log(this.pickR,this.getPlayerDistance());
        if(this.getPlayerDistance()<this.pickR){
            this.game.spawnNewStar();
            this.node.destroy();
            this.game.gainscore();
        }
     },
});
