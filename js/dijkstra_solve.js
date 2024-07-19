function floodfill(row , col){

    console.log("floodfill")

    if(mazefinish){

        function run(){

            if(Getnode(row , col) === endnode){

                flood = false
                cancelAnimationFrame(timer)
                FindPath()
                return
            }

            if(Getnode(row - 1 , col) && Getnode(row - 1 , col).value === 0 && !Getnode(row - 1 , col).isWall){

                Getnode(row - 1 , col).value = Getnode(row , col).value + 1

                if(flood){

                    floodfill(row - 1 , col)
                }
               

            }

            if(Getnode(row + 1 , col) && Getnode(row + 1 , col).value === 0  && !Getnode(row + 1 , col).isWall){

                Getnode(row + 1 , col).value = Getnode(row , col).value + 1

                if(flood){

                    floodfill(row + 1 , col)
                }
                

            }

            if(Getnode(row , col - 1) && Getnode(row , col - 1).value === 0  && !Getnode(row , col - 1).isWall){

                Getnode(row , col - 1).value = Getnode(row , col).value + 1

                if(flood){

                    floodfill(row , col - 1)
                }
              

            }

            if(Getnode(row , col + 1) && Getnode(row , col + 1).value === 0  && !Getnode(row , col + 1).isWall){

                Getnode(row , col + 1).value = Getnode(row , col).value + 1

                if(flood){

                    floodfill(row , col + 1)

                }
             

            }
        }

        RenderContent()

       timer = requestAnimationFrame(run)

    }
  
}

function FindPath(){

    if(!currentnode){

        currentnode = endnode
    }

    var previousnode = GetPreviousnode(currentnode.row , currentnode.col)

    if(previousnode){

        path.push(previousnode)
        currentnode = previousnode
    }


    RenderContent()

    if(currentnode.value === 1){

        $("#mazegenerator").prop("disabled" , false)
        cancelAnimationFrame(timer)
        return
    }

    //setTimeout(FindPath , timerspeed)
   timer = requestAnimationFrame(FindPath)
}

function GetPreviousnode(row , col){

    if(Getnode(row - 1 , col) && Getnode(row - 1 , col).value === Getnode(row , col).value - 1){

        return Getnode(row - 1 , col)
    }

    if(Getnode(row + 1 , col) && Getnode(row + 1 , col).value === Getnode(row , col).value - 1){

        return Getnode(row + 1 , col)
    }

    if(Getnode(row , col + 1) && Getnode(row , col + 1).value === Getnode(row , col).value - 1){

        return Getnode(row , col + 1)
    }

    if(Getnode(row , col - 1) && Getnode(row , col - 1).value === Getnode(row , col).value - 1){

        return Getnode(row , col - 1)
    }
}