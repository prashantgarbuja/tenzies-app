import React from "react";
import Die from "./components/Die.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(() => allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  const [numOfRolls, setNumOfRolls] = React.useState(0);

  React.useEffect(() => {
    if (dice.every((die) => die.value === dice[0].value && die.isHeld)) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
    setNumOfRolls((oldNumOfRolls) => oldNumOfRolls + 1);
    //console.log(numOfRolls);
  }
  function resetDice() {
    setTenzies(false);
    setDice(allNewDice());
    setNumOfRolls(0);
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div>
      {tenzies && <Confetti />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls. <br />
          <span className="rolls">Rolls: {numOfRolls}</span>
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={tenzies ? resetDice : rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
}
