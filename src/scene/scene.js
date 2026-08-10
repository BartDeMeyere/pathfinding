import { ControlManager } from "./controlmanager.js"
import { EventHandler } from "./eventHandler.js"
import { Grid } from "./grid.js"
import { Maze } from "./maze.js"
import { Solver } from "./solver.js"

export class Scene {

    constructor(canvas) {

        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.dpr = window.devicePixelRatio || 1
        this.event = new EventHandler(this.canvas)
        this.grid = new Grid(35, 75, 20)
        this.maze = new Maze(this.grid)
        this.solver = new Solver(this.maze)
        this.controlmanager = new ControlManager(this.maze, this.solver)

        this.canvas.width = this.grid.cols * this.grid.cellSize * this.dpr
        this.canvas.height = this.grid.rows * this.grid.cellSize * this.dpr
        this.ctx.scale(this.dpr, this.dpr)
        this.canvas.style.width = this.grid.cols * this.grid.cellSize + "px"
        this.canvas.style.height = this.grid.rows * this.grid.cellSize + "px"


    }

    runLoop() {

        this.controlmanager.update()
        this.solver.solve()
    }


    draw(ctx) {

        this.grid.draw(ctx)
        this.solver.draw(ctx)
    }
}
