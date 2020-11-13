
import React,{useEffect} from 'react';
import  Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.less';
import { connect } from 'react-redux';

const Index = (props)=>{
  console.log("@",props);
  const {index,dispatch} = props

  useEffect(()=>{
      dispatch({
        type:"index/test"
      })
  },[])
  return (
    <View 
      onClick={
        ()=>{
          Taro.navigateTo({
            url:"/pages/testAuto/index"
            // url:"/pages/pagesA/testA/index"
          })
        }
      }>
    {index.testStr}
    </View>
  )
}
Index.options={
  addGlobalClass:true
}

/** 
 *  连接Dva
 *  @params {参数1,参数2,参数3 ....}
 */
function mapStateToProps({ index }) {
  return {
    index
  };
}
export default  connect(mapStateToProps)(Index);
