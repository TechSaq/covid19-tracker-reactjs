import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

import {getFillColor} from '../../util'

import './Chart.css'

const options = {
    legend: {
        display: false
    },
    elements: {
        point: {
            radius: 0
        }
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YYYY",
                    tooltipFormat: 'll'
                },
                gridLines: false
            }
        ],
        yAxes: [
            {
                gridLines: false,
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format('0a')
                    }
                }
            }
        ]
    }
}


const makeChartData = (data, caseType) => {
    let chartData = []
    let lastDataPoint;
    for(let date in data[caseType]){
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        lastDataPoint = data[caseType][date]
    }
    return chartData
}

function Chart({countryCode, caseType}) {

    const [chartData, setChartData] = useState({})

    useEffect(() => {
        const url = countryCode === "worldwide"
            ? 'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
            : `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=120`
        
        const fetchLastData = async () => {
            const response = await fetch(url)
            const data = await response.json()

            countryCode !== "worldwide" 
                ? setChartData(makeChartData(data['timeline'], caseType))
                : setChartData(makeChartData(data, caseType))
        } 
        fetchLastData()
    },[countryCode, caseType])

    const data = {
        datasets: [
            {
                backgroundColor: getFillColor(caseType).fillColor,
                borderColor: getFillColor(caseType).borderColor,
                data: chartData,
            }
        ]
    }

    return (
        <div className="chart">
            <h4>Last 120 days Daily <span className="caseType">{caseType}</span> </h4>
            {chartData?.length > 0 && (
                <Line
                    data={data}
                    options={options}
                />
            )}
        </div>
    )
}

export default Chart
