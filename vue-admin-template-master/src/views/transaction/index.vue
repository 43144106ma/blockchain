<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        Sender: <el-input v-model="sender" placeholder="请输入Sender"></el-input>
      </el-col>
    </el-row>
    <p></p>
    <el-row>
      <el-col :span="6">
        Recipient: <el-input v-model="recipient" placeholder="请输入Recipient"></el-input>
      </el-col>
    </el-row>
    <p></p>
    <el-row>
      <el-col :span="6">
        Amount: <el-input v-model="amount" placeholder="请输入Amount"></el-input>
      </el-col>
    </el-row>
    <p></p>
    <el-button type="primary" @click="handleTransaction()">提交</el-button>
    <p>messag: {{message}}</p>
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
        this.message = data.data.message
      })
      // await this.$api.get(api);
    }
  }
}
</script>
