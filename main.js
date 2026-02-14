import { Pathfinder } from "./PathFinder/PathFinder.js"
let myCanvas = document.getElementById("myCanvas");
let pathfinder = new Pathfinder({ canvas: myCanvas })


if (innerWidth < 768) { pathfinder.buildGridFromViewport(13, 21) } else { pathfinder.buildGridFromViewport(35, 95) }


$("#resetgrid").on("click", () => {

    pathfinder.reset()

})

$("#randomwalls").on("click", () => {

    pathfinder.reset()
    pathfinder.createRandomWalls()
})

$("#clearwalls").on("click", () => {

    pathfinder.clearWalls()
  
})

$("#solve").on("click", () => {

    pathfinder.reset()
    
    let lastRow = pathfinder.getRowCount() - 2
    let lastCol = pathfinder.getColCount() - 2

    pathfinder.findPath(1, 1, lastRow, lastCol)
})

$("#myCanvas").on("mousemove", () => {

    pathfinder.createWall()
})

$("#maze").on("click", () => {

    pathfinder.createMaze()

})