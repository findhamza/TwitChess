const PLAYER_NAME = "tinywalrus"
const PIECE_NAMES = ['pawn','rook','knight','bishop','queen', 'king'];

var main_board = undefined;
var player_team = ""; // black or white
var my_chess_collection = {};

// var main_board_height = 0;
// var main_board_width = 0;

// var main_board_left_begin = 0;
// var main_board_left_end = 0;

// var main_board_top_begin = 0;
// var main_board_top_end = 0;


function parseMainBoard() {
    var main_board = document.getElementsByClassName('main-board');
    var main_board_pos = main_board.getBoundingClientRect();

    height_t = main_board_pos.main_board_height;
    width_t = main_board_pos.main_board_width;
    left_t = main_board_pos.left;
    top_t = main_board_pos.top;

    return {
        height = height_t,
        width = width_t,
        left = left_t,
        top = top_t,
        col_width = width_t / 8,
        row_height = height_t / 8
    }
}

function parsePlayers() {
    var players = document.getElementsByClassName('player'); // assume only 2 players

    // search player[0] details for player name (PLAYER_NAME) and player team ("white")
    var name_t = players[0].innerText.includes(PLAYER_NAME); // true if found, false if not found; unknown if case sensitive
    var team_t = players[0].attributes[0].value.includes("white"); // true if found, flase if not found; unknown if case sensitive

    if(name_t)
    {
        // player[0] is you
        if(team_t)
        {
            // player is white
            player_team = "white"
        }
        else {
            // player is black
            player_team = "black"
        }
    }
    else {
        // player[0] is opponent
        if(team_t)
        {
            // opponent is white
            player_team = "black"
        }
        else {
            // opponent is black
            player_team = "white"
        }
    }

}

function parsePieces() {
    var player_pieces = undefined;

    if(player_team == "white") {
        player_pieces = document.getElementsByClassName('white').filter(
            // Filter out the singular <div> element from list
            element =>
                element.tagName == "PIECE"
        );
    }
    else {
        player_pieces = document.getElementsByClassName('black').filter(
            // Filter out the singular <div> element from list
            element =>
                element.tagName == "PIECE"
        );
    }

    for(let piece in player_pieces){
        my_chess_collection.push(new ChessPiece(piece));
    }
}

function start() {
    main_board = parseMainBoard();
    parsePlayers();
    parsePieces();
}


// eventType: click, dblclick, mouseup, mousedown
let triggerMouseEvent = function(element, eventType, x, y) {
    let mouseEvent = new MouseEvent(eventType, {
        'button': 0,
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'clientX': x,
        'clientY': y
    });
    //let targetElement = document.elementFromPoint(x, y); // this needs to be changed eventually
    element.dispatchEvent(mouseEvent); 
}

// Gets the element coordinates 
function getElementCoords(element) {
    var element_rect = element.getBoundingClientRect();

    var left_t = element_rect.left;// + main_board_left_begin;
    var top_t = element_rect.top;// + main_board_top_begin;
    return {
        left: left_t,
        top: top_t
    }
}

function getPieceCoordsRelativeToMainBoard(element) {
    // can also be achieved by reading "style="transform: translate(0px, 0px);" "
    var element_rect = element.getBoundingClientRect();

    var top_t = element_rect.top - main_board_top_begin;
    var left_t = element_rect.left - main_board_left_begin;
    return {
        top: top_t,
        left: left_t
    }
}

function getElementCoordsRelativeToContainer(element, container) {
    var element_rect = element.getBoundingClientRect();
    var container_rect = container.getBoundingClientRect();

    var top_t = element_rect.top + container_rect.top;
    var left_t = element_rect.left + container_rect.left;
    return {
        top: top_t,
        left: left_t
    }
}

function parseTransformStyle (translate) {
    // receiving string that looks like "translate(143.98px, 431.94px)"
    // TODO: parse string

    return {
        x: 0,
        y: 0
    }
}

function getElementRow(element) {
    var transform = parseTransformStyle(element.style.transform);

    var relative_pos_x = transform.x;
    var relative_pos_y = transform.y;
}

function getElementCol(element) {

}

function ChessPiece(element) {
    this.fullName = element.className; // player team + one of PIECE_NAMES ex. "white pawn"
    this.name    = this.fullName.replace(player_team + " ", ""); // one of PIECE_NAMES

    this.boundingRect = element.getBoundingClientRect();

    this.top     = this.boundingRect.top; // DOM element position top
    this.left    = this.boundingRect.left; // DOM element position left

    this.row     = 0; // [1-8]
    this.column  = 0; // [1-8] corresponds to [A-H]

    this.element = element; // the referenced DOM element (unknown if it can change)

}

// var ChessPiece = {
//     name    : string, // one of PIECE_NAMES
//     fullName : string, // player team + one of PIECE_NAMES ex. "white pawn"

//     top     : number, // DOM element position top
//     left    : number, // DOM element position left

//     row     : number, // [1-8]
//     column  : number, // [1-8] corresponds to [A-H]

//     element : object // the referenced DOM element (unknown if it can change)
// }

// var ChessCollection = {
//     chess_pieces : Array(),

//     classMethod : function() {
//         return 0;
//     }

// }
