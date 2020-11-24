import React,{useEffect} from 'react';
import Taro from '@tarojs/taro';

import { View, WebView } from '@tarojs/components';
import { connect } from 'react-redux';
import './index.less';

const Wvdemo = props =>{
    const {WVdemo,loading} = props;

    const handleMessage = ()=>{
        console.log(123);
        
        
    }

    useEffect(() => {
        console.log("@",props)

        wx.miniProgram.getEnv(
          function(res) { console.log(res,"@") }
          )

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
           <View className='WVdemo-page'>
           <View>加载动画: Loading.....</View>
              <WebView src='https://www.sa.swcare.com.cn/#/'
                onMessage={handleMessage}
              />
           </View>
           )
}
//全局样式继承，默认关闭
Wvdemo.options = {
  addGlobalClass: false
}

function mapStateToProps({WVdemo ,loading }) {
  return {
    WVdemo,
    loading
  };
}

export default connect(mapStateToProps)(Wvdemo)
