<script setup></script>

<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}
body,
html {
  padding: 0;
  margin: 0;
}
body,
#app {
  height: 100vh;
}
main {
  min-height: 100%;
}
</style>
