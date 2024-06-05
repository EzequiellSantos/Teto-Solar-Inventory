<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async register() {

      try {

        await axios.post('http://localhost:3000/api/users/register', {
          username: this.username,
          password: this.password,
        });

        this.$router.push('/login');

      } catch (error) {

        console.error(error);
        
      }
    },
  },
};
</script>
