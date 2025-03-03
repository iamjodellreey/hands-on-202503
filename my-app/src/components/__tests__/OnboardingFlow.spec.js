import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OnboardingFlow from '../OnboardingFlow.vue'
import UserCreate from '../UserCreate.vue'

describe('OnboardingFlow', () => {
  it('renders welcome step initially', () => {
    const wrapper = mount(OnboardingFlow)
    expect(wrapper.text()).toContain('Welcome')
    expect(wrapper.text()).toContain('Get Started')
  })

  it('progresses to create account step when clicking Get Started', async () => {
    const wrapper = mount(OnboardingFlow)
    const getStartedButton = wrapper.find('button')
    
    await getStartedButton.trigger('click')
    
    expect(wrapper.text()).toContain('Create Account')
    expect(wrapper.findComponent(UserCreate).exists()).toBe(true)
  })

  it('moves back to welcome step when clicking back button', async () => {
    const wrapper = mount(OnboardingFlow)
    
    // Move to create account step
    await wrapper.find('button').trigger('click')
    
    // Click back button
    const backButton = wrapper.find('.back-btn')
    await backButton.trigger('click')
    
    expect(wrapper.text()).toContain('Welcome')
  })

  it('shows success step after user creation', async () => {
    const wrapper = mount(OnboardingFlow)
    
    // Move to create account step
    await wrapper.find('button').trigger('click')
    
    // Get UserCreate component and emit user created event
    const userCreateComponent = wrapper.findComponent(UserCreate)
    await userCreateComponent.vm.$emit('user-created', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    })
    
    // Check if success step is shown
    expect(wrapper.text()).toContain('Success')
    expect(wrapper.text()).toContain('testuser')
    expect(wrapper.text()).toContain('test@example.com')
  })

  it('resets flow when clicking start over on success step', async () => {
    const wrapper = mount(OnboardingFlow)
    
    // Move to create account step
    await wrapper.find('button').trigger('click')
    
    // Emit user created event
    const userCreateComponent = wrapper.findComponent(UserCreate)
    await userCreateComponent.vm.$emit('user-created', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    })
    
    // Click start over button
    const startOverButton = wrapper.find('.restart-btn')
    await startOverButton.trigger('click')
    
    // Check if back to welcome step
    expect(wrapper.text()).toContain('Welcome')
  })

  it('updates progress bar correctly through steps', async () => {
    const wrapper = mount(OnboardingFlow)
    
    // Check initial progress
    let progress = wrapper.find('.progress')
    expect(progress.attributes('style')).toContain('width: 0%')
    
    // Move to create account step
    await wrapper.find('button').trigger('click')
    progress = wrapper.find('.progress')
    expect(progress.attributes('style')).toContain('width: 50%')
    
    // Move to success step
    const userCreateComponent = wrapper.findComponent(UserCreate)
    await userCreateComponent.vm.$emit('user-created', {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    })
    
    progress = wrapper.find('.progress')
    expect(progress.attributes('style')).toContain('width: 100%')
  })
})