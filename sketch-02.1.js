const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const degToRad = (degrees) => {
  return (degrees / 180 * Math.PI);
};

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    let my_gradient = context.createLinearGradient(0, 0, 170, 0);

    const cx = width * 0.5;
    const cy = height * 0.5;
    
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 100;
    const radius = width * 0.3;

    for (let i = 0; i < num ; i++){
      const slice = math.degToRad(360 / num);
      const angle = slice * i * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      // arc
      context.lineWidth = 4;
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.shadowBlur = 20;
      context.shadowColor = "white";
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1,-5), slice * random.range(1,5));
      context.stroke();

      context.restore();

      // rectangle
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      // context.scale(random.range(1, 3), 1);
      context.scale(random.range(0.3, 0.6), random.range(0.3, 0.6));

      context.beginPath();
      // context.rect(-w * 0.5, -h * 0.5, w, h);
      //context.rect(-w * 0.9, random.range(0, h * 0), w, h);
      my_gradient.addColorStop(0, "teal");
      my_gradient.addColorStop(1, "white");
      context.fillStyle = my_gradient;
      context.fillRect(-w * 0.9, random.range(0, -h * 0.9), w, h);
      //context.fill();
      context.restore();

      // arc
      context.lineWidth = random.range(5, 15);

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.beginPath();
      context.shadowBlur = 20;
      context.shadowColor = "white";
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1,-5), slice * random.range(1,5));
      context.stroke();

      context.restore();

      // rectangle 
      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      //context.scale(random.range(1, 3), 1);
      context.scale(random.range(0.3, 3), random.range(0.1, 3));

      context.beginPath();
      // context.rect(-w * 0.5, -h * 0.5, w, h);
      //context.rect(w * 0.5, random.range(0, -h * 0.5), w, h);
      my_gradient.addColorStop(0, "teal");
      my_gradient.addColorStop(1, "white");
      context.fillStyle = my_gradient;
      context.shadowBlur = 20;
      context.shadowColor = "white";
      context.fillRect(w * 0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      
    }
    
  };
};

canvasSketch(sketch, settings);