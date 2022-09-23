<template>
  <div class="container">
    <h1>Between</h1>
    <button type="button" class="btn btn-primary" @click="count++">{{ msg }}</button>
    <p><u>The count is</u>: {{ count }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PingPong',
  data() {
    return {
      msg: '',
      count: 5,
    };
  },
  methods: {
    getMessage() {
      const path = 'http://localhost:5000/ping';
      axios.get(path)
        .then((res) => {
          this.msg = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
    this.getMessage();
  },
};
</script>
