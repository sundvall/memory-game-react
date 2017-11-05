/* create and control a list of positions
arranged in rows and columns */

const positions = (rows = 4, cols = 4) => {
    const arr = [];
    // const rows = Math.ceil(nums/cols);
    let id = 0;
    for(let row = 1; row <= rows; row +=1) {
        for(let col = 1; col <= cols; col +=1) {
            arr.push({id,row,col});
            id += 1;
        }
    }
    return arr;
};

export default positions;
