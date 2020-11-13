import * as testAutoApi from './service';

export default {
  namespace: 'testAuto',
  state: {
      keai:'测试数据666'
  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(testAutoApi.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
