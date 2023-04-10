initialNumOfParticles = [200, 200, 0, 0];
numOfParticles = initialNumOfParticles;

simulation = (sketch) => {
    let particleTypes = ['A', 'B', 'C', 'D'];

    allParticles = [];

    sketch.setup = () => {
        sketch.createCanvas(document.getElementById('simulationCanvas').clientWidth, 400);

        // Create a lists of particles
        for (let j = 0; j < numOfParticles.length; j++) {
            for (let i = 0; i < numOfParticles[j]; i++) {
                allParticles.push(new Particle(sketch, particleTypes[j]));
            }
        }
    }

    sketch.draw = () => {
        sketch.background(0, 0, 0, 50);

        // Read the slider values
        let sliderA = document.getElementById('sliderA');
        let sliderB = document.getElementById('sliderB');
        let sliderC = document.getElementById('sliderC');
        let sliderD = document.getElementById('sliderD');

        // Find differences between the sliders now and last inital values
        let diffA = parseInt(sliderA.value) - initialNumOfParticles[0];
        let diffB = parseInt(sliderB.value) - initialNumOfParticles[1];
        let diffC = parseInt(sliderC.value) - initialNumOfParticles[2];
        let diffD = parseInt(sliderD.value) - initialNumOfParticles[3];

        // Add or remove particles to match the sliders
        if (diffA > 0) {
            for (let i = 0; i < diffA; i++) {
                allParticles.push(new Particle(sketch, 'A'));
            }
        } else if (diffA < 0) {
            for (let i = 0; i < -diffA; i++) {
                allParticles.splice(allParticles.findIndex(particle => particle.type == 'A'), 1);
            }
        }
        if (diffB > 0) {
            for (let i = 0; i < diffB; i++) {
                allParticles.push(new Particle(sketch, 'B'));
            }
        } else if (diffB < 0) {
            for (let i = 0; i < -diffB; i++) {
                allParticles.splice(allParticles.findIndex(particle => particle.type == 'B'), 1);
            }
        }
        if (diffC > 0) {
            for (let i = 0; i < diffC; i++) {
                allParticles.push(new Particle(sketch, 'C'));
            }
        } else if (diffC < 0) {
            for (let i = 0; i < -diffC; i++) {
                allParticles.splice(allParticles.findIndex(particle => particle.type == 'C'), 1);
            }
        }
        if (diffD > 0) {
            for (let i = 0; i < diffD; i++) {
                allParticles.push(new Particle(sketch, 'D'));
            }
        } else if (diffD < 0) {
            for (let i = 0; i < -diffD; i++) {
                allParticles.splice(allParticles.findIndex(particle => particle.type == 'D'), 1);
            }
        }

        // Set new number of particles
        initialNumOfParticles = [sliderA.value, sliderB.value, sliderC.value, sliderD.value];
        numOfParticles = initialNumOfParticles;

        // For each particle in the list
        for (let i = 0; i < allParticles.length; i++) {
            let particle = allParticles[i];
            // Update and display it
            particle.update();
            particle.checkEdges();
            particle.collideWithOtherParticles(allParticles);
            particle.checkValidPosition();
            particle.envChangesToVelocity();
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
};

let simulationCanvas = new p5(simulation, 'simulationCanvas');