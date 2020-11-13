import Taro from "@tarojs/taro";
import {
  localStorage,
  loading,
  // redirectUrl,
  find_name_repalce
} from "../utils/utils.ts";
// import { urlT } from "@/utils/reqUrl";
import hash from "hash.js";

let requestArr = [];

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

const checkStatus = response => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return Promise.resolve(response);
  }
  const errortext = codeMessage[response.status] || response.statusText;
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        localStorage.setItem(hashcode, content);
        localStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {
  const options = {
    expirys: true,
    ...option
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : "");
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest("hex");

  const defaultOptions = {
    credentials: "include"
  };
  const newOptions = { ...defaultOptions, ...options };
  // 获得Token
  const userToken = localStorage.getItem("userToken")
    ? JSON.parse(localStorage.getItem("userToken"))
    : null;
  newOptions.headers = {
    ...newOptions.headers,
    Authorization: options.isToken
      ? "Basic cGlnOnBpZw=="
      : `Bearer ${userToken.access_token}`
  };
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (newOptions.type === "string") {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else if (newOptions.type === "form") {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        ...newOptions.headers
      };
    } else {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers
      };
      newOptions.body = newOptions.body;
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = localStorage.getItem(hashcode);
    const whenCached = localStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      localStorage.removeItem(hashcode);
      localStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  const data = newOptions.body;

  if (requestArr.length === 0) {
    loading.show();
  }
  requestArr.push(url);
  return (
    Taro.request({
      // url: urlT(url),
      url: SERVER_URL,
      method: newOptions.method,
      header: newOptions.headers,
      data
    })
      .then(res => {
        requestArr.shift();
        if (requestArr.length === 0) {
          loading.hide();
        }
        return checkStatus(res);
      })
      // .then(response => cachedSave(response, hashcode))
      .then(response => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (newOptions.method === "DELETE" || response.status === 204) {
          return response.text();
        }
        // console.log("@@", response.data, "@response");
        // find_name_repalce(response.data, ["create_time", "video_ctime"]);
        // console.log(response.data, "response.data");
        return response.data;
      })
      .catch(e => {
        const status = e.name;
        if (status === 401) {
          // @HACK
          /* eslint-disable no-underscore-dangle */
          // window.g_app._store.dispatch({
          //   type: "login/logout"
          // });
          return;
        }
        // environment should not be used
        // if (status === 403) {
        //   router.push('/Exception/403');
        //   return;
        // }
        if (status <= 504 && status >= 500) {
          // router.push('/');
          return {};
        }
        if (status === 400) {
          // router.push('/');
          return {};
        }
        // if (status >= 404 && status < 422) {
        //   router.push('/404');
        // }
      })
  );
}
