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