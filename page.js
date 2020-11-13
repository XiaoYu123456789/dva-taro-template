/**
 * pages模版快速生成脚本,执行命令 npm run temp `文件名`
 */
const fs = require('fs');
const dirName = process.argv[2];
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：npm run temp test');
  process.exit(0);
}
// 页面模版
const indexTep = `import React,{useEffect} from 'react';
import Taro from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { connect } from 'react-redux';
import './index.less';

const ${titleCase(dirName)} = props =>{
    const {${dirName},loading} = props;
      useEffect(() => {
        console.log(props)
      }, [])
    return (
           <View className="${dirName}-page">
             <Text>正如你所见这是你的${dirName}页面</Text>
           </View>
           )
}
//全局样式继承，默认关闭
${titleCase(dirName)}.options = {
  addGlobalClass: false
}

function mapStateToProps({${dirName} ,loading }) {
  return {
    ${dirName},
    loading
  };
}

export default connect(mapStateToProps)(${titleCase(dirName)})
`;
// less文件模版
const lessTep = `.${dirName}-page {
}
`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

export default {
  namespace: '${dirName}',
  state: {
      keai:'测试数据666'
  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(${dirName}Api.demo, {});
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
`;


// service页面模版
const serviceTep = `import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};
`;

const indexConfigTep = `export default {
  navigationBarTitleText: '${dirName}', //设置标题名称
  navigationStyle: default , //	导航栏样式，仅支持以下值：default 默认样式；custom 自定义导航栏，只保留右上角胶囊按钮
  //还有一些常见的页面设置需要自行翻阅官方API文档
}
`;

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.tsx', indexTep);
fs.writeFileSync('index.less', lessTep);
fs.writeFileSync('model.ts', modelTep);
fs.writeFileSync('service.ts', serviceTep);
fs.writeFileSync('index.config.ts', indexConfigTep);
console.log(`模版${dirName}已创建,请手动按照格式增加到./src/models`);
function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}
process.exit(0);