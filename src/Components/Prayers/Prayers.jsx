import style from "./Prayers.module.css"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function MediaCard({name , time , image}) {
  return (
    <Card sx={{ maxWidth: 345 }} className={style.shadow}  >
      <CardMedia 
        sx={{ height: 100 }}
        image= {image}
        title="green iguana"
      />
      <CardContent  >
        <h2 style={{textAlign:"center" , color : "red"}} >
        {name}
        </h2>
        <Typography variant="h2" color="text.secondary">
   {time}
        </Typography>
      </CardContent>
   
    </Card>
  );
}