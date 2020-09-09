import { FormControl, Select, MenuItem } from '@material-ui/core'

import React from 'react'

import './Header.css'

function Header({countries, selectedCountry, handleDropdown}) {

    return (
        <div className="app_header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app_dropdown">
                <Select
                    variant="outlined"
                    value={selectedCountry}
                    onChange={handleDropdown}
                >
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {
                        countries.map(country =>
                            <MenuItem
                                value={country.code}
                                key={country.code}
                            >
                                {country.name}
                            </MenuItem>
                        )
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default Header

