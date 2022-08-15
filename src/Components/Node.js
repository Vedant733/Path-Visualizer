import React from 'react'
import { startNode, endNode } from '../App'
function Node({ row, col, board }) {

    return (
        <div className={`node-${row}-${col}`} style={{
            margin: '3px',
            display: 'inline-block', border: '1px solid black', width: '30px', height: '30px',
            backgroundColor: row === startNode[0] && col === startNode[1]
                ? 'green'
                : row === endNode[0] && col === endNode[1]
                    ? 'red'
                    : board[row][col] === 1
                        ? 'orange'
                        : board[row][col] === 3
                            ? 'black'
                            : board[row][col] === 11
                                ? 'yellow'
                                : 'white',
            transition: 'backgroundColor ease-in 1s',
        }}>

        </div>
    )
}

export default Node