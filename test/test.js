require('blanket');
const assert = require('chai').assert;
const knight = require('../app/knight_tour.js');

describe('Game Board', function(){
    describe('#Display function', function(){
        it('should return the board as a string formatted into 8x8', function(){
            assert(knight.displayBoard());
        });
    });
});

describe('Heuristic Board', function(){
    describe('#top left corner moves', function(){
        it('should return an array', function(){
           let moves = knight.findPossibleMoves(0,0);
           assert(Array.isArray(moves));
        });
        it('should return the array [2,3]', function(){
            assert.equal([2,3].length, knight.findPossibleMoves(0,0).length, 'arrays should be equal in lenght');
            for(let ii = 0; ii < knight.findPossibleMoves(0,0).lenght; ii++){
                assert.equal([2,3][ii]. knight.findPossibleMoves(0,0)[ii], ii + "elements are equal");
            };
        });
    });

    describe('#left border space moves', function(){
        it('should return an array', function(){
           let moves = knight.findPossibleMoves(4,0);
           assert(Array.isArray(moves));
        });
        it('should return the array [0,1,2,3]', function(){
            assert.equal([0,1,2,3].length, knight.findPossibleMoves(4,0).length, 'arrays should be equal in length');
            for(let ii = 0; ii < knight.findPossibleMoves(0,0).lenght; ii++){
                assert.equal([0,1,2,3][ii]. knight.findPossibleMoves(4,0)[ii], ii + "elements are equal");
            };
        });
    });

    describe('#updating heuristic for corner moves', function(){
        const col_move = [1,2,2,1,-1,-2,-2,-1];
        const row_move = [-2,-1,1,2,2,1,-1,-2];
        it('should update heuristic for the moves not taken', function(){
            let heur_board = knight.board_heur;
            /*Assume user takes move 2 from the top left corner*/
            assert(Array.isArray(heur_board));
            assert.equal(6, heur_board[2][1], 'initial heur should be 6');
            knight.updateHeuristics(0,0,[3], heur_board);
            assert.equal(5,heur_board[2][1], 'new value should be 5');
        });
    });
});

describe('Knight object', function(){
    describe('#initial position',function(){
        it('should be the top left corner (0,0)', function(){
            [start_row, start_col] = [knight.Knight.row_pos,knight.Knight.col_pos];
            assert.equal(0, start_row,'Row number is 0');
            assert.equal(0,start_col, 'Col num is 0');
        }); 
    });
    describe('#move function', function(){
        const col_move = [1,2,2,1,-1,-2,-2,-1];
        const row_move = [-2,-1,1,2,2,1,-1,-2];
        it('should update the Knight\'s position base on move selected', function(){
            let k = knight.Knight;
            k.moveKnight(2);
            assert.equal(1,k.row_pos, 'Knight moved one row to the right');
            assert.equal(2,k.col_pos,'Knight moved 2 cols to the right');
        })
    })

})
