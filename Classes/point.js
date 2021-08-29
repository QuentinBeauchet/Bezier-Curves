class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
  }

  draw() {
    circle(this.x, this.y,this.r);
  }

  isEqual(point) {
    return this.x == point.x && this.y == point.y;
  }

  clicked(x, y) {
    return (x - this.x) ** 2 + (y - this.y) ** 2 < this.r ** 2;
  }
}