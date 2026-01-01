export class Renderer {

    constructor(engine) {

        this.engine = engine
        this.start = this.engine.start
        this.end = this.engine.end
        this.grid = this.engine.grid
        this.render()
    }

    render() {

        this.engine.ctx.clearRect(0, 0, this.engine.canvas.width, this.engine.canvas.height)

        this.drawVisitedCells()
        this.drawPath()
        this.drawBFS()
        this.drawStart()
        this.drawEnd()

        //draw maze grid
        this.engine.drawGrid()

       this.animId = requestAnimationFrame(() => this.render())
    }

    stop() {
        if (this.animId !== null) {
            cancelAnimationFrame(this.animId)
            this.animId = null
        }
    }

    drawVisitedCells() {

        //draw visited cells
        this.grid.forEach(row => {
            row.forEach(cell => {
                if (cell.visited) {

                    this.engine.ctx.beginPath()
                    this.engine.ctx.fillStyle = "rgba(189,222,252,1)"
                    this.engine.ctx.rect(cell.x - 2, cell.y - 2, cell.size + 2, cell.size + 2)
                    this.engine.ctx.fill()
                    this.engine.ctx.closePath()
                }
            })
        })

    }

    drawPath() {

        this.path = this.engine.DFS_Solver.path

        if(this.path.length === 0) this.path = this.engine.BFS_Solver.path

        //draw path
        if (this.path.length > 0) {

            this.engine.ctx.beginPath()
            this.engine.ctx.strokeStyle = "magenta"
            this.engine.ctx.lineJoin = "round"
            this.engine.ctx.lineWidth = this.engine.path_width

            this.engine.ctx.moveTo(this.path[0].x + this.path[0].size / 2, this.path[0].y + this.path[0].size / 2)
            for (let i = 1; i < this.path.length; i++) {

                this.engine.ctx.lineTo(this.path[i].x + this.path[i].size / 2, this.path[i].y + this.path[i].size / 2)
            }

            this.engine.ctx.stroke()
            this.engine.ctx.closePath()


        }

    }

    drawBFS(){

        for(let i = 0 ; i < this.engine.BFS_Solver.queue.length ; i++){

            let cell = this.engine.BFS_Solver.queue[i]

            this.engine.ctx.beginPath()
            this.engine.ctx.fillStyle = "dodgerblue"
            this.engine.ctx.rect(cell.x, cell.y, cell.size, cell.size)
            this.engine.ctx.fill()
            this.engine.ctx.closePath()
        }
    }

    drawStart() {

        //draw start
        this.engine.ctx.beginPath()
        this.engine.ctx.fillStyle = "red"
        this.engine.ctx.rect(this.start.x, this.start.y, this.start.size, this.start.size)
        this.engine.ctx.fill()
        this.engine.ctx.closePath()
    }

    drawEnd() {

        //draw end
        this.engine.ctx.beginPath()
        this.engine.ctx.fillStyle = "green"
        this.engine.ctx.rect(this.end.x, this.end.y, this.end.size, this.end.size)
        this.engine.ctx.fill()
        this.engine.ctx.closePath()
    }
}