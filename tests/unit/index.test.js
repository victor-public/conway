import { Grid } from "../../src/modules/Grid/index.js"
import { JSDOM } from "jsdom"
import assert from "assert";

beforeEach(() => {
    const dom = new JSDOM(`
        <html>
            <body>
                <main></main>
            </body>
        </html>`,
        { url: "http://unit.tests" }
    )

    global.window = dom.window;
    global.document = dom.window.document;
    global.root = document.querySelector("main")
    global.size = 3
});

describe("Grid tests", () => {

    it("Starts with all cells inactive", () => {
        Grid.init(size, root)
        for (let row = 0; row < size; row++) {
            for (let col = 0; col < size; col++) {
                assert.equal(Grid.getCellValue(0, 0), false);
            }
        }
    })

    it("Sets cells alive", () => {
        Grid.init(size, root)
        assert.equal(Grid.getCellValue(0, 0), false)
        
        Grid.setCellValue(0, 0, true)
        assert.equal(Grid.getCellValue(0, 0), true)
    })

    it("fills the HTML template with a table grid", () => {
        Grid.init(size, root)

        const cells = document.querySelectorAll("td")
        assert.equal(cells.length, size * size)
    })
})