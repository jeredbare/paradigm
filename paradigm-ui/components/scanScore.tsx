import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

export default function ScanScore(props) {
  return (
    <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            Scan Score:
            </Typography>
            <Typography variant="h5" component="p">
            {props.scanScore}
            </Typography>
        </CardContent>
    </Card>
  )
}