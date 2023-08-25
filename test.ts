import Jimp from 'jimp';
import fs from 'fs';

import { createCanvas } from '@napi-rs/canvas';

const main = async () => {
  const canvas = createCanvas(300, 320);
  const ctx = canvas.getContext('2d');

  ctx.lineWidth = 10;
  ctx.strokeStyle = '#03a9f4';
  ctx.fillStyle = '#03a9f4';

  // Wall
  ctx.strokeRect(75, 140, 150, 110);

  // Door
  ctx.fillRect(130, 190, 40, 60);

  // Roof
  ctx.beginPath();
  ctx.moveTo(50, 140);
  ctx.lineTo(150, 60);
  ctx.lineTo(250, 140);
  ctx.closePath();
  ctx.stroke();

  const png = await canvas.encode('png');

  fs.writeFile('test.png', png, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  //
  const image = await Jimp.read('test.png');
  image.resize(400, 300);

  const data = await image.getBufferAsync(Jimp.MIME_BMP);

  //  保存 data 到文件

  fs.writeFile('test.bmp', data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
};

main();
