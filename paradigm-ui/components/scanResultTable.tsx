import React from 'react'
import Table from './table'

export default function ScanResultTable(props) {
  const scanResults = props.scanResults

  return (
    <React.Fragment>
        <Table 
        columns={[
            { title: 'FQDN', field: 'fqdn' },
            { title: 'Domain', field: 'domain'},
            { title: 'IP', field: 'ip' },
            { title: 'CIDR', field: 'cidr'},
            { title: 'HTTP Response', field: 'http' },
            { title: 'HTTPS Response', field: 'https' },
            { title: 'Description', field: 'loc' },
            { title: 'Date and Time', field: 'timestamp' },
            ]}
        title="Scan Results" 
        data={scanResults.scan_data}/>
    </React.Fragment>
  )
}
