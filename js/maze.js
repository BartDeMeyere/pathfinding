function Depthfirstsearch(){

    if(!current){

        current = RandomNode()
        //currentnode.visited = true
    }

    var nextnode = GetAdjacentnodes(current.row , current.col)

    if(nextnode){

        stack.push(current)

        CreateOpening(current , nextnode)
        CreateNodeWalls(current.row , current.col)
        CreateNodeWalls(nextnode.row , nextnode.col)

        nextnode.visited = true 
        current = nextnode

        
    }else{

        if(stack.length > 0){

            current = stack.pop()

        }else{

            mazefinish = true

            current = undefined

            nodes.forEach(node => {

                if(!node.isWall){

                    node.value = 0
                }
            })

            return
        }
        
    
    }

   timer = requestAnimationFrame(Depthfirstsearch)
}

function Primsalgorithm(){

    console.log("prims")

    if(!current){

        current = RandomNode()
        current.visited = true
        stack.push(current)
    }

    var nextnode = GetAdjacentnodes(current.row , current.col)

    if(nextnode){

       
        CreateOpening(current , nextnode)
        CreateNodeWalls(current.row , current.col)
        CreateNodeWalls(nextnode.row , nextnode.col)

        nextnode.visited = true 
        stack.push(nextnode)

    }else{

        if(stack.length > 0){

            console.log(index)
            var index = Math.floor(Math.random() * stack.length)
            current = stack[index]
            stack.splice(index , 1)


        }else{

            mazefinish = true

            current = undefined

            nodes.forEach(node => {

                if(!node.isWall){

                    node.value = 0
                    node.currentsize = size
                }
            })

            return
        }
        
    
    }

   timer = requestAnimationFrame(Primsalgorithm)
}

function Kruskalalgorithm(){

    //console.log("kruskal")
    if(kruskalfinished()){

        console.log("maze finished with kruskal")

        mazefinish = true
        current = undefined

        nodes.forEach(node => {

            if(!node.isWall){

                node.value = 0
                node.currentsize = size
            }
        })

        return
    }

    current = RandomNode()

    var nextnode = GetAdjacentsets(current.row , current.col)


    if(nextnode){

        var set1 = current.set 
        var set2 = nextnode.set

        nodes.forEach(node => {

            if(node.set === set1){

                nodecluster.push(node)

                if(Getnode(node.row - 1 , node.col) && !Getnode(node.row - 1 , node.col).isWall){

                    nodecluster.push(Getnode(node.row - 1 , node.col))

                }

                if(Getnode(node.row + 1 , node.col) && !Getnode(node.row + 1 , node.col).isWall){

                    nodecluster.push(Getnode(node.row + 1 , node.col))

                }


                if(Getnode(node.row , node.col - 1) && !Getnode(node.row , node.col - 1).isWall){

                    nodecluster.push(Getnode(node.row , node.col - 1))

                }

                if(Getnode(node.row , node.col + 1) && !Getnode(node.row , node.col + 1).isWall){

                    nodecluster.push(Getnode(node.row , node.col + 1))

                }

                node.set = set2
            }

            
        })

        CreateOpening(current , nextnode)
        CreateNodeWalls(current.row , current.col)
        CreateNodeWalls(nextnode.row , nextnode.col)
    }

    timer = requestAnimationFrame(Kruskalalgorithm)
}

function Huntandkill(){

    if(!current){

        current = RandomNode()
        current.visited = true
    }

    var nextnode = GetAdjacentnodes(current.row , current.col)

    if(nextnode){

        CreateOpening(current , nextnode)
        CreateNodeWalls(current.row , current.col)
        CreateNodeWalls(nextnode.row , nextnode.col)

        nextnode.visited = true 
        current = nextnode

    }else{

        current = Findnextnode()

        if(current){

            current.visited = true

        }else{

            current = undefined
            mazefinish = true

            nodes.forEach(node => {

                if(!node.isWall){
    
                    node.value = 0
                    node.currentsize = size
                }
            })
            
            return
        }
       
    }

   timer = requestAnimationFrame(Huntandkill)
}

