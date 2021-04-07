import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

export default function FileUpload(props) {
    const onDrop = useCallback((acceptedFiles) => {
    setFileName(acceptedFiles[0].name)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        if(!fileContent) {
          setFileContent(binaryStr)
          setIsUploaded(true)
        }
      }
      reader.readAsText(file)
    })
    
  }, [])

  const buildData = (jsonData) => {
    const jsonDataParsed = JSON.parse(jsonData)
    const dataRows = []
    for(const row of jsonDataParsed)
    {
      const newRow = {
        name: row.name,
        domain: row.domain,
        ip: row.addresses[0].ip,
        cidr: row.addresses[0].cidr,
        asn: row.addresses[0].asn,
        desc: row.addresses[0].desc,
        tag: row.tag,
      }
      dataRows.push(newRow)
    }
    const returnData = {
      result: JSON.parse(JSON.stringify(dataRows))
    }
    return returnData
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  const [fileName, setFileName] = useState('Drag and drop your file here')
  const [fileContent, setFileContent] = useState(null)
  const [isUploaded, setIsUploaded] = useState(false)

  if(isUploaded){
    props.fileUpdate(buildData(fileContent))
    setIsUploaded(false)
  }

  return (
    <div {...getRootProps()}>
    <input {...getInputProps()} />
      <Card>
          <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
              Drag File Here
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
              {fileName}
              </Typography>
          </CardContent>
      </Card>
    </div>

  )
}