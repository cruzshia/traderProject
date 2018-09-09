import React, { PureComponent } from 'react';

class CandelChart extends PureComponent {
    constructor(props) {
        super(props);
        this.chart = null;
    }

    renderChart() {
        this.chart = new window.CanvasJS.Chart("chartContainer", {
            animationEnabled: false,
            theme: "light2",
            exportEnabled: false,
            title: {
                text: "價格圖"
            },
            axisX: {
                interval: 1,
                valueFormatString: "MMM DD"
            },
            axisY: {
                includeZero: false
            },
            toolTip: {
                content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
            },
            data: [{
                type: "candlestick",
                risingColor: "rgb(19, 191, 153)",
			    color: "rgb(255, 67, 90)",
                yValueFormatString: "$##0.00000000",
                dataPoints: this.formatData()
            }]
        });
        this.chart.render();
    }

    formatData() {
        const { candles } = this.props;
        const length = candles.length;
        let values = [];
        for (let i = 0; i < length; i++) {
            const data = candles[i];
            const { high, low, open, close } = data;
            values.push({
                x: new Date(data.timestamp),
                y: [
                    parseFloat(open),
                    parseFloat(high),
                    parseFloat(low),
                    parseFloat(close)
                ]
            });
        }
        return values;
    }

    componentDidUpdate() {
        this.renderChart();
    }

    render() {
        return (
            <div id="chartContainer" style={{marginTop: "30px"}}></div>
         );
    }
}

export default CandelChart;