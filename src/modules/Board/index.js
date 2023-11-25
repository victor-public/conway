export const Board = {
    init (size, root, rules) {
        this.size = size;
        this.cells = Array(size)
            .fill()
            .map(() => Array(size).fill(0));
        this.table = document.createElement('table');
        this.table.classList.add('board')
        this.rules = rules;

        for (let row = 0; row < this.size; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < this.size; col++) {
                const td = document.createElement('td');
                td.setAttribute('data-col', col);
                td.setAttribute('data-row', row);
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }

        root.appendChild(this.table);
    },

    setCellValue (row, col, value) {
        const cell = this.table.rows[row].cells[col];
        value
            ? cell.classList.add('alive')
            : cell.classList.remove('alive');
        this.cells[row][col] = value;
    },

    getCellValue (row, col) {
        return this.cells[row][col];
    },

    randomize (randomizer) {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.setCellValue(row, col, randomizer())
            }
        }
    },

    play () {
        const nextGeneration = this.rules(this.cells)
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.setCellValue(row, col, nextGeneration[row][col])
            }
        }
    }

};

export default Board;
