
import Box from '@material-ui/core/Box';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Typography from '@material-ui/core/Typography'
import React, { useState, useEffect } from 'react';
import { withStyles } from "@material-ui/core/styles";
import  FileUpload  from '../components/fileUpload'
import AmassDataTable from '../components/amassDataTable'
import ScanScore from '../components/scanScore'
import CircularProgress from "@material-ui/core/CircularProgress";
import ScanResultTable from '../components/scanResultTable'
import Button from '@material-ui/core/Button';

export default function Dashboard(data) {
    useEffect(() => {
        document.body.style.backgroundColor = "#121212";
    },[])

    const WhiteTextTypography = withStyles({
        root: {
        color: "#FFFFFF",
        padding: '5%'
        }
    })(Typography);   
    
    const [fileContent, setFileContent] = useState(null)
    const [scanResults, setScanResults] = useState(null)
    const [isScanning, setIsScanning] = useState(false)

    const getScanScore = async() => {
        setIsScanning(true)
    
        const response = await fetch("/api/corsPost?url=http://paradigm:5000/scan-site",
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fileContent)
        })
    
        const result = await response.json()
        setIsScanning(false)
        setScanResults(result)
      }

    return (
        <Box display="flex" flexDirection="row" height="100%">
            <ProSidebar style={{position: "absolute", height: "100%"}}>
                <SidebarHeader>
                    {
                        <WhiteTextTypography variant="h4">Paradigm</WhiteTextTypography>
                    }
                </SidebarHeader>
                <Menu iconShape="square">
                <MenuItem >Dashboard</MenuItem>
                <MenuItem >New Scan</MenuItem>
                <SubMenu title="Components" >
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu>
                </Menu>
            </ProSidebar>
                {fileContent ?
            <Box width="100%" display="flex" flexDirection="column" style={{ justifyContent: "space-evenly" }}>
                <Box width="100%" display="flex" flexDirection="row" style={{ justifyContent: "space-evenly" }}>
                <FileUpload fileUpdate={setFileContent}/>
                <Box height="50%" display="flex" flexDirection="column" style={{ justifyContent: "space-between" }}>
                    <Button variant="contained"onClick={()=> {getScanScore()}}>Get Score</Button>
                    <p></p>
                    <Button variant="contained"onClick={()=> {setFileContent(null)}}>Clear Data</Button>
                </Box>
                {scanResults ? <ScanScore scanScore={scanResults.result_score}/> : null}
                {isScanning ? <CircularProgress style={{color: '#FFFFFF'}} /> : null}
                </Box>
                <p></p>
                {scanResults ? <ScanResultTable scanResults={scanResults}/> : null}
                <p></p>
                <AmassDataTable fileContent={fileContent}/>
            </Box>
            : <FileUpload fileUpdate={setFileContent}/>}
        </Box>
         
  )
}
