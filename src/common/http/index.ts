import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

function init(): AxiosInstance {
  let http: AxiosInstance = axios.create();
  http.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? "http://cleanown.cn:20009"
      : "http://cleanown.cn:20009";
  http.defaults.timeout = 20000;
  http.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

  // 请求拦截
  http.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (config.headers) {
        config.headers["pv-token"] = localStorage.getItem("token") || "";
      }
      return config;
    },

    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  http.interceptors.response.use(
    function (response) {
      // 对响应数据做点什么
      if (response.data.respCode === 401) {
        localStorage.removeItem("token");
      }
      return response;
    },

    // 对响应错误做点什么
    function (error) {
      // console.log('报错1')

      if (error.response) {
        // 如果返回401 即没有权限，跳到登录页重新登录
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
      }
      return Promise.reject(error);
    }
  );

  return http;
}
class Request {
  instance: AxiosInstance;

  constructor() {
    // 构造器
    this.instance = init();
  }

  getInstance() {
    // if (!this.instance) {
    //   this.instance = new HTTP() as AxiosInstance;
    // }
    return this.instance;
  }
}

export default new Request();
