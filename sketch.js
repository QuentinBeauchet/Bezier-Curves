var menu;
var points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  menu = new Menu(250, 100, 10);
}

function draw() {
  clear();
  let bezierCurve = new Bezier(points);
  bezierCurve.draw(menu.dSlider.value());
  menu.draw(bezierCurve.lastBez);
  if(menu.mCheckbox.checked()){
    fill(255,0,0);
    points.forEach((p) => {
      circle(p.x,p.y,15);
    });
  }
}

function mousePressed() {
  if (!menu.inMenu(mouseX, mouseY)) {
    if (menu.mCheckbox.checked()) {
      for (let i = 0; i < points.length; i++) {
        let p = points[i];
        if (p.clicked(mouseX, mouseY)) {
          menu.draggedPoint = i;
          return;
        }
      }
    } else {
      points.push(new Point(mouseX, mouseY));
      let newMax = parseInt(menu.dSlider.elt.max) + 1;
      menu.dSlider.elt.max = newMax;
      menu.addVertex();
    }
  }
}

function mouseDragged() {
  if (menu.draggedPoint != undefined) {
    points[menu.draggedPoint] = new Point(mouseX, mouseY);
    menu.addVertex();
  }
}

function mouseReleased() {
  menu.draggedPoint = undefined;
}
