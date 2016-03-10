/**
* startGame action
* @param {string} namePlayerOne name of player one
* @param {string} namePlayerTwo name of player two
* @return {object} action object
*/
export const startGame = (namePlayerOne, namePlayerTwo) => {
    return {
        type: 'START_GAME',
        names: [namePlayerOne, namePlayerTwo]
    };
};

/**
* move action
* @param {number} rowIndex row where player has clicked
* @param {number} colIndex col where player has clicked
* @return {object} action object
*/
export const move = (rowIndex, colIndex) => {
    return {
        type: 'MOVE',
        rowIndex,
        colIndex
    };
};

/**
* windowResize action
* @param {number} boardHeight row where player has clicked
* @return {object} action object
*/
export const windowResize = (boardHeight) => {
    return {
        type: 'WINDOW_RESIZE',
        boardHeight
    };
};
