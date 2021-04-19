
import React,{useEffect,pageScrollTo} from 'react';
import  Taro from '@tarojs/taro';
import { View, WebView } from '@tarojs/components';
import './index.less';
import { connect } from 'react-redux';

const Index = (props)=>{
  console.log("@",props);
  const {index,dispatch} = props

  useEffect(()=>{
      dispatch({
        type:"index/test"
      })


  },[dispatch])

Taro.onAppShow(a =>{
  console.log(a);
})

const returnTop = ()=>{
  console.log(111);
  
  Taro.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })

}
  return (
    <View>
      <View 
        onClick={
          ()=>{
            Taro.navigateTo({
              url:"/pages/testAuto/index"
              // url:"/pages/pagesA/testA/index"
            })
          }
        }
      >
      {index.testStr}
      </View>
      <View>
          <View 
            onClick={
              ()=>{
                Taro.navigateTo({
                  url:"/pages/WVdemo/index"
                })
              }
            }
          >
            WebViewDemo
          </View>
       </View>
        <View onClick = {()=>{returnTop()}}>
          top
        </View>
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
