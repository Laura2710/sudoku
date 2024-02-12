export default class Grid {
    /**
     * Constructeur de la classe Grid. Initialise la grille de jeu, la taille de la grille,
     * une copie de la grille pour l'affichage, et une Map pour suivre les cellules cachées.
     */
    constructor() {
        this.size = 9; // Définit la taille de la grille comme 9x9
        this.grid = this.#generateEmptyGrid(); // Crée une grille vide
        this.#generate(); // Remplit la grille avec des valeurs valides pour le sudoku
        this.copy = this.grid.map(row => [...row]); // Crée une copie de la grille pour l'affichage
        this.obj = new Map(); // Utilisé pour suivre les cellules cachées et leurs valeurs
        this.#hideCells(); // Cache certaines cellules pour préparer le jeu
    }

    /**
     * Génère une grille vide de la taille spécifiée.
     * @returns {Array} Une grille 9x9 remplie de valeurs null.
     */
    #generateEmptyGrid() {
        return Array.from({ length: this.size }, () => Array(this.size).fill(null));
    }

    /**
     * Vérifie si un nombre est valide à une position donnée dans la grille.
     * @param {number} num - Le nombre à vérifier.
     * @param {number} row - La ligne où vérifier le nombre.
     * @param {number} col - La colonne où vérifier le nombre.
     * @returns {boolean} True si le nombre est valide, false sinon.
     */
    #isValid(num, row, col) {
        for (let i = 0; i < this.size; i++) {
            if (this.grid[row][i] === num || this.grid[i][col] === num) {
                return false;
            }
        }

        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Remplit la grille avec des valeurs valides pour un jeu de sudoku.
     * @returns {boolean} True si la grille est complétée avec succès, false en cas d'échec.
     */
    #generate() {
        const tryNumbers = (row, col) => {
            const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            // Mélange de l'ordre des nombres à essayer
            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }

            for (const num of numbers) {
                if (this.#isValid(num, row, col)) {
                    this.grid[row][col] = num;
                    if (this.#generate()) { // Si la grille suivante est correctement générée
                        return true;
                    }
                    this.grid[row][col] = null; // Backtrack
                }
            }
            return false;
        };

        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.grid[row][col] === null) {
                    if (!tryNumbers(row, col)) {
                        return false; // Aucun nombre valide trouvé, besoin de backtrack
                    }
                }
            }
        }
        return true; // Grille complète générée avec succès
    }

    /**
     * Retourne la grille pour l'affichage, avec certaines valeurs cachées.
     * @returns {Array} La grille de jeu avec des cellules cachées.
     */
    getGrid() {
        return this.copy;
    }

    /**
     * Cache aléatoirement un nombre spécifié de cellules dans la grille.
     */
    #hideCells() {
        let cellsToHide = 20;
        while (cellsToHide > 0) {
            let row = Math.floor(Math.random() * this.size);
            let col = Math.floor(Math.random() * this.size);
            if (this.copy[row][col] !== null) {
                if (!this.obj.has(row)) {
                    this.obj.set(row, []);
                }
                this.obj.get(row).push({ col: col, value: this.grid[row][col] });
                this.copy[row][col] = null;
                cellsToHide--;
            }
        }
    }

    /**
     * Vérifie si l'entrée de l'utilisateur est valide pour une cellule spécifique.
     * @param {Object} obj - Un objet contenant la row, col, et value entrée par l'utilisateur.
     * @returns {boolean} True si l'entrée est valide, false sinon.
     */
    isValidInput(obj) {
        let row = Number(obj['row']);
        let col = Number(obj['col']);
        let value = Number(obj['value']);
        if (this.obj.has(row)) {
            let found = this.obj.get(row).find(element => element.col == col);
            if (found && found.value === value) {
                this.copy[row][col] = value; // Corrige la comparaison pour l'affectation
                return true;
            }
        }
        return false;
    }
}
