<script>
  import { onMount } from "svelte";
  import TikToe from "./TikToe.svelte";

  export let socket;
  let roomNumber = "";
  let users = [];
  export let username = "";
  export let activeTab;
  let toastMsg = "";
  let showToast = false;
  let loading = true;

  onMount(() => {
    // Check if username exists in localStorage
    saveUsername();
  });

  function saveUsername() {
    const storedUsername = localStorage.getItem("name");

    if (storedUsername) {
      // If username exists, set the value from localStorage
      // username = storedUsername;
    } else {
      // If username doesn't exist, prompt the user to enter their username
      const promptUsername = prompt("Please enter your Name:");
      if (promptUsername) {
        // If the user entered a username, save it in localStorage
        username = promptUsername.trim().toLowerCase();
        localStorage.setItem("name", username);
      }
    }
  }

  socket.on("connected", (user) => {
    if (user.status) {
      users = user.user;
      localStorage.setItem("id", user.id);
      game = true;
    } else {
      // console.log(user.message);
      game = false;
    }
    showToastMessage(user.message);
  });

  socket.on("player", (data) => {
    localStorage.setItem("player", data);
    loading = false;
  });

  let game = false;

  function JoinRoom() {
    socket.emit("setup", {
      room: roomNumber,
      name: localStorage.getItem("name"),
    });
  }

  function leaveRoom() {
    socket.emit("leaveGroup", {
      id: localStorage.getItem("id"),
      room: roomNumber,
      name: localStorage.getItem("name"),
    });
    activeTab = "Home";
  }

  function showToastMessage(msg) {
    toastMsg = msg;
    showToast = true;

    setTimeout(() => {
      showToast = false;
    }, 2000);
  }
</script>

<button
  class="flex items-center justify-center px-4 py-2 bg-blue-500 mb-3 text-white font-bold rounded"
  on:click={leaveRoom}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-4 w-4 mr-2"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
  Leave Room
</button>
{#if game == true && !loading}
  <TikToe {socket} {roomNumber} {users} />
{:else}
  <div class="flex items-center">
    <input
      type="text"
      placeholder="Enter 6 digit room id"
      class="border border-gray-300 px-4 py-2 rounded-l focus:outline-none focus:border-blue-500"
      bind:value={roomNumber}
    />
    <button
      class="px-4 py-2 bg-blue-500 text-white font-bold rounded-r"
      on:click={JoinRoom}>Join Room</button
    >
  </div>
{/if}

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
