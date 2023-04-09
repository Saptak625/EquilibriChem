class Particle {
    particleColors = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)];

    constructor(type) {
        this.radius = 8;
        this.pos = createVector(random(this.radius, width - this.radius), random(this.radius, height - this.radius));
        this.vel = createVector(random(-5, 5), random(-5, 5));
        this.type = type;
    }

    update() {
        this.pos.add(this.vel);
    }

    display() {
        noStroke();
        fill(this.particleColors[this.type.charCodeAt(0) - 65]);
        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    }

    checkEdges() {
        if (this.pos.x - this.radius < 0 || this.pos.x + this.radius > width) {
            this.vel.x *= -1;
        }
        if (this.pos.y - this.radius < 0 || this.pos.y + this.radius > height) {
            this.vel.y *= -1;
        }
    }

    checkCollision(other) {
        let distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (distance <= this.radius + other.radius) {
            let dx = other.pos.x - this.pos.x;
            let dy = other.pos.y - this.pos.y;
            let angle = atan2(dy, dx);
            // Assuming the particles have the same mass.
            // Particles will switch momentum.
            let v1 = other.vel.mag()
            let v2 = this.vel.mag()

            // Set the new velocity vectors
            this.vel.set(cos(-angle) * v1, sin(-angle) * v1);
            other.vel.set(cos(angle) * v2, sin(angle) * v2);

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
            if (this.type == 'A' && other.type == 'B' || this.type == 'B' && other.type == 'A') {
                this.type = 'C';
                other.type = 'D';
            } else if (this.type == 'C' && other.type == 'D' || this.type == 'D' && other.type == 'C') {
                this.type = 'A';
                other.type = 'B';
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
        if (this.pos.x - this.radius < -bound || this.pos.x + this.radius > width + bound || this.pos.y - this.radius < -bound || this.pos.y + this.radius > height + bound) {
            console.log('Glitching');
            //Randomly generate a new position
            this.pos = createVector(random(this.radius, width - this.radius), random(this.radius, height - this.radius));
        }
    }
}
