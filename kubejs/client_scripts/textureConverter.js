// priority: 1

ClientEvents.generateAssets('last', (event) => {
  global.listTexture.forEach((option) => {
    let targetTexture = undefined;
    for (let j = 0; j < option.layers.length; j++) {
      let layer = option.layers[j];
      let [originTextureId, color] = [layer.path, layer.color];
      let originTexture = event.loadTexture(originTextureId);
      let [height, width] = [originTexture.height, originTexture.width];
      if (height != width || width == 0) {
        console.log(originLocation.toString() + '无法读取');
        continue;
      }
      let convertTexture;
      if (color == undefined) {
        convertTexture = originTexture.copy();
      } else {
        convertTexture = parseImage(originTexture, color);
      }
      if (targetTexture == undefined) {
        targetTexture = convertTexture.copy();
      } else {
        if (targetTexture.pixels.length != convertTexture.pixels.length) {
          console.log('图像尺寸不符:' + option.location);
          continue;
        }
        targetTexture = combineImage(targetTexture, convertTexture);
      }
    }
    event.texture(option.location, targetTexture);
  });
});
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
  r = Math.min(Math.floor(r * 256), 255);
  g = Math.min(Math.floor(g * 256), 255);
  b = Math.min(Math.floor(b * 256), 255);
  //r:0~255,g:0~255,b:0~255
  return [r, g, b];
}
function parseColor(arrayBaseHSV, arrayFromHSV, arrayToHSV) {
  let h = arrayFromHSV[0] + (arrayToHSV[0] - arrayBaseHSV[0]);
  let s = arrayFromHSV[1] * (arrayToHSV[1] / arrayBaseHSV[1]);
  let v = arrayFromHSV[2] * (arrayToHSV[2] / arrayBaseHSV[2]);
  return [(h + 1) % 1, s, v];
}
function parseImage(originTexture, color) {
  let [Hmax, Smax, Vmax] = [0, 0, 0]; //初始化特征色彩
  let originHSV = []; //初始化原图HSV数组
  let convertTexture = originTexture.copy();
  //将原图转化为HSV，并找出特征色彩
  for (let i = 0; i < originTexture.pixels.length; i++) {
    let originPixel = originTexture.pixels[i];
    let Ao = (originPixel >> 24) & 0xff;
    let Ro = (originPixel >> 16) & 0xff;
    let Go = (originPixel >> 8) & 0xff;
    let Bo = originPixel & 0xff;
    let [Ho, So, Vo] = rgb2hsv([Ro, Go, Bo]);
    if (Smax + Vmax < So + Vo) {
      Hmax = Ho;
      Smax = So;
      Vmax = Vo;
    }
    originHSV.push([Ho, So, Vo, Ao]);
  }
  //将目标色彩转化为HSV
  let colorHSV = rgb2hsv([(color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff]);
  //转化颜色
  for (let k = 0; k < originHSV.length; k++) {
    let fromClolor = originHSV[k];
    if (fromClolor[3] == 0) {
      convertTexture.pixels[k] = 0;
    } else {
      let A = fromClolor.pop();
      let toColorHSV = parseColor([Hmax, Smax, Vmax], fromClolor, colorHSV);
      let [R, G, B] = hsv2rgb(toColorHSV);
      convertTexture.pixels[k] = (R << 16) | (G << 8) | B | (A << 24);
    }
  }
  return convertTexture;
}
function combineColor(baseRGBA, frontRGBA) {
  let [R, G, B, A] = [0, 0, 0, 0];
  let [Rc, Gc, Bc, Ac] = frontRGBA;
  let [Rt, Gt, Bt, At] = baseRGBA;
  let Ax = 1 - Ac / 255;
  A = Ac + At * Ax;
  if (A != 0) {
    R = Math.floor((Ac * Rc + At * Rt * Ax) / A);
    G = Math.floor((Ac * Gc + At * Gt * Ax) / A);
    B = Math.floor((Ac * Bc + At * Bt * Ax) / A);
  }
  return [R, G, B, A];
}
function combineImage(baseTexture, frontTexture) {
  let convertTexture = baseTexture.copy();
  for (let i = 0; i < baseTexture.pixels.length; i++) {
    let basePixel = baseTexture.pixels[i];
    let frontPixel = frontTexture.pixels[i];
    let baseRGBA = [(basePixel >> 16) & 0xff, (basePixel >> 8) & 0xff, basePixel & 0xff, (basePixel >> 24) & 0xff];
    let frontRGBA = [(frontPixel >> 16) & 0xff, (frontPixel >> 8) & 0xff, frontPixel & 0xff, (frontPixel >> 24) & 0xff];
    let [R, G, B, A] = combineColor(baseRGBA, frontRGBA);
    convertTexture.pixels[i] = (R << 16) | (G << 8) | B | (A << 24);
  }
  return convertTexture;
}
