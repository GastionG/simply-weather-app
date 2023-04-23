import { Stack } from "@mui/material";
import { responseWeather } from "../App";

export default function WeatherViewInfo({weather}: {weather: responseWeather}) {
    return (
        <>
        <div>
            <h2>{weather?.location?.name}, {weather?.location?.country}.</h2>
            <Stack direction='row' alignItems={'center'} justifyContent={'center'}>
                <div>
                    <img width='100px' src={`http:${weather?.current?.condition?.icon}`} alt={weather?.current?.condition?.text} />
                </div>
                <h3>
                    {weather?.current.condition?.text} {weather?.current.temp_c}°C
                </h3>
            </Stack>
        </div>
        <div>
            <iframe src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d308751.89429769776!2d${weather?.location.lon}!3d${weather?.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1682198273651!5m2!1ses!2sar`} width="100%" height="450" style={{border:0}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
        </>
    )
}

