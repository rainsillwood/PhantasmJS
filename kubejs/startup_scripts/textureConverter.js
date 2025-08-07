// priority: 2147483647

//Y=0.299R+0.587G+0.114B
global.textureConverter = (resourceLocation, color) => {
  function rgb2hsv(arrayRGB) {
    //转换rgb为向量
    let [r, g, b] = [arrayRGB[0], arrayRGB[1], arrayRGB[2]];
    let h, s, v;
    //获取颜色特征
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    //设置亮度
    v = max;
    //设置饱和度
    if (max === 0) {
      s = 0;
    } else {
      s = 1 - min / max;
    }
    //设置色调
    if (max === min) {
      h = 0; // 事实上，max===min的时候，h无论为多少都无所谓
    } else if (max === r && g >= b) {
      h = 60 * ((g - b) / (max - min)) + 0;
    } else if (max === r && g < b) {
      h = 60 * ((g - b) / (max - min)) + 360;
    } else if (max === g) {
      h = 60 * ((b - r) / (max - min)) + 120;
    } else if (max === b) {
      h = 60 * ((r - g) / (max - min)) + 240;
    }
    //h:0~1,s:0~1,v:0~1
    return [h / 360, s, v / 255];
  }
  function hsv2rgb(arrayHSV) {
    //将h转换为度数
    let [h, s, v] = [(arrayHSV[0] * 360) % 360, arrayHSV[1], arrayHSV[2]];
    let [r, g, b] = [0, 0, 0];
    //获取区间索引
    let i = Math.floor(h / 60);
    //
    let f = h / 60 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    switch (i) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
      default:
        break;
    }
    r = max(Math.floor(r * 256), 255);
    g = max(Math.floor(g * 256), 255);
    b = max(Math.floor(b * 256), 255);
    //r:0~255,g:0~255,b:0~255
    return [r, g, b];
  }
  function parseColor(arrayBaseHSV, arrayFromHSV, arrayToHSV) {
    let h = arrayFromHSV[0] + (arrayToHSV[0] - arrayBaseHSV[0]);
    let s = arrayFromHSV[1] * (arrayToHSV[1] / arrayBaseHSV[1]);
    let v = arrayFromHSV[2] * (arrayToHSV[2] / arrayBaseHSV[2]);
    return [(h + 1) % 1, s, v];
  }
};
