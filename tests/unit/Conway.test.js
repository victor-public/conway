import * as m from "../../src/modules/Conway/index.js"
import assert from "assert"

describe("Conway's Game of life", () => {
    it("Gets inner cell's neighbours", () => {
        const matrix = [
          [0, 0,  0,  0, 0],
          [0, 1,  1,  1, 0],
          [0, 1, 'x', 1, 0],
          [0, 1,  1,  1, 0],
          [0, 0,  0,  0, 0],
        ];
        const results = m.getNeighbours(matrix, 2, 2)

        for(const [x, y] of results) {
            assert.equal(matrix[x][y], 1)
        }
    })

    it("Gets edge cell's neighbours", () => {
        const matrix = [
          ['x', 1, 0, 0, 1],
          [ 1,  1, 0, 0, 1],
          [ 0,  0, 0, 0, 0],
          [ 0,  0, 0, 0, 0],
          [ 1,  1, 0, 0, 1],
        ];
        const results = m.getNeighbours(matrix, 0, 0);

        for (const [x, y] of results) {
            assert.equal(matrix[x][y], 1)
        }
    })

    it("Calculates neighbours count", () => {
        const matrix = [
          [0, 0,  0,  0, 0],
          [0, 1,  1,  1, 0],
          [0, 1, 'x', 1, 0],
          [0, 1,  1,  1, 0],
          [0, 0,  0,  0, 0],
        ];
        const count = m.getNeighboursCount(matrix, 2, 2)

        assert.equal(count, 8)
    })

    it("Game rules: alive cell with two neighbours survives", () => {
        const matrix = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0],
        ];
        const result = m.conway(matrix)
        assert.equal(result[2][2], 1)
    })

    it("Game rules: alive cell with three neighbours survives", () => {
        const matrix = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];
        const result = m.conway(matrix);
        assert.equal(result[2][2], 1);
    });

    it("Game rules: dead cell with three live neighbours becomes alive", () => {
        const matrix = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];
        const result = m.conway(matrix);
        assert.equal(result[2][2], 1);
    });

    it("Game rules: any other cell dies", () => {
        const matrix = [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 0, 0, 0],
        ];
        const result = m.conway(matrix);
        assert.equal(result[2][2], 0);
    });

})