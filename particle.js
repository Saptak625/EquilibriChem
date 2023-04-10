particleColors = [[180, 0, 0], [180, 180, 0], [90, 0, 180], [0, 180, 180]];

class Particle {
    constructor(sketch, type) {
        this.sketch = sketch;
        this.radius = 8;
        this.pos = this.sketch.createVector(this.sketch.random(this.radius, this.sketch.width - this.radius), this.sketch.random(this.radius, this.sketch.height - this.radius));
        this.temp = parseInt(document.getElementById('sliderTemp').value) / 100;
        this.vel = this.sketch.createVector(this.sketch.random(-this.temp, this.temp), this.sketch.random(-this.temp, this.temp));
        this.type = type;
    }

    update() {
        this.pos.add(this.vel);
    }

    display() {
        this.sketch.noStroke();
        let c = particleColors[this.type.charCodeAt(0) - 65];
        this.sketch.fill(c[0], c[1], c[2]);
        this.sketch.ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    checkEdges() {
        if (this.pos.x - this.radius < 0 || this.pos.x + this.radius > this.sketch.width) {
            this.vel.x *= -1;
        }
        if (this.pos.y - this.radius < 0 || this.pos.y + this.radius > this.sketch.height) {
            this.vel.y *= -1;
        }
    }

    checkCollision(other) {
        let distance = this.sketch.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (distance <= this.radius + other.radius) {
            let dx = other.pos.x - this.pos.x;
            let dy = other.pos.y - this.pos.y;
            let angle = this.sketch.atan2(dy, dx);
            // Assuming the particles have the same mass.
            // Particles will switch momentum.
            let v1 = other.vel.mag()
            let v2 = this.vel.mag()

            // Set the new velocity vectors
            this.vel.set(this.sketch.cos(-angle) * v1, this.sketch.sin(-angle) * v1);
            other.vel.set(this.sketch.cos(angle) * v2, this.sketch.sin(angle) * v2);

            // let m1 = this.radius * this.radius * PI;
            // let m2 = other.radius * other.radius * PI;
            // let v1i = this.vel.mag();
            // let v2i = other.vel.mag();
            // // let v1f = ((m1 - m2) * u1.x + 2 * m2 * u2.x) / (m1 + m2);
            // // let v2f = ((m2 - m1) * u2.x + 2 * m1 * u1.x) / (m1 + m2);
            // let v1f = 2 * m2 * v2i / (m1 + m2) + v1i * (m1 - m2) / (m1 + m2);
            // let v2f = 2 * m1 * v1i / (m1 + m2) + v2i * (m2 - m1) / (m1 + m2);
            // this.vel.set(cos(angle) * v1f - sin(angle) * u1.y, sin(angle) * v1f + cos(angle) * u1.y);
            // other.vel.set(cos(angle) * v2f - sin(angle) * u2.y, sin(angle) * v2f + cos(angle) * u2.y);

            // Given the reaction, A + B <-> C + D, we must show this relationship.
            let colMag = this.vel.mag() + other.vel.mag();
            let colFactor = 15;
            if (this.type == 'A' && other.type == 'B' || this.type == 'B' && other.type == 'A') {
                if (colMag * colFactor > forwardActivationEnergy) {
                    this.type = 'C';
                    other.type = 'D';
                }
            } else if (this.type == 'C' && other.type == 'D' || this.type == 'D' && other.type == 'C') {
                if (colMag * colFactor > backwardActivationEnergy) {
                    this.type = 'A';
                    other.type = 'B';
                }
            }
        }
    }

    collideWithOtherParticles(particles) {
        for (let i = 0; i < particles.length; i++) {
            if (particles[i] !== this) {
                this.checkCollision(particles[i]);
            }
        }
    }

    checkValidPosition() {
        let bound = this.radius / 2 + 1;
        if (this.pos.x - this.radius < -bound || this.pos.x + this.radius > this.sketch.width + bound || this.pos.y - this.radius < -bound || this.pos.y + this.radius > this.sketch.height + bound) {
            // console.log('Glitching');
            //this.sketch.Randomly generate a new position
            this.pos = this.sketch.createVector(this.sketch.random(this.radius, this.sketch.width - this.radius), this.sketch.random(this.radius, this.sketch.height - this.radius));
        }
    }

    envChangesToVelocity() {
        if (this.temp != parseInt(document.getElementById('sliderTemp').value) / 100) {
            this.temp = parseInt(document.getElementById('sliderTemp').value) / 100;
            this.vel = this.sketch.createVector(this.sketch.random(-this.temp, this.temp), this.sketch.random(-this.temp, this.temp));
        }
    }
}
