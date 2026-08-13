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

            const geselecteerd = document.querySelector(
                'input[name="zoekmethode"]:checked'
            );

            if (!geselecteerd) {
                console.error("Selecteer eerst een zoekmethode.");
                return;
            }

            const methode = geselecteerd.value;

            if (methode === "dfs") {
                console.log("DFS starten");
                // start DFS
                this.solver.restart()
                this.startstopsolverbutton.textContent = "Pauzeren"
            }
            else if (methode === "bfs") {
                console.log("BFS starten");
                // start BFS
            }
            else if (methode === "astart") {
                console.log("A* starten");
                // start A*
            }

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