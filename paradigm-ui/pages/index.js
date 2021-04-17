import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import  FileUpload  from '../components/fileUpload'
import AmassDataTable from '../components/amassDataTable'
import ScanScore from '../components/scanScore'
import React, { useState } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress";


import { lightBlue } from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue
  }
});

const useStyles = makeStyles(theme => ({
  root: {}
}));

export default function Home() {
  const [fileContent, setFileContent] = useState(null)
  const [scanScore, setScanScore] = useState(null)
  const [isScanning, setIsScanning] = useState(false)

  const getScanScore = async() => {
    setIsScanning(true)

    const response = await fetch("/api/corsPost?url=http://localhost:5000/scan-site",
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
    setScanScore(result.result_score)

  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Paradigm</title>
        <link rel="icon" href="/geek_icon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Paradigm
        </h1>


        <p></p>
        {fileContent ?
          <Box width="100%" display="flex" flexDirection="column" style={{ justifyContent: "space-evenly" }}>
            <Box width="100%" display="flex" flexDirection="row" style={{ justifyContent: "space-evenly" }}>
              <FileUpload fileUpdate={setFileContent}/>
              <Box height="50%" display="flex" flexDirection="column" style={{ justifyContent: "space-between" }}>
                <Button variant="contained"onClick={()=> {getScanScore()}}>Get Score</Button>
                <p></p>
                <Button variant="contained"onClick={()=> {setFileContent(null)}}>Clear Data</Button>
              </Box>
              {scanScore ? <ScanScore scanScore={scanScore}/> : null}
              {isScanning ? <CircularProgress style={{color: '#FFFFFF'}} /> : null}
            </Box>
            
            <p>
            </p>
          <AmassDataTable fileContent={fileContent}/>
          </Box>
           : <FileUpload fileUpdate={setFileContent}/>}
        
 
        <div className={styles.grid}>

          
        </div>

      </main>

      <footer className={styles.footer}>
        <p className={styles.description}>
          Open Source - MIT License
        </p>
      </footer>
    </div>
  )
}
