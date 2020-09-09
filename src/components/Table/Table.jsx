import React from 'react'
import numeral from 'numeral'

import {sortData} from '../../util'

import './Table.css'

function Table({ countriesInfo }) {
    sortData(countriesInfo)
    return (
        <div className="table">
            <table>
                <thead className="table_head">
                    <tr>
                        <th className="table_country">Country</th>
                        <th className="table_cases">Cases Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        countriesInfo.map(country =>
                            <tr>
                                <td>{country.country}</td>
                                <td>{numeral(country.cases).format('(0,0)')}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
