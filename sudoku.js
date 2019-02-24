const sudoku = puzzle => {
    let stack = possiblePuzzles(puzzle);

    while (true) {
        const current_puzzle = stack.pop();
        if (completed(current_puzzle)) {
            return current_puzzle;
        }
        stack = stack.concat(possiblePuzzles(current_puzzle));
    }
}

const possiblePuzzles = puzzle => {
    const result = [];
    const moves = possibleMoves(puzzle);

    const zero_coordinates = findZero(puzzle);
    const i = zero_coordinates[0];
    const j = zero_coordinates[1];

    if (moves) {
        moves.forEach( move => {
            next_puzzle = deepDup(puzzle);
            next_puzzle[i][j] = move;
            result.push(next_puzzle);
        })
    }
    return result;
}

const possibleMoves = puzzle => {
    const zero_coordinates = findZero(puzzle);
    const i = zero_coordinates[0];
    const j = zero_coordinates[1];

    return[...Array(10).keys()].slice(1).filter(num => {
        return validMove(i, j, puzzle, num);
    })
}

const findZero = puzzle => {
    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle.length; j++) {
            if (puzzle[i][j] === 0) {
                return [i, j]
            }
        }
    }
}

const completed = puzzle => {
    return !flatten(puzzle).includes(0);
}

const validMove = (i, j, puzzle, number) => {
    return !puzzle[i].includes(number) && !transpose(puzzle)[j].includes(number) && valid3x3(i, j, puzzle, number)
}

const valid3x3 = (i, j, puzzle, number) {
    if ([0,1,2].includes(i)) {
        return valid3x3Helper(i,j,puzzle,number, 0, 3);
    } else if ([3,4,5].includes(i)) {
        return valid3x3Helper(i, j, puzzle, number, 3, 6);
    } else {
        return valid3x3Helper(i, j, puzzle, number, 6, 10);
    }
}

const valid3x3Helper = (i, j, puzzle, number, sliceStart, sliceEnd) {
    const subSquare = puzzle.slice(sliceStart, sliceEnd);
    if ([0, 1, 2].includes(j)) {
        return !flatten(subSquare.map(row => { return row.slice(0, 3); })).includes(number);
    } else if ([3, 4, 5].includes(j)) {
        return !flatten(subSquare.map(row => { return row.slice(3, 6); })).includes(number);
    } else {
        return !flatten(subSquare.map(row => { return row.slice(6, 10); })).includes(number);
    }
}

const transpose = matrix => {
    const transposed_arr = [];
    matrix.forEach( (row, i) => {
        const inner = [];
        const cols = row.length;
        for (let j = 0; j < cols; j++) {
            inner.push(matrix[j][i]);
        }
        transposed_arr.push(inner);
    })
    return transposed_arr;
}

const deepDup = matrix => {
    return matrix.map( el => {
        if (el instanceof Array) {
            return deepDup(el);
        } else {
            return el;
        }
    });
}

const flatten = matrix => {
    let flattened_arr = [];
    matrix. forEach(el => {
        if (el instanceof Array) {
            flattened_arr = flattened_arr.concat(flatten(el));
        } else {
            flattened_arr.push(el);
        }
    });
    return flattened_arr;
}