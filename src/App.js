import React, { Component } from "react";

import TicTacToeGame from "./Games/TicTacToeGame/TicTacToeGame";
import OrderAndChaosGame from "./Games/OrderAndChaosGame/OrderAndChaosGame";
import NimGame from "./Games/NimGame/NimGame";
import "./App.css";
import {
  win,
  chooseTicTacToe,
  chooseOrderChaos,
  chooseNim,
  english,
  zulu
} from "./Utils/Constants";
import {
  ticTacToeEnglishRules,
  ticTacToeZuluRules,
  orderChaosEnglishRules,
  orderChaosZuluRules,
  nimEnglishRules,
  nimZuluRules
} from "./Utils/Descriptions";

class App extends Component {
  state = {
    whichGame: "",
    language: english
  };

  // Basic navigation

  goHomeScreen = () => {
    this.setState({
      whichGame: ""
    });
  };

  chooseTicTacToe = () => {
    this.setState({ whichGame: chooseTicTacToe });
  };

  chooseNim = () => {
    this.setState({ whichGame: chooseNim });
  };

  chooseOrderChaos = () => {
    this.setState({ whichGame: chooseOrderChaos });
  };

  toggleLanguage = () => {
    if (this.state.language === english) {
      this.setState({ language: zulu });
    } else {
      this.setState({ language: english });
    }
  };

  render() {
    let symbol = null;
    let winSymbol = null;
    let declaration = null;
    let rules = null;
    let languageButton = null;
    let nimArray = [0];
    let gameControlButton = null;

    let content = (
      <div className="chooseGame">
        <div>
          <span className="gameChoice">
            <img
              className="gameImage"
              src={require("./images/tictactoe.png")}
              alt="Tic Tac Toe"
            />
            <button className="symbolButton" onClick={this.chooseTicTacToe}>
              Tic Tac Toe
            </button>
          </span>
          <span className="gameChoice">
            <img
              className="gameImage"
              src={require("./images/OrderChaos.png")}
              alt="Order and Chaos"
            />
            <button className="symbolButton" onClick={this.chooseOrderChaos}>
              OrderChaos
            </button>
          </span>
          <span className="gameChoice">
            <img
              className="gameImage"
              src={require("./images/nim.png")}
              alt="Nim"
            />
            <button className="symbolButton" onClick={this.chooseNim}>
              Nim
            </button>
          </span>
        </div>
      </div>
    );
    let computer;
    // Decides if X or O is moving
    if (this.state.isX) {
      symbol = "X";
      winSymbol = "O";
    } else {
      symbol = "O";
      winSymbol = "X";
    }

    // Checks whether we're playing Tic Tac Toe
    if (this.state.whichGame === chooseTicTacToe) {
      content = <TicTacToeGame />;

      rules = (
        <div>
          <h3>Tic Tac Toe:</h3>
          <p className="rulesParagraph">{ticTacToeEnglishRules}</p>
        </div>
      );
      if (this.state.language === zulu) {
        rules = (
          <div>
            <h3>Tic Tac Toe:</h3>
            <p className="rulesParagraph">{ticTacToeZuluRules}</p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              English
            </button>
          </div>
        );
      } else {
        rules = (
          <div>
            <h3>Tic Tac Toe:</h3>
            <p className="rulesParagraph">{ticTacToeEnglishRules}</p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              IsiZulu
            </button>
          </div>
        );
      }

      // Checks if we're playing order and chaos
    } else if (this.state.whichGame === chooseOrderChaos) {
      content = <OrderAndChaosGame />;

      if (this.state.language === english) {
        rules = (
          <div>
            <h3>Order and Chaos:</h3>
            <p className="rulesParagraph">{orderChaosEnglishRules}</p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              isiZulu
            </button>
          </div>
        );
      } else {
        rules = (
          <div>
            <h3>Order and Chaos:</h3>
            <p className="rulesParagraph">{orderChaosZuluRules}</p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              English
            </button>
          </div>
        );
      }
    } else if (this.state.whichGame === chooseNim) {
      content = <NimGame />;
      if (this.state.language === english) {
        rules = (
          <div>
            <h3>Nim:</h3>
            <p className="rulesParagraph">{nimEnglishRules}</p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              IsiZulu
            </button>
          </div>
        );
      } else {
        rules = (
          <div>
            <h3>Nim:</h3>
            <p className="rulesParagraph">{nimZuluRules}</p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              English
            </button>
          </div>
        );
      }
    }
    return (
      <div className="App">
        <div className="grid">
          <div className="header">
            <img
              src={require("./images/UnizuluLogo.png")}
              className="logo"
              alt="Unizulu Logo"
            />
            <button className="homeButton" onClick={this.goHomeScreen}>
              Go home
            </button>
          </div>
          <div className="rules">
            {languageButton}
            {rules}
          </div>
          <div className="content">{content}</div>
        </div>
      </div>
    );
  }
}

export default App;
