<script setup>
import OnboardingFlow from './components/OnboardingFlow.vue'
</script>

<template>
  <div class="app-container">
    <main>
      <OnboardingFlow />
    </main>
  </div>
</template>

<style>
:root {
  --gradient-start: #ECE9E6;
  --gradient-end: #FFFFFF;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: #2c3e50;
}

#app {
  height: 100vh;
}
</style>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
