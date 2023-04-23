import './App.css'
import { Alert, Card, CardContent, Container, CssBaseline, Snackbar, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import WeatherForm from './components/WeatherForm';
import { useState, useEffect } from 'react';
import WeatherViewInfo from './components/WeatherViewInfo';


export interface responseWeather{
  current: {
    cloud?: number | null,
    condition?: {
      code: number,
      icon: string,
      text: string
    } | null,
    feelslike_c: number | null,
    feelslike_f: number | null,
    gust_kph: number | null,
    gust_mph: number | null,
    humidity: number | null,
    is_day: number | null,
    last_updated: string | null,
    last_updated_epoch: number | null,
    precip_in: number | null,
    precip_mm: number | null,
    pressure_in: number | null,
    pressure_mb: number | null,
    temp_c: number | null,
    temp_f: number | null,
    uv: number | null,
    vis_km: number | null,
    vis_miles: number | null,
    wind_degree: number | null,
    wind_dir: string | null,
    wind_kph: number | null,
    wind_mph: number | null
  },
  location: {
    country: string | null,
    lat: number | null,
    localtime: string | null,
    localtime_epoch: number | null,
    lon: number | null,
    name: string | null,
    region: string | null,
    tz_id: string | null
  }
}

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark'
    }
  });
  const [weather, setWeather] = useState<responseWeather>();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    document.title = `${weather?.location.name ?? ''} Weather`
  }, [weather])
  

  async function loadWeather(city: string): Promise<void>{
    try {
      const request = await fetch(`${import.meta.env.VITE_APP_URL}&key=${import.meta.env.VITE_APP_KEY}&q=${city}`);

      const json = await request.json();
      
      if(request.ok){
        setWeather(json);
      }
      else{
        console.log('error:', json);
        setOpenAlert(true);  
      }
      
    } catch (error) {
      console.log(error);
      setOpenAlert(true);
    }
  }

  function handleCity(city: string): void{
    loadWeather(city);
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>

      <Snackbar open={openAlert} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
        <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
          Location not found
        </Alert>
      </Snackbar>

      <Container maxWidth='sm' sx={{padding: '30px'}}>
        <Card sx={{marginBottom: '30px', textAlign: 'center'}}>
          <CardContent>
            <h1>Weather Browser</h1>
            <WeatherForm onChangeCity={handleCity} />
          </CardContent>
        </Card>
        {
          weather ?
          <Card>
            <CardContent sx={{textAlign: 'center'}}>
              <WeatherViewInfo weather={weather}></WeatherViewInfo>
            </CardContent>
          </Card>
          :
          ''
        }
      </Container>

    </ThemeProvider>
    </>
  )
}

export default App
