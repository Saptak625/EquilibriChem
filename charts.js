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
            title: "Frequency of Particles",
            minimum: 0,
            maximum: 1,
        },
        axisX: {
            title: "Time",
        },
        data: [
            {
                type: "line",
                dataPoints: aDPS,
                markerType: "none",
                color: `rgb(${particleColors[0][0]}, ${particleColors[0][1]}, ${particleColors[0][2]})`,
                showInLegend: true,
                legendText: "A"
            },
            {
                type: "line",
                dataPoints: bDPS,
                markerType: "none",
                color: `rgb(${particleColors[1][0]}, ${particleColors[1][1]}, ${particleColors[1][2]})`,
                showInLegend: true,
                legendText: "B"
            },
            {
                type: "line",
                dataPoints: cDPS,
                markerType: "none",
                color: `rgb(${particleColors[2][0]}, ${particleColors[2][1]}, ${particleColors[2][2]})`,
                showInLegend: true,
                legendText: "C"
            },
            {
                type: "line",
                dataPoints: dDPS,
                markerType: "none",
                color: `rgb(${particleColors[3][0]}, ${particleColors[3][1]}, ${particleColors[3][2]})`,
                showInLegend: true,
                legendText: "D"
            }
        ]
    });

    var xVal = 0;
    var updateInterval = 250;
    let kc = 0.1;
    // var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function (count) {

        aDPS.push({
            x: xVal,
            y: numOfParticles[0] / numOfParticles.reduce((a, b) => a + b)
        });
        bDPS.push({
            x: xVal,
            y: numOfParticles[1] / numOfParticles.reduce((a, b) => a + b)
        });
        cDPS.push({
            x: xVal,
            y: numOfParticles[2] / numOfParticles.reduce((a, b) => a + b)
        });
        dDPS.push({
            x: xVal,
            y: numOfParticles[3] / numOfParticles.reduce((a, b) => a + b)
        });
        xVal++;

        kc = cDPS[cDPS.length - 1].y * dDPS[dDPS.length - 1].y / (aDPS[aDPS.length - 1].y * bDPS[bDPS.length - 1].y);
        document.getElementById('kc').innerHTML = "= " + kc.toFixed(2);

        // if (aDPS.length > dataLength) {
        //     aDPS.shift();
        //     bDPS.shift();
        //     cDPS.shift();
        //     dDPS.shift();
        // }

        chart.render();
    };

    updateChart();
    setInterval(function () { updateChart() }, updateInterval);

}