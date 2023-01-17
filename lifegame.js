let canvas = document.getElementById("canvas")
let c = canvas.getContext("2d")

function clear() {
    c.fillStyle = "gray"
    c.beginPath()
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.stroke()
}

function draw(x, y, status) {
    if (status == 0) {
        c.fillStyle = "white"
    } else {
        c.fillStyle = "black"
    }
    c.beginPath()
    c.fillRect(x*60 + 1, y*60 + 1, 58, 58)
    c.fill()
    c.stroke()
}

function show_board(board) {
    clear()
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            draw(j, i, board[i][j])
        }
    }
}

function count_neighbor(board, x, y) {
    var res = 0

    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            if (i == -1 || i == board[0].length || j == -1 || j == board.length) {
                continue
            }
            res += board[j][i] 
        }
    }

    return res
}

function next_status(status, neighbor) {
    var res = 0

    if (status == 0) {
        if (neighbor === 3) {
            res = 1
        } else {
            res = 0
        }
    } else {
        if (neighbor <= 1) {
            res = 0
        } else if (2 <= neighbor && neighbor <= 3) {
            res = 1
        } else {
            res = 0
        }
    }

    return res
}

function step(board) {
    var next_board = []

    for (var i = 0; i < board.length; i++) {
        next_board.push([])
        for (var j = 0; j < board[0].length; j++) {
            next_board[next_board.length - 1].push(next_status(board[i][j], count_neighbor(board, j, i)))
        }
    }
    main_board = next_board.concat()
    show_board(main_board)
    step_count++
    document.getElementById("step_counter").textContent = "ステップ：" + step_count
}

let main_board = []
let step_count = 1
function reset() {
    main_board = []
    step_count = 1
    for (var i = 0; i < 5; i++) {
        main_board.push([])
        for (var j = 0; j < 5; j++) {
            main_board[main_board.length - 1].push(Math.floor(Math.random() * 2))
        }
    }
    show_board(main_board)
    document.getElementById("step_counter").textContent = "ステップ：" + step_count
}
reset()