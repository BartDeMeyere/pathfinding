export class ControlManager {

    constructor(maze, solver) {

        this.maze = maze
        this.solver = solver
        this.startsolverbutton = document.getElementById("start-solve-btn")
        this.startstopsolverbutton = document.getElementById('startstop-solve-btn')
        this.newmazebutton = document.getElementById("new-maze-btn")

        this.countvisitedcellslabel = document.getElementById("countvisitedcells-label")
        this.pathlengthlabel = document.getElementById("pathlength-label")

        this.init()
    }

    init() {

        this.newmazebutton.addEventListener("click", (e) => {

            this.solver.reset()
            this.maze.rebuild()
            this.startstopsolverbutton.textContent = "Pauzeren"
            this.solver.canStart = false//true
        })

        this.startsolverbutton.addEventListener("click", (e) => {

            this.solver.restart()
            this.startstopsolverbutton.textContent = "Pauzeren"
    
        })

        this.startstopsolverbutton.addEventListener("click", (e) => {

            if (this.solver.paused) {

                this.solver.start()
                this.startstopsolverbutton.textContent = "Pauzeren"
               
                return

            } else {

                this.solver.stop()
                this.startstopsolverbutton.textContent = "Hervatten"
             
            }

        })
    }

    update() {

        this.countvisitedcellslabel.textContent = this.solver.countVisitedCells() 
        this.pathlengthlabel.textContent = this.solver.path.length 
    }

}