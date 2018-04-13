// Create a class called TTT
class TTT
{
    constructor () {
        this.xIsNext = true;
        this.winner = null;
        this.squares = Array(9).fill(null);
        this.winningLine = Array();
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            ];
        
        this.calculateWinner = this.calculateWinner.bind(this);
        this.highlightWinner = this.highlightWinner.bind(this);
        this.disableAll = this.disableAll.bind(this);
        this.init = this.init.bind(this);

        this.init();
    }
    /*
        Add a constructor that 
        -   defines and initializes all variables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */

    init()
    {
        let cell;
        for (let i = 0; i < 9; i++) {
            this.handleClick.bind(this, i);
            cell = document.getElementsByTagName("button")[i];
            cell.onclick = () => this.handleClick(i);
        }  
    }

    calculateWinner() {
        for (let i = 0; i < this.lines.length; i++) {
            let [a, b, c] = [this.lines[i][0], this.lines[i][1], this.lines[i][2]]; 
            if (this.squares[a] && 
                this.squares[a] === this.squares[b] && 
                this.squares[a] === this.squares[c]) 
            {
                this.winner = this.squares[a];
                this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }

    handleClick(i) {
        let clickedSquare = document.getElementsByTagName("button")[i];
        this.squares[i] = this.xIsNext ? 'X' : 'O';
        clickedSquare.innerHTML = this.squares[i];
        this.onclick = function() {};
        this.xIsNext = !(this.xIsNext);

        if (this.calculateWinner()) {
            this.highlightWinner();
        } else {
            let status = document.querySelector("#status");
            status.innerHTML = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
        }
    }

    highlightWinner() {
        let status = document.querySelector("#status");
        status.innerHTML = "Winner: " + this.winner;
        for (let i = 0; i < this.winningLine.length; i++) {
            let cell = document.getElementById(this.winningLine[i]);
            cell.classList.add("red"); 
        }
        this.disableAll();
    }

    disableAll() {
        let cell;
        for (let i = 0; i < 9; i++) {
            cell = document.getElementsByTagName("button")[i];
            cell.onclick = function() {};
        }
    }



    /*
        Convert each function to a method
        -   move it inside the class
        -   remove the keyword function
        -   add this to all of the variables that belong to the class
        -   change this.to let or const for local variables
        -   add this to all method calls
     
        Init
        -   bind both this and i to handleClick
            -   this.handleClick.bind(this, i);

        CalculateWinner
        -   use destructuring assingment to assign values to
            a b and c in one line

        HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local variable i
        -   add a local variable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8
    */
}

// declare a variable ttt
let ttt;
// add an onload handler to the window that assigns ttt to a TTT
window.onload = () => { ttt = new TTT() }