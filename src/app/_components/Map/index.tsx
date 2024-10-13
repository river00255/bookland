'use client';
import { useEffect } from 'react';

const { naver }: any = window;

const Map = ({ lat, lng, width, height }: { lat: number; lng: number; width: string; height: string }) => {
  const getMap = () => {
    const container = document.getElementById('map');

    const mapOptions = {
      center: new naver.maps.LatLng(lat, lng),
      zoom: 14,
    };

    const map = new naver.maps.Map(container, mapOptions);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map: map,
    });

    return map;
  };

  useEffect(() => {
    getMap();
  }, []);

  return <div id="map" style={{ width, height }}></div>;
};

export default Map;
