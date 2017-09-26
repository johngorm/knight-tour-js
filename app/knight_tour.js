#! /usr/local/bin/node
//initialize the heuristic of each space on the board
const inquirer = require('inquirer');
const knight = module.exports = {};
knight.board_heur = [
    [2,3,4,4,4,4,3,2],
    [3,4,6,6,6,6,4,3],
    [4,6,8,8,8,8,6,4],
    [4,6,8,8,8,8,6,4],
    [4,6,8,8,8,8,6,4],
    [4,6,8,8,8,8,6,4],
    [3,4,6,6,6,6,4,3],
    [2,3,4,4,4,4,3,2]
];

let board = [
    ['K','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0']
];

//Initialize Knight object at the upper left hand of board
knight.Knight = {
    col_pos: 0,
    row_pos: 0,
    moves: [],
    moveKnight: function(move_num){
        this.col_pos += col_move[move_num];
        this.row_pos += row_move[move_num];
        return;
    }
}

/*Specify the different in row and col for each possible knight move
 * The movement goes clockwise as you move through the arrays. 
 * (i.e. The first index move would draw an upside down L on the board.
 *    the next index would be that upside down L rotated 90 deg to the right, etc.)
 *          _ _ _ _ _ _ _ _ _ _
 *         |      |     |      |
 *         |   7  |     |   0  |
 *   _ _ _ |_ _ _ |_ _ _|_ _ _ |_ _ _
 *  |      |      |     |      |      |
 *  |   6  |      |     |      |   1  |
 *  |_ _ _ |_ _ _ |_ _ _|_ _ _ |_ _ _ |
 *  |      |      |     |      |      |
 *  |      |      |  K  |      |      |
 *  |_ _ _ |_ _ _ |_ _ _|_ _ _ |_ _ _ |
 *  |      |      |     |      |      |
 *  |   5  |      |     |      |   2  |
 *  |_ _ _ |_ _ _ |_ _ _|_ _ _ |_ _ _ |
 *         |      |     |      |
 *         |   4  |     |   3  |
 *         |_ _ _ |_ _ _|_ _ _ |
 *
 */
const col_move = [1,2,2,1,-1,-2,-2,-1];
const row_move = [-2,-1,1,2,2,1,-1,-2];



knight.displayBoard = () =>{
    let board_out = '';
    for( var ii = 0; ii < 8; ii++){
        board_out += board[ii].toString() + "\n";
    }
    
    return board_out;
}

knight.calculateHeuristic = (row, col) =>{
    return knight.findPossibleMoves(row,col).length;
}

knight.findPossibleMoves = (row, col) =>{
    let new_row, col_row;
    let possible_moves = [];
    for( var ii = 0; ii < 8; ii++){
        new_row = row + row_move[ii];
        new_col = col + col_move[ii];
        if( new_row < 0 || new_row > 7 || new_col < 0 || new_col > 7){
            continue;
        }
        else if(board[new_row][new_col] !== '0'){
            continue;
        }
        else{
            possible_moves.push(ii);
        }
    }
    return possible_moves;
    
}

knight.updateHeuristics = (prev_row, prev_col, move_list, board_heur) =>{
    /*After the knight is moved, each previously possible moves heuristic is reduced by 1*/
    move_list.forEach((move) =>{
        let col = prev_col + col_move[move];
        let row = prev_row + row_move[move];
        board_heur[row][col]--;
    })

    return null;

}


// if(process.argv.length < 4){
//     console.log('enter row and col in terminal');
//     return -1;
// }
// let row = parseInt(process.argv[2]);
// let col = parseInt(process.argv[3]);s
// knight.calculateHeuristic(row,col);

console.log(board);
let move_set = knight.findPossibleMoves(knight.Knight.row_pos, knight.Knight.col_pos)
for(i = 0; i < move_set.length; i++){
    move_set[i] = move_set[i].toString();
}
console.log(move_set);
inquirer.prompt([{
    name: 'move',
    type:"list",
    message: 'Select destination square',
    choices: move_set
}]).then(function(answer){
    console.log("You chose " + answer.move);
}).catch(function(error){
    console.error(error);
});

