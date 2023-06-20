import pubSub from 'pubsub-js'
let Position = {};
//计算播放器距离
(function () {
     Position.getAbsolute = function (reference, target) {
        //因为我们会将目标元素的边框纳入递归公式中，这里先减去对应的值
       let result = {
             left: -target.clientLeft,
            top: -target.clientTop
       }
       let node = target;
       while(node != reference && node != document){
            result.left = result.left + node.offsetLeft + node.clientLeft;
            result.top = result.top + node.offsetTop + node.clientTop;
            node = node.parentNode;
         }
        if(isNaN(reference.scrollLeft)){
             result.right = document.documentElement.scrollWidth - result.left;
             result.bottom = document.documentElement.scrollHeight - result.top;
         }else {
            result.right = reference.scrollWidth - result.left;
             result.bottom = reference.scrollHeight - result.top;
         }
       return result;
    }
 })();

/**
 * @function 用于计算歌曲已播放进度
 * @param {document}audio 播放器
 * @description width 计算已播放进度
 * @description speedOfProgress 网页歌曲播放进度条，已播放进度
 *
 */
function updateProgress(audio) {
  let width = audio.currentTime / audio.duration
  // let speedOfProgress = document.getElementsByClassName("player_progress__play");
    return width * 100 + "%"
}

/**
 * @function 用于改变歌曲播放时长
 * @param {document} audio 播放器
 */
function musicTime(audio) {
  let nowTime = Timeconversion(audio.currentTime)
  let totalTime = Timeconversion(audio.duration)
  return {nowTime, totalTime}
}

function Timeconversion(value) {
  let time = "";
  let h = parseInt(value / 3600);
  value %= 3600;
  let m = parseInt(value / 60);
  let s = parseInt(value % 60);
  if (h > 0) {
    time = formatTime(h + ":" + m + ":" + s);
  } else {
    time = formatTime(m + ":" + s);
  }
  return time;
}
function formatTime(value) {
  let time = "";
  let s = value.split(':');
  let i = 0
  for(i ; i< s.length - 1; i++) {
    time += s[i].length == 1 ? ("0" +s[i]) : s[i];
    time += ":";
  }
  time += s[i].length == 1 ? ("0" + s[i]) : s[i];
  return time;
}

/**
 * @function 歌曲进度条点击和拖拽功能实现
 * @param {element}audio 播放器
 */
function dragProgressDotEvent() {
  let audio = document.getElementsByTagName('audio')[0]
  console.log(audio)
  let progress = document.getElementsByClassName("player_progress")[0]
  let play = document.getElementsByClassName("player_progress__play")[0]
  play.style.pointerEvents = "none"
  document.body.onselectstart = function() {
    return false;
  }
    let position = {
    oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
    oriX: 0, // 移动开始时的x坐标
  };

  let l = 0
  // 鼠标按下时
    progress.addEventListener('mousedown', press, false)
    progress.addEventListener('touchstart', press, false)
  function press(event) {
    console.log("按下")
    l = Position.getAbsolute(document, event.target).left

    if (!audio.paused || audio.currentTime != 0) {
          //关闭歌曲事件
      pubSub.publish("clean")
      position.oriX = event.touches ? event.touches[0].clientX : event.clientX
      //绑定拖动事件
      document.addEventListener('mousemove', move,false)
      document.addEventListener('touchmove', move, false)
      // 绑定拖动结束事件
      document.addEventListener('mouseup', end, false)
      document.addEventListener('touchend', end, false)
    }
  }

  function move(event) {
    //阻止元素触发事件
    progress.style.pointerEvents = "none"
    position.oriX = event.touches ? event.touches[0].clientX : event.clientX;
    let length = ((position.oriX - l) / window.getComputedStyle(progress, null).width.replace('px', '') * 100)
    if(length <= 100){
      pubSub.publish("proWidth", length+'%')
      let pgsWidth = (position.oriX - l)
        / window.getComputedStyle(progress, null).width.replace('px', '')
      pubSub.publish('updateNowTime', Timeconversion(audio.duration * pgsWidth))
    }
  }

  function end(event) {
    console.log("结束")
    //允许元素触发事件
    progress.style.pointerEvents = null
    //移除拖动事件
    document.removeEventListener("mousemove", move)
    document.removeEventListener("touchmove", move)
    // 移除拖动结束事件
    document.removeEventListener("mouseup", end)
    document.removeEventListener("touchend", end)
    let pgsWidth = (position.oriX - l)
      / window.getComputedStyle(progress, null).width.replace('px', '')
    audio.currentTime = audio.duration * pgsWidth;
    // 开启事件
    pubSub.publish("open")
  }
}

function analysisLyric (str) {
  let s = Decode64(str)
  return parseLyric(s)
}

//Base64解码
function Decode64(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
//解析歌词字符串
function parseLyric(lyric) {
  const lrcObj = {
    ti: "",
    ar: "",
    al: "",
    by: "",
    offset: "",
    lrc: [],
  };
  /*
            [ar:艺人名]
            [ti:曲名]
            [al:专辑名]
            [by:编者（指编辑LRC歌词的人）]
            [offset:时间补偿值] 其单位是毫秒，正值表示整体提前，负值相反。这是用于总体调整显示快慢的。
        */
  const lrcArr = lyric
    .split("\n")
    .filter(function (value) {
      // 1.通过回车去分割歌词每一行,遍历数组，去除空行空格
      return value.trim() !== "";
    })
    .map(function (value) {
      // 2.解析歌词
      const line = parseLyricLine(value.trim());
      if (line.type === "lyric") {
        lrcObj.lrc.push(line.data);
      } else {
        lrcObj[line.type] = line.data;
      }
      return value.trim();
    });

  function parseLyricLine(line) {
    const tiArAlByExp = /^\[(ti|ar|al|by|offset):(.*)\]$/;
    const lyricExp = /^\[(\d{2}):(\d{2}).(\d{2})\](.*)/;
    let result;
    if ((result = line.match(tiArAlByExp)) !== null) {
      return {
        type: result[1],
        data: result[2],
      };
    } else if ((result = line.match(lyricExp)) !== null) {
      return {
        type: "lyric",
        data: {
          time: {
            m: result[1],
            s: result[2],
            ms: result[3],
          },
          lyric: result[4].trim(),
        },
      };
    }
  }
  return lrcObj;
}

// module.exports = {
//   updateProgress, musicTime, dragProgressDotEvent
// }
export default {
  updateProgress, musicTime, dragProgressDotEvent, analysisLyric
}


