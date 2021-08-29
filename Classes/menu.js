class Menu {
  constructor(w, h, off) {
    this.w = w;
    this.h = h;
    this.off = off;

    this.tSlider = createSlider(0, 1, 0.5, 0);
    this.tSlider.position(25, 10);
    this.tSlider.style("width", "200px");

    this.dSlider = createSlider(0, -1, 0);
    this.dSlider.position(60, 30);
    this.dSlider.style("width", "165px");

    this.vCheckbox = createCheckbox("Show vertex", true);
    this.vCheckbox.position(10, 55);

    this.vecCheckbox = createCheckbox("Show Bezier", true);
    this.vecCheckbox.position(10, 75);

    this.mCheckbox = createCheckbox("Move controls points", false);
    this.mCheckbox.position(10, 95);

    this.vertexes = [];
  }

  draw(lastBez) {
    if (this.vecCheckbox.checked()) {
      this.drawVertex();
    }

    if (lastBez) {
      fill(255, 255, 0);
      let r = lastBez.r;
      lastBez.r = 25;
      lastBez.draw();
      lastBez.r = r;
    }
    
    fill(255);
    rect(this.off, this.off, this.w + this.off, this.h + this.off);
    fill(0);

    text("T", 15, 25);
    text(this.tSlider.value().toFixed(2), 230, 25);

    text("Degree", 15, 45);
    text(this.dSlider.value(), 230, 45);

  }

  addVertex() {
    this.vertexes = [];
    let oldValue = menu.tSlider.value();
    for (let t = 0; t <= 1.1; t += 0.01) {
      menu.tSlider.value(t);
      let lastBez = new Bezier(points).lastBez;
      if (lastBez) {
        this.vertexes.push(lastBez);
      }
    }
    menu.tSlider.value(oldValue);
  }

  drawVertex() {
    push();
    noFill();
    strokeWeight(2);
    let prev;
    this.vertexes.forEach((v, index) => {
      stroke(
        lerpColor(
          color(255, 0, 0),
          color(0, 0, 255),
          (index + 1) / this.vertexes.length
        )
      );
      if (prev) {
        beginShape();
        vertex(prev.x, prev.y);
        vertex(v.x, v.y);
        endShape();
      }
      prev = v;
    });
    pop();
  }

  inMenu(x, y) {
    return (
      x > this.off &&
      x < this.w + this.off * 2 &&
      y > this.off &&
      y < this.h + this.off * 2
    );
  }
}