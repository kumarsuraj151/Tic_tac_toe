<script>
  import Header from "./Header.svelte";
  import "./styles.css";
</script>

<div class="app">
  <main class="bg-[#f6f8fa] sm:w-3/5">
    <slot />
  </main>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    widows: 80%;
    min-height: 100vh;
    justify-content: center;
  }

  main {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
