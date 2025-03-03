import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserCreate from '../UserCreate.vue'

describe('UserCreate', () => {
  it('renders properly', () => {
    const wrapper = mount(UserCreate)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('updates form data when inputs change', async () => {
    const wrapper = mount(UserCreate)
    
    const usernameInput = wrapper.find('input[type="text"]')
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await usernameInput.setValue('testuser')
    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('password123')

    expect(wrapper.vm.user.username).toBe('testuser')
    expect(wrapper.vm.user.email).toBe('test@example.com')
    expect(wrapper.vm.user.password).toBe('password123')
  })

  it('emits user-created event with form data on submit', async () => {
    const wrapper = mount(UserCreate)
    const testUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    }

    const usernameInput = wrapper.find('input[type="text"]')
    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await usernameInput.setValue(testUser.username)
    await emailInput.setValue(testUser.email)
    await passwordInput.setValue(testUser.password)

    await wrapper.find('form').trigger('submit')

    const emittedEvents = wrapper.emitted('user-created')
    expect(emittedEvents).toBeTruthy()
    expect(emittedEvents[0][0]).toEqual(testUser)
  })

  it('validates required fields before submission', async () => {
    const wrapper = mount(UserCreate)
    
    // Try to submit without filling required fields
    await wrapper.find('form').trigger('submit')
    
    // Check that no event was emitted
    expect(wrapper.emitted('user-created')).toBeFalsy()
  })
})