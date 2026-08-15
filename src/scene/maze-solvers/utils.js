 export function getRandomUnvisitedNeighbor(row, col, maze) {

        let neighbors = []
        let current = maze.getCellAt(row, col)
        let neighbor

        neighbor = maze.getCellAt(row - 1, col)

        if (neighbor && !neighbor.visited && !current.top) {

            neighbors.push(neighbor)
        }

        neighbor = maze.getCellAt(row + 1, col)

        if (neighbor && !neighbor.visited && !current.bottom) {

            neighbors.push(neighbor)
        }

        neighbor = maze.getCellAt(row, col + 1)

        if (neighbor && !neighbor.visited && !current.right) {

            neighbors.push(neighbor)
        }

        neighbor = maze.getCellAt(row, col - 1)

        if (neighbor && !neighbor.visited && !current.left) {

            neighbors.push(neighbor)
        }

        return neighbors[Math.floor(Math.random() * neighbors.length)]
    }