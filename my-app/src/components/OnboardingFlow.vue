<script setup>
import { ref } from 'vue'
import UserCreate from './UserCreate.vue'

const currentStep = ref(0)
const steps = [
  {
    title: 'Welcome',
    subtitle: 'Let\'s get started with your account creation'
  },
  {
    title: 'Create Account',
    subtitle: 'Fill in your details to create your account'
  },
  {
    title: 'Success',
    subtitle: 'Your account has been created successfully!'
  }
]

const formData = ref({
  username: '',
  email: '',
  password: ''
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const handleUserData = (userData) => {
  formData.value = userData
  nextStep()
}
</script>

<template>
  <div class="onboarding-container">
    <div class="progress-bar">
      <div 
        class="progress" 
        :style="{ width: `${(currentStep / (steps.length - 1)) * 100}%` }"
      ></div>
    </div>

    <div class="step-content">
      <transition name="fade" mode="out-in">
        <div v-if="currentStep === 0" key="welcome" class="step welcome-step">
          <h1>{{ steps[currentStep].title }}</h1>
          <p>{{ steps[currentStep].subtitle }}</p>
          <div class="features">
            <div class="feature">
              <span class="icon">🚀</span>
              <h3>Quick Setup</h3>
              <p>Create your account in minutes</p>
            </div>
            <div class="feature">
              <span class="icon">🛡️</span>
              <h3>Secure</h3>
              <p>Your data is protected</p>
            </div>
            <div class="feature">
              <span class="icon">💫</span>
              <h3>Modern</h3>
              <p>Access to latest features</p>
            </div>
          </div>
          <button @click="nextStep" class="next-btn">Get Started</button>
        </div>

        <div v-else-if="currentStep === 1" key="create" class="step">
          <h1>{{ steps[currentStep].title }}</h1>
          <p>{{ steps[currentStep].subtitle }}</p>
          <UserCreate @user-created="handleUserData" />
          <button @click="prevStep" class="back-btn">Back</button>
        </div>

        <div v-else key="success" class="step success-step">
          <div class="success-animation">✨</div>
          <h1>{{ steps[currentStep].title }}</h1>
          <p>{{ steps[currentStep].subtitle }}</p>
          <div class="user-info">
            <p>Welcome, {{ formData.username }}!</p>
            <p>You can now sign in with your email: {{ formData.email }}</p>
          </div>
          <button @click="currentStep = 0" class="restart-btn">Start Over</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.onboarding-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(66, 184, 131, 0.2);
  border-radius: 2px;
  margin-bottom: 2rem;
}

.progress {
  height: 100%;
  background: #42b883;
  border-radius: 2px;
  transition: width 0.6s ease;
}

.step-content {
  position: relative;
  min-height: 400px;
}

.step {
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.feature {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

button {
  padding: 12px 24px;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-btn, .restart-btn {
  background: #42b883;
  color: white;
}

.back-btn {
  background: transparent;
  color: #666;
  border: 2px solid #666;
  margin-top: 1rem;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.2);
}

.success-animation {
  font-size: 4rem;
  margin: 2rem 0;
  animation: bounce 1s ease infinite;
}

.user-info {
  background: rgba(66, 184, 131, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 2rem 0;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@media (max-width: 768px) {
  .features {
    grid-template-columns: 1fr;
  }
}
</style>