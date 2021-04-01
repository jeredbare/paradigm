import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";


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
  const classes = useStyles(darkTheme);

  const getScanData = async() => {
    const response = await fetch("/api/corsPost?url=http://localhost:5000/scan-site",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_to_scan: 'carfax_net.json'
      })
    })
    const result = await response.json()
    console.log(result)
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
        <ThemeProvider theme={darkTheme}>
          <Box width="50%" display="flex" flexDirection="row" style={{ justifyContent: "space-evenly" }}>
            <TextField id="outlined-basic" label="Domain" variant="outlined" />
            <Button variant="contained"onClick={()=> {getScanData()}}>Analyze</Button>
          </Box>
        </ThemeProvider>

        <div className={styles.grid}>
          <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Result Score
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Score from scan will go here
                </Typography>
              </CardContent>
          </Card>
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
