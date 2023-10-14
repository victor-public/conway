export const Grid = {
  init(size, root) {
    this.size = size;
    this.cells = Array(size)
      .fill()
      .map(() => Array(size).fill(false));
    this.table = document.createElement("table");
    this.isMouseDown = false;
    this.interactive = false;

    for (let row = 0; row < this.size; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < this.size; col++) {
        const td = document.createElement("td");
        td.setAttribute("data-col", col);
        td.setAttribute("data-row", row);
        tr.appendChild(td);
      }
      this.table.appendChild(tr);
    }

    root.appendChild(this.table);

    document.addEventListener("mousedown", () => {
      this.isMouseDown = true;
    });

    document.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });

    this.table.addEventListener("click", ({ target }) => {
      if (this.interactive && target.matches("td")) {
        const [col, row] = [
          target.getAttribute("data-col"),
          target.getAttribute("data-row"),
        ];
        this.setCellValue(row, col, !this.cells[row][col]);
      }
    });

    this.table.addEventListener("mousemove", ({ target }) => {
      if (this.interactive && target.matches("td") && this.isMouseDown) {
        const [col, row] = [
          target.getAttribute("data-col"),
          target.getAttribute("data-row"),
        ];
        this.setCellValue(row, col, true);
      }
    });
  },

  setCellValue(row, col, value) {
    const cell = this.table.rows[row].cells[col];
    value ? cell.classList.add("alive") : cell.classList.remove("alive");
    this.cells[row][col] = value;
  },

  getCellValue(row, col) {
    return this.cells[row][col];
  },
};