export const Grid = {
    init (size, root) {
        this.size = size;
        this.cells = Array(size)
            .fill()
            .map(() => Array(size).fill(false));
        this.table = document.createElement('table');
        this.isMouseDown = false;
        this.interactive = true;

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

        document.addEventListener('mousedown', () => {
            this.isMouseDown = true;
        });

        document.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });

        this.table.addEventListener('click', ({ target }) => {
            if (this.interactive && target.matches('td')) {
                const [col, row] = [
                    target.getAttribute('data-col'),
                    target.getAttribute('data-row')
                ];
                this.setCellValue(row, col, !this.cells[row][col]);
            }
        });

        this.table.addEventListener('mousemove', ({ target }) => {
            if (this.interactive && target.matches('td') && this.isMouseDown) {
                const [col, row] = [
                    target.getAttribute('data-col'),
                    target.getAttribute('data-row')
                ];
                this.setCellValue(row, col, true);
            }
        });
    },

    getNeighbours (row, col) {
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
                (row + deltax + this.size) % this.size,
                (col + deltay + this.size) % this.size
            ])
        }
        return output
    },

    getNeighboursCount (row, col) {
        return this.getNeighbours(row, col).reduce((acc, curr) => {
            if (this.getCellValue(curr[0], curr[1])) {
                acc++
            }
            return acc
        }, 0)
    },

    survives (row, col) {
        const counts = this.getNeighboursCount(row, col)
        const isAlive = this.getCellValue(row, col)

        if (isAlive && (counts === 2 || counts === 3)) {
            return true
        }
        if (!isAlive && (counts === 3)) {
            return true
        }
        return false
    },

    step () {
        const nextGen = []
        for (let row = 0; row < this.size; row++) {
            nextGen[row] = []
            for (let col = 0; col < this.size; col++) {
                nextGen[row][col] = this.survives(row, col)
            }
        }
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.setCellValue(row, col, nextGen[row][col])
            }
        }
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

    clear () {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.setCellValue(row, col, false);
            }
        }
    },

    randomize () {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                this.setCellValue(row, col, Math.round(Math.random()) === 1)
            }
        }
    },

    toggleInteractive () {
        this.interactive = !this.interactive
    },

    togglePlaying () {
        this.isPlaying = !this.isPlaying
    }
};

export default Grid;
