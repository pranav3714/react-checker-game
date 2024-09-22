# React Checker

## Introduction

Checker game built using React and TailwindCSS

## Setup

Follow these simple steps to get started with a local version of Checker:

1. **Clone the project from git**: Getting from the strat you need to clone the project using SSH or HTTPS.

   ```bash
   git clone https://github.com/pranav3714/react-checker-game.git
   ```

2. **Installation**: Install the required dependencies using your package manager of choice.

   ```bash
   yarn
   ```

3. **Run the Development Server**: Start the development server and see the app in action.

   ```bash
   yarn start
   ```

4. **Run on web browser**: open your favourite web browser and just type local url.

   ```bash
   http://localhost:3000
   ```

## Game rules

1. The game is played on an 8x8 board with dark and light squares.
2. Each player starts with 12 pieces on dark squares (first and last 3 rows).
3. Pieces can only move forward diagonally.
4. A piece can capture an opponent’s piece by ‘jumping’ over it. This can only be done if there is no piece of either player on the other side.
5. After a player has moved the other player can move his pieces.
6. The game is over when one player has no more pieces.


## Todo
1. Alert when a user wins
2. A piece becomes a ‘king’ when it reaches the other side. It can then move backwards and forwards.