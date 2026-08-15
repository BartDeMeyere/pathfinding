import { ControlManager } from "./controlmanager.js"
import { EventHandler } from "./eventHandler.js"
import { Grid } from "./grid.js"
import { Maze } from "./maze.js"
import { RandomSearch } from "./maze-solvers/randomsearch.js"
import { BreadFirstSearch } from "./maze-solvers/bfs.js"

export class Scene {

    constructor(canvas) {

        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.dpr = window.devicePixelRatio || 1
        this.event = new EventHandler(this.canvas)
        this.grid = new Grid(45, 85, 15)
        this.maze = new Maze(this.grid)


        this.solvers = {

            dfs: new RandomSearch(this.maze, "randomsearch"),
            bfs: new BreadFirstSearch(this.maze, "bfs")
        }

        this.canvas.width = this.grid.cols * this.grid.cellSize * this.dpr
        this.canvas.height = this.grid.rows * this.grid.cellSize * this.dpr
        this.ctx.scale(this.dpr, this.dpr)
        this.canvas.style.width = this.grid.cols * this.grid.cellSize + "px"
        this.canvas.style.height = this.grid.rows * this.grid.cellSize + "px"


        this.controlmanager = new ControlManager(this.maze, this.solvers)

    }

    runLoop() {

        if(!this.controlmanager.activeSolver)return
        this.controlmanager.update()
        this.controlmanager.activeSolver.solve()
    }


    draw(ctx) {

        this.grid.draw(ctx)
        if(this.controlmanager.activeSolver)this.controlmanager.activeSolver.draw(ctx)
    }
}
