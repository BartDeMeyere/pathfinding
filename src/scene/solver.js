export class Solver {

    constructor(maze) {

        this.maze = maze
        this.currentCell = this.maze.pickRandomCell()
        this.startCell = this.currentCell
        this.currentCell.visited = true

        const cells = this.maze.grid.cells
        do {
            this.endCell = cells[Math.floor(Math.random() * cells.length)]
        } while (this.endCell === this.currentCell)

        this.path = [this.currentCell]
        this.solved = false
        this.canStart = false
        this.paused = false
        this.type = "randomwalk"
    }

    getRandomUnvisitedNeighbor(row, col) {

        let neighbors = []
        let current = this.maze.getCellAt(row, col)
        let neighbor

        neighbor = this.maze.getCellAt(row - 1, col)

        if (neighbor && !neighbor.visited && !current.top) {

            neighbors.push(neighbor)
        }

        neighbor = this.maze.getCellAt(row + 1, col)

        if (neighbor && !neighbor.visited && !current.bottom) {

            neighbors.push(neighbor)
        }

        neighbor = this.maze.getCellAt(row, col + 1)

        if (neighbor && !neighbor.visited && !current.right) {

            neighbors.push(neighbor)
        }

        neighbor = this.maze.getCellAt(row, col - 1)

        if (neighbor && !neighbor.visited && !current.left) {

            neighbors.push(neighbor)
        }

        return neighbors[Math.floor(Math.random() * neighbors.length)]
    }

    solve() {

        if (!this.canStart) return
        if (this.paused) return

        if (!this.currentCell) return
        if (this.currentCell === this.endCell) {
            this.solved = true
            return
        }

        let next = this.getRandomUnvisitedNeighbor(this.currentCell.row, this.currentCell.col)

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
        this.maze.grid.cells.forEach(cell => cell.visited = false)
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
            this.endCell = cells[Math.floor(Math.random() * cells.length)]
        } while (this.endCell === this.currentCell)

        this.path = [this.currentCell]
        this.solved = false
        this.canStart = false
        this.paused = true
    }

    countVisitedCells() {

        let count = 0

        this.maze.grid.cells.forEach(cell => {

            if (cell.visited) count++
        })

        return count
    }
}