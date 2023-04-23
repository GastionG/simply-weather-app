import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface dataFromForm{
    onChangeCity: (city: string)=>void
}

export default function WeatherForm( {onChangeCity}: dataFromForm ){
    const [city, setCity] = useState<string>('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        setCity(e.target.value);
    }
    function handleSubmit(e: React.ChangeEvent<HTMLFormElement>): void{
        e.preventDefault();
        if(city){
            onChangeCity(city);
        }
    }

    return (
        <Box component={'form'} onSubmit={handleSubmit}>

          <TextField placeholder="Search weather by city name" sx={{width: '90%', marginBottom: '10px'}} type='text' onChange={handleChange}></TextField>

          <div>
            <Button type="submit" variant="contained">Search</Button>
          </div>

        </Box>
    )
}