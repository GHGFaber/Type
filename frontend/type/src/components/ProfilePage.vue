<template>
 <div>
  <h2> Hello {{username}} ! <br> 
        This is your best WPM: {{WPM}}</h2> 
 </div>
</template>

<style src="../css/profile.css"></style>

<script>
import jwt_decode from 'jwt-decode';

export default {
  name: 'ProfilePage',
  data() {
    return {
      username: null, 
      WPM: null
    };
  },
  methods: {
    getUsername() {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      const decoded = jwt_decode(token);
      return decoded.username;
    },
    getWPM() {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      const decoded = jwt_decode(token);
      return decoded.WPM;
    }
  },
  created() {
    this.username = this.getUsername();
    this.WPM = this.getWPM();
  }
}
</script>