window.onload = function () {

    var aDPS = []; // dataPoints
    var bDPS = []; // dataPoints
    var cDPS = []; // dataPoints
    var dDPS = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Equilibrium Concentrations"
        },
        axisY: {
            title: "Number of Particles",
            minimum: 0,
            maximum: allParticles.length,
        },
        data: [
            {
                type: "line",
                dataPoints: aDPS
            },
            {
                type: "line",
                dataPoints: bDPS
            },
            {
                type: "line",
                dataPoints: cDPS
            },
            {
                type: "line",
                dataPoints: dDPS
            }
        ]
    });

    var xVal = 0;
    var updateInterval = 500;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function (count) {

        aDPS.push({
            x: xVal,
            y: numOfParticles[0]
        });
        bDPS.push({
            x: xVal,
            y: numOfParticles[1]
        });
        cDPS.push({
            x: xVal,
            y: numOfParticles[2]
        });
        dDPS.push({
            x: xVal,
            y: numOfParticles[3]
        });
        xVal++;

        if (aDPS.length > dataLength) {
            aDPS.shift();
            bDPS.shift();
            cDPS.shift();
            dDPS.shift();
        }

        chart.render();
    };

    setInterval(function () { updateChart() }, updateInterval);

}