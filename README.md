## UniZulu Strategy Games

The purpose of this app is to supplement mathematical games workshops to Zulu speaking students visiting the Unizulu Science Centre in Richards Bay, South Africa. The games included are Tic Tac Toe, Order and Chaos, and Nim. The games can be played against a friend or a computer AI named Sibusiso. Sibusiso is an imperfect player as playing against a perfect player is not fun. Rules are displayed for all the games and includes a button to toggle the language between Zulu and English.  This app was created using React.

## Tic Tac Toe

Tic Tac Toe is played on a three by three board. Players take turns putting either an X or an O down. The first player is X the second player is O. If someone gets three of their symbols in a row (horizontally, diagonally, or vertically) they win the game. The computer AI first checks to get three in a row and secondly looks to block his opponent. If neither option is available, it will make a random move.

## Order and Chaos

Order and Chaos is played on a six by six board. The first player plays as Order and the second plays as Chaos. Order wants to get five of one symbol in a row (horizontally, vertically, or diagonally) while Chaos tries to prevent this. Players are allowed to use either X or O on their turn. The computer AI is always Chaos and looks to block 5 in a row first, and then looks to prevent the opponent from getting three in a row.

## Nim

Nim is played with a set of 12 pebbles placed in three rows. Players take turns removing as many pieces as they like from any one row. The player who takes the last piece loses. Currently the AI is not very good. Ideally it plays randomly until only half the pieces are left and then plays perfectly. It still makes a few mistakes which I am working on.
