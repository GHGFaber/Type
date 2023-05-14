<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="formData.username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async submitForm() {
      console.log('Form data:', this.formData);

      // Replace with the URL of your backend API
      const apiURL = 'http://localhost:3000/login';

      try {
        const response = await axios.post(apiURL, this.formData);

        console.log('Response data:', response.data);

        if (response.data.success) {
            // Redirect to the profile page
            window.location.href = '/profile';
        } else {
      // Show an error message
            console.error('Error submitting form:', response.data.message);
        }
        // Handle successful form submission, e.g. navigate to another page or show a success message
      } catch (error) {
        console.error('Error submitting form:', error);

        // Handle errors, e.g. show an error message
      }
    },
  },
};
</script>