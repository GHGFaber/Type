<template>
  <div>
    <div id = "container">
      <form @submit.prevent="submitForm">
        <div id = 'username' class = 'item'>
          <input type="text" id="username" v-model="formData.username" placeholder = "Username" required />
        </div>
        <div id = 'password' class = 'item'>       
          <input type="password" id="password" v-model="formData.password" placeholder = "Password" required />
        </div>
        <div id = "button">
          <button id = "loginBTN" class = "btn btn-dark" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="../css/login.css"></style>

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
            localStorage.setItem('token', response.data.token);
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