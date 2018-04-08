// start with these global variables
var xIsNext = true;
var winner = null;
var squares = Array(9).fill(null);
var winningLine = Array();
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

function init()
{
    var cell;
    for (var i = 0; i < 9; i++) {
        cell = document.getElementsByTagName("button")[i];
        cell.onclick = handleClick;
    }  
    // document.getElementsByTagName("button").onclick = handleClick;
    // addEventListener("click", handleClick);
}

function handleClick() {
    console.log("clicked");
    // Get the id from the square and put it in a variable
    // Remember that the id is an integer 0 - 8
    var i = this.id;
    // Set the element in the squares array to the player's symbol
    squares[i] = xIsNext ? 'X' : 'O';
    // Update the inner html for this square in the UI
    this.innerHTML = squares[i];
    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
    this.onclick = function() {};
    // Update the variable xIsNext
    xIsNext = !(xIsNext);
    // If calculateWinner returns true
    // highlight the winner and disable all of the squares
    // otherwise update the status in the UI to display the player
    if (calculateWinner()) {
        highlightWinner();
    } else {
        var status = document.querySelector("#status");
        status.innerHTML = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
}

function calculateWinner() {
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];       
        if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    winner = null;
    winningLine = Array();
    return false;
}

function highlightWinner() {
    var status = document.querySelector("#status");
    // Update the status in the UI to display the winner
    status.innerHTML = "Winner: " + winner;
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    //      get the next square using the current index in the winningLine array as the id
    //      add the class red to the square
    for (var i = 0; i < winningLine.length; i++) {
        var cell = document.getElementById(winningLine[i]);
        cell.classList.add("red"); 
    }
    // Disable all of the squares
    disableAll();
}

function disableAll() {
    document.querySelectorAll(".col-xs-4 square").onclick = function() {};
    // Set the onclick handler for all squares to function that does nothing
    // The id of the square is a number 0 - 8
}

// When the page has finished loading, call the function init  
window.onload = init;