class Bezier {
  constructor(points) {
    this.segments = [];
    let prev;
    let newPoints = [];
    points.forEach((p) => {
      if (prev) {
        this.segments.push(new Segment(prev, p));
        newPoints.push(this.lerp(prev, p, menu.tSlider.value()));
      }
      prev = p;
    });
    if (points.length > 1) {
      this.bez = new Bezier(newPoints);
      this.lastBez = this.bez.lastBez;
    } else {
      this.bez = prev;
      this.lastBez = this.bez;
    }
  }

  draw(degree) {
    if (degree > 0) {
      fill(
        lerpColor(
          color(255, 255, 0),
          color(0, 255, 255),
          this.segments.length / points.length
        )
      );
      this.segments.forEach((seg) => seg.draw(degree));
    }
    if (this.bez) {
      this.bez.draw(degree-1);
    }
  }

  lerp(p1, p2, t) {
    return new Point((1 - t) * p1.x + t * p2.x, (1 - t) * p1.y + t * p2.y);
  }
}
