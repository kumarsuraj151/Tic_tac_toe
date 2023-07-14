<script>
  export let socket;
  import Winner from "./Winner.svelte";
  import { onMount } from "svelte";

  export let roomNumber;
  let username = "";

  export let users = [];

  let currentPlayer = "X";
  let squares = Array(9).fill("");
  
  let currentPlayerMove = localStorage.getItem("player") === currentPlayer;

  socket.on("chat message", (index) => {
    if (squares[index] === "") {
      squares[index] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
    currentPlayerMove = localStorage.getItem("player") === currentPlayer;
    winner = checkWin();
  });

  function handleClick(index) {
    if (squares[index] === "") {
      squares[index] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      socket.emit("chat message", { index, room: roomNumber });
    }
  }

  let winner = "";

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  function checkWin() {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        squares[a] !== "" &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    let space = false;
    for (let i = 0; i < 9; i++) {
      if (squares[i] === "") space = true;
    }
    if (!space && winner == "") {
      return "draw";
    }
    return "";
  }

  socket.on("new game", (data) => {
    if (data) {
      winner = "";
      resetGame();
    }
  });

  function resetGame2() {
    socket.emit("new game", true);
  }

  function resetGame() {
    currentPlayer = "X";
    currentPlayerMove = localStorage.getItem("player") === currentPlayer;
    squares = Array(9).fill("");
  }
  let toastMsg = "";
  let showToast = false;

  function showToastMessage(msg) {
    toastMsg = msg;
    showToast = true;

    setTimeout(() => {
      showToast = false;
    }, 2000);
  }

  console.log(currentPlayer, currentPlayerMove, localStorage.getItem("player"));
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl text-center mb-4">Room ID: {roomNumber}</h1>

  <div class="bg-gray-200 p-4 rounded">
    <h2 class="text-lg font-semibold mb-2">Users:</h2>
    <ul class="list-disc pl-6">
      {#each users as user, index}
        <li>{user.name}: {user.player}</li>
      {/each}
    </ul>
  </div>
</div>
<!-- {currentPlayerMove} -->
<div class="w-fit m-auto">
  <h1 class="text-2xl text-center mb-4">Player's Turn: {currentPlayer}</h1>

  <div class="flex justify-center mb-2">
    <button
      class="square bg-white border border-gray-300 flex items-center justify-center mr-[11px] text-2xl {currentPlayer ===
        'X' && 'border-b-4 border-b-blue-500'} ">X</button
    >
    <button
      class="square bg-white border border-gray-300 flex items-center justify-center text-2xl {currentPlayer ===
        'O' && 'border-b-4 border-b-blue-500'}">O</button
    >
  </div>
  <div
    class="grid grid-cols-3 gap-2 {currentPlayerMove == false &&
      'pointer-events-none'}"
  >
    {#each squares as value, index}
      <button
        class="square bg-white border border-gray-300 flex items-center justify-center text-2xl {value ===
          'X' && 'highlight-x'}"
        on:click={() => handleClick(index)}
      >
        {value}
      </button>
    {/each}
  </div>

  <div class="mt-6 text-center">
    <button
      class="px-3 py-1 bg-blue-500 text-white font-bold rounded"
      on:click={resetGame2}>New Game</button
    >
  </div>
</div>

<div class="fixed bottom-4 right-4" class:hidden={!showToast}>
  <div
    class="bg-gray-800 text-white py-2 px-4 rounded-lg shadow-md flex items-center"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="h-6 w-6 text-yellow-400 mr-2"
    >
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 112 0v4a1 1 0 11-2 0v-4zm1-7a1 1 0 00-1 1v1a1 1 0 102 0V4a1 1 0 00-1-1z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="font-medium">{toastMsg}.</span>
  </div>
</div>

{#if winner !== ""}
  <Winner bind:winner bind:socket />
{/if}

<style>
  .square {
    width: 80px;
    height: 80px;
  }
  .highlight-x {
    background-color: #fde047;
  }
</style>
