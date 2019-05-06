/* create and control a list of positions
arranged in rows and columns */

// const CLICK_BOARD = 'grid/CLICK_BOARD';

/* const positionsArr = (rows = 4, cols = 4) => {
    const arr = [];
    let id = 0;
    for(let row = 1; row <= rows; row +=1) {
        for(let col = 1; col <= cols; col +=1) {
            arr.push({id,row,col});
            id += 1;
        }
    }
    return arr;
}; */
const positionsObj = (rows = 4, cols = 4) => {
    const obj = {};
    let id = 0;
    for (let row = 1; row <= rows; row += 1) {
        obj[row] = {};
        for (let col = 1; col <= cols; col += 1) {
            obj[row][col] = { id };
            id += 1;
        }
    }
    return obj;
};

const addToGrid = (obj, value) => {
    const copy = {};
    Object.keys(obj).forEach(row => {
        copy[row] = {};
        Object.keys(obj[row]).forEach(col => {
            copy[row][col] = { ...obj[row][col], ...value };
        });
    });
    return copy;
};

const addActive = obj => {
    const value = { active: true };
    return addToGrid(obj, value);
};
const addGateToReset = obj => {
    const value = { gateToReset: false };
    return addToGrid(obj, value);
};
const applyToGrid = (obj, fkn) => {
    const copy = {};
    Object.keys(obj).forEach(row => {
        copy[row] = {};
        Object.keys(obj[row]).forEach(col => {
            copy[row][col] = { ...obj[row][col] };
            const modified = fkn(row, col, copy[row][col]);
            copy[row][col] = { ...modified };
        });
    });
    return copy;
};

const deactivate = (obj, row, col) => {
    if (!(obj[row] && obj[row][col])) {
        throw new Error(
            `grid:deactivate:can not find position in object ${row},${col}`,
        );
    }
    const r = row.toString();
    const c = col.toString();
    function inactive(i, j, val) {
        if (i === r && j === c) {
            const ret = { ...val, active: false };
            return ret;
        }
        return { ...val };
    }
    return applyToGrid(obj, inactive);
};
// applyToLastActiveInColumn
// moveToFirstActive
// moveToNextActive
// moveToPrevActive
// moveToNextActivePosInCol
// moveToPrevActivePosInCol
// moveDown
// moveUp
// moveRight
const moveToActiveLeft = (obj, row, col) => {
    // if possible switch col one step within the row
    // row is a number 1...I
    // col is a number 1...J
    // if active was not found, the original position is returned
    if (!(obj[row] && obj[row][col])) {
        throw new Error(
            'grid:moveToActiveLeft:can not find position in object',
            obj,
            row,
            col,
        );
    }
    const i = row;
    let j = col;
    while (j > 1) {
        j -= 1;
        if (obj[i][j].active) {
            return obj[i][j];
        }
    }
    return obj[i][j];
};

// const applyToLastActiveInColumn = (obj,col, fkn)=>{
//     // if position is active (active:true), then apply the funkction
//     function toLastActive(i,j)
//     return applyToGrid(obj);
// }
const applyReverseToGrid = (obj, fkn) => {
    const copy = {};
    const rows = Object.keys(obj);
    const lastRow = rows[rows.length-1];
    const cols = Object.keys(obj[lastRow]);
};
const applyToLastActiveInColumn = (obj, col, fkn) => {
    // if (!(obj[row] && obj[row][col])) {
    //     throw new Error (`grid:deactivate:can not find position in object ${row},${col}`);
    // }
    // const r = row.toString();
    const c = col.toString();
    function applyToTheActiveInColumnC(i, j, val) {
        if (j === c && val.active) {
            const cpy = { ...val };
            return fkn(cpy);
        }
        return { ...val };
    }
    return applyToGrid(obj, applyToTheActiveInColumnC);
};

export default positionsObj;
export { addActive, addGateToReset, deactivate, moveToActiveLeft };
