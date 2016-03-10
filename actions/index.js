export const startGame = (namePlayerOne, namePlayerTwo) => {
    return {
        type: 'START_GAME',
        names: [namePlayerOne, namePlayerTwo]
    };
};

export const move = (rowIndex, colIndex) => {
    return {
        type: 'MOVE',
        rowIndex,
        colIndex
    };
};
