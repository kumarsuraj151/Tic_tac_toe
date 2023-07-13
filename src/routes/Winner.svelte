<script>
  export let winner;
  export let socket;
  function resetGameRlTime() {
    socket.emit("new game", true);
  }
</script>

<div
  class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
>
  <div class="bg-white p-8 rounded shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Winner: {winner}</h2>
    <button
      class="px-3 py-1 bg-blue-500 text-white font-bold rounded"
      on:click={resetGameRlTime}>Play Again</button
    >
  </div>
</div>
