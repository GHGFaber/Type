<template>
  <div id = "container">
    <form @submit.prevent="submitForm">
      <div id = 'username' class = 'item'>
        <input type="text" id="username" v-model="formData.username" placeholder = "Username" required />
      </div>
      <div id = 'email' class = 'item'>
        <input type="email" id="email" v-model="formData.email" placeholder = "Email Address" required />
      </div>
      <div id = 'password' class = 'item'>
        <input type="password" id="password" v-model="formData.password" placeholder = "Password" required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<style src="../css/style.css"></style>

<script>
import axios from 'axios';

export default {
  name: 'SignupForm',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    async submitForm() {
      console.log('Form data:', this.formData);

      // Replace with the URL of your backend API
      const apiURL = 'http://localhost:3000/signup';

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