energetics = (sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(document.getElementById('energeticsCanvas').clientWidth, 400);

        // Create a lists of particles
        for (let j = 0; j < numOfParticles.length; j++) {
            for (let i = 0; i < numOfParticles[j]; i++) {
                allParticles.push(new Particle(sketch, particleTypes[j]));
            }
        }
    }

    sketch.draw = () => {
        sketch.background(0, 0, 0, 50);
    }
};

let simulationCanvas = new p5(energetics, 'energeticsCanvas');