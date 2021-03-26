let watermark = {}

let id = '1.23452384164.123412416';
let setWatermark = (str, str2) => {

  if (document.getElementById(id) !== null) {
    return
  }

  //创建一个画布
  let can = document.createElement('canvas');
  //设置画布的长宽
  can.width = 160;
  can.height = 120;

  let cans = can.getContext('2d');
  //旋转角度
  cans.rotate(-13 * Math.PI / 180);
  cans.font = '16px Vedana';
  //设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = 'rgba(200, 200, 200, 0.2)';
  //设置文本内容的当前对齐方式
  cans.textAlign = 'left';
  //设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle';
  //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(str, 30, 40);
  cans.fillText(str2, 30, 65);

  let div = document.createElement('div');
  div.id = id;
  div.style.pointerEvents = 'none';
  div.style.top = '70px';
  div.style.left = '0px';
  div.style.position = 'fixed';
  div.style.zIndex = '100000';
  div.style.width = document.documentElement.clientWidth - 50 + 'px';
  div.style.height = document.documentElement.clientHeight - 150 + 'px';
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
  document.body.appendChild(div);
}

watermark.set = (str, str2) => {
  let id = setWatermark(str, str2)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str, str2)
    }
  }, 500)
  
  window.onresize = () => {
    setWatermark(str, str2)
  }
}

// 清除水印
watermark.clear = () => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
}

export default watermark;
