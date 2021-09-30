import { useState } from "react";
import MapBoxGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";
import { PushPin, StarOutlined } from "@mui/icons-material";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;
const PopUpContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: #ffffff5b;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
  width: 100%;
  color: #1a2637;
`;

const MiniCard = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  box-shadow: 0 0 10px #0000005b;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;
const Label = styled.label`
  color: #1a2637;
  font-size: 15px;
  font-weight: bold;
`;

const Info = styled.p`
  color: gray;
  font-size: 12px;
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
        <Marker longitude={3} latitude={43} offsetLeft={-20} offsetTop={-10}>
          <PushPin style={{ color: "crimson", fontSize: viewport.zoom * 3 }} />
        </Marker>
        <Popup
          longitude={3}
          latitude={43}
          anchor="left"
          closeButton={true}
          closeOnClick={false}
        >
          <PopUpContainer>
            <Title>Arceau de Montpellier</Title>
            <Wrapper>
              <MiniCard>
                <Label>Description</Label>
                <Info>Un endroit assez spécial où vit du monde</Info>
              </MiniCard>
              <MiniCard>
                <Label>Created By</Label>
                <Info>Alexandre</Info>
              </MiniCard>
              <MiniCard>
                <Label>Rating</Label>
                <Info>
                  <StarOutlined />
                  <StarOutlined />
                  <StarOutlined />
                  <StarOutlined />
                  <StarOutlined />
                </Info>
              </MiniCard>
              <MiniCard>
                <Label>When ?</Label>
                <Info>20 mins ago</Info>
              </MiniCard>
            </Wrapper>
          </PopUpContainer>
        </Popup>
      </MapBoxGL>
    </Container>
  );
}
