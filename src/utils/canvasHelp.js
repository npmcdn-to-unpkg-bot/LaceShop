class CanvasHelp {
    constructor(option) {
        this.option = $.extend({}, true, CanvasHelp.optionDefault, option)
        this.init()
    }

    init() {
        const option = this.option
        this.canvas = document.getElementById(option.canvas)
        this.ctx = canvas.getContext('2d')
        this.canvWidth = option.width || canvas.clientWidth
        this.canvHeight = option.height || canvas.clientHeight
        this.position = option.position || 0
        this.labelArr = []
        this.imgIsLoaded = false
        this.img = new Image()
        this.img.setAttribute('crossOrigin', 'anonymous')
    }

    drawImage() {
        this.ctx.drawImage(this.img, 0, 0, this.canvWidth, this.canvHeight)
    }

    setPostion(position, noDraw) {
        this.position = position
        !noDraw && this.draw()
    }

    imgswitch(src, callback) {
        if(!src){
            return
        }
        this.imgIsLoaded = false
        this.img.onload = null
        this.img.onload = ()=> {
            this.imgIsLoaded = true
            this.draw()
            callback && callback()
        }
        this.img.src = src
    }

    setLabelArr(labelArr, noDraw) {
        this.labelArr = labelArr
        !noDraw && this.draw()
    }

    getUrl() {
        let type = 'image/jpeg'
        let dataurl = this.canvas.toDataURL(type)
        // let bin = atob(dataurl.split(',')[1])
        // let buffer = new Uint8Array(bin.length)
        // for(let i = 0, binLen = bin.length; i < binLen; i++) {
        //     buffer[i] = bin.charCodeAt(i)
        // }
        // let blob = new Blob([buffer.buffer], {type: type})
        // let url = window.URL.createObjectURL(blob)
        return dataurl
    }

    destroy(){
        if(this.img){
            this.img.onload = null
            this.img = null
        }
        this.ctx.clearRect(0, 0, this.canvWidth, this.canvHeight)
    }

    draw() {
        if(!this.imgIsLoaded){
            return
        }
        const ctx = this.ctx
        const option = this.option
        const fontHeight = option.fontHeight
        const labelArr = this.labelArr
        const position = this.position
        const canvWidth = this.canvWidth
        const canvHeight = this.canvHeight
        const len = labelArr.length
        ctx.clearRect(0, 0, canvWidth, canvHeight)
        ctx.drawImage(this.img, 0, 0, canvWidth, canvHeight)
        ctx.font = fontHeight + "px 黑体"
        ctx.fillStyle = option.fillStyle
        ctx.textBaseline = option.textBaseline
        for(let i = 0; i < len; i++) {
            let length = ctx.measureText(labelArr[i])
            let Align = canvWidth - length.width
            switch(position) {
                case 0:
                    ctx.fillText(labelArr[i], 0, i * fontHeight)
                    break
                case 1:
                    ctx.fillText(labelArr[i], Align, i * fontHeight)
                    break
                case 2:
                    ctx.fillText(labelArr[i], 0, canvHeight + i * fontHeight - len * fontHeight)
                    break
                case 3:
                    ctx.fillText(labelArr[i], Align, canvHeight + i * fontHeight - len * fontHeight)
                    break
            }
        }
    }
}

CanvasHelp.optionDefault = {
    canvas: 'canvas',
    fontHeight: '40',
    fillStyle: '#f00',
    textBaseline: 'top',
    position: 0
}

export default CanvasHelp