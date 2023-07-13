<script>
  import { onMount } from "svelte";
  import NewGame from "./NewGame.svelte";
  import JoinRoom from "./JoinRoom.svelte";
  import io from "socket.io-client";
  let socket = io.connect("http://localhost:3000");

  let activeTab = "Home";

  function switchTab(tab) {
    if (activeTab !== "Home" && tab === "joinRoom") {
      socket.emit("removeFromRoot", localStorage.getItem("id"));
    }
    activeTab = tab;
  }

  let username = "";

  onMount(() => {
    // Check if username exists in localStorage
    saveUsername();
  });

  function saveUsername() {
    const storedUsername = localStorage.getItem("name");

    if (storedUsername) {
      // If username exists, set the value from localStorage
      username = storedUsername;
    } else {
      // If username doesn't exist, prompt the user to enter their username
      const promptUsername = prompt("Please enter your Name:");
      if (promptUsername) {
        // If the user entered a username, save it in localStorage
        username = promptUsername;
        localStorage.setItem("name", username);
      }
    }
  }
</script>

<div class="container mx-auto p-4">
  {#if activeTab === "Home"}
    <div class="mb-4 flex justify-center">
      <button
        class="px-4 py-2 rounded-tl-md mr-1 rounded-bl-md bg-blue-500 text-white font-bold {activeTab ===
          'newGame' && 'bg-blue-700'}"
        on:click={() => switchTab("newGame")}
      >
        New Game
      </button>
      <button
        class="px-4 py-2 rounded-tr-md rounded-br-md bg-blue-500 text-white font-bold {activeTab ===
          'joinRoom' && 'bg-blue-700'}"
        on:click={() => switchTab("joinRoom")}
      >
        Join Room
      </button>
    </div>
  {/if}

  {#if activeTab === "Home"}
    <h1 class="text-2xl text-center mb-4">Welcome, {username || "Guest"}</h1>
  {/if}

  {#if activeTab === "newGame"}
    <NewGame {socket} {username} bind:activeTab/>
  {/if}

  {#if activeTab === "joinRoom"}
    <div>
      <JoinRoom {socket} {username} bind:activeTab/>
    </div>
  {/if}
</div>

<style>
  /* Add your custom styles here */
</style>
