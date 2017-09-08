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
    xpos: 0,
    ypos: 0
}

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


displayBoardHeur();
displayBoard();

