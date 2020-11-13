import React,{useEffect} from 'react';
import Taro from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { connect } from 'react-redux';
import './index.less';

const Testauto = props =>{
    const {testAuto,loading} = props;
      useEffect(() => {
        console.log(props)
      }, [])
    return (
           <View className="testAuto-page">
             <Text>正如你所见这是你的testAuto页面</Text>
           </View>
           )
}

function mapStateToProps({testAuto ,loading }) {
  return {
    testAuto,
    loading
  };
}

export default connect(mapStateToProps)(Testauto)
