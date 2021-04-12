import axios from 'axios';
import qs from 'qs';

export default class API {
  constructor(vue) {
    this.$notify = vue.prototype.$notify;
    this.$loading = vue.prototype.$loading;
    this.$message = vue.prototype.$message;
    this.jwt = '';

    // 指定 params 中 array 格式的字段在序列化成 querystring 时所采用的的格式
    // FastApi 目前采用不含中括号的传参格式，如 ?include=aaa&include=bbb
    axios.defaults.paramsSerializer = params => qs.stringify(params, { indices: false });
  }

  static setJwt(jwt) {
    axios.defaults.headers.common['X-User-Token'] = jwt || '';
  }

  ajax(url, data, option) {
    const { method, target } = option;
    const requestConfig = {
      ...option,
      url,
    };
    if (method.toLowerCase() === 'get') {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }

    return new Promise((resolve, reject) => {
      let loading = null;
      if (target) {
        loading = this.$loading({ target: target.$el });
      }
      axios.request(requestConfig)
        .then(response => {
          const {
            data: {
              success, code, message, data: resData,
            },
          } = response;
          if (success && code === 200) {
            resolve(resData);
            if (method.toLowerCase() !== 'get') {
              this.$message({
                showClose: true,
                message: message || '提交成功',
                type: 'success',
              });
            }
          } else {
            // this.$message.error({
            //   title: `${code}`,
            //   message,
            //   duration: 5000,
            // });
          }
        })
        .catch(err => {
          const { response, status } = err;
          // this.$message.error({
          //   title: status || '未知错误',
          //   message: (response.data && response.data.message) || response.message,
          //   duration: 5000,
          // });
          reject(err);
        })
        .finally(() => {
          if (loading) {
            loading.close();
            loading = null;
          }
        });
    });
  }

  get(url, params, option) {
    const opt = option || {};
    return this.ajax(url, params, { ...opt, method: 'get' });
  }

  post(url, data, option) {
    const opt = option || {};
    return this.ajax(url, data, { ...opt, method: 'post' });
  }

  put(url, data, option) {
    const opt = option || {};
    return this.ajax(url, data, { ...opt, method: 'put' });
  }

  patch(url, data, option) {
    const opt = option || {};
    return this.ajax(url, data, { ...opt, method: 'patch' });
  }

  delete(url, data, option) {
    const opt = option || {};
    return this.ajax(url, data, { ...opt, method: 'delete' });
  }
}
