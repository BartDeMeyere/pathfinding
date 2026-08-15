export class ControlManager {

    constructor(maze, solvers) {

        this.maze = maze
        this.solvers = solvers
        this.activeSolver = this.solvers.dfs

        //buttons
        this.start_solver_button = document.getElementById("start-solve-btn")
        this.pause_solver_button = document.getElementById('pause-solve-btn')
        this.new_maze_button = document.getElementById("new-maze-btn")

        //labels
        this.countvisitedcellslabel = document.getElementById("countvisitedcells-label")
        this.pathlengthlabel = document.getElementById("pathlength-label")
        this.currentalgo = document.getElementById("currentalgo-label")

        this.init()

    }

    init() {

        this.new_maze_button.addEventListener("click", (e) => {

            this.maze.rebuild()

            if (this.activeSolver) {

                this.activeSolver.reset()
                this.pause_solver_button.textContent = "Pauzeren"
                this.activeSolver.canStart = false//true
            }

        })

        this.start_solver_button.addEventListener("click", (e) => {

            let selected = document.querySelector('input[name="zoekmethode"]:checked');

            if (!selected) {

                console.error("Selecteer eerst een zoekmethode.");
                return;
            }

            let method = selected.value;

            if (method === "randomsearch") {
                console.log("randomsearch starten");
                // start DFS
                this.activeSolver = this.solvers.dfs
                this.activeSolver.restart()
                this.pause_solver_button.textContent = "Pauzeren"
            }
            else if (method === "bfs") {
                console.log("BFS starten");
                // start BFS
            }
            else if (method === "astart") {
                console.log("A* starten");
                // start A*
            }

        })

        this.pause_solver_button.addEventListener("click", (e) => {

            if (!this.activeSolver) return

            if (this.activeSolver.paused) {

                this.activeSolver.start()
                this.pause_solver_button.textContent = "Pauzeren"

                return

            } else {

                this.activeSolver.stop()
                this.pause_solver_button.textContent = "Hervatten"

            }

        })
    }

    update() {

        this.countvisitedcellslabel.textContent = this.activeSolver.countVisitedCells()
        this.pathlengthlabel.textContent = this.activeSolver.path.length
        this.currentalgo.textContent = this.activeSolver.type
    }

}