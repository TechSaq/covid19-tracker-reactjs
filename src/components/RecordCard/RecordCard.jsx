import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import numeral from 'numeral'

import './RecordCard.css'


function RecordCard({caseType, today=0 ,total=0, active, onClick, color}) {
    return (
        <Card className={`recordCard ${active && `active-${color}`}`}
            onClick={onClick}
            >
                <CardContent>
                    <Typography
                        className="title" color="textSecondary" gutterBottom
                    >
                    {caseType}
                    </Typography>
                <h2 className="today">+{numeral(today).format('(0a)') }</h2>
                <Typography className="total">
                    { numeral(total).format('(0a)') } Total
                </Typography>
                </CardContent>
            </Card>
    )
}

export default RecordCard
