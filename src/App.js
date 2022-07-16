import {useState,useEffect} from 'react';

function App() {

  const [search,setSearch]=useState('pune');
  const [dates,setDates]=useState('');
  const [city,setCity]=useState('');
  const [country,setDCountry]=useState('');
  const [tempmax,setTempmax]=useState('');
  const [tempmin,setTempmin]=useState('');
  const [temp,setTemp]=useState('');
  const [status,setStatus]=useState('');
  const [icon,setIcon]=useState(<i className='fas fa-sun' style={{color:'orange'}}></i>);
  

  useEffect(()=>{
    const fetchApi =async ()=>{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=825e537b5be11a4fa63676ed01cc715e`;
      const res=await fetch(url);
      const val=await res.json();
      setCity(val.name);
      setDCountry(val.sys.country);
      setTemp(val.main.temp);
      setTempmax(val.main.temp_max);
      setTempmin(val.main.temp_min);
      setStatus(val.weather[0].main);
      console.log(val);
      let now= new Date(), day=now.getDay(), month=now.getMonth(), date=now.getDate(), hour=now.getHours(), mint=now.getMinutes();
      const days =["SUN" ,"MON" ,"TUE" ,"WED" ,"THU" ,"FRI" , "SAT"];
      const months =["JAN" ,"FEB" ,"MAR" ,"APR" ,"MAY" ,"JUN" ,"JUL" ,"AUG" ,"SEP" ,"OCT" ,"NOV" ,"DEC"];
      let periods="AM";
      if(hour>11){ periods="PM";
          if(hour>12)hour-=12;}
      if(mint<10)mint="0"+mint;
      setDates(days[day]+" | "+months[month]+" | "+date+" | "+hour+":"+mint+periods); 
     
      if(status==="Clear"){setIcon(<i className='fas fa-sun' style={{color:'#eccc68'}}></i>)}
      else if(status==="Clouds"){setIcon(<i className='fas fa-cloud' style={{color:'#dfe4ea'}}></i>)}
      else if(status==="Rainy"){setIcon(<i className='fas fa-cloud-rain' style={{color:'#a4b0be'}}></i>)}
      else {setIcon(<i className='fas fa-cloud' style={{color:'#dfe4ea'}}></i>)}
        
    }
    fetchApi();
  },[search]);

 
  return (
  <div className="box">
       <div className="inputData">
         <input type="search" className="inputField" onChange={(event)=>{setSearch(event.target.value)}}/>
       </div>
    
    <div id="weathercon">
        {icon}
    </div>
    {city ?
    <div className="info"> 
         <h2 className="location">
          <i className="fas fa-street-view" style={{color:'grey'}}></i>
         {city}, {country}
        </h2>
         <p id="date">{dates}</p>
         <h1 className="temp">{temp} °C</h1>
         <h3 className="tempmin_max">Min {tempmin} °C | Max {tempmax} °C</h3>
    </div>:<div className='errorMsg'>Invalid! Cityname</div>}
    <div className="wave one"></div>
    <div className="wave two"></div>
    <div className="wave three"></div>
  </div>
  );
}

export default App;
