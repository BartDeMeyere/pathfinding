//get canvas and 2d renderingContext
let canvas = $("canvas")[0]
let c = canvas.getContext("2d")

//set dimension of the canvas
$("canvas").css("width" , 100 + "%")
canvas.width = innerWidth * devicePixelRatio 

//variables
let nodes = []
let stack = []
let timer = undefined
let timerspeed = 150
let mazefinish = false
let flood = true
let path = []
let nodecluster = []
let cols , rows , size , current /* current node on maze creation */
 //counter drawing outer walls
let colcount = 0
let rowcount = 0

$("#mazesolver").prop("disabled" , true)

//check mobile
if("ontouchstart" in document.documentElement){
    
    console.log("you are on a touch screen device");
    cols = 25
    size = canvas.width / cols 
    rows = 25
    
}else{
    
    console.log("you are NOT on a touch screen device");
    cols = 87
    size = canvas.width / cols 
    rows = Math.floor(cols/2)
}

//set dimensions canvas
$("canvas").css("height" , rows * size )
canvas.height = (rows * size) * devicePixelRatio 

//create all nodes
CreateNodes()

let currentnode = undefined
let startnode = RandomNode()
let endnode = RandomNode()

//render maze
RenderMaze()

//pick random node
function RandomNode(){
    
    var r , c 
    
    do{
        
        r = Math.floor(Math.random() * rows)
        c = Math.floor(Math.random() * cols)
        
    }while(r % 2 === 0 || c % 2 === 0)
        
    return Getnode(r,c)
}

//create nodes
function CreateNodes(){

    var counter = 1
    
    for(var i = 0 ; i < rows ; i++){
        
        for(var j = 0 ; j < cols ; j++){
            
            var node = new Node(j * size , i * size , size)
            node.row = i 
            node.col = j
            nodes.push(node)
        }
    }

    //create node sets
    for(var i = 1 ; i < rows ; i+=2){
        
        for(var j = 1 ; j < cols ; j+=2){

            Getnode(i,j).set = counter

            counter++
        }
    }

}

//render maze
function RenderMaze(){
    
    if(!mazefinish){
        
        RenderContent()
        timer = requestAnimationFrame(RenderMaze)
        
    }else{
        
        currentnode = undefined

        //set nodes to size
        nodes.forEach(node => node.currentsize = size)

        //reset node sets
         var counter = 1

         for(var i = 1 ; i < rows ; i+=2){
        
            for(var j = 1 ; j < cols ; j+=2){

                Getnode(i,j).set = counter

                    counter++
            }
        }
        
        RenderContent()

        $("#mazesolver").prop("disabled" , false)
        
        return
    }
    
}

//render content canvas
function RenderContent(){
    
    c.clearRect(0,0,canvas.width , canvas.height)
    
    nodes.forEach(node => { node.render() })
    
    if(startnode){
        
        c.beginPath()
        c.fillStyle = "blue"
        c.arc(startnode.x + size/2 , startnode.y + size/2 , size/2 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()
        
    }
    
    if(endnode){
        
        c.beginPath()
        c.fillStyle = "red"
        c.arc(endnode.x + size/2 , endnode.y + size/2 , size/2 , 0 , 2 * Math.PI)
        c.fill()
        c.closePath()
        
    }

    if(current){

        c.beginPath()
        c.fillStyle = "purple"
        c.rect(current.x  , current.y , size , size)
        c.fill()
        c.closePath()
    }

    Highlightnodes()
    
    if(path.length > 0){

        $(".output").html("path length: " + path.length + " nodes")
        
        for(var i = 0 ; i < path.length ; i++){
            
            c.beginPath()
            c.fillStyle = "rgb(5,74,35)"
            c.arc(path[i].x + size/2 , path[i].y + size/2 , size/2 , 0 , 2 * Math.PI)
            c.fill()
            c.closePath()
        }
    }
}

//event listeners for select menus
$("#mazegenerator").on("change" , () => {

    var id = ($("#mazegenerator").val())

    switch(id){

        case "1":

            path = []
            stack = []
            mazefinish = false 
            flood = true 
            currentnode = undefined
        
            nodes.forEach(node => { 
            
                node.isWall = false 
                node.value = undefined
                node.visited = false
                node.opening = false
                node.currentsize = 0
            
            })
        
            Depthfirstsearch()
        
            RenderMaze()
        
            $("#mazegenerator").prop('selectedIndex', 0);

            $("#mazegenerator").prop("disabled" , true)

            $(".output").html("")

            break;

        case "2":

            path = []
            stack = []
            mazefinish = false 
            flood = true 
            currentnode = undefined
    
            nodes.forEach(node => { 
        
                node.isWall = false 
                node.value = undefined
                node.visited = false
                node.opening = false
                node.currentsize = 0
        
            })
    
            Primsalgorithm()
    
            RenderMaze()
    
            $("#mazegenerator").prop('selectedIndex', 0);

            $("#mazegenerator").prop("disabled" , true)

            $(".output").html("")

            break;
        
        case "3":


            path = []
            stack = []
            mazefinish = false 
            flood = true 
            currentnode = undefined
    
            nodes.forEach(node => { 
        
                node.isWall = false 
                node.value = undefined
                node.visited = false
                node.opening = false
                node.currentsize = 0
        
            })
    
            Kruskalalgorithm()
    
            RenderMaze()
    
            $("#mazegenerator").prop('selectedIndex', 0);

            $("#mazegenerator").prop("disabled" , true)

            $(".output").html("")

            break;

        case "4":


            path = []
            stack = []
            mazefinish = false 
            flood = true 
            currentnode = undefined
    
            nodes.forEach(node => { 
        
                node.isWall = false 
                node.value = undefined
                node.visited = false
                node.opening = false
                node.currentsize = 0
        
            })
    
           Huntandkill()
    
            RenderMaze()
    
            $("#mazegenerator").prop('selectedIndex', 0);

            $("#mazegenerator").prop("disabled" , true)

            $(".output").html("")

            break;
       
        case "5":

            path = []
            stack = []
            mazefinish = false 
            flood = true 
            currentnode = undefined

            nodes.forEach(node => { 
    
                node.isWall = false 
                node.value = undefined
                node.visited = false
                node.opening = false
                node.currentsize = 0
    
            })

            runTimer()
            
            DrawOuterwalls()

            RenderMaze()

            $("#mazegenerator").prop('selectedIndex', 0);

            $("#mazegenerator").prop("disabled" , true)

            $(".output").html("")

            break;
    
    }
})

$("#mazesolver").on("change" , () => {

    var id = ($("#mazesolver").val())

    switch(id){

        case "1":  floodfill(startnode.row , startnode.col); break;
    }

    $("#mazesolver").prop('selectedIndex', 0);
    $("#mazesolver").prop("disabled" , true)

})
