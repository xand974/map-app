import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const MapBox = styled.div`
  height: 100vh;
  width: 100%;
`;

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(3.876716);
  const [lat, setLat] = useState(43.610769);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/xand974/cku5ipsl12agz18l6u2rvopzc",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <Container>
      <MapBox ref={mapContainer} className="map-container"></MapBox>
    </Container>
  );
}
