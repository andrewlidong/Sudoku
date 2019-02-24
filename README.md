# Sudoku

## About

This is a Sudoku solving algorithm that implements a Breadth First Search to solve a 9x9 board.  

## Technical Implementation

### Deep Duplication of Puzzles

To generate possible puzzle solutions we generate deep copies for each move.  

```js
const deepDup = matrix => {
    return matrix.map( el => {
        if (el instanceof Array) {
            return deepDup(el);
        } else {
            return el;
        }
    });
}
```
### Breadth First Search

We inspect each possible move, returning only those puzzles which are valid.  

```js
const possibleMoves = puzzle => {
    const zero_coordinates = findZero(puzzle);
    const i = zero_coordinates[0];
    const j = zero_coordinates[1];

    return[...Array(10).keys()].slice(1).filter(num => {
        return validMove(i, j, puzzle, num);
    })
}

const validMove = (i, j, puzzle, number) => {
    return !puzzle[i].includes(number) && !transpose(puzzle)[j].includes(number) && valid3x3(i, j, puzzle, number)
}
```