
function DrawOuterwalls(){


    if(colcount < cols - 1 && rowcount === 0){
        
        Getnode(rowcount , colcount).isWall = true
        colcount++

    }else{

        if(rowcount < rows  && colcount === cols - 1){

            Getnode(rowcount , colcount).isWall = true
            rowcount++

        }

        if(colcount > 0  && rowcount === rows - 1){

            Getnode(rowcount , colcount).isWall = true
            colcount--

        }

        if(colcount === 0  && rowcount > 0){

            Getnode(rowcount , colcount).isWall = true
            rowcount--

        }
    }

    if(rowcount === 1 && colcount === 0){

        Getnode(rowcount , colcount).isWall = true
        rowcount = 0
        colcount = 0
        recursivedivision(false , 0 , cols , 0 , rows)
        return
    }

    setTimeout(DrawOuterwalls , 1)
}

function RandomEvenNumber(start , end){

    var numbers = []

    for(var i = start + 1 ; i < end ; i++){

        if(i % 2 === 0){

            numbers.push(i)
        }
    }

   return numbers[Math.floor(Math.random() * numbers.length)]
}

function RandomOddNumber(start , end){

    var numbers = []

    for(var i = start + 1 ; i < end ; i++){

        if(i % 2 > 0){

            numbers.push(i)
        }
    }

    return numbers[Math.floor(Math.random() * numbers.length)]
}

function DrawHorizontalwall(startx , endx , row){

    var open = RandomOddNumber(startx , endx)

     for(var c = startx ; c < endx ; c++){

        if(c !== open){

            Getnode(row , c).isWall = true
        }
     }

}

function DrawVerticalwall(starty , endy , col){

    var open = RandomOddNumber(starty , endy)

    for(var r = starty ; r < endy ; r++){

        if(r !== open){

            Getnode(r, col).isWall = true
        }
    }
}

var running = true

function recursivedivision(horizontal , startx , endx , starty , endy){

    function run(){

        if(horizontal){

            if(endx - startx < 3){

                nodes.forEach(node => {

                    if(!node.isWall){
    
                        node.value = 0
                    }
                })

                return
   
            }

            var row = RandomEvenNumber(starty , endy)
            DrawHorizontalwall(startx , endx , row)

            recursivedivision(false , startx , endx , starty , row)
            recursivedivision(false , startx , endx , row , endy)

        }else{

            if(endy - starty < 3){

                nodes.forEach(node => {

                    if(!node.isWall){
    
                        node.value = 0
            
                    }
                })

                return

            }

            var col = RandomEvenNumber(startx , endx)
            DrawVerticalwall(starty , endy , col)
        
            recursivedivision(true , startx , col , starty , endy)
            recursivedivision(true , col , endx , starty , endy)
        }

   }

    setTimeout(run , 100)

}



function runTimer(){

    var counter = 0

    function run(){

        counter++
        console.log(counter)

        if(counter === 6){

            mazefinish = true
            return
           
        }

        setTimeout(run , 1000)
    }

    run()
   
}
