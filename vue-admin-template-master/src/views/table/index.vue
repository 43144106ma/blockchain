<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-select v-model="value" placeholder="请选择难度">
          <el-option
            v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          </el-option>
        </el-select>
        &nbsp;
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleMine()">挖矿</el-button>
      </el-col>
    </el-row>
    <p></p>
    <tr> data:  {{res.data}}</tr>
    <tr> hash:  {{res.hash}}</tr>
    <tr> index:  {{res.index}}</tr>
    <tr> message:  {{res.message}}</tr>
    <tr> previous_hash:  {{res.previous_hash}}</tr>
    <tr> proof:  {{res.proof}}</tr>
    <tr> timestamp:  {{res.timestamp}}</tr>
    <tr> transactions:  {{res.transactions}}</tr>
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
      options: [{
          value: 3,
          label: '3位验证'
        }, {
          value: 4,
          label: '4位验证'
        }, {
          value: 5,
          label: '5位验证'
        }, {
          value: 6,
          label: '6位验证'
        }, {
          value: 7,
          label: '7位验证'
        }],
        value: 4,
        res: {},
    }
  },
  created() {
  },
  methods: {
    async handleMine(){
      const api = `http://localhost:5000/mine?diff=${this.value}`;
      axios.get(api).then(response => {
        const data = response;
        this.res = data.data
      })
      // await this.$api.get(api);
    }
  }
}
</script>
