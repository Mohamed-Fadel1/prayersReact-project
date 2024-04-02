import { useState, useEffect } from "react";
import style from "./MainContent.module.css"
import moment from "moment";
import { FormControl, InputLabel, MenuItem, Select, Stack, Divider, Grid } from "@mui/material";
import Prayers from "../Prayers/Prayers";
import img1 from "../../assets/fajr-prayer.png";
import img2 from "../../assets/dhhr-prayer-mosque.png";
import img3 from "../../assets/asr-prayer-mosque.png";
import img4 from "../../assets/sunset-prayer-mosque.png";
import img5 from "../../assets/night-prayer-mosque.png";
import axios from "axios";
import { useTheme } from "@emotion/react";






export default function MainContent({setMyMood }) {

  const theme = useTheme()
  const currentMode = theme.palette.mode
  
  const [time , setTime] = useState('')
  const [mounth , setMounth] = useState('')
  const [mounthNumber , setMounthNumber] = useState('')
  const [mounthDay , setMounthDay] = useState('')
  const [yearHijri , setYearHijri] = useState('')
  const [timings , setTimings] = useState("") ;
  const [selectedCountry , setSelectedCountry] = useState("EG")
  const [selectedCity , setSelectedCity] = useState({
    displayName : "الاسكندرية",
    apiName : "	Alexandria"
  });
  const [today , setToday] = useState("");


  const avilableCities = [
    {
      displayName : "الاسكندرية",
      apiName : "	Alexandria"
    } , 
    {
      displayName : "الرياض" ,
      apiName : "Riyadh"
    } ,
    {
      displayName : "مكة المكرمة" ,
      apiName : "Makkah al Mukarramah	"
    } ,
    {
      displayName : "القاهرة" ,
      apiName : "	Al Qāhirah"
    } ,
    {
      displayName : "كفر الشيخ",
      apiName : "Kafr ash Shaykh"
    }
  ];

  async function getTimings() {
    try {
      const {data} = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=${selectedCountry}`);
      setTimings(data.data.timings);
      setMounth(data.data.date.hijri.month.en);
      setMounthNumber(data.data.date.hijri.month.number);
      setMounthDay(data.data.date.hijri.day);
      setYearHijri(data.data.date.hijri.year);
    } catch (error) {
      console.log(error);
    }
  }
  
  

  useEffect(() => {
    getTimings();
    const intervalId = setInterval(() => {
      const todayObject = moment();
      setToday(todayObject.format("MMM Do YYYY "));
      setTime(todayObject.format("hh:mm:ss"))
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, [selectedCity]);

  const handleChange = (event) => {
    const cityObject = avilableCities.find(city => city.apiName === event.target.value);
    setSelectedCity(cityObject);
  };

  const handleChangeCountry = (event) => {
    setSelectedCountry(event.target.value);
  };
  
  useEffect(() => {
    console.log("SelectedCountry is", selectedCountry);
  }, [selectedCountry]);
  

  return (
    <>
<button className="btn mb-4" onClick={() => {
    localStorage.setItem("currentMode", currentMode === "light" ? "dark" : "light");
    setMyMood(currentMode === "light" ? "dark" : "light");
}}>
  {currentMode === "dark" ? <i className="fas fa-moon fs-4 text-white "></i> : <i className="far fa-sun fs-4 text-warning"></i>}
</button>



      {/*=== top row=== */}
      <Grid container>
        <Grid xs={4}>
          <div> 
            <h2> {today} </h2>
            <h1> {selectedCity.displayName} </h1>
          </div>
        </Grid>
        <Grid xs={4}>
          <div> 
            <h1>  {time} </h1>
        
          </div>
        </Grid>
        <Grid xs={4}>
          <div> 
            <h2> {mounthDay} \{mounth} \ {yearHijri} </h2>
            <h1>   التقويم الهجري {mounthNumber}</h1>
          </div>
        </Grid>
      </Grid>
      {/*=== top row=== */}
      <Divider style={{background : "white" , opacity : "0.2"}}/>
      {/* ===prayers card=== */}
      <Stack direction="row" justifyContent="space-around" style={{marginTop:"60px"}} > 
        <Prayers name="الفجر" time={timings?.Fajr} image={img1} />
        <Prayers name="الضهر" time={timings?.Dhuhr} image={img2} />
        <Prayers name="العصر" time={timings?.Asr} image={img3} />
        <Prayers name="المغرب" time={timings?.Maghrib} image={img4} />
        <Prayers name="العشاء" time={timings?.Isha} image={img5} />
      </Stack>
      {/* ===prayers card=== */}
      <Grid container spacing={3}>
  <Grid item xs={6}>
    <FormControl className={style.shadow} style={{ width: "50%", marginTop: "40px" }}>
      <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCity.apiName}
        label="المدينة"
        onChange={handleChange}
      >
        {avilableCities.map(city => (
          <MenuItem key={city.apiName} value={city.apiName}>
            {city.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
  <Grid item xs={6}>
    <FormControl className={style.shadow} style={{ width: "50%", marginTop: "40px" }}>
      <InputLabel id="demo-simple-select-label">الدولة</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedCountry}
        label="المدينة"
        onChange={handleChangeCountry}
      >
          <MenuItem value={"SA"}>SA</MenuItem>
    <MenuItem value={"EG"}>EG</MenuItem>
 
      </Select>
    </FormControl>
  </Grid>
</Grid>
    </>
  )
}
