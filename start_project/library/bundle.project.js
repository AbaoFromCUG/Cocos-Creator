require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"data":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4da97VNRR1EHrOKey3/xADx', 'data');
// scripts\data.js

"use strict";

window.Global = {
    userName: "",
    userIP: null,
    userScore: 0,
    userMusic: true,
    userPlayFun: true
};

cc._RFpop();
},{}],"game":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e0ca3HS8TlPs75MhYvZNJWv', 'game');
// scripts\game.js

'use strict';

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
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        settingPerfab: {
            type: cc.Prefab,
            default: null
        },
        ground: {
            default: null,
            type: cc.Node
        },
        parseButton: {
            default: null,
            type: cc.Button
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        leftLayout: {
            type: cc.Node,
            default: null
        },
        rightLayout: {
            type: cc.Node,
            default: null
        },
        maxStarDuration: 0,
        minStarDuration: 0
    },

    // use this for initialization
    onLoad: function onLoad() {

        // 初始化计时器
        this.timer = 0;
        this.starDuration = 0;

        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
        this.score = 0;
        /*******************************/
        this.leftLayout.player = this.player.getComponent('player');
        this.rightLayout.player = this.player.getComponent('player');
        this.parseButton.node.game = this;
        /*******************************/
        this.isParse = false;
    },

    parse: function parse() {
        if (this.isParse) {
            this.parseButton.getComponentInChildren(cc.Label).string = "暂停";
            this.player.getComponent('player').continueAvtion();
            this.isParse = false;
            this.setView.destroy();
            return;
        } else {
            this.player.getComponent('player').parseAction();
            this.isParse = true;

            this.setView = cc.instantiate(this.settingPerfab);

            this.node.addChild(this.setView);
            this.setView.setPosition(0, -80);
            this.parseButton.getComponentInChildren(cc.Label).string = "继续";
        }
    },
    spawnNewStar: function spawnNewStar() {
        var newStar = cc.instantiate(this.starPrefab);

        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('star').game = this;

        //当生成一个新的星星，则重新开始计时
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },
    getNewStarPosition: function getNewStarPosition() {

        var randx = 0;
        var randy = this.groundY + cc.random0To1() * (this.player.getComponent('player').jumpHight + 100);
        //检查cc.random0To1()生成的是否是0到1的随机数
        //console.log(cc.random0To1(),randx);
        randx = this.node.width / 2 * cc.randomMinus1To1();
        return cc.p(randx, randy);
    },

    gainscore: function gainscore() {
        this.score += 1;
        this.scoreDisplay.string = "Score" + this.score.toString();
        if (Global.userMusic) {
            cc.audioEngine.playEffect(this.scoreAudio, false);
        } else {
            return;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        if (this.isParse) {
            return;
        }
        //console.log(this.timer,this.starDuration);
        if (this.timer > this.starDuration) {

            cc.director.loadScene("gameover");
            Global.userScore = this.score;
        }
        this.timer += dt;
    }
});

cc._RFpop();
},{}],"home":[function(require,module,exports){
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

    onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.buttonclicked);
    }
});

cc._RFpop();
},{}],"left":[function(require,module,exports){
"use strict";
cc._RFpush(module, '98b11TfHzBA5ZgyeB71b+ZE', 'left');
// scripts\left.js

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
        this.node.on(cc.Node.EventType.TOUCH_END, this.leftclick);
    },
    onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.leftclick);
    },
    leftclick: function leftclick(event) {
        //cc.log("left clicked!");
        if (Global.userPlayFun) {
            this.player.accLeft = true;
            this.player.accRight = false;
        }
    }

});

