<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <el-input placeholder="whole chain" v-model="input" class="input-with-select" :disabled="true">
          <el-button slot="append" icon="el-icon-search" @click="handleChain()"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <p></p>
    <div v-for="res in ress">
      <p></p>
      <tr> data:  {{res.data}}</tr>
      <tr> hash:  {{res.hash}}</tr>
      <tr> index:  {{res.index}}</tr>
      <tr> message:  {{res.message}}</tr>
      <tr> previous_hash:  {{res.previous_hash}}</tr>
      <tr> proof:  {{res.proof}}</tr>
      <tr> timestamp:  {{res.timestamp}}</tr>
      <tr> transactions:  {{res.transactions}}</tr>
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
        value: 4,
        ress: {},
        input: "",
    }
  },
  created() {
  },
  methods: {
    async handleChain(){
      const api = `http://localhost:5000/chain`;
      axios.get(api).then(response => {
        const data = response;
        this.ress = data.data.chain
      })
      // await this.$api.get(api);
    }
  }
}
</script>
