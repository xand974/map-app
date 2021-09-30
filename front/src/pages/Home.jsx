import { useState } from "react";
import MapBoxGL, { Marker } from "react-map-gl";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

export default function Home() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 43.610769,
    longitude: 3.876716,
    zoom: 8,
  });

  return (
    <Container>
      <MapBoxGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/xand974/cku5ipsl12agz18l6u2rvopzc"
      >
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          offsetLeft={-20}
          offsetTop={-10}
        ></Marker>
      </MapBoxGL>
    </Container>
  );
}
