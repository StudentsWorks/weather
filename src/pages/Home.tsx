import Forecast from '../components/Forecast';
import React, { useState } from 'react';
import {cloudy, locate} from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonFab,
  IonFabButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonSlides,
  IonSlide,
} from '@ionic/react';
import './Home.css';




const Home: React.FC = () => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [coords, setCoords] = useState<{lat: number, lon: number}>({lat: 49.08211028837632, lon: 19.28503290290511});
  const refresher = React.useRef<any>();


  React.useEffect(() => {
    if(!loading) return;
    fetch(`https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${coords.lat}&lon=${coords.lon}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (refresher.current) refresher.current()
          refresher.current = null
          setLoading(false);
          setData(result);
        },
        (error) => {
          console.error(error);
        }
      )
  }, [loading]);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        setCoords({lat: coords.latitude, lon: coords.longitude})
        setLoading(true)
      })
    }
  }

  const refresh = (e: CustomEvent) => {
    refresher.current = () => e.detail.complete()
    setLoading(true);
  };

  if (!data) return null;

  const forecast = data.properties.timeseries[0];

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Predpoveď počasia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonFab vertical="top" horizontal="end" edge slot="fixed">
          <IonFabButton onClick={handleLocation}>
            <IonIcon icon={locate} />
          </IonFabButton>
        </IonFab>
        <Forecast forecast={forecast} title="Aktuálne" />
        <IonSlides pager={true}>
          {data.properties.timeseries
            .filter((forecast: any) => (new Date(forecast.time)).getHours() === 13)
            .map((forecast: any) => (
              <IonSlide key={forecast.time}>
                <Forecast forecast={forecast} />
              </IonSlide>
            ))}
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Home;
