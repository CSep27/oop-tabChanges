(function (window) {
    function Tab(config) {
        // 初始化函数，将所有初始化操作统一放到这个函数中管理
        // 调用构造函数创建新对象时，初始化函数就会执行
        this._init(config);
    }

    Tab.prototype = {
        constructor:Tab,
        _init:function (config) {
            // 初始化元素
            initElems.call(this,config);

            // 初始化事件
            initEvents.call(this);

            if(this.auto === "true" && this.time){
                this.autoPlay();
            }

        },
        change:function (index) {
            var tabItems = this.tabItems,
                mains = this.mains,
                len = tabItems.length;
            for (var j = 0; j < len; j++) {
                tabItems[j].className = "tab-item";
                mains[j].style.display = "none";
            }
            tabItems[index].className += " active";
            mains[index].style.display = "block";
        },
        autoPlay:function () {
            var index = -1,
                len = this.tabItems.length,
                self = this,
                time = this.time;
            setInterval(function () {
                index++;
                if (index >= len) {
                    index = 0;
                }
                self.change(index);
            }, time);
        }
    }

    // 初始化元素 调用时注意要改变函数中this的指向为构造函数创建出来的对象
    var initElems = function (config) {
        // 初始化元素 都作为this对象的属性存在，这样在this对象的方法中就能够调用了
        this.tabItems = document.getElementById(config.tabMenuId).children;
        this.mains = document.getElementById(config.tabMainId).children;
        this.auto = config.auto;
        this.time = config.time;
    }

    // 初始化事件
    var initEvents = function (){
        // 给所有tab栏菜单绑定事件
        var tabItems = this.tabItems,
            len = tabItems.length,
            self = this;
        for (var i = 0; i < len; i++) {
            var tabItem = tabItems[i];
            tabItem.index = i;
            tabItem.onclick = function () {
                // 注意这里使用this调用change方法时，要用变量保存函数外的this以在函数内使用
                self.change(this.index);
            }
        }
    }

    // 暴露出去
    window.Tab = Tab;
})(window)