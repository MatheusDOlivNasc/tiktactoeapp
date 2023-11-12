import { useState } from 'react';
import './App.css';

const baseTicTacToe = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
];
const winCondition = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7],
];
const winMap = ["zero", "one", "two", "three", "four", "five", "six", "seven"];

function App() {
  const [circle, setCircle] = useState<number[]>([]);
  const [square, setSquare] = useState<number[]>([]);
  const [turn, setTurn] = useState<boolean>(false);
  const [win, setWin] = useState<number[] | undefined>(undefined);

  function handleSetRound(event: React.MouseEvent<HTMLButtonElement>) {
    const button = event.target as HTMLButtonElement;
    const number = parseInt(button?.dataset?.number + "");

    let turnCheck: number[] | undefined; 

    if(turn === true) {
      const newCircle = [...circle, number];
      setCircle(newCircle);
      turnCheck = newCircle;
    } else {
      const newSquare = [...square, number];
      setSquare(newSquare);
      turnCheck = newSquare;
    };

    const winCheck = winCondition.find(rule => (
      rule.filter(number => turnCheck && turnCheck.find(pos => pos === number))?.length === 3
    ));

    if(winCheck) setWin(winCheck);
    else setTurn(!turn);
  }
  function handleReset() {
    setCircle([]);
    setSquare([]);
    setTurn(false);
    setWin(undefined);
  }
  return (
    <div className='App'>
      <ul className="border">
        {
          baseTicTacToe.map((line) => (
            <li className='line' key={crypto.randomUUID()}>
              {
                line.map((pos) => (
                  <button
                    key={pos}
                    type='button'
                    className={
                      'pos-number ' + (
                        win?.find(n => n == pos) != undefined &&
                        "winner"
                      )
                    }
                    disabled={
                      circle.find(n => n == pos) != undefined ||
                      square.find(n => n == pos) != undefined ||
                      !!win
                    }
                    data-number={pos}
                    onClick={handleSetRound}>
                      {
                        circle.find(n => n == pos) ? "O" :
                        square.find(n => n == pos) ? "X" :
                        null
                      }
                  </button>
                ))
              }
            </li>
          ))
        }
        {win && <li className={
          'win-marker ' + (
            winMap?.[
              winCondition.findIndex(p => JSON.stringify(p) === JSON.stringify(win))
            ]
          )
        }></li>}
      </ul>
      <button onClick={handleReset}>
        reset
      </button>
    </div>
  )
}

export default App
