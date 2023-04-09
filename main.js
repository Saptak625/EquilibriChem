let numOfParticles = [150, 100, 0, 0];
let particleTypes = ['A', 'B', 'C', 'D'];

let allParticles = [];

function setup() {
    createCanvas(window.innerWidth, 400);

    // Create a lists of particles
    for (let j = 0; j < numOfParticles.length; j++) {
        for (let i = 0; i < numOfParticles[j]; i++) {
            allParticles.push(new Particle(particleTypes[j]));
        }
    }
}

function draw() {
    background(0, 0, 0, 50);

    // For each particle in the list
    for (let i = 0; i < allParticles.length; i++) {
        let particle = allParticles[i];
        // Update and display it
        particle.update();
        particle.checkEdges();
        particle.collideWithOtherParticles(allParticles);
        particle.checkValidPosition();
        particle.display();
    }

    // Count the number of each type of particle
    numOfParticles = [0, 0, 0, 0];
    for (let i = 0; i < allParticles.length; i++) {
        let particle = allParticles[i];
        let index = particle.type.charCodeAt(0) - 65;
        numOfParticles[index]++;
    }

}
