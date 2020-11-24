/**
 * pages模版快速生成脚本,执行命令 npm run createPage [父文件夹名] `文件名`
 */
const fs = require('fs');

const error_test = '示例：npm run createPage [父文件夹名] test';
const font_blue = "\x1B[36m%s\x1B[0m";
const font_red = "\x1B[31m%s\x1B[0m";
const font_green = "\x1B[32m%s\x1B[0m";

let dirCatalog = null ;
let dirName = null;
if(process.argv.length >4){
  console.log(font_red,"ERROR: 参数错误");
  console.log(font_blue,error_test);
  process.exit(0);
}

if(process.argv.length === 4){
  dirName = process.argv[3];
  dirCatalog = process.argv[2] +"/";
}else{
  dirName = process.argv[2];
}

if (!dirName) {
  console.log( font_red,'ERROR: 文件夹名称不能为空！');
  console.log(font_blue,error_test);
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
import dirName from './page';
import dirName from './page';

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
  navigationStyle: 'default' , //	导航栏样式，仅支持以下值：default 默认样式；custom 自定义导航栏，只保留右上角胶囊按钮
  //还有一些常见的页面设置需要自行翻阅官方API文档
}
`;


if(dirCatalog){
  const  path_way =  `./src/pages/${dirCatalog}`
  if(!fs.existsSync(path_way)){
     fs.mkdirSync(`./src/pages/${dirCatalog}`);
  }
  try {
      fs.mkdirSync(`./src/pages/${dirCatalog}${dirName}`); // mkdir $1
      process.chdir(`./src/pages/${dirCatalog}${dirName}`); // cd $1
  } catch (error) {
    console.log(font_red,"ERROR: 目录下有同名文件，创建失败");
    process.exit(0);
  }
}else{
  try {
      fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
      process.chdir(`./src/pages/${dirName}`); // cd $1
  } catch (error) {
    console.log(font_red,"ERROR: 目录下有同名文件，创建失败");
    process.exit(0);
  }
}


fs.writeFileSync('index.tsx', indexTep);
fs.writeFileSync('index.less', lessTep);
fs.writeFileSync('model.ts', modelTep);
fs.writeFileSync('service.ts', serviceTep);
fs.writeFileSync('index.config.ts', indexConfigTep);
console.log(font_green,` SUCCESS: 模版 ${dirCatalog}${dirName} 已创建,请手动按照格式增加到./src/models`);
function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}
process.exit(0);