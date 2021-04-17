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
            {props.scanScore < 30 ? 
              <Typography variant="h5" component="p" style={{color: "#25c90c"}}>
              {props.scanScore} %
              </Typography>
            : (props.scanScore >= 30 && props.scanScore < 75) ? 
              <Typography variant="h5" component="p" style={{color: "#dbdb30" }}>
              {props.scanScore} %
              </Typography>
            : props.scanScore >= 75 ? 
              <Typography variant="h5" component="p" style={{color: "#c4002b"}}>
              {props.scanScore} %
              </Typography>
            : null }
        </CardContent>
    </Card>
  )
}