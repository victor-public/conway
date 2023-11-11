import { Grid } from '../../src/modules/Grid/index.js'
import { JSDOM } from 'jsdom'
import assert from 'assert'
import sinon from "sinon"

beforeEach(() => {
    const dom = new JSDOM(`
        <html>
            <body>
                <main></main>
            </body>
        </html>`,
    { url: 'http://unit.tests' }
    )

    global.window = dom.window;
    global.document = dom.window.document;
    global.root = document.querySelector('main')
    global.size = 4
});

describe('Grid tests', () => {
    it('Starts with all cells inactive', () => {
        Grid.init(size, root)
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                assert.equal(Grid.getCellValue(0, 0), false);
            }
        }
    })

    it('Sets cells alive', () => {
        Grid.init(size, root)
        assert.equal(Grid.getCellValue(0, 0), false)
        
        Grid.setCellValue(0, 0, true)
        assert.equal(Grid.getCellValue(0, 0), true)
    })

    it('fills the HTML template with a table grid', () => {
        Grid.init(size, root)

        const cells = document.querySelectorAll('td')
        assert.equal(cells.length, size * size)
    })

    it('resets all values to False', () => {
        Grid.init(size, root)
        // Random int between 0 and (size - 1).
        const randomRow = Math.floor(Math.random() * size)
        const randomCol = Math.floor(Math.random() * size)

        Grid.setCellValue(randomRow, randomCol, true)

        // At least one cell is True now.
        assert.equal(Grid.getCellValue(randomRow, randomCol), true)

        Grid.clear()

        // Regardless of the assignment, now all cells are false.
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                assert.equal(Grid.getCellValue(randomRow, randomCol), false)
            }
        }
    })

    it("Assigns random values for cells", () => {
        const stub = sinon.stub(Math, 'random')
        Grid.init(size, root)

        Grid.randomize()

        sinon.assert.called(stub)
        sinon.assert.callCount(stub, size * size)

        sinon.restore()
    })

    it("Calculates neighbours in the grid", () => {
        const expected = [
            [0, 0], 
            [0, 1], 
            [0, 2], 
            [1, 0], 
            [1, 2], 
            [2, 0], 
            [2, 1], 
            [2, 2]
        ]
        
        Grid.init(size, root)
        const actual = Grid.getNeighbours(1, 1)

        assert.deepEqual(actual, expected)
    })

    it("Calculates neighbours in a thoroidal grid", () => {
        const expected = [
          [3, 3],
          [3, 0],
          [3, 1],
          [0, 3],
          [0, 1],
          [1, 3],
          [1, 0],
          [1, 1],
        ];

        Grid.init(size, root)
        const actual = Grid.getNeighbours(0, 0)

        assert.deepEqual(actual, expected)
    })

})

describe("Conway's game of life rules", () => {
    it("Any live cell with fewer than two live neighbours dies", () => {
        Grid.init(size, root)
        Grid.setCellValue(1, 1, true)
        assert.equal(Grid.survives(1, 1), false)
    })

    it("Any live cell with two live neighbours survives", () => {
        Grid.init(size, root)
        // Set cell alive
        Grid.setCellValue(1, 1, true)
        // Set alive neighbours
        Grid.setCellValue(0, 0, true)
        Grid.setCellValue(2, 2, true)

        Grid.step()

        assert.equal(Grid.getCellValue(1, 1), true)
    })

    it("Any live cell with three live neighbours survives", () => {
        Grid.init(size, root)
        // Set cell alive
        Grid.setCellValue(1, 1, true)
        // Set alive neighbours
        Grid.setCellValue(0, 0, true)
        Grid.setCellValue(2, 2, true)
        Grid.setCellValue(1, 0, true)

        Grid.step()

        assert.equal(Grid.getCellValue(1, 1), true)
    });

    it("Any live cell with more than three live neighbours dies", () => {
        Grid.init(size, root)
        Grid.setCellValue(1, 1, true)

        Grid.setCellValue(0, 0, true)
        Grid.setCellValue(0, 1, true)
        Grid.setCellValue(0, 2, true)
        Grid.setCellValue(1, 0, true)

        Grid.step();

        assert.equal(Grid.getCellValue(1, 1), false);
    })

    it("Any dead cell with exactly three live neighbours becomes alive", () => {
        Grid.init(size, root);
        Grid.setCellValue(1, 1, false);

        Grid.setCellValue(0, 0, true);
        Grid.setCellValue(0, 1, true);
        Grid.setCellValue(0, 2, true);

        Grid.step();
        assert.equal(Grid.getCellValue(1, 1), true);
    })

})