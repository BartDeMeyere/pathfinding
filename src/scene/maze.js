export class Maze {

    constructor(grid) {

        this.grid = grid
        this.current = this.pickRandomCell()
        this.stack = [this.current]
        this.current.visited = true
        this.create()
    }


    pickRandomCell() {

        let cell = this.grid.cells[Math.floor(Math.random() * this.grid.cells.length)]
        cell.visited = true
        return cell
    }

    getRandomUnvisitedNeighbor(row, col) {

        const current = this.getCellAt(row, col)
        if (!current) return null

        const neighbors = []

        const directions = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 },  // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }   // right
        ]

        for (const dir of directions) {
            const cell = this.getCellAt(row + dir.row, col + dir.col)
            if (cell && !cell.visited) {
                neighbors.push(cell)
            }
        }

        if (neighbors.length === 0) {
            return null
        }

        return neighbors[Math.floor(Math.random() * neighbors.length)]
    }

    removeWalls(cellA, cellB) {

        if ((cellA.row === cellB.row) && (cellB.col === cellA.col - 1)) {

            cellA.left = false
            cellB.right = false
        }


        if ((cellA.row === cellB.row) && (cellB.col === cellA.col + 1)) {

            cellA.right = false
            cellB.left = false
        }


        if ((cellA.col === cellB.col) && (cellB.row === cellA.row - 1)) {

            cellA.top = false
            cellB.bottom = false
        }

        if ((cellA.col === cellB.col) && (cellB.row === cellA.row + 1)) {

            cellA.bottom = false
            cellB.top = false
        }
    }

    reset() {

        this.grid.cells.forEach(cell => {
            cell.visited = false
        });
    }
    
    rebuild(){

        this.grid.cells.forEach(cell => {

            cell.visited = false 
            cell.top = true 
            cell.right = true 
            cell.bottom = true 
            cell.left = true
        })

        this.current = this.pickRandomCell()
        this.stack = [this.current]
        this.current.visited = true
        this.create()
    }

    getCellAt(row, col) {

        for (const cell of this.grid.cells) {
            if (cell.row === row && cell.col === col) {
                return cell
            }
        }

        return null
    }

    create() {

        do {

            let next = this.getRandomUnvisitedNeighbor(this.current.row, this.current.col)

            if (next) {

                next.visited = true
                this.removeWalls(this.current, next)
                this.stack.push(next)
                this.current = next

            } else {

                if (this.stack.length > 0) {

                    this.current = this.stack.pop()
                }
            }


        } while (this.stack.length > 0)

        this.reset()
    }

}