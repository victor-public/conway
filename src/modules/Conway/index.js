export const getNeighbours = (matrix, row, col) => {
    const size = matrix.length
    const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ]
    const output = []

    for (const [deltax, deltay] of directions) {
        output.push([
            (row + deltax + size) % size,
            (col + deltay + size) % size
        ])
    }
    return output
}

export const getNeighboursCount = (matrix, row, col) => {
    const neighbours = getNeighbours(matrix, row, col)
    return neighbours.reduce((acc, curr) => {
        if (matrix[curr[0]][curr[1]]) {
            acc++
        }
        return acc
    }, 0)
}

export const conway = (matrix) => {
    let counts, isAlive;
    const output = Array(matrix.length)
        .fill()
        .map(() => Array(matrix.length).fill(0))

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix.length; col++) {
            counts = getNeighboursCount(matrix, row, col)
            isAlive = matrix[row][col] === 1
            if (isAlive && (counts === 2 || counts === 3)) {
                output[row][col] = 1
            } else if (!isAlive && counts === 3) {
                output[row][col] = 1
            } else {
                output[row][col] = 0
            }
        }
    }
    return output
}
