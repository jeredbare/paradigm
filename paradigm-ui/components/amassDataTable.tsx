import React from 'react'
import Table from './table'

export default function AmassDataTable(props) {
  const fileContent = props.fileContent

  return (
    <React.Fragment>
        <Table 
        columns={[
            { title: 'Name', field: 'name' },
            { title: 'Domain', field: 'domain' },
            { title: 'IP', field: 'ip' },
            { title: 'CIDR', field: 'cidr'},
            { title: 'ASN', field: 'asn' },
            { title: 'Description', field: 'desc' },
            { title: 'Tag', field: 'tag' },
            ]}
        title="AMASS Data" 
        data={fileContent.result}/>
    </React.Fragment>
  )
}