export class DFS_Solver {

    constructor(engine) {

        this.engine = engine
        this.grid = this.engine.grid
        this.currentcell = this.engine.start
        this.currentcell.visited = true
        this.stack = [this.currentcell]
        this.animId = null
        this.path = this.engine.path

    }
    init() {

        if (this.animId !== null) cancelAnimationFrame(this.animId)
        this.reset()
        this.solve()

    }

    reset() {

        this.engine.DFS_Solver.path = []
        this.engine.BFS_Solver.queue = []
        this.engine.BFS_Solver.path = []
        this.path = []

        for (let row of this.grid) {
            for (let cell of row) {
                cell.visited = false;
            }
        }

        this.currentcell = this.engine.start;
        this.currentcell.visited = true;
        this.stack = [this.currentcell];
        this.path = this.stack

    }

    clear() {

        if (this.animId !== null) cancelAnimationFrame(this.animId)
        for (let row of this.grid) {
            for (let cell of row) {
                cell.visited = false;
            }
        }

        this.stack = []
    }

    getCell(row, col) {

        if (this.grid[row] === undefined) return false
        if (this.grid[row][col] === undefined) return false
        return this.grid[row][col]
    }

    getRandomNeighbor(row, col) {

        let neighbors = []
        let current = this.getCell(row, col)

        let index = [

            [-1,0] , [0,1] , [1,0] , [0,-1]
        ]

        for(let i = 0 ; i < index.length ; i++){

            let neighbor = this.getCell(row + index[i][0] , col + index[i][1])

            if(neighbor && !neighbor.visited && !current.walls[i]){

                neighbors.push(neighbor)
            }
        }

        return neighbors[Math.floor(Math.random() * neighbors.length)]
    }

    solve() {

        let nextcell = this.getRandomNeighbor(this.currentcell.row, this.currentcell.col)

        if (nextcell === this.engine.end) {

            nextcell.visited = true
            this.stack.push(nextcell)
            return
        }

        if (nextcell) {

            nextcell.visited = true
            this.stack.push(nextcell)
            this.currentcell = nextcell

        } else {

            if (this.stack.length > 0) {

                this.stack.pop()
                this.currentcell = this.stack[this.stack.length - 1]

            } else {

                console.log("path not found")
                return
            }
        }

        this.path = this.stack

        this.animId = requestAnimationFrame(() => this.solve())
    }
}