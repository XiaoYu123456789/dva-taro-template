import { demo } from "./service";

export default {
    namespace: 'index',
    state: {
        testStr:"test",
        testArr:[1,3,4]
    },
    effects: {
      *test({payload, callback},{call,update,select}){
        yield call(demo);
      },
    },
    reducers: {

    }
}