import React from 'react';
import {IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from '@ionic/react';
import {cloudy, rainy, snow, sunny, thunderstorm, navigate} from 'ionicons/icons'
import './Forecast.css';



const icons: any = {
  cloudy: cloudy,
  partlycloudy_day: cloudy,
  fog: cloudy,
  rain: rainy,
  snow: snow,
  lightsnow: snow,
  clearsky_day: sunny,
  fair_day: sunny,
  heavyrainandthunder: thunderstorm,
  lightsleet: rainy,
  lightrain: rainy,
}

const formatDate = (date: Date|string) => {
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
  const dateTimeFormat = new Intl.DateTimeFormat('sk-SK', options);
  return dateTimeFormat.format(new Date(date));
}

interface ForecastProps {
  title?: string;
  forecast: any;
}

const Forecast: React.FC<ForecastProps> = ({title, forecast}) => {
  const air_temperature = forecast.data['instant']?.details?.air_temperature
  const symbol_code = forecast.data['next_12_hours']?.summary?.symbol_code
  const precipitation_amount = forecast.data['next_6_hours']?.details?.precipitation_amount
  const wind_from_direction = forecast.data['instant']?.details?.wind_from_direction
  const wind_speed = forecast.data['instant']?.details?.wind_speed

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{title || formatDate(forecast.time)}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
    <IonList inset lines="none">
      <IonItem>
        <IonLabel>Obloha: </IonLabel>
        <IonText color="secondary">
          {icons[symbol_code]
            ? <IonIcon color="primary" src={icons[symbol_code]} />
            : symbol_code}
        </IonText>
      </IonItem>
      <IonItem>
        <IonLabel>Teplota: </IonLabel>
        <IonText >
          {air_temperature}°C
        </IonText>
      </IonItem>
      <IonItem>
        <IonLabel>Zrážky: </IonLabel>
        <IonText >
          {precipitation_amount}mm
        </IonText>
      </IonItem>
      <IonItem>
        <IonLabel>Vietor: </IonLabel>
        <IonText >
          {wind_speed} m/s
          <IonIcon className="wind" color="primary" style={{'--wind-dir': `${wind_from_direction-45}deg`}} src={navigate} />
        </IonText>
      </IonItem>
    </IonList>
      </IonCardContent>
    </IonCard>
  )
}

export default Forecast
