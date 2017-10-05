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
    ['K','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.']
];

//Initialize Knight object at the upper left hand of board
knight.Knight = {
    col_pos: 0,
    row_pos: 0,
    moves: [],
    moveKnight: function(move_num){
        board[this.row_pos][this.col_pos] = 'X';
        knight.board_heur[this.row_pos][this.col_pos] = null;
        this.col_pos += col_move[move_num];
        this.row_pos += row_move[move_num];
        board[this.row_pos][this.col_pos] = 'K';
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
const moves = [
    [-2,1],
    [-1,2],
    [1,2],
    [2,1],
    [2,-1],
    [1,-2],
    [-1,-2],
    [-2,-1]
]



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
        new_row = row + moves[ii][0];
        new_col = col + moves[ii][1];
        if( new_row < 0 || new_row > 7 || new_col < 0 || new_col > 7){
            continue;
        }
        else if(board[new_row][new_col] !== '.'){
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
        if(board_heur[row][col]){
            board_heur[row][col]--;
        }
    })

    return null;

}

knight.convertRowColToTileName = (row_num, row_col)=> {
    const col_letters = ['a','b','c','d','e','f','g','h'];
    let tile =  col_letters[row_col] + (8 - row_num);
    return tile;
}

knight.convertTileToRowCol = (tile) =>{
    const col_letters = ['a','b', 'c', 'd','e' ,'f','g', 'h'];
    let col_letter = col_letters.indexOf(tile[0]);
    let row = 8 - parseInt(tile[1]);
    return [row, col_letter];
}
// if(process.argv.length < 4){
//     console.log('enter row and col in terminal');
//     return -1;
// }
// let row = parseInt(process.argv[2]);
// let col = parseInt(process.argv[3]);s
// knight.calculateHeuristic(row,col);

knight.checkUserMoves = () =>{
    return knight.findPossibleMoves(knight.Knight.row_pos, knight.Knight.col_pos)
}


 knight.queryUserMove = () =>{
 let move_set = knight.checkUserMoves();
 let tile_set = [];
 let cypher = {};
    if(move_set.length !== 0){
        
        for(i = 0; i < move_set.length; i++){
            //Find every possible move for the current position and translate it into its chess tile letter and number
            let [temp_row, temp_col] = [knight.Knight.row_pos + row_move[move_set[i]], knight.Knight.col_pos + col_move[move_set[i]]];
            let temp_tile = knight.convertRowColToTileName(temp_row, temp_col);
            tile_set[i] =  temp_tile;
            cypher[temp_tile] = move_set[i];
        }
        
        inquirer.prompt([{
            name: 'move',
            type:"list",
            message: 'Select destination square',
            choices: tile_set
        }]).then(function(answer){
            console.log("You chose " + answer.move);
            let decrypt_move = cypher[answer.move];
            move_set.splice(move_set.indexOf(decrypt_move), 1);
            knight.updateHeuristics(knight.Knight.row_pos, knight.Knight.col_pos, move_set, knight.board_heur);
            knight.Knight.moveKnight(decrypt_move);
            console.log(knight.displayBoard());
            console.log("Knight now at " + knight.convertRowColToTileName(knight.Knight.row_pos, knight.Knight.col_pos))
            knight.queryUserMove();
            return;
        }).catch(function(error){
            console.error(error);
            return -1;
        });
    }
    else {
        console.log('No more moves available');
        return -1;
        process.exit();
    }
 };

 console.log(knight.displayBoard())
 knight.queryUserMove();



