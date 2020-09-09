import React from 'react'
import {
    Map as LeafletMap,
    TileLayer,
    CircleMarker,
    Popup
} from 'react-leaflet'

import {getMapRadius, getFillColor} from '../../util'

import './Map.css'

function Map({ center, mapCountries, caseType }) {
    
    return (
        <div className="map">
            <LeafletMap center={center} zoom={4}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    mapCountries.map(country => {
                        const center = [country.lat, country.long];
                        const mapRadius = getMapRadius(country, caseType);
                        const fillColor = getFillColor(caseType).fillColor
                        return (
                            <CircleMarker stroke={false} center={center} fillColor={fillColor} fillOpacity={1} radius={mapRadius}>
                                <Popup>
                                    <div className="popup">
                                        <div className="popup_header">
                                            <img src={country.flag} alt="" />
                                            <h3 className="popup_country">{country.country}</h3>
                                        </div>
                                        <div className="popup_stats">
                                            <p>
                                                <span className="cases">Cases : </span>{country.cases}
                                            </p>
                                            <p>
                                                <span className="cases">Deaths : </span>{country.deaths}
                                            </p><p>
                                                <span className="cases">Recovered : </span>{country.recovered}
                                            </p>
                                        </div>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        )
                    }
                    )
                }
            </LeafletMap>
        </div>
    )
}

export default Map
