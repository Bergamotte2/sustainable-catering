var data = [
    {
        y: 300,
        color:"#F7464A",
        name: "Red"
    },
    {
        y: 50,
        color: "#46BFBD",
        name: "Green"
    },
    {
        y: 100,
        color: "#FDB45C",
        name: "Yellow"
    }
]

var initChart = function(_data) {
    $('.chart').highcharts({
        chart: {
            animation: false,
            type: 'pie',
            backgroundColor: null
        },
        title: {
            text: null
        },
        tooltip: {
            valueSuffix: '%',
            enabled: true
        },
        plotOptions: {
            pie: {
                animation: {
                    duration: 750,
                    easing: 'easeOutQuad'
                },
                shadow: false,
                center: ['50%', '50%'],
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                point:{
                  events:{
                    click: function(){
                        moveToPoint(this);
                    }
                  }
                }
            },
            series: {
                animation: {
                    duration: 750,
                    easing: 'easeOutQuad'
                }
            }
        },
        series: [{
            animation: {
                duration: 750,
                easing: 'easeOutQuad'
            },
            name: 'Spending',
            data: data,
            size: '90%',
            innerSize: '55%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }]
    });
};

var lastAngle = 0;
var moveToPoint = function (clickPoint) {
    var points = clickPoint.series.points;
    var startAngle = 0;
    for (var i = 0; i < points.length; i++){
        var p = points[i];
        if (p === clickPoint){
            break;
        }
        startAngle += (p.percentage/100.0 * 360.0);
    }

    var newAngle = -startAngle + 90 - ((clickPoint.percentage/100.0 * 360.0)/2);

    console.log(newAngle);

    // clickPoint.series.update({
    //     //startAngle: -startAngle + 180 // start at 180
    //     startAngle: newAngle // center at 90
    // });

    $({
        angle: 0,
        target: newAngle
    }).animate({
        angle: newAngle-lastAngle
    }, {
        duration: 750,
        easing: 'easeOutQuad',
        step: function() {
            $('.chart').css({
                transform: 'rotateZ('+this.angle+'deg)'
            });
        },
        complete: function() {
            $('.chart').css({
                transform: 'rotateZ(0deg)'
            });
            clickPoint.series.update({
                startAngle: newAngle // center at 90
            });
            lastAngle = newAngle;
        }
    });
};

initChart();