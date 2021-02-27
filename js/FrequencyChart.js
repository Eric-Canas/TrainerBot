import {MAX_FREQ_RANGE, MAX_FREQUENCY_IN_FRAMES} from "./Constants.js";
import {CHART_LINE_COLOR, CHART_BACKGROUND_COLOR, CHART_LABEL} from "./Constants.js";

class FrequencyChart{
    constructor(CanvasID){
        this.context = document.getElementById('chart').getContext('2d');
        this.chart = this.buildChart();
    }

    buildChart(label = CHART_LABEL, backgroundColor = CHART_BACKGROUND_COLOR, lineColor = CHART_LINE_COLOR){
        return new Chart(this.context, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: label,
                    data: [],
                    backgroundColor: backgroundColor,
                    borderColor: lineColor,
                    borderWidth: 1}]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    /* Updates the chart visualization by updating the data inside to 'new_data'*/
    updateChart(new_data){
        this.chart.data.datasets[0].data = new_data;
        this.chart.data.labels = (new_data.length < MAX_FREQ_RANGE.length)? MAX_FREQ_RANGE.slice(0,new_data.length): MAX_FREQ_RANGE;
        this.chart.update();
    }
}

export {FrequencyChart};