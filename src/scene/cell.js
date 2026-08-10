export class Cell {

    constructor(x, y, size, row, col) {

        this.x = x
        this.y = y
        this.size = size
        this.visited = false
        this.row = row
        this.col = col
        this.bottom = true
        this.top = true
        this.right = true
        this.left = true

    }

    draw(ctx) {

        if (this.visited) {

            ctx.save()
            ctx.translate(this.x, this.y)
            ctx.beginPath()
            ctx.fillStyle = "rgba(0,0,0,.05)"
            ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size)
            ctx.fill()
            ctx.closePath()
            ctx.restore()

        }

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.beginPath()
        ctx.strokeStyle = "#BBB"

        if (this.top) {

            ctx.moveTo(-this.size / 2, -this.size / 2)
            ctx.lineTo(this.size / 2, -this.size / 2)
        }

        if (this.right) {

            ctx.moveTo(this.size / 2, -this.size / 2)
            ctx.lineTo(this.size / 2, this.size / 2)
        }

        if (this.bottom) {

            ctx.moveTo(this.size / 2, this.size / 2)
            ctx.lineTo(-this.size / 2, this.size / 2)
        }

        if (this.left) {

            ctx.moveTo(-this.size / 2, this.size / 2)
            ctx.lineTo(-this.size / 2, -this.size / 2)

        }

        ctx.stroke()
        ctx.closePath()
        ctx.restore()

    }
}