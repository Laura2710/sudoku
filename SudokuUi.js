import Grid from "./Grid.js";

export default class SudokuUI {
    constructor(containerId) {
        this.grid = new Grid();
        this.container = document.getElementById(containerId);
        this.initGrid();
        this.addInputListeners();
    }

    initGrid() {
        if (!this.container) {
            console.error(`Element '${this.containerId}' not found`);
            return;
        }

        const gridData = this.grid.getGrid();
        gridData.forEach((row, i) => {
            let tr = document.createElement('tr');
            tr.className = 'row';
            row.forEach((cell, j) => {
                let td = document.createElement('td');
                td.innerText = cell === null ? '' : cell;
                td.className = 'col';
                td.setAttribute('data-col', j);
                td.setAttribute('data-row', i);
                if (cell === null) {
                    td.setAttribute('contenteditable', true);
                }
                if (i % 3 === 2 && i !== gridData.length - 1) {
                    td.classList.add('border-bottom');
                }
                if (j % 3 === 2 && j !== row.length - 1) {
                    td.classList.add('border-right');
                }
                tr.appendChild(td);
            });
            this.container.appendChild(tr);
        });
    }

    addInputListeners() {
        const cols = this.container.getElementsByClassName('col');
        Array.from(cols).forEach(col => {
            col.addEventListener('input', (e) => {
                const obj = {
                    row: e.target.getAttribute('data-row'),
                    col: e.target.getAttribute('data-col'),
                    value: e.target.innerText
                };
                if (this.grid.isValidInput(obj)) {
                    e.target.setAttribute('contenteditable', 'false');
                    e.target.style.color = "green";
                } else {
                    e.target.style.color = "red";
                }
            });
        });
    }
}


