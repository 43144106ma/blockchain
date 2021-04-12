<template>
  <div class="app-container">
    <el-row>
      <el-col :span="1">
        Nodes:
      </el-col>
      <el-col :span="4">
       <el-input v-model="nodes" placeholder="请输入Sender"></el-input>      &nbsp;
      </el-col>
    </el-row>
    <p></p>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="handleMine()">注册此节点</el-button>
      </el-col>
    </el-row>
    <p></p>
    <tr> message:  {{res.message}}</tr>
    <tr> total_nodes:  {{res.total_nodes}}</tr>
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
      res: {},
      nodes: "",
    }
  },
  created() {
  },
  methods: {
    async handleMine(){
      const api = `http://localhost:5000/nodes/register?nodes=${this.nodes}`;
      axios.get(api).then(response => {
        const data = response;
        this.res = data.data
      })
      // await this.$api.get(api);
    }
  }
}
</script>
