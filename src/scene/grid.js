import { Cell } from "./cell.js"
export class Grid {

    constructor(rows, cols, cellSize) {

        this.rows = rows
        this.cols = cols
        this.cellSize = cellSize
        this.cells = []

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const x = j * this.cellSize + this.cellSize / 2
                const y = i * this.cellSize + this.cellSize / 2
                const cell = new Cell(x, y, this.cellSize,i,j)
                this.cells.push(cell)
            }
        }

    }

    draw(ctx) {

        for (const cell of this.cells) {
            cell.draw(ctx)
        }

    }
}   