import { Pathfinder } from "./pathfinder/pathfinder.js";

let maze = new Pathfinder(45)

let container = document.querySelector(".container")
let start = document.getElementById("start")
let reset = document.getElementById("reset")
let numrows = document.getElementById("num-rows");
let numcols = document.getElementById("num-cols")
let startcell = document.getElementById("startcell")
let endcell = document.getElementById("endcell")
let errorMessage = document.querySelector(".error-message")
let pathlength = document.getElementById("pathlength")
let path = document.getElementById("path")
let visitedcells = document.getElementById("visitedcells")
let isDragging = false
let offsetX = 0
let offsetY = 0

showSettings()

container.addEventListener("mousedown", (e) => {

    isDragging = true
    offsetX = e.clientX - container.offsetLeft
    offsetY = e.clientY - container.offsetTop
})

document.addEventListener("mousemove", (e) => {

    if (!isDragging) return false

    container.style.left = (e.clientX - offsetX) + "px";
    container.style.top = (e.clientY - offsetY) + "px";
})

document.addEventListener("mouseup", (e) => {

    isDragging = false
})

start.addEventListener("click", (e) => {

    let selected = document.querySelector(
        'input[name="algoritme"]:checked'
    );

    if (selected) {

        errorMessage.style.display = "none"
        errorMessage.textContent = ""

        switch (selected.value) {
            case "bfs":
                maze.DFS_Solver.clear()
                maze.BFS_Solver.init()
                break;
            case "dfs":
                maze.DFS_Solver.init()
                break;

        }

    } else {

        errorMessage.style.display = "block"
        errorMessage.textContent = "Selecteer eerst een algoritme!"
    }
})

function showSettings() {

    numrows.textContent = `Rijen: ${maze.grid.length} `;
    numcols.textContent = `Kolommen: ${maze.grid[0].length}`
    startcell.textContent = `Start: ( ${maze.start.row} , ${maze.start.col} )`
    endcell.textContent = `Eind: ( ${maze.end.row} , ${maze.end.col} )`
    pathlength.textContent = `DFS pad lengte: ${maze.DFS_Solver.stack.length}`
    path.textContent = `BFS pad lengte: ${maze.BFS_Solver.path.length}`
    visitedcells.textContent = `Bezochte cellen: ${GetVisitedCells()}`

    setTimeout(showSettings, 10)

}

function GetVisitedCells(){

    let count = 0

    for(let i = 0 ; i < maze.grid.length ; i++){
        for(let j = 0  ; j < maze.grid[i].length ; j++){
            if(maze.grid[i][j].visited)count++
        }
    }

    return count
}

reset.addEventListener("click", (e) => {

    let canvas = document.querySelector("canvas")
    errorMessage.textContent = ""
    errorMessage.style.display = "none"
    maze.renderer.stop()
    maze = null
    maze = new Pathfinder(45)
})