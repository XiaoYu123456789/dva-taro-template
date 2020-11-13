import Taro from "@tarojs/taro";


export const loading = {
  show: (title = '加载中...', mask = false) => {
    Taro.showLoading({
      title,
      mask
    })
  },
  hide: () => {
    Taro.hideLoading();
  }
}

export const localStorage = {
  getItem: key => {
    try {
      var value = Taro.getStorageSync(key);
      if (value) {
        return value;
      }
    } catch (err) {
      return err;
    }
  },
  setItem: (key, data) => {
    Taro.setStorageSync(key, data);
  },
  removeItem: key => {
    try {
      Taro.removeStorageSync(key);
    } catch (e) {
      // Do something when catch error
    }
  },
  clear: () => {
    try {
      Taro.clearStorageSync();
    } catch (e) {
      // Do something when catch error
    }
  }
};