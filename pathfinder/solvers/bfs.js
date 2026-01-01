export class BFS_Solver {

    constructor(engine) {

        this.engine = engine
        this.grid = this.engine.grid
        this.queue = []
        this.currentcell = null
        this.animId = null
        this.path = this.engine.path
    }

    init() {

        if (this.animId !== null) cancelAnimationFrame(this.animId)
        this.reset()
        this.solve()

    }

    getCell(row, col) {

        if (this.grid[row] === undefined) return false
        if (this.grid[row][col] === undefined) return false
        return this.grid[row][col]
    }

    getNeighbors(row, col) {

        let neighbors = []
        let current = this.getCell(row, col)

        let index = [

            [-1, 0], [0, 1], [1, 0], [0, -1]
        ]

        for (let i = 0; i < index.length; i++) {

            let neighbor = this.getCell(row + index[i][0], col + index[i][1])

            if (neighbor && !neighbor.visited && !current.walls[i]) {

                neighbors.push(neighbor)
            }
        }

        return neighbors
    }

    reset() {


        this.engine.DFS_Solver.path = []
        this.path = []
        this.queue = []

        for (let row of this.grid) {
            for (let cell of row) {
                cell.visited = false;
            }
        }

        this.currentcell = this.engine.start;
        this.currentcell.visited = true;
        this.queue = [this.currentcell];

    }

    solve() {

        if (this.queue.length === 0) {
            cancelAnimationFrame(this.animId)
            console.log("No path")
            return
        }

        let cell = this.queue.shift() 
        cell.visited = true

        if (cell === this.engine.end) {

            let current = cell
            while (current) {
                this.path.push(current)
                current = current.parent
            }

            cancelAnimationFrame(this.animId)
            console.log("Path found")
            return
        }

        let neighbors = this.getNeighbors(cell.row, cell.col)

        neighbors.forEach(neighbor => {
            neighbor.visited = true   
            neighbor.parent = cell
            this.queue.push(neighbor)
        })

        this.animId = requestAnimationFrame(() => this.solve())
    }

}