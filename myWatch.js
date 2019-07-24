//小程序简易监听器watch
// parmar: 1.this(page)
// Object.defineProperty()会把传入的属性从数据属性变为容器属性，可配置configurable,enmurable和set,get.达到数据劫持

function setwatcher(page) {
    const data = page.data;
    const watch = page.watch;
    //遍历监听属性，添加observe
    Object.keys(watch).forEach(attr => {
        observe(page, data, attr, watch[attr]);
    })
}


funciton observe(page, obj, attr, watchFun) {
    let attr = obj[attr];
    Object.defineProperty(obj, attr, {
        configurable: true,
        enmurable: true,
        set: function(value) {
            attr = value;
            //调用watch内的监听函数
            watchFun.call(page, value);
        },
        get: function(value) {
            return attr
        },
    })
}


//调用示例
import /..setwatcher(this)../
page({
    data: {
      subcarNumber: ''
    },
    onLoad: funciton() {
      setwatcher(this)
    },
        //监听器
    watch: {
        subcarNumber: function (newValue) {
            if (newValue.length === 7) {
                this.setData({
                    disBtn: false
                })
            } else {
                this.setData({
                    disBtn: true
                })
            }
        },
    },
    

})
