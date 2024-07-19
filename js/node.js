class Node{

    constructor(x, y , size){

        this.x = x 
        this.y = y
        this.size = size 
        this.isWall = false
        this.row = undefined 
        this.col = undefined
        this.opening = false
        this.visited = false
        this.value = undefined
        this.currentsize = 0
        this.set = undefined

    }

    render(){


        c.beginPath()
        c.strokeStyle = "#2B7922"
        c.lineWidth = .5
        c.rect(this.x , this.y , this.size , this.size)
        c.stroke()
        c.closePath()

        if(this.isWall){

            this.currentsize += (this.size - this.currentsize) * .09

            c.beginPath()
            c.fillStyle = "rgba(78,162,68,.7)"
            c.rect(this.x , this.y , this.currentsize , this.currentsize)
            c.fill()
            c.closePath()

        }

        if(this.value > 0){

            c.beginPath()
            c.fillStyle = "rgba(157,222,185,1)"
            c.rect(this.x , this.y , this.size , this.size)
            c.fill()
            c.closePath()
         
        }

    }
}