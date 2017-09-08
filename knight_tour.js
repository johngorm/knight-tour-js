#! /usr/local/bin/node
//initialize the heuristic of each space on the board
// const inquirer = require('inquirer');

let board_heur = [
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
let Knight = {
    col_pos: 0,
    row_pos: 0,
    moves: []
}

/*Specify the different in row and col for each possible knight move
 * The movement goes clockwise as you move through the arrays. 
 * (i.e. The first index move would draw an upside down L on the board.
 *    the next index would be that upside down L rotated 90 deg to the right, etc.)
 *
*/  
const col_move = [1,2,2,1,-1,-2,-2,-1];
const row_move = [-2,-1,1,2,2,1,-1,-2];

function displayBoardHeur(){
    let board_out = '';
    for( var ii = 0; ii < 8; ii++){
        board_out += board_heur[ii].toString() + "\n";
    }
    console.log(board_out);
}

function displayBoard(){
    let board_out = '';
    for( var ii = 0; ii < 8; ii++){
        board_out += board[ii].toString() + "\n";
    }
    console.log(board_out);
}

function calculateHeuristic(row, col){
    let possible_moves = findPossibleMoves(row,col);
    console.log(possible_moves);
}

function findPossibleMoves(row, col){
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
if(process.argv.length < 4){
    console.log('enter row and col in terminal');
    return -1;
}
let row = parseInt(process.argv[2]);
let col = parseInt(process.argv[3]);
calculateHeuristic(row,col);

