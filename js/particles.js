class Particle {
  constructor(state, color) {
    this.position = state[0].copy();
    this.velocity = state[1].copy();
    this.angle = state[1].heading() + PI / 2;
    this.color = color;
    this.lifetime = 50 + Math.random() * 50;
  }

  update(dt) {
    this.position.add(p5.Vector.mult(this.velocity, dt));
    this.velocity.mult(0.99);
    this.lifetime--;
  }

  draw() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), 0.4 * this.lifetime / 100);
    push();
    translate(this.position.x, this.position.y)
    rotate(this.angle);
    translate(-this.position.x, -this.position.y)
    triangle(this.position.x - 10, this.position.y, this.position.x + 10, this.position.y, this.position.x, this.position.y - 30);
    pop();
  }
}

class ParticleSystem {
  constructor(begin, end, direction) {
    this.begin = begin.copy();
    this.end = end.copy();
    this.direction = direction;
    this.color = color(255, 240, 10);
    this.pool = []
  }

  initialState() {
    let c = Math.random();

    let position = p5.Vector.add(p5.Vector.mult(this.begin, 1 - c), p5.Vector.mult(this.end, c));

    let angle = map(c, 0, 1, -PI / 4, PI / 4);
    let velocity = createVector(this.direction * 400 * cos(angle), 400 * sin(angle));

    return [position, velocity];
  }

  reset() {
    this.pool = [];
  }

  add(n) {
    for (let i = 0; i < n; i++)
      this.pool.push(new Particle(this.initialState(), this.color))
  }

  updateSegment(begin, end) {
    this.begin = begin.copy();
    this.end = end.copy();
  }

  setColor(c) {
    this.color = c;
  }

  draw() {
    for (let i = 0; i < this.pool.length; i++) {
      this.pool[i].update(1 / 30);
      if (this.pool[i].lifetime < 0) this.pool[i] = new Particle(this.initialState(), this.color);
      this.pool[i].draw();
    }
  }
}
