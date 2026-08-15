import { getRandomUnvisitedNeighbor } from "./utils.js"

export class RandomSearch {

    constructor(maze, type) {

        this.maze = maze
        this.currentCell = this.maze.pickRandomCell()
        this.startCell = this.currentCell
        this.currentCell.visited = true

        const cells = this.maze.grid.cells

        do {

            this.endCell = this.maze.pickRandomCell()

        } while (this.endCell === this.currentCell)

        this.path = [this.currentCell]
        this.solved = false
        this.canStart = false
        this.paused = false
        this.type = type
    }

    solve() {

        if (!this.canStart) return
        if (this.paused) return
        if (!this.currentCell) return

        if (this.currentCell === this.endCell) {
            this.solved = true
            return
        }

        let next = getRandomUnvisitedNeighbor(this.currentCell.row, this.currentCell.col , this.maze)

        if (next) {

            this.path.push(next)
            next.visited = true
            this.currentCell = next

            if (this.currentCell === this.endCell) {
                console.log("maze is solved")
                this.solved = true
            }

        } else {

            // backtrack
            if (this.path.length > 1) {
                this.path.pop()
                this.currentCell = this.path[this.path.length - 1]
            } else {
                this.path = []
                this.currentCell = null
            }
        }

    }

    draw(ctx) {

        //draw currentCell
        if (this.startCell) {

            ctx.beginPath()
            ctx.fillStyle = "rgb(94, 184, 49)"
            ctx.rect(this.startCell.x - this.maze.grid.cellSize / 2, this.startCell.y - this.maze.grid.cellSize / 2, this.maze.grid.cellSize, this.maze.grid.cellSize)
            ctx.fill()
            ctx.closePath()
        }

        //draw endCell
        if (this.endCell) {

            ctx.beginPath()
            ctx.fillStyle = "rgb(244, 114, 0)"
            ctx.rect(this.endCell.x - this.maze.grid.cellSize / 2, this.endCell.y - this.maze.grid.cellSize / 2, this.maze.grid.cellSize, this.maze.grid.cellSize)
            ctx.fill()
            ctx.closePath()
        }

        //draw path
        if (this.path.length > 0) {

            ctx.save()
            ctx.beginPath()
            ctx.strokeStyle = "rgb(197, 37, 211)"
            ctx.lineWidth = this.maze.grid.cellSize / 6
            ctx.moveTo(this.path[0].x, this.path[0].y)

            for (let i = 1; i < this.path.length; i++) {

                ctx.lineTo(this.path[i].x, this.path[i].y)
            }

            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        }

    }

    restart() {

        this.canStart = true
        
         for (let i = 0; i < this.maze.grid.rows; i++) {
            for (let j = 0; j < this.maze.grid.cols; j++) {

                this.maze.grid.cells[i][j].visited = false
            }
        }
        this.currentCell = this.startCell
        this.currentCell.visited = true
        this.path = [this.currentCell]
        this.solved = false
        this.paused = false
    }

    stop() {

        this.paused = true
    }

    start() {

        this.paused = false
    }

    reset() {

        this.stop()
        this.path = []

        this.currentCell = this.maze.pickRandomCell()
        this.startCell = this.currentCell
        this.currentCell.visited = true

        const cells = this.maze.grid.cells

        do {

            this.endCell = this.maze.pickRandomCell()

        } while (this.endCell === this.currentCell)

        this.path = [this.currentCell]
        this.solved = false
        this.canStart = false
        this.paused = true
    }

    countVisitedCells() {

        let count = 0

        for (let i = 0; i < this.maze.grid.rows; i++) {
            for (let j = 0; j < this.maze.grid.cols; j++) {

                if(this.maze.grid.cells[i][j].visited)count++
            }
        }



        return count
    }
}