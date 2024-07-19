function Getnode(row , col){
    for(var i = 0 ; i < nodes.length ; i++){
        if(nodes[i].row === row && nodes[i].col === col){
            return nodes[i]
        }
    }
}

function CreateNodeWalls(row , col){
     for(var i = -1 ; i < 2 ; i++){
        for(var j = -1 ; j < 2 ; j++){
            if( i !== 0 || j !== 0){
                if(Getnode(row + i , col + j) && !Getnode(row + i , col + j).opening){
                    Getnode(row + i , col + j).isWall = true
                }  
            }
        }
    } 

}

function GetAdjacentnodes(row , col){

    var adjacentnodes = []

    for(var i = -2 ; i <= 2 ; i+=2){
        for(var j = -2 ; j <= 2 ; j+=2){
            if((i === -2 && j === 0) || (i === 2 && j === 0) || (i === 0 && j === -2) || (i === 0 && j === 2)){
                if(Getnode(row + i , col + j) && !Getnode(row + i , col + j).visited){
                    adjacentnodes.push(Getnode(row + i , col + j))
                }
            }
        
        }
    }

    return adjacentnodes[Math.floor(Math.random() * adjacentnodes.length)]

}

function CreateOpening(current , next){

    if(next.row === current.row + 2){

        Getnode(current.row + 1 , current.col).opening = true
        Getnode(current.row + 1 , current.col).isWall = false
    }

    if(next.row === current.row - 2){

        Getnode(current.row - 1 , current.col).opening = true
        Getnode(current.row - 1 , current.col).isWall = false
    }

    if(next.col === current.col + 2){

        Getnode(current.row , current.col + 1).opening = true
        Getnode(current.row , current.col + 1).isWall = false
    }

    if(next.col === current.col - 2){

        Getnode(current.row , current.col - 1).opening = true
        Getnode(current.row , current.col - 1).isWall = false
    }
}

function GetAdjacentsets(row , col){

    var sets = []
    var currentset = Getnode(row , col).set

    for(var i = -2 ; i <= 2 ; i+=2){

        for(var j = -2 ; j <= 2 ; j+=2){

            if((i === -2 && j === 0) || ( i === 2 && j === 0) || ( i === 0 && j === -2) || ( i === 0 && j === 2)){

                if(Getnode(row + i , col + j)){

                    if(Getnode(row + i , col + j).set !== currentset){

                        sets.push(Getnode(row + i , col + j))
                       
                    }
                }
               
            }
        }
    }

    return sets[Math.floor(Math.random() * sets.length)]
}

function Highlightnodes(){

    nodecluster.forEach((node,index) => {

        c.beginPath()
        c.fillStyle = "rgba(255,255,.1)"
        c.rect(nodecluster[index].x , nodecluster[index].y , size , size)
        c.fill()
        c.closePath()

    })

    nodecluster = []
}

function kruskalfinished(){

    var currentset = Getnode(1,1).set

    for(var i = 1 ; i < rows ; i+=2){
        
        for(var j = 1 ; j < cols ; j+=2){

           if(Getnode(i,j).set !== currentset){

            return false

           }
        }
    }

    return true

}

function Findnextnode(){

    for(var i = 1 ; i < rows ; i+=2){

        for(var j = 1 ; j < cols ; j+=2){

            if(!Getnode(i,j).visited){

                if(Getnode(i-2,j) && Getnode(i-2,j).visited){

                    return Getnode(i-2,j)
                }

                if(Getnode(i+2,j) && Getnode(i+2,j).visited){

                    return Getnode(i+2,j)
                }

                if(Getnode(i,j-2) && Getnode(i,j-2).visited){

                    return Getnode(i,j-2)
                }

                if(Getnode(i,j+2) && Getnode(i,j+2).visited ){

                    return Getnode(i,j+2)
                }
            }
            
        }
    }
}

