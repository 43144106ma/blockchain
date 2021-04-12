<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-select v-model="value" placeholder="choose the diff">
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
        <el-button type="primary" @click="handleMine()">mine</el-button>
      </el-col>
    </el-row>
    <p></p>
    <tr v-if="res.data"> data:  {{res.data}}</tr>
    <tr v-if="res.hash"> hash:  {{res.hash}}</tr>
    <tr v-if="res.index"> index:  {{res.index}}</tr>
    <tr v-if="res.message"> message:  {{res.message}}</tr>
    <tr v-if="res.previous_hash"> previous_hash:  {{res.previous_hash}}</tr>
    <tr v-if="res.proof"> proof:  {{res.proof}}</tr>
    <tr v-if="res.timestamp"> timestamp:  {{res.timestamp}}</tr>
    <tr v-if="res.transactions"> transactions:  {{res.transactions}}</tr>
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
          label: '3*0'
        }, {
          value: 4,
          label: '4*0'
        }, {
          value: 5,
          label: '5*0'
        }, {
          value: 6,
          label: '6*0'
        }, {
          value: 7,
          label: '7*0'
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
