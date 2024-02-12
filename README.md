# 🧩 Jeu du Sudoku en JavaScript

## ⚠️ Défi Technique : Respect des Règles du Sudoku

Le principal défi technique de ce projet a été d'assurer que la génération et la validation des grilles de Sudoku respectent strictement les règles du jeu, à savoir qu'un chiffre ne peut apparaître qu'une seule fois par ligne, par colonne et dans chaque sous-grille 3x3.

### 🛠 Approche de Résolution

Pour surmonter ce défi, la solution a été abordée en plusieurs étapes :

#### 1️⃣ Validation des Entrées

La méthode `#isValid(num, row, col)` dans la classe `Grid` vérifie si un chiffre peut être placé à une position donnée sans violer les règles du Sudoku. Elle examine la ligne, la colonne et la sous-grille 3x3 concernée pour s'assurer qu'aucune occurrence du chiffre n'est déjà présente.

#### 2️⃣ Génération de Grille

La méthode `#generate()` utilise une approche récursive pour remplir la grille. Pour chaque cellule, elle tente d'insérer un chiffre valide (1 à 9) en utilisant la méthode `#isValid` pour vérifier sa validité. Si aucun conflit n'est détecté, le chiffre est placé et la fonction passe à la cellule suivante. En cas de blocage, où aucun chiffre ne convient, un mécanisme de retour arrière (backtracking) est déclenché pour réajuster les chiffres précédemment placés.

#### 3️⃣ Mélange des Nombres

Afin de garantir la variabilité des grilles générées, un mélange aléatoire des chiffres à tester est effectué avant leur insertion. Cela permet de s'assurer que la grille finale est unique à chaque exécution du programme.

# 🔧 Installation

Pour utiliser ce jeu, clonez simplement ce dépôt et ouvrez le fichier `index.html` dans votre navigateur.
`git clone <url-du-dépôt>
cd <répertoire-du-dépôt>`
Une fois la page ouverte dans votre navigateur, vous pouvez commencer à jouer au Sudoku. Cliquez sur une cellule vide pour y entrer un chiffre. Si le chiffre est correct, la cellule deviendra verte ; sinon, elle deviendra rouge.

## 💻 Technologies Utilisées

- HTML
- CSS
- JavaScript
