let changeInEnthalpy = -100; // kJ/mol
let minimumActivationEnergy = 60; // kJ/mol
let forwardActivationEnergy = 60; // kJ/mol
let backwardActivationEnergy = 160; // kJ/mol

energetics = (sketch) => {
    sketch.setup = () => {
        sketch.createCanvas(400, 400);

        // Center the canvas
        let energeticsCanvas = document.getElementById('energeticsCanvas');
        energeticsCanvas.style.marginLeft = (energeticsCanvas.clientWidth - sketch.width) / 2 + 'px';
    }

    sketch.draw = () => {
        sketch.background(255);

        // Get the slider values
        let sliderHChange = document.getElementById('sliderHChange');
        let sliderFEA = document.getElementById('sliderFEA');
        changeInEnthalpy = parseInt(sliderHChange.value);
        minimumActivationEnergy = parseInt(sliderFEA.value);
        forwardActivationEnergy = minimumActivationEnergy;
        backwardActivationEnergy = minimumActivationEnergy - changeInEnthalpy;
        if (minimumActivationEnergy < changeInEnthalpy) {
            forwardActivationEnergy = minimumActivationEnergy + changeInEnthalpy;
            backwardActivationEnergy = minimumActivationEnergy;
        }

        // Update spans
        document.getElementById('h_change').innerHTML = changeInEnthalpy;
        document.getElementById('endo_exo').innerHTML = changeInEnthalpy <= 0 ? 'Exothermic' : 'Endothermic';
        document.getElementById('forwardEA').innerHTML = forwardActivationEnergy;
        document.getElementById('backwardEA').innerHTML = backwardActivationEnergy;

        // Draw the graph axes
        sketch.stroke(0);
        sketch.strokeWeight(2);
        sketch.line(sketch.width / 8, sketch.height - 50, sketch.width, sketch.height - 50);
        sketch.line(sketch.width / 8, 0, sketch.width / 8, sketch.height - 50);

        // Draw the graph labels
        sketch.textFont('Verdana');
        sketch.textStyle(sketch.NORMAL);
        sketch.textSize(14);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text('t', 9 * sketch.width / 16, sketch.height - 25);
        sketch.text('H', sketch.width / 16, (sketch.height - 50) / 2);

        // Graph Title
        sketch.textSize(18);
        sketch.textAlign(sketch.CENTER, sketch.CENTER);
        sketch.text('Internal Energy vs Time', 9 * sketch.width / 16, 25);

        // Draw energy curve with activation energy hump
        sketch.noFill();
        sketch.stroke(255, 0, 0);
        sketch.strokeWeight(2);
        sketch.beginShape();
        sketch.vertex(sketch.width / 8, 200);
        sketch.vertex(sketch.width / 8, 200);
        sketch.bezierVertex(3 * sketch.width / 8, 200, 3 * sketch.width / 8, 200 - forwardActivationEnergy, sketch.width / 2, 200 - forwardActivationEnergy);
        sketch.endShape();
        sketch.beginShape();
        sketch.vertex(7 * sketch.width / 8, 200 - changeInEnthalpy);
        sketch.vertex(7 * sketch.width / 8, 200 - changeInEnthalpy);
        sketch.bezierVertex(5 * sketch.width / 8, 200 - changeInEnthalpy, 5 * sketch.width / 8, 200 - forwardActivationEnergy, sketch.width / 2, 200 - forwardActivationEnergy);
        sketch.endShape();
    }
};

let energeticsCanvas = new p5(energetics, 'energeticsCanvas');