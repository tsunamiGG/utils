//使用canvas的电子签字Js文件
// params: 1.id
const stopDefault = (e) => e.preventDefault();
class Draw {
    constructor(item,width,height) {
        this.item = item;
        //获取 配置 canvas
        this.canvas = document.getElementById(item);
        this.canvas.width = width;
        this.canvas.height = height;
        this.cxt = this.canvas.getContext('2d');
        this._left = this.canvas.getBoundingClientRect().left;
        this._top = this.canvas.getBoundingClientRect().top;
        this.path = {
            beginX: 0,
            beginY: 0,
            endX: 0,
            endY: 0
        }
    }
    ready() {
        this.canvas.addEventListener('touchstart', (e) => {
            console.log("ready")
            document.addEventListener('touchstart', stopDefault, { passive: false });
            this.drawBegin(e);
        })
        this.canvas.addEventListener('touchend', (e) => {
            document.addEventListener('touchend', stopDefault, { passive: false });
            this.drawEnd();
        })
        this.clear();
    }
    
    drawBegin(e) {
        window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()
        //设置线条样式
        this.cxt.setStrokeStyle = '#090600';
        this.cxt.lineWidth = 10;
        this.cxt.lineCap = 'round';
        //开始绘制
        this.cxt.beginPath();
        let _x = e.changedTouches[0].clientX - this._left;
        let _y = e.changedTouches[0].clientY - this._top;
        this.cxt.moveTo(_x,_y);
        this.path.beginX = _x;
        this.path.beginY = _y;
        this.canvas.addEventListener("touchmove",(e) => this.drawing(event));
    }
    drawing(e) {
        let _x = e.changedTouches[0].clientX - this._left;
        let _y = e.changedTouches[0].clientY - this._top;
        this.cxt.lineTo(_x,_y);
        this.path.endX = _x;
        this.path.endY = _y;
        this.cxt.stroke();
    }

    drawEnd() {
        document.removeEventListener('touchstart', stopDefault, { passive: false });
        document.removeEventListener('touchmove', stopDefault, { passive: false });
        document.removeEventListener('touchend', stopDefault, { passive: false });
    }
    clear() {
        this.cxt.clearRect(0,0,this.width,this.height);

    }
    save() {
        return this.canvas.toDataURL('image/png')
    }
}

export {Draw}