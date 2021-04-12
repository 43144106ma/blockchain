<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        Sender: <el-input v-model="sender" placeholder="please input Sender"></el-input>
      </el-col>
    </el-row>
    <p></p>
    <el-row>
      <el-col :span="6">
        Recipient: <el-input v-model="recipient" placeholder="please input Recipient"></el-input>
      </el-col>
    </el-row>
    <p></p>
    <el-row>
      <el-col :span="6">
        Amount: <el-input v-model="amount" placeholder="please input Amount"></el-input>
      </el-col>
    </el-row>
    <p></p>
    <el-button type="primary" @click="handleTransaction()">submit</el-button>
    <p v-if="message.message">message: {{message.message}}</p>
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
        message: {},
        input: "",
        sender: "",
        amount: 0,
        recipient: "",
        data:{},
    }
  },
  created() {
  },
  methods: {
    async handleTransaction(){
      const api = `http://localhost:5000/transactions/new?sender=${this.sender}&recipient=${this.recipient}&amount=${this.amount}`;
      axios.get(api).then(response => {
        const data = response;
        console.log(data)
        this.message = data.data
      })
      // await this.$api.get(api);
    }
  }
}
</script>
