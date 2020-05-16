
/**
 * description： 利用canvas API来绘制移动端网页生成图的封装
 * param：config是一个有顺序的包含画布大小，选择器，要按层级绘制的图片信息（* 必传， ？ 可选）
 * tips: 支持绘制img与text类型，绘制完成后的回调函数，selector是为了与原有js代码解耦
 * eg: 
 * {
    selector*: '.poster-content',
    className: 'poster',
    width*: 200,
    height*: 300,
    bgimg: 'bgimgSrc',
    'img1:img': {
    	src*: ' image1Src'
        x*: 0,
        y*: 0,
        w*: 200,
        h*: 300，
    }
    'text1:text':{
        text*: 'text1',
        x*: 40,
        y*: 50,
        color: '#ffffff',
        font: '25px bold san serif'
    }，
    .....
    callback?: Function
}

 * 
 */


class Poster {

    constructor(config) {
        this.config = config;
        this.width = config.width,
            this.height = config.height,
            this.className = config.className,
            this.font = config.font;
        this.callback = config.callback;
        this.deleteKeys = ["selector", "width", "height", "bgimg", "callback", "className", "font"];
        this.preloadImgList = [];
        this.createCtx.call(this, config.selector);
        this.init();
    }

    init() {
        const _this = this;
        var allKeys = Object.keys(this.config).filter(function (item) {
            return !_this.deleteKeys.find(function (_item) {
                return item === _item;
            });
        });
        if (allKeys.length === 0) return;

        for (var i = 0, key, keys = allKeys; key = keys[i++];) {
            var originItem = _this.config[key];
            if (key.includes(':img')) {
                var imgSrc = originItem.src;
                var imgItem = _this.createImg(imgSrc, key);
                _this.preloadImgList.push(_this.preloadImg(imgItem));
            } else if (key.includes(':text')) {
                var StringItem = _this.drawText(Object.assign({
                    _key: key,
                    _font: _this.font
                }, originItem));
                this.preloadImgList.push(_this.preloadImg(StringItem));

            }
        }

        Promise.all(_this.preloadImgList).then(async function (res) {
            var finishLoadImg = res;

            for (var _i = 0; _i < finishLoadImg.length; _i++) {
                var item = finishLoadImg[_i];
                var _originItem = _this.config[item.id];
                if (_originItem.hasOwnProperty("src")) {
                    const { x, y, w, h } = _originItem;
                    await _this.ctx.drawImage(item, x, y, w, h);
                } else {
                    const textItem = _this.config[item.id];
                    const { x, y } = textItem;
                    await _this.ctx.drawImage(item, x, y);
                }
            }

            var _img = new Image();
            _img.src = _this.$canvas.toDataURL("image/png");
            _img.className = _this.className;
            _img.width = _this.width;
            _img.height = _this.height;
            _this.ctx.clearRect(0, 0, _this.width, _this.height);
            _this.$canvas.style.display = "none";
            _this.$container.appendChild(_img);
        });

        this.config.callback && typeof this.config.callback === "function" && this.config.callback()
    }

    createCtx(selector) {
        this.$container = document.querySelector(selector);
        this.$canvas = this.createDom("canvas", "id", "posterCanvas", "none");
        this.$container.appendChild(this.$canvas);
        this.ctx = this.$canvas.getContext("2d");
        this.$canvas.width = this.width;
        this.$canvas.height = this.height;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    preloadImg(imgNode) {
        return new Promise(function (reslove, reject) {
            if (imgNode.tagName.toLowerCase() === 'img') {
                imgNode.onload = function () {
                    reslove(imgNode);
                };
            } else {
                reject("".concat(imgNode, "\u5FC5\u987B\u662Fimg\u7C7B\u578B"));
            }
        });
    }

    drawText(_ref) {
        var text = _ref.text,
            _ref$color = _ref.color,
            color = _ref$color === void 0 ? '#ffffff' : _ref$color,
            font = _ref._font,
            key = _ref._key;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.font = font;
        ctx.textBaseline = 'hanging';
        ctx.fillText(text, 0, 0);
        var imgSrc = canvas.toDataURL("image/png");
        return this.createImg(imgSrc, key);
    }

    createDom(name, key, value) {
        var display = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "none";
        var $dom = document.createElement(name);
        $dom.setAttribute(key, value);
        $dom.style.display = display;
        return $dom;
    }

    createImg(src, id) {
        var img = new Image();
        img.src = src;
        img.id = id;
        return img;
    }

}
