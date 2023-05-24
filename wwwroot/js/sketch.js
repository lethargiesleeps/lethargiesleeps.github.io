
var CIRCLE_W = 20
var ACTUAL_W = CIRCLE_W*0.72
var MIN_W = 0
var CIRCLE_DIST = CIRCLE_W/2

var COLS = innerWidth / CIRCLE_DIST +1
var ROWS = innerHeight / CIRCLE_DIST +1
var GREATER = Math.max(innerWidth, innerHeight)


var dots = []
var beacon

function setup() {
    createCanvas(innerWidth, innerHeight)
    noStroke()

    for (var ci = 0; ci < COLS; ++ci)
        for (var ri = 0; ri < ROWS; ++ri){
            var dot = new Dot(ci * CIRCLE_DIST, ri * CIRCLE_DIST)
                  
            dots.push(dot)
        }
}

function draw() {
    background('#263238')
    beacon = new p5.Vector(mouseX || touchX, mouseY || touchY)

    fill('#F44336')
    dots.forEach(function (dot) {        
        dot.render()
    })
}

var Dot = function (posX, posY) {
    this.position = new p5.Vector(posX, posY)
}

Dot.prototype = {
    render: function () {
        var w = this.calcWidth()
        ellipse(this.position.x, this.position.y, w, w)
    },

    calcWidth: function () {
        var delta = Math.max(p5.Vector.dist(beacon, this.position), 0)

        delta *= map(
            noise(this.position.x, this.position.y, frameCount),
            0, 1,
            0.7, 1.2
        )

        if (delta > GREATER/2) {
            delta = GREATER/2
        }

        return map(delta, 0, GREATER/2, ACTUAL_W, MIN_W)
    }
}