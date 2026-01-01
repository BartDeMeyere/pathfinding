export class mazeGenerator {

    //mazegenerator using backtracking algorithm

    constructor(engine) {

        this.engine = engine
        this.grid = this.engine.grid
        this.currentcell = this.pickRandomCell()
        this.stack = []

    }

    pickRandomCell() {

        let r = Math.floor(Math.random() * this.grid.length)
        let c = Math.floor(Math.random() * this.grid[r].length)
        this.grid[r][c].visited = true
        return this.grid[r][c]

    }

    getCell(row, col) {

        if (this.grid[row] === undefined) return false
        if (this.grid[row][col] === undefined) return false
        return this.grid[row][col]
    }

    getRandomNeighbor(row, col) {

        let neighbors = []

        let index = [

            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
        ]

        for (let i = 0; i < index.length; i++) {
            let neighbor = this.getCell(row + index[i][0], col + index[i][1])
            if (neighbor && !neighbor.visited) neighbors.push(neighbor)
        }

        return neighbors[Math.floor(Math.random() * neighbors.length)]
    }

    removeWalls(cellA, cellB) {

        if (cellA.row === cellB.row && cellB.col === cellA.col - 1) { cellA.walls[3] = false; cellB.walls[1] = false }
        if (cellA.row === cellB.row && cellB.col === cellA.col + 1) { cellA.walls[1] = false; cellB.walls[3] = false }

        if (cellA.col === cellB.col && cellB.row === cellA.row - 1) { cellA.walls[0] = false; cellB.walls[2] = false }
        if (cellA.col === cellB.col && cellB.row === cellA.row + 1) { cellA.walls[2] = false; cellB.walls[0] = false }

    }

    generate() {

        do {

            let nextcell = this.getRandomNeighbor(this.currentcell.row, this.currentcell.col)

            if (nextcell) {

                nextcell.visited = true
                this.removeWalls(this.currentcell, nextcell)
                this.stack.push(nextcell)
                this.currentcell = nextcell

            } else {

                if (this.stack.length > 0) {

                    this.currentcell = this.stack.pop()

                }
            }

        } while (!this.allCellsvisited())

        this.clearCells()

    }

    allCellsvisited() {

        for (let row of this.grid) {
            for (let cell of row) {
                if (!cell.visited) return false;
            }
        }
        return true;

    }

    clearCells() {

        for (let row of this.grid) {
            for (let cell of row) {
                cell.visited = false
            }
        }
    }

}