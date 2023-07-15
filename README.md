<img width="891" alt="tic-tac-toe" src="https://github.com/kumarsuraj151/Tic_tac_toe/assets/102572879/3f9b8a14-2871-4824-9bc8-e285bd5e2731">

# Tic-Tac-Toe with Svelte and Socket.IO

This project is a multiplayer Tic-Tac-Toe game built using Svelte and Socket.IO. It allows two players to compete against each other in real-time, making their moves on a shared game board.

## How it Works

The Tic-Tac-Toe game is built using the Svelte framework, which provides a reactive user interface. The game board is updated in real-time using Socket.IO, a library for enabling real-time communication between the server and clients.

When a player start a new game,a random room assign to that player and another player can join the room using 6 digit roomId and they can play the game in realtime.
It is also ensuring that a room can have only max 2 player, if 3 rd player is joining the same room , A toast message will show "room is full". 

When a player makes a move, the game emits a socket event to the server, which then broadcasts the updated game state to all connected clients in that room. This ensures that both players see the same game board at all times.

The server keeps track of the game state, including the positions of X and O, and determines the winner or a draw based on the game logic.

