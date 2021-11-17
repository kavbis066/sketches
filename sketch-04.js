const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const animate = () => {
  console.log('kaveri');
  requestAnimationFrame(animate);
}

// animate();

const sketch = ({width, height }) => {
  const agents = [];

  for (let i = 0; i < 30; i++){
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++){
      const agent = agents[i];

      for(let j = i + 2; j < agents.length; j++){
        const other = agents[j];

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
        context.strokeStyle = 'white';
      }
    }

    agents.forEach(agent => {
      agent.update(); 
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y){
    this.pos = new Vector(x, y); // position
    this.vel = new Vector(random.range(-1, 1), random.range(-1,1));
    this.radius = random.range(4, 10);
  }

  bounce(width, height){
    if (this.pos.x <= 0 || this.pos.x >= width){
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height){
      this.vel.y *= -1;
    } 
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.fillStyle = 'teal';

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI*2);
    context.fill();
    context.stroke();

    context.restore();
  }
}