import { Renderer } from "./renderer.js"
import { Scene } from "./scene/scene.js"

export class App{

    constructor(canvas){

        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.scene = new Scene(this.canvas)
        this.renderer = new Renderer(this.canvas , this.scene)
        this.renderer.draw()
    }
}