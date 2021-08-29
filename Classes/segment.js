class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  draw(degree) {
    if (degree > 0) {
      line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
      if (menu.vCheckbox.checked()) {
        this.p1.draw();
        this.p2.draw();
      }
    }
  }
}
