const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.01;

    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.03;
    const ix = width * 0.17;
    const iy = height * 0.17;

    const offset = width * 0.02;

    let x, y;

    for(let i=0; i<5; i++){
        for (let j=0;j<5;j++){
            x = ix + (w+gap) * i;
            y= iy + (w+gap) * j;
            
            context.beginPath()
            context.strokeRect(x, y, w, h);
            context.stroke();
            context.strokeStyle = 'white';

            if(Math.random() > 0.5){
                context.beginPath();
                context.strokeRect(x + offset / 2, y + offset / 2, w - offset, h - offset);
                context.stroke();
                context.strokeStyle = 'white';
            }
        }
    }
  };
};

canvasSketch(sketch, settings);