cc._RFpop();
},{}],"parse":[function(require,module,exports){
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
},{}],"player":[function(require,module,exports){
"use strict";
cc._RFpush(module, '25219rOs6dJbKuRVXXzOPF1', 'player');
// scripts\player.js

"use strict";

cc.Class({
    extends: cc.Component,
    //相当于这个类的属性
    properties: {
        jumpHight: 0, //跳跃高度
        jumpDuration: 0, //跳跃时间长度
        maxMovespeed: 0, //最大移动速度
        accel: 0, //加速度

        jumpAudio: {
            default: null,
            url: cc.AudioClip
        }
    },
    parseAction: function parseAction() {
        //this.node.stopAllActions();
        this.isParse = true;
        this.oldLeft = this.accLeft;
        this.oldRight = this.accRight;
        this.actionManager = cc.director.getActionManager();
        this.actionManager.pauseTarget(this.node);
    },
    continueAvtion: function continueAvtion() {

        this.actionManager.resumeTarget(this.node);

        this.accLeft = this.oldLeft;
        this.accRight = this.accRight;
        this.isParse = false;
        cc.log(Global.userMusic);
    },
    // use this for initialization
    //加载完资源后执行
    onLoad: function onLoad() {
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        this.accLeft = false;
        this.accRight = false;
        this.xSpeed = 0.0;
        this.setInputControl();
        //注册重力感应监听事件
        cc.inputManager.setAccelerometerEnabled(true);
        cc.systemEvent.on(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    },
    playJumpSound: function playJumpSound() {
        // 调用声音引擎播放声音

        if (Global.userMusic) {
            cc.audioEngine.playEffect(this.jumpAudio, false);
        } else {
            return;
        }
    },
    setJumpAction: function setJumpAction() {
        //参数解释，第一个是时间，表示该动作所需要的时间，
        //easing是执行加减速（放缓）的操作，out，渐渐放缓，in则相反
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);
        //sequence将两个动作连接，组装成新的动作，repeatForever把动作不停的重复，也是把一个动作包装成新的动作
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    },
    onDeviceMotionEvent: function onDeviceMotionEvent(event) {
        if (!Global.userPlayFun) {
            self = this;
            var z = Math.sqrt(1 - event.acc.x * event.acc.x - event.acc.y * event.acc.y);
            if (Math.abs(event.acc.x) < Math.abs(event.acc.y)) {
                self.accLeft = true;
                self.accRight = false;
            } else if (Math.abs(event.acc.x) > Math.abs(event.acc.y)) {
                self.accLeft = false;
                self.accRight = true;
            }
        }
    },

    setInputControl: function setInputControl() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.left:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = true;
                        self.accLeft = false;
                        break;
                    case cc.KEY.right:
                        self.accRight = true;
                        self.accLeft = false;
                        break;

                }
            },
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {

        if (this.isParse) {

            return;
        }

        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        //Math.abs()求绝对值函数
        if (Math.abs(this.xSpeed) > this.maxMovespeed) {
            this.xSpeed = this.maxMovespeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        if (this.node.x < 50 - cc.director.getVisibleSize().width / 2) {
            this.node.x = 50 - cc.director.getVisibleSize().width / 2;
        } else if (this.node.x > cc.director.getVisibleSize().width / 2 - 50) {
            this.node.x = cc.director.getVisibleSize().width / 2 - 50;
        }

        this.node.x += this.xSpeed * dt;
    },

    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.DEVICEMOTION, this.onDeviceMotionEvent, this);
    }

});

cc._RFpop();
},{}],"restart":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9b08brpRvRPdKYO7aB9vPm8', 'restart');
// scripts\restart.js

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

cc._RFpop();
},{}],"right":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4ec5cMdxnZJiqVYPr7z8+jK', 'right');
// scripts\right.js

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

cc._RFpop();
},{}],"set":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'ebc79wWV3dCd5yjF0v1w1ef', 'set');
// scripts\set.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        // ...
        musicCheckBox: {
            type: cc.Toggle,
            default: null
        },
        modelLabel: {
            type: cc.Label,
            default: null
        },
        modelCheckBox: {
            type: cc.Toggle,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.musicCheckBox.isChecked = Global.userMusic;
        self.modelCheckBox.isChecked = Global.userPlayFun;

        self.musicCheckBox.node.on("click", function (event) {
            cc.log("onclick");
            if (Global.userMusic) {
                Global.userMusic = false;
            } else {
                Global.userMusic = true;
            }
        });

        self.modelCheckBox.node.on("click", function (event) {
            if (Global.userPlayFun) {
                self.modelLabel.string = "重力";
                Global.userPlayFun = false;
            } else {
                self.modelLabel.string = "触摸";
                Global.userPlayFun = true;
            }
        });
    }

});

cc._RFpop();
},{}],"start":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1e0e1q80/dEhKXaibwDFaKg', 'start');
// scripts\start.js

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
        this.node.on(cc.Node.EventType.TOUCH_END, this.click);
    },
    onDestroy: function onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.click);
    },
    click: function click(event) {
        cc.log("start button clicked!");
        cc.director.loadScene("game");
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RFpop();
},{}],"star":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd1ec6Gw0wpKHJc5aKXDMGbp', 'star');
// scripts\star.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        pickR: 0

    },

    // use this for initialization
    onLoad: function onLoad() {
        this.game = null;
    },

    getPlayerDistance: function getPlayerDistance() {
        var playp = this.game.player.getPosition();
        return cc.pDistance(this.node.getPosition(), playp);
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        //console.log(this.pickR,this.getPlayerDistance());
        if (this.getPlayerDistance() < this.pickR) {
            this.game.spawnNewStar();
            this.node.destroy();
            this.game.gainscore();
        }
    }
});

