<script>
    import { onMount } from 'svelte';
  
    let activeTab = 'newGame';
    let username = '';
  
    function switchTab(tab) {
      activeTab = tab;
    }
  
    onMount(() => {
      // Check if username exists in localStorage
      const storedUsername = localStorage.getItem('username');
  
      if (storedUsername) {
        // If username exists, set the value from localStorage
        username = storedUsername;
      }
    });
  
    function saveUsername() {
      if (username) {
        localStorage.setItem('username', username);
      }
    }
  </script>
  
  <style>
    /* Add your custom styles here */
  </style>

  




  
  <div class="container mx-auto p-4">
    <div class="mb-4">
      <button
        class="px-4 py-2 rounded-tl-md rounded-bl-md bg-blue-500 text-white font-bold {activeTab === 'newGame' && 'selected'}"
        
        on:click={() => switchTab('newGame')}>
        New Game
      </button>
      <button
        class="px-4 py-2 rounded-tr-md rounded-br-md bg-blue-500 text-white font-bold {activeTab === 'joinRoom' && 'selected'}"
        
        on:click={() => switchTab('joinRoom')}>
        Join Room
      </button>
    </div>
  
    {#if activeTab === 'newGame'}
      <h1 class="text-2xl text-center mb-4">Welcome, {username || 'Guest'}</h1>
      <!-- New Game UI -->
    {/if}
  
    {#if activeTab === 'joinRoom'}
      <div>
        <h2 class="text-xl text-center mb-4">Join Room</h2>
        <!-- Join Room UI -->
      </div>
    {/if}
  
    <div class="mt-6 text-center">
      <button class="px-3 py-1 bg-blue-500 text-white font-bold rounded" on:click={saveUsername}>Save Username</button>
    </div>
  </div>