<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="handleMine()">点此验证节点</el-button>
      </el-col>
    </el-row>
    <p></p>
    <tr> message:  {{res.message}}</tr>
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
        res: {},
    }
  },
  created() {
  },
  methods: {
    async handleMine(){
      const api = `http://localhost:5000/nodes/resolve`;
      axios.get(api).then(response => {
        const data = response;
        this.res = data.data
      })
      // await this.$api.get(api);
    }
  }
}
</script>