cc._RFpop();
},{}]},{},["data","game","home","left","parse","player","restart","right","set","star","start"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL2RhdGEuanMiLCJhc3NldHMvc2NyaXB0cy9nYW1lLmpzIiwiYXNzZXRzL3NjcmlwdHMvaG9tZS5qcyIsImFzc2V0cy9zY3JpcHRzL2xlZnQuanMiLCJhc3NldHMvc2NyaXB0cy9wYXJzZS5qcyIsImFzc2V0cy9zY3JpcHRzL3BsYXllci5qcyIsImFzc2V0cy9zY3JpcHRzL3Jlc3RhcnQuanMiLCJhc3NldHMvc2NyaXB0cy9yaWdodC5qcyIsImFzc2V0cy9zY3JpcHRzL3NldC5qcyIsImFzc2V0cy9zY3JpcHRzL3N0YXJ0LmpzIiwiYXNzZXRzL3NjcmlwdHMvc3Rhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTFk7Ozs7Ozs7Ozs7QUNBaEI7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGVTtBQUlkO0FBQ0k7QUFDQTtBQUZHO0FBSVA7QUFDSTtBQUNBO0FBRlE7QUFJWjtBQUNJO0FBQ0E7QUFGRztBQUlQO0FBQ0k7QUFDQTtBQUZTO0FBSWI7QUFDSTtBQUNBO0FBRlE7QUFJWjtBQUNJO0FBQ0E7QUFGTztBQUlYO0FBQ0k7QUFDQTtBQUZRO0FBSVo7QUFDQTtBQWhEUTs7QUFtRFo7QUFDQTs7QUFHSztBQUNEO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Y7O0FBRUQ7QUFDSTtBQUNJO0FBQ0M7QUFDQTtBQUNBO0FBQ0Q7QUFDSDtBQUNHO0FBQ0E7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0g7QUFFSjtBQUNEO0FBQ0k7O0FBRUE7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNIO0FBQ0Q7O0FBR0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUVKOztBQUlKO0FBQ0k7QUFDSTtBQUNJO0FBQ0g7QUFDRDtBQUNBOztBQUVJO0FBQ0E7QUFDSDtBQUNEO0FBQ0o7QUE5SUk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBR0E7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNIOztBQUVEO0FBQ0k7QUFDSDtBQXBCSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVZROztBQWFaO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0g7QUFFSjs7QUEvQkk7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBR0E7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDQTtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0g7QUFuQkk7Ozs7Ozs7Ozs7QUNBVDtBQUNJO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUZPO0FBTkg7QUFXWjtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdIO0FBQ0Q7O0FBRUk7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFLSDtBQUNEO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlIO0FBQ0E7QUFDRzs7QUFFQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0o7QUFDRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNJO0FBQ0k7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFDQTtBQUNIO0FBQ0o7QUFHSjs7QUFFRDtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0k7QUFDSTtBQUNJO0FBQ0E7QUFDQTtBQUNKO0FBQ0k7QUFDQTtBQUNBO0FBQ0o7QUFDSTtBQUNBO0FBQ0E7QUFDSjtBQUNJO0FBQ0E7QUFDQTs7QUFoQlI7QUFtQkg7QUFDRDtBQUNJO0FBQ0k7QUFDSTtBQUNBO0FBQ0o7QUFDSTtBQUNBO0FBTlI7QUFRSDtBQWhDdUI7QUFrQy9COztBQUdEO0FBQ0E7O0FBRUk7O0FBRUk7QUFDSDs7QUFLRDtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0g7O0FBRUQ7QUFDSTtBQUNIO0FBQ0c7QUFDSDs7QUFHRDtBQUdIOztBQUVEO0FBQ0k7QUFDSDs7QUFqS0k7Ozs7Ozs7Ozs7QUNBVDtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRk87QUFESDtBQU1aO0FBQ0k7QUFDQTtBQUNIOztBQUVEO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUVIOztBQUVEO0FBQ0k7QUFDSDtBQXpCSTs7Ozs7Ozs7OztBQ0FUO0FBQ0k7O0FBRUE7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFWUTs7QUFjWjtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNIO0FBRUo7O0FBaENJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTs7QUFFSTtBQUNBO0FBQ0k7QUFDQTtBQUZVO0FBSWQ7QUFDSTtBQUNBO0FBRk87QUFJWDtBQUNJO0FBQ0E7QUFGVTtBQVhOOztBQWlCWjtBQUNBO0FBQ0k7QUFDQTtBQUNBOztBQUVBO0FBQ0k7QUFDQTtBQUNJO0FBQ0g7QUFDRztBQUNIO0FBRUo7O0FBR0Q7QUFDSTtBQUNJO0FBQ0E7QUFDSDtBQUNHO0FBQ0E7QUFDSDtBQUVKO0FBQ0o7O0FBL0NJOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVZROztBQWNaO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0g7QUFDRDtBQUNBOztBQUVBO0FBL0JLOzs7Ozs7Ozs7O0FDQVQ7QUFDSTs7QUFFQTs7QUFFSTs7QUFGUTs7QUFNWjtBQUNBO0FBQ0k7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDSDs7QUFFRDtBQUNDO0FBQ0k7QUFDRDtBQUNBO0FBQ0E7QUFDRDtBQUNDO0FBQ0k7QUFDQTtBQUNBO0FBQ0g7QUFDSDtBQS9CRyIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5HbG9iYWwgPSB7XHJcbiAgICB1c2VyTmFtZTogXCJcIixcclxuICAgIHVzZXJJUDpudWxsLFxyXG4gICAgdXNlclNjb3JlOjAsXHJcbiAgICB1c2VyTXVzaWM6dHJ1ZSxcclxuICAgIHVzZXJQbGF5RnVuOnRydWUsXHJcbn07IiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICAvLyBmb286IHtcclxuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLCAgICAgIC8vIFRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgYmUgdXNlZCBvbmx5IHdoZW4gdGhlIGNvbXBvbmVudCBhdHRhY2hpbmdcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcclxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XHJcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXHJcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxyXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIC8vIC4uLlxyXG4gICAgICAgIHN0YXJQcmVmYWI6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuUHJlZmFiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXR0aW5nUGVyZmFiOntcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdyb3VuZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYXJzZUJ1dHRvbjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5CdXR0b24sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGF5ZXI6e1xyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NvcmVEaXNwbGF5OntcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2NvcmVBdWRpbzoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxyXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGVmdExheW91dDp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmlnaHRMYXlvdXQ6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1heFN0YXJEdXJhdGlvbjowLFxyXG4gICAgICAgIG1pblN0YXJEdXJhdGlvbjowLFxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICAgICAgIC8vIOWIneWni+WMluiuoeaXtuWZqFxyXG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uID0gMDtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdW5kWT10aGlzLmdyb3VuZC55K3RoaXMuZ3JvdW5kLmhlaWdodC8yO1xyXG4gICAgICAgIHRoaXMuc3Bhd25OZXdTdGFyKCk7XHJcbiAgICAgICAgdGhpcy5zY29yZT0wO1xyXG4gICAgICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICAgICB0aGlzLmxlZnRMYXlvdXQucGxheWVyID0gdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdwbGF5ZXInKTtcclxuICAgICAgIHRoaXMucmlnaHRMYXlvdXQucGxheWVyID0gdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdwbGF5ZXInKTtcclxuICAgICAgIHRoaXMucGFyc2VCdXR0b24ubm9kZS5nYW1lPXRoaXM7XHJcbiAgICAgICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgIHRoaXMuaXNQYXJzZT1mYWxzZTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIHBhcnNlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYodGhpcy5pc1BhcnNlKXtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZUJ1dHRvbi5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLkxhYmVsKS5zdHJpbmc9XCLmmoLlgZxcIjtcclxuICAgICAgICAgICAgIHRoaXMucGxheWVyLmdldENvbXBvbmVudCgncGxheWVyJykuY29udGludWVBdnRpb24oKTtcclxuICAgICAgICAgICAgIHRoaXMuaXNQYXJzZT1mYWxzZTtcclxuICAgICAgICAgICAgIHRoaXMuc2V0Vmlldy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdwbGF5ZXInKS5wYXJzZUFjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmlzUGFyc2U9dHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNldFZpZXc9Y2MuaW5zdGFudGlhdGUodGhpcy5zZXR0aW5nUGVyZmFiKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMuc2V0Vmlldyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Vmlldy5zZXRQb3NpdGlvbigwLC04MCk7XHJcbiAgICAgICAgICAgIHRoaXMucGFyc2VCdXR0b24uZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5MYWJlbCkuc3RyaW5nPVwi57un57utXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIHNwYXduTmV3U3RhcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgbmV3U3Rhcj1jYy5pbnN0YW50aWF0ZSh0aGlzLnN0YXJQcmVmYWIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcclxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xyXG4gICAgICAgIG5ld1N0YXIuZ2V0Q29tcG9uZW50KCdzdGFyJykuZ2FtZSA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAvL+W9k+eUn+aIkOS4gOS4quaWsOeahOaYn+aYn++8jOWImemHjeaWsOW8gOWni+iuoeaXtlxyXG4gICAgICAgIHRoaXMuc3RhckR1cmF0aW9uPXRoaXMubWluU3RhckR1cmF0aW9uICsgY2MucmFuZG9tMFRvMSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xyXG4gICAgICAgIHRoaXMudGltZXI9MDtcclxuICAgIH0sXHJcbiAgICBnZXROZXdTdGFyUG9zaXRpb246IGZ1bmN0aW9uKCl7XHJcbiAgICAgICBcclxuXHJcbiAgICAgICAgdmFyIHJhbmR4PTA7XHJcbiAgICAgICAgdmFyIHJhbmR5PXRoaXMuZ3JvdW5kWSArIGNjLnJhbmRvbTBUbzEoKSoodGhpcy5wbGF5ZXIuZ2V0Q29tcG9uZW50KCdwbGF5ZXInKS5qdW1wSGlnaHQrMTAwKSA7XHJcbiAgICAgICAgLy/mo4Dmn6VjYy5yYW5kb20wVG8xKCnnlJ/miJDnmoTmmK/lkKbmmK8w5YiwMeeahOmaj+acuuaVsFxyXG4gICAgICAgIC8vY29uc29sZS5sb2coY2MucmFuZG9tMFRvMSgpLHJhbmR4KTtcclxuICAgICAgICByYW5keD10aGlzLm5vZGUud2lkdGgvMipjYy5yYW5kb21NaW51czFUbzEoKTtcclxuICAgICAgICByZXR1cm4gY2MucChyYW5keCwgcmFuZHkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBnYWluc2NvcmU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zY29yZSs9MTtcclxuICAgICAgICB0aGlzLnNjb3JlRGlzcGxheS5zdHJpbmc9XCJTY29yZVwiK3RoaXMuc2NvcmUudG9TdHJpbmcoKTtcclxuICAgICAgICBpZihHbG9iYWwudXNlck11c2ljKXtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNjb3JlQXVkaW8sIGZhbHNlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIFxyXG4gICAgXHJcbiAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgIGlmKHRoaXMuaXNQYXJzZSl7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnRpbWVyLHRoaXMuc3RhckR1cmF0aW9uKTtcclxuICAgICAgICAgaWYodGhpcy50aW1lcj50aGlzLnN0YXJEdXJhdGlvbil7XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVvdmVyXCIpO1xyXG4gICAgICAgICAgICAgR2xvYmFsLnVzZXJTY29yZT10aGlzLnNjb3JlO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIHRoaXMudGltZXIrPWR0O1xyXG4gICAgfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgYnV0dG9uY2xpY2tlZDogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGNjLmxvZyhcImJ1dHRvbiBjbGlja2VkIVwiKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJiZWdpblwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYT0xMjtcclxuICAgICAgICAvL+S4uuS6i+S7tuebkeWQrOazqOWGjFxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5idXR0b25jbGlja2VkKTtcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLmJ1dHRvbmNsaWNrZWQpO1xyXG4gICAgfSxcclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/kuLrkuovku7bnm5HlkKzms6jlhoxcclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMubGVmdGNsaWNrKTtcclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5sZWZ0Y2xpY2spO1xyXG4gICAgfSxcclxuICAgIGxlZnRjbGljazogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIC8vY2MubG9nKFwibGVmdCBjbGlja2VkIVwiKTtcclxuICAgICAgICBpZihHbG9iYWwudXNlclBsYXlGdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hY2NMZWZ0PXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmFjY1JpZ2h0PWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG4gICAgYnV0dG9uY2xpY2tlZDogZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGNjLmxvZyhcInBhcnNlIGNsaWNrZWQhXCIpO1xyXG4gICAgICAgIHRoaXMuZ2FtZS5wYXJzZSgpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v5Li65LqL5Lu255uR5ZCs5rOo5YaMXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLmJ1dHRvbmNsaWNrZWQpO1xyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMuYnV0dG9uY2xpY2tlZCk7XHJcbiAgICB9LFxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuICAgIC8v55u45b2T5LqO6L+Z5Liq57G755qE5bGe5oCnXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAganVtcEhpZ2h0OjAsICAvL+i3s+i3g+mrmOW6plxyXG4gICAgICAgIGp1bXBEdXJhdGlvbjowLCAvL+i3s+i3g+aXtumXtOmVv+W6plxyXG4gICAgICAgIG1heE1vdmVzcGVlZDowLCAvL+acgOWkp+enu+WKqOmAn+W6plxyXG4gICAgICAgIGFjY2VsOjAsICAgICAgICAvL+WKoOmAn+W6plxyXG5cclxuICAgICAgICBqdW1wQXVkaW86IHtcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcclxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBhcnNlQWN0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy90aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICB0aGlzLmlzUGFyc2U9dHJ1ZTtcclxuICAgICAgICB0aGlzLm9sZExlZnQ9dGhpcy5hY2NMZWZ0O1xyXG4gICAgICAgIHRoaXMub2xkUmlnaHQ9dGhpcy5hY2NSaWdodDtcclxuICAgICAgICB0aGlzLmFjdGlvbk1hbmFnZXIgPSBjYy5kaXJlY3Rvci5nZXRBY3Rpb25NYW5hZ2VyKCk7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25NYW5hZ2VyLnBhdXNlVGFyZ2V0ICggdGhpcy5ub2RlICk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgIFxyXG4gICAgfSxcclxuICAgIGNvbnRpbnVlQXZ0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5hY3Rpb25NYW5hZ2VyLnJlc3VtZVRhcmdldCh0aGlzLm5vZGUpO1xyXG5cclxuICAgICAgICB0aGlzLmFjY0xlZnQ9dGhpcy5vbGRMZWZ0O1xyXG4gICAgICAgIHRoaXMuYWNjUmlnaHQ9dGhpcy5hY2NSaWdodDtcclxuICAgICAgICB0aGlzLmlzUGFyc2U9ZmFsc2U7XHJcbiAgICAgICAgY2MubG9nKEdsb2JhbC51c2VyTXVzaWMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG5cclxuICAgIH0sXHJcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cclxuICAgIC8v5Yqg6L295a6M6LWE5rqQ5ZCO5omn6KGMXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmp1bXBBY3Rpb249dGhpcy5zZXRKdW1wQWN0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbih0aGlzLmp1bXBBY3Rpb24pO1xyXG4gICAgICAgIHRoaXMuYWNjTGVmdD1mYWxzZTtcclxuICAgICAgICB0aGlzLmFjY1JpZ2h0PWZhbHNlO1xyXG4gICAgICAgIHRoaXMueFNwZWVkPTAuMDtcclxuICAgICAgICB0aGlzLnNldElucHV0Q29udHJvbCgpO1xyXG4gICAgICAgIC8v5rOo5YaM6YeN5Yqb5oSf5bqU55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgY2MuaW5wdXRNYW5hZ2VyLnNldEFjY2VsZXJvbWV0ZXJFbmFibGVkKHRydWUpO1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5ERVZJQ0VNT1RJT04sIHRoaXMub25EZXZpY2VNb3Rpb25FdmVudCwgdGhpcyk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgICBwbGF5SnVtcFNvdW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g6LCD55So5aOw6Z+z5byV5pOO5pKt5pS+5aOw6Z+zXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoR2xvYmFsLnVzZXJNdXNpYyl7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5qdW1wQXVkaW8sIGZhbHNlKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXRKdW1wQWN0aW9uOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/lj4LmlbDop6Pph4rvvIznrKzkuIDkuKrmmK/ml7bpl7TvvIzooajnpLror6XliqjkvZzmiYDpnIDopoHnmoTml7bpl7TvvIxcclxuICAgICAgICAvL2Vhc2luZ+aYr+aJp+ihjOWKoOWHj+mAn++8iOaUvue8k++8ieeahOaTjeS9nO+8jG91dO+8jOa4kOa4kOaUvue8k++8jGlu5YiZ55u45Y+NXHJcbiAgICAgICAgdmFyIGp1bXBVcD1jYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sIGNjLnAoMCwgdGhpcy5qdW1wSGlnaHQpKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xyXG4gICAgICAgIHZhciBqdW1wRG93bj1jYy5tb3ZlQnkodGhpcy5qdW1wRHVyYXRpb24sY2MucCgwLC10aGlzLmp1bXBIaWdodCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSBjYy5jYWxsRnVuYyh0aGlzLnBsYXlKdW1wU291bmQsIHRoaXMpO1xyXG4gICAgICAgIC8vc2VxdWVuY2XlsIbkuKTkuKrliqjkvZzov57mjqXvvIznu4Too4XmiJDmlrDnmoTliqjkvZzvvIxyZXBlYXRGb3JldmVy5oqK5Yqo5L2c5LiN5YGc55qE6YeN5aSN77yM5Lmf5piv5oqK5LiA5Liq5Yqo5L2c5YyF6KOF5oiQ5paw55qE5Yqo5L2cXHJcbiAgICAgICAgcmV0dXJuIGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoanVtcFVwLGp1bXBEb3duLGNhbGxiYWNrKSk7XHJcbiAgICB9LFxyXG4gICAgb25EZXZpY2VNb3Rpb25FdmVudDogZnVuY3Rpb24gKGV2ZW50KSB7ICAgIFxyXG4gICAgICAgIGlmKCFHbG9iYWwudXNlclBsYXlGdW4pe1xyXG4gICAgICAgICAgICBzZWxmPXRoaXM7XHJcbiAgICAgICAgICAgIHZhciB6PU1hdGguc3FydCgxLWV2ZW50LmFjYy54KmV2ZW50LmFjYy54LWV2ZW50LmFjYy55KmV2ZW50LmFjYy55KTtcclxuICAgICAgICAgICAgaWYoTWF0aC5hYnMoZXZlbnQuYWNjLngpPE1hdGguYWJzKGV2ZW50LmFjYy55KSl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFjY0xlZnQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQ9ZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKE1hdGguYWJzKGV2ZW50LmFjYy54KT5NYXRoLmFicyhldmVudC5hY2MueSkpe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hY2NSaWdodD10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIoe1xyXG4gICAgICAgICAgICBldmVudDpjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxyXG4gICAgICAgICAgICBvbktleVByZXNzZWQ6ZnVuY3Rpb24oa2V5Q29kZSxldmVudCl7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goa2V5Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQ9ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdD10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjTGVmdD1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkucmlnaHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjUmlnaHQ9dHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25LZXlSZWxlYXNlZDogZnVuY3Rpb24oa2V5Q29kZSxldmVudCl7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goa2V5Q29kZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NMZWZ0PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY1JpZ2h0PWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHNlbGYubm9kZSk7XHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcclxuICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNQYXJzZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFjY0xlZnQpIHtcclxuICAgICAgICAgICAgdGhpcy54U3BlZWQgLT0gdGhpcy5hY2NlbCAqIGR0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5hY2NSaWdodCkge1xyXG4gICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsICogZHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vTWF0aC5hYnMoKeaxgue7neWvueWAvOWHveaVsFxyXG4gICAgICAgIGlmKE1hdGguYWJzKHRoaXMueFNwZWVkKT50aGlzLm1heE1vdmVzcGVlZCl7XHJcbiAgICAgICAgICAgIHRoaXMueFNwZWVkPXRoaXMubWF4TW92ZXNwZWVkKnRoaXMueFNwZWVkL01hdGguYWJzKHRoaXMueFNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5ub2RlLng8KDUwLWNjLmRpcmVjdG9yLmdldFZpc2libGVTaXplICggKS53aWR0aC8yKSl7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS54PTUwLWNjLmRpcmVjdG9yLmdldFZpc2libGVTaXplICggKS53aWR0aC8yO1xyXG4gICAgICAgIH1lbHNlIGlmKHRoaXMubm9kZS54PihjYy5kaXJlY3Rvci5nZXRWaXNpYmxlU2l6ZSAoICkud2lkdGgvMi01MCkpe1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUueD1jYy5kaXJlY3Rvci5nZXRWaXNpYmxlU2l6ZSAoICkud2lkdGgvMi01MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLngrPXRoaXMueFNwZWVkKmR0O1xyXG5cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveTpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuREVWSUNFTU9USU9OLCB0aGlzLm9uRGV2aWNlTW90aW9uRXZlbnQsIHRoaXMpO1xyXG4gICAgfSxcclxuICAgIFxyXG59KTtcclxuIiwiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBzY29yZUxhYmVsOntcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBidXR0b25jbGlja2VkOiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgY2MubG9nKFwiYnV0dG9uIGNsaWNrZWQhXCIpO1xyXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImdhbWVcIik7XHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGE9MTI7XHJcbiAgICAgICAgLy/kuLrkuovku7bnm5HlkKzms6jlhoxcclxuICAgICAgICB0aGlzLnNjb3JlTGFiZWwuc3RyaW5nPVwiU2NvcmVcIitHbG9iYWwudXNlclNjb3JlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLmJ1dHRvbmNsaWNrZWQpO1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuICAgIFxyXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRoaXMuYnV0dG9uY2xpY2tlZCk7XHJcbiAgICB9LFxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgLy8gZm9vOiB7XHJcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCwgICAgICAvLyBUaGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGJlIHVzZWQgb25seSB3aGVuIHRoZSBjb21wb25lbnQgYXR0YWNoaW5nXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICB0byBhIG5vZGUgZm9yIHRoZSBmaXJzdCB0aW1lXHJcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxyXG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxyXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcclxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICAvLyAuLi5cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+S4uuS6i+S7tuebkeWQrOazqOWGjFxyXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5yaWdodGNsaWNrKTtcclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5yaWdodGNsaWNrKTtcclxuICAgIH0sXHJcbiAgICByaWdodGNsaWNrOiBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgLy9jYy5sb2coXCJyaWdodCBjbGlja2VkIVwiKTtcclxuICAgICAgICBpZihHbG9iYWwudXNlclBsYXlGdW4pe1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hY2NSaWdodD10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hY2NMZWZ0PWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgbXVzaWNDaGVja0JveDp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuVG9nZ2xlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb2RlbExhYmVsOntcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW9kZWxDaGVja0JveDp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuVG9nZ2xlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGwsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXHJcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIHNlbGYubXVzaWNDaGVja0JveC5pc0NoZWNrZWQ9R2xvYmFsLnVzZXJNdXNpYztcclxuICAgICAgICBzZWxmLm1vZGVsQ2hlY2tCb3guaXNDaGVja2VkPUdsb2JhbC51c2VyUGxheUZ1bjtcclxuXHJcbiAgICAgICAgc2VsZi5tdXNpY0NoZWNrQm94Lm5vZGUub24oXCJjbGlja1wiLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgY2MubG9nKFwib25jbGlja1wiKTtcclxuICAgICAgICAgICAgaWYoR2xvYmFsLnVzZXJNdXNpYyl7XHJcbiAgICAgICAgICAgICAgICBHbG9iYWwudXNlck11c2ljPWZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC51c2VyTXVzaWM9dHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBzZWxmLm1vZGVsQ2hlY2tCb3gubm9kZS5vbihcImNsaWNrXCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBpZihHbG9iYWwudXNlclBsYXlGdW4pe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5tb2RlbExhYmVsLnN0cmluZz1cIumHjeWKm1wiO1xyXG4gICAgICAgICAgICAgICAgR2xvYmFsLnVzZXJQbGF5RnVuPWZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNlbGYubW9kZWxMYWJlbC5zdHJpbmc9XCLop6bmkbhcIjtcclxuICAgICAgICAgICAgICAgIEdsb2JhbC51c2VyUGxheUZ1bj10cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICBcclxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXHJcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xyXG5cclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iLCJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIC8vIGZvbzoge1xyXG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBub2RlIGZvciB0aGUgZmlyc3QgdGltZVxyXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcclxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcclxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXHJcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxyXG4gICAgICAgIC8vIH0sXHJcbiAgICAgICAgLy8gLi4uXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCx0aGlzLmNsaWNrKTtcclxuICAgIH0sXHJcbiAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsdGhpcy5jbGljayk7XHJcbiAgICB9LFxyXG4gICAgY2xpY2s6ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGNjLmxvZyhcInN0YXJ0IGJ1dHRvbiBjbGlja2VkIVwiKTtcclxuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcclxuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcblxyXG4gICAgLy8gfSxcclxufSk7XHJcbiIsImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgICAgIHBpY2tSOjAsXHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxyXG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lPW51bGw7XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICBnZXRQbGF5ZXJEaXN0YW5jZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgcGxheXA9dGhpcy5nYW1lLnBsYXllci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHJldHVybiBjYy5wRGlzdGFuY2UodGhpcy5ub2RlLmdldFBvc2l0aW9uKCkscGxheXApO1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xyXG4gICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XHJcbiAgICAgICAgIC8vIOagueaNriBHYW1lIOiEmuacrOS4reeahOiuoeaXtuWZqOabtOaWsOaYn+aYn+eahOmAj+aYjuW6plxyXG4gICAgICAgIHZhciBvcGFjaXR5UmF0aW8gPSAxIC0gdGhpcy5nYW1lLnRpbWVyL3RoaXMuZ2FtZS5zdGFyRHVyYXRpb247XHJcbiAgICAgICAgdmFyIG1pbk9wYWNpdHkgPSA1MDtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IG1pbk9wYWNpdHkgKyBNYXRoLmZsb29yKG9wYWNpdHlSYXRpbyAqICgyNTUgLSBtaW5PcGFjaXR5KSk7XHJcbiAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucGlja1IsdGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpKTtcclxuICAgICAgICBpZih0aGlzLmdldFBsYXllckRpc3RhbmNlKCk8dGhpcy5waWNrUil7XHJcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zcGF3bk5ld1N0YXIoKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5nYW1lLmdhaW5zY29yZSgpO1xyXG4gICAgICAgIH1cclxuICAgICB9LFxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==