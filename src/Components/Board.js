import React from 'react'
import { endNode, size, startNode } from '../App';
import Node from './Node';

function Board() {
    const [board, setBoard] = React.useState(null)
    const [path, setPath] = React.useState(null)
    const [isBFS, setIsBFS] = React.useState(false)

    let isDone = false;
    let counter = 10;

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    React.useEffect(() => {
        setBoard(createDummy())
    }, [])

    // DFS

    const changeColor = (row, col, counter, vis, arrow) => {
        const node = document.querySelector(`.node-${row}-${col}`)
        setTimeout(() => {
            node.style.backgroundColor = "#00008B";
        }, counter * 50);
        setTimeout(() => {
            node.style.backgroundColor = "blue";
        }, counter * 50 + 50);
        setTimeout(() => {
            node.style.backgroundColor = "lightBlue";
        }, counter * 50 + 100);
        setTimeout(() => {
            if (row === endNode[0] && col === endNode[1]) {
                setBoard([...vis])
            }
            node.style.backgroundColor = "white";
        }, counter * 50 + 150);
    }
    const createDummy = () => {
        const dummyBoard = [];
        for (let i = 0; i < size[0]; i++) {
            let dummyRow = []
            for (let j = 0; j < size[1]; j++) {
                dummyRow.push(0);
            }
            dummyBoard.push(dummyRow);
        }
        return [...dummyBoard]
    }
    const DFS = (i, j) => {
        const vis = board;
        dfs(i, j, vis, [])
    }
    const dfs = (i, j, vis, p) => {
        if (i < 0 || j < 0 || i >= size[0] || j >= size[1]) return
        if (isDone) return;
        if (vis[i][j] === 1) return;
        changeColor(i, j, counter++, vis)
        if (i === endNode[0] && j === endNode[1]) {
            isDone = true
            return;
        }
        vis[i][j] = 1;
        p.push([i, j])
        for (let k = i; k > 0; k--) dfs(k - 1, j, vis, p)
        for (let k = j; k > 0; k--) dfs(i, k - 1, vis, p)
        for (let k = i; k < size[0]; k++) dfs(k + 1, j, vis, p)
        for (let k = j; k < size[1]; k++) dfs(i, k + 1, vis, p)
        p.pop();
    }


    // BFS

    React.useEffect(() => {
        if (!isBFS) return
        const dummy = createDummy()
        for (let k = 0; k < path.length; k++) {
            const [i, j] = path[k];
            dummy[i][j] = 3;
        }
        setBoard([...dummy])
    }, [isBFS])

    const BFS = (i, j) => {
        const vis = board
        bfs(i, j, vis, [])
    }
    const bfs = (i, j, vis, p) => {
        sleep(100).then(() => {
            if (i < 0 || j < 0 || i >= size[0] || j >= size[1]) return
            if (isDone) return;
            if (vis[i][j] === 1 || vis[i][j] === 11 || vis[i][j] === 111) return;
            if (i === endNode[0] && j === endNode[1]) {
                setPath([...p])
                setIsBFS(true)
                isDone = true
                return;
            }
            vis[i][j] = 1;
            setBoard([...vis])
            sleep(200).then(() => vis[i][j] = 11)
            sleep(300).then(() => vis[i][j] = 111)
            sleep(100).then(() => { bfs(i - 1, j, vis, [...p, [i, j]]) })
            sleep(100).then(() => { bfs(i, j - 1, vis, [...p, [i, j]]) })
            sleep(100).then(() => { bfs(i + 1, j, vis, [...p, [i, j]]) })
            sleep(100).then(() => { bfs(i, j + 1, vis, [...p, [i, j]]) })
        })
    }

    return (
        <div>
            {board && board.map((item, index) => {
                return (
                    <div style={{ display: 'flex' }} key={Math.random()}>
                        {item.map((it, ind) => {
                            return <Node key={Math.random()} row={index} col={ind} board={board} />
                        })}
                    </div>
                )
            })}
            <button onClick={() => {
                if (!board) return;
                setBoard(createDummy())
                setTimeout(() => DFS(startNode[0], startNode[1]), 2000)
            }}>DFS</button>

            <button onClick={() => {
                if (!board) return;
                setBoard(createDummy())
                setTimeout(() => BFS(startNode[0], startNode[1]), 1000)
            }}>BFS</button>
        </div>
    )
}

export default Board