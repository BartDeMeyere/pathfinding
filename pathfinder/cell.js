export class Cell {

    constructor(x, y, size, row, col) {

        this.x = x
        this.y = y
        this.size = size
        this.row = row
        this.col = col
        this.visited = false
        this.parent = null
        this.walls = [true, true, true, true] // top - right - bottom - left
    }

    draw(ctx) {

        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = "rgba(0,0,0,.4)"
        ctx.lineWidth = 1
        if (this.walls[0]) { ctx.moveTo(this.x, this.y); ctx.lineTo(this.x + this.size, this.y) }
        if (this.walls[1]) { ctx.moveTo(this.x + this.size, this.y); ctx.lineTo(this.x + this.size, this.y + this.size) }
        if (this.walls[2]) { ctx.moveTo(this.x + this.size, this.y + this.size); ctx.lineTo(this.x, this.y + this.size) }
        if (this.walls[3]) { ctx.moveTo(this.x, this.y + this.size); ctx.lineTo(this.x, this.y) }

        ctx.stroke()
        ctx.closePath()
        ctx.restore()
    }
}