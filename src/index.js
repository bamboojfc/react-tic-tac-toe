import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: [],
      status: true,
      showSquares: Array(9).fill(null),
      currentMove: 0
    }
  }

  handleClick(i){
    let sq = this.state.showSquares.slice()
    if(calculateWinner(this.state.showSquares) || sq[i]){
      return;
    }
    sq[i] = this.state.status ? 'X' : 'O'

    const currentMove = this.state.currentMove
    let sqList = this.state.squares.slice()
    sqList.push({
      square: sq,
      status: !this.state.status
    })
    
    this.setState({ 
      showSquares: sq,
      status: !this.state.status,
      currentMove: currentMove+1,
      squares: sqList
    })
  }

  jumpTo(move){
    let sqList = this.state.squares
    this.setState({ 
      showSquares: sqList[move].square,
      status: sqList[move].status,
      currentMove: move,
      squares: sqList.slice(0,move+1)
    })
  }

  render() {
    let status
    const winner = calculateWinner(this.state.showSquares);
    if(winner){
      status = 'The winner is ' + winner
    }else{
      status = 'Next player: ' + (this.state.status ? 'X' : 'O');
    }
    
    const moves = this.state.squares.map((sq, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(i)=>{this.handleClick(i)}} squares={this.state.showSquares}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
