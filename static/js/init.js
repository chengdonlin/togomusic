// 初始化
import axios from 'axios'
import pubSub from 'pubsub-js'

function init() {
  console.log('初始化')
  //验证cookie是否失效，失效或不存在返回false
  setTimeout(()=>{
    axios.get('/api/verifyLogin').then(
      response=>{
        if(response.data.code === 0){
          console.log("身份验证成功!")
          console.log(response.data)
          let qqId = document.cookie.split('qqId=')[1]
          if(qqId.split(';').length > 1){
            qqId = qqId.split(';')[0]
          }
          //导航显示头像
          //在session中保存登录状态
          pubSub.publish("status",{'data':response.data,'qqId': qqId})
          sessionStorage.setItem('OnlineStatus', 'true')
        }else {
          sessionStorage.setItem('OnlineStatus', 'false')
        }
      },
      error=>{
        console.log(error.message)
      }
    )
  },1000)
}
export default init





