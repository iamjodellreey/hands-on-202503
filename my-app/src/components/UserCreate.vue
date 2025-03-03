<script setup>
import { ref } from 'vue'

const user = ref({
  username: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  // Emit the user data to parent component
  emit('user-created', { ...user.value })
}

const emit = defineEmits(['user-created'])
</script>

<template>
  <div class="user-create">
    <h2>Create Account</h2>
    <form @submit.prevent="handleSubmit" class="floating-form">
      <div class="form-group">
        <input 
          id="username"
          v-model="user.username"
          type="text"
          required
          placeholder=" "
        >
        <label for="username">Username</label>
        <div class="line"></div>
      </div>
      
      <div class="form-group">
        <input 
          id="email"
          v-model="user.email"
          type="email"
          required
          placeholder=" "
        >
        <label for="email">Email</label>
        <div class="line"></div>
      </div>
      
      <div class="form-group">
        <input 
          id="password"
          v-model="user.password"
          type="password"
          required
          placeholder=" "
        >
        <label for="password">Password</label>
        <div class="line"></div>
      </div>

      <button type="submit">
        <span>Continue</span>
        <div class="button-effect"></div>
      </button>
    </form>
  </div>
</template>

<style scoped>
.user-create {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
}

.floating-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  position: relative;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(66, 184, 131, 0.1);
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #42b883;
  background: rgba(255, 255, 255, 0.2);
}

.line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  transform: scaleX(0);
  background: #42b883;
  transition: transform 0.3s ease;
}

input:focus ~ .line {
  transform: scaleX(1);
}

label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  pointer-events: none;
  transition: all 0.3s ease;
  padding: 0 4px;
}

input:focus ~ label,
input:not(:placeholder-shown) ~ label {
  top: -10px;
  left: 10px;
  font-size: 0.8rem;
  color: #42b883;
  background: white;
}

button {
  position: relative;
  width: 100%;
  padding: 14px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

button:active {
  transform: translateY(0);
}

.button-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

button:hover .button-effect {
  width: 300px;
  height: 300px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>