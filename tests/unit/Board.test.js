import { Board } from '../../src/modules/Board/index.js'
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
        Board.init(size, root, null)
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                assert.equal(Board.getCellValue(0, 0), false);
            }
        }
    })

    it('Sets cells alive', () => {
        Board.init(size, root, null)
        assert.equal(Board.getCellValue(0, 0), false)

        Board.setCellValue(0, 0, true)
        assert.equal(Board.getCellValue(0, 0), true)
    })

    it('fills the HTML template with a table grid', () => {
        Board.init(size, root, null)

        const cells = document.querySelectorAll('td')
        assert.equal(cells.length, size * size)
    })

    it("Assigns random values for cells", () => {
        const randomizer = sinon.stub()
        Board.init(size, root, null)

        Board.randomize(randomizer)

        sinon.assert.called(randomizer)
        sinon.assert.callCount(randomizer, size * size)

        sinon.restore()
    })

    it("Plays a move using the appropiate set of rules", () => {
        const matrix = Array(size).fill().map(() => Array(size).fill(0))
        const rules = sinon.stub().returns(matrix)
        Board.init(size, root, rules)

        Board.play()

        sinon.assert.called(rules)
        sinon.assert.callCount(rules, 1)

    })

})