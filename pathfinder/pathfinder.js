import { Cell } from "./cell.js"
import { mazeGenerator } from "./mazeGenerator.js"
import { DFS_Solver } from "./solvers/dfs.js"
import { BFS_Solver } from "./solvers/bfs.js"
import { Renderer } from "./renderer.js"

export class Pathfinder {

    constructor(cellSize) {

        this.cellSize = cellSize
        this.dpr = devicePixelRatio || 1
        this.canvas = null
        this.ctx = null

        this.init()
        this.grid = this.createGrid()

        this.start = this.pickRandomCell()
        this.end = this.pickRandomCell()
        this.path = []
        this.path_width = this.cellSize / 3

        this.mazeGenerator = new mazeGenerator(this)
        this.mazeGenerator.generate()

        this.DFS_Solver = new DFS_Solver(this)
        this.BFS_Solver = new BFS_Solver(this)

        this.renderer = new Renderer(this)

    }

    init() {

        this.canvas = document.querySelector("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.canvas.width = innerWidth * this.dpr
        this.canvas.height = innerHeight * this.dpr
        this.canvas.style.width = "100%"
        this.canvas.style.height = "100%"
        
    }

    createGrid() {

        let rows = Math.round(this.canvas.height / this.cellSize)
        let cols = Math.round(this.canvas.width / this.cellSize)

        let cellWidth = Math.min(this.canvas.width / cols)
        let cellHeight = Math.min(this.canvas.height / rows)

        this.cellSize = Math.min(cellWidth, cellHeight)

        let grid = []

        for (let i = 0; i < rows; i++) {
            grid[i] = []
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Cell(j * this.cellSize, i * this.cellSize, this.cellSize, i, j)
            }
        }

        return grid
    }

    drawGrid() {

        this.grid.forEach(row => {
            row.forEach(cell => {
                cell.draw(this.ctx)
            })
        })
    }


    pickRandomCell() {

        let r = Math.floor(Math.random() * this.grid.length)
        let c = Math.floor(Math.random() * this.grid[r].length)
        return this.grid[r][c]

    }
}