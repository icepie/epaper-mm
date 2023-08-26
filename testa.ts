import rough from 'roughjs';
import { createCanvas } from '@napi-rs/canvas';
import { JSDOM } from 'jsdom';

// 创建一个虚拟的 DOM 环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
globalThis.document = dom.window.document;

// 创建一个 Canvas 对象
const canvas = createCanvas(400, 300);
const context = canvas.getContext('2d');

context.fillStyle = 'white';

context.fillRect(0, 0, 400, 300);

// 在 Canvas 上绘制 Rough.js 图形
const rc = rough.canvas(canvas as any);
rc.rectangle(50, 50, 300, 200);

rc.circle(200, 200, 50, {
  fill: 'black',
  fillWeight: 3,
  strokeWidth: 3,
  hachureAngle: 60,
  hachureGap: 2,
  roughness: 2,
});

rc.line(50, 50, 100, 50, {
  stroke: 'red',
  strokeWidth: 2,
});

// 将 Canvas 图像保存为文件
import fs from 'fs';

const buff = canvas.toBuffer('image/png');

fs.writeFileSync('test.png', buff);

// 清理全局环境
delete globalThis.document;

console.log('Generating Rough.js image...');
