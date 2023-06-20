function createLoginPage () {
  console.log('正在构造登录页面....')
  let div = document.createElement('div')
  let structure = document.createElement('div')
  let mask = document.createElement('div')
  let body = document.getElementsByTagName('body')[0]
  let iframe = document.createElement('iframe')
  div.className = 'qq_login'
  mask.className = 'mask'
  structure.className = 'dialog'
  iframe.name = 'iframeName'
  iframe.frameBorder = 'no'
  iframe.style.cssText = 'width:100%; height:100%; overflow: hidden'
  iframe.src = '/login.html'
  body.style.cssText = 'position: relative; width: calc(100% - 8px); overflow: hidden;'
  structure.style.cssText = 'position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 1050; outline: 0;'
  mask.style.cssText = 'position: fixed; top: 0; right: 0; left: 0; bottom: 0; height: 100%; background: rgba(0,0,0,.2); z-index: 1050;'
  body.appendChild(div)
  div.appendChild(mask)
  div.appendChild(structure)
  structure.appendChild(iframe)
}

function deleteLoginPage () {
  console.log('正在清除登录页面....')
  let p = window.parent
  console.log(window)
  p.document.getElementsByClassName('qq_login')[0].remove()
  p.document.getElementsByTagName('body')[0].style.cssText = ''
}

function getPlayTime(t){
  let m = parseInt(parseInt(t) / 60)
  let s = parseInt(parseInt(t) % 60)
  if (m < 10) m = "0" + m
  if (s < 10) s = "0" + s
  return m+":"+s
}


module.exports = {
  createLoginPage, deleteLoginPage, getPlayTime
}
