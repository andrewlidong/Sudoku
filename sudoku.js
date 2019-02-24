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