export class Renderer {

    constructor(canvas, scene) {

        this.canvas = canvas
        this.ctx = canvas.getContext("2d")
        this.scene = scene
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        if (this.scene) {

            this.scene.runLoop()
            this.scene.draw(this.ctx)
        }
        
        requestAnimationFrame(() => { this.draw(this.ctx) })
    }
}