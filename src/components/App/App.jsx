import React, { useState, useEffect } from 'react'

import Header from '../Header/Header'
import RecordCard from '../RecordCard/RecordCard'
import Map from '../Map/Map'
import Table from '../Table/Table'
import Chart from '../Chart/Chart'

import './App.css'
import 'leaflet/dist/leaflet.css'

function App() {

    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('worldwide')
    const [countryInfo, setCountryInfo] = useState([])
    const [mapCountries, setMapCountries] = useState([])
    const [mapCenter, setMapCenter] = useState([20, 77])
    const [caseType, setCaseType] = useState("cases")
    
    useEffect(() => {
        const fetchResources = async () => {
            const response = await fetch('https://disease.sh/v3/covid-19/countries')
            const data = await response.json()
            
            const country = data.map(country => (
                {
                    name: country.country,
                    code: country.countryInfo.iso2
                    
                }
            ))
            setCountries(country)

            const mapData = data.map(country => {
                return (
                    {
                        country: country.country,
                        flag: country.countryInfo.flag,
                        cases: country.cases,
                        deaths: country.deaths,
                        recovered: country.recovered,
                        lat: country.countryInfo.lat,
                        long: country.countryInfo.long
                    }
                )
            })
            setMapCountries(mapData)
        }
        fetchResources()
    }, [])

    useEffect(() => {
        const fetchResources = async () => {
            const response = await fetch('https://disease.sh/v3/covid-19/all')
            const data = await response.json()
            setCountryInfo(data)
        }
        fetchResources()
    }, [])

    const handleDropdown = async (e) => {

        const countryCode = e.target.value;
        const url = countryCode === "worldwide"
            ? 'https://disease.sh/v3/covid-19/all'
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setSelectedCountry(countryCode)
                setCountryInfo(data)
                
                const cord = countryCode === 'worldwide'
                    ? [20, 77]
                    : [data.countryInfo.lat, data.countryInfo.long]
                setMapCenter(cord)
            })
    }

    return (
        <div className="app">
            <div className="app_left">
                <Header
                    countries={countries}
                    selectedCountry={selectedCountry}
                    handleDropdown={handleDropdown}
                />

                <div className="app_stats">
                    <RecordCard
                        caseType="cases"
                        total={countryInfo.cases}
                        today={countryInfo.todayCases}
                        active = {caseType === 'cases'}
                        onClick={(e) => setCaseType('cases')}
                        color="red"
                    />
                    <RecordCard
                        caseType="recovered"
                        total={countryInfo.recovered}
                        today={countryInfo.todayRecovered}
                        active = {caseType === 'recovered'}
                        onClick={(e) => setCaseType('recovered')}
                        color='green'
                    />
                    <RecordCard
                        caseType="deaths"
                        total={countryInfo.deaths}
                        today={countryInfo.todayDeaths}
                        active = {caseType === 'deaths'}
                        onClick={(e) => setCaseType('deaths')}
                        color='orange'
                    />
                </div>
                <Map
                    center={mapCenter}
                    mapCountries={mapCountries}
                    caseType={caseType} />
            </div>
            <div className="app_right">
                <Table countriesInfo={mapCountries} />
                <Chart countryCode={selectedCountry} caseType={caseType} />
            </div>
        </div>
    )
}

export default App
