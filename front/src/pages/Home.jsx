import { useState } from "react";
import MapBoxGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";
import { RoomOutlined, StarOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import api from "config/api";

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;
const PopUpContainer = styled.div`
  width: 250px;
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
  &:first-letter {
    text-transform: capitalize;
  }
`;

const MiniCard = styled.div`
  margin: 10px 20px;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  color: #1a2637;
  font-size: 15px;
  font-weight: bold;
  border-bottom: 1px solid #1a2637;
`;

const Info = styled.p`
  color: gray;
  font-size: 13px;
  display: flex;
  align-items: center;
`;

const Description = styled.span`
  color: gray;
  font-size: 13px;
  margin-left: 20px;
`;

export default function Home() {
  const [pinSelected, setPinSelected] = useState(null);
  const [pins, setPins] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 43.610769,
    longitude: 3.876716,
    zoom: 8,
  });
  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await api.get("/pins/all", {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTU0YjQ2MDIxZDYwNmI0N2Y5MDkyZjQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MzMwMzE3NTYsImV4cCI6MTYzMzExODE1Nn0.eA7IJsqukwo7domVdN8p2FYMHt4Fot1AcrllxgYOLLU",
          },
        });
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPins();
  }, []);

  return (
    <Container>
      <MapBoxGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/xand974/cku5ipsl12agz18l6u2rvopzc"
      >
        {pins.map((pin, key) => {
          return (
            <>
              <Marker
                key={pin._id}
                longitude={pin.longitude}
                latitude={pin.latitude}
                offsetLeft={-20}
                offsetTop={-10}
                onClick={() => {
                  setPinSelected(pin._id);
                }}
              >
                <RoomOutlined
                  style={{
                    color: "crimson",
                    fontSize: viewport.zoom * 10,
                    cursor: "pointer",
                  }}
                />
              </Marker>
              {pinSelected === pin._id && (
                <Popup
                  tipSize="20px"
                  key={key}
                  longitude={pin.longitude}
                  latitude={pin.latitude}
                  anchor="right"
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setPinSelected(null)}
                >
                  <PopUpContainer>
                    <Title>{pin.title}</Title>

                    <MiniCard>
                      <Label>Created By</Label>
                      <Info style={{ color: "crimson" }}>{pin.username}</Info>
                    </MiniCard>
                    <MiniCard>
                      <Label>Description</Label>
                      <Description>
                        {pin.description?.length > 23
                          ? pin.description?.substring(0, 23) + "..."
                          : pin.description || "endroit assez spécial ou.."}
                      </Description>
                    </MiniCard>
                    <MiniCard>
                      <Label>Rating</Label>
                      <Info>
                        {pin.rating}
                        <StarOutlined style={{ color: "crimson" }} />
                      </Info>
                    </MiniCard>
                    <MiniCard>
                      <Label>When ?</Label>
                      <Info>{pin.createdAt || "10 mins ago"}</Info>
                    </MiniCard>
                  </PopUpContainer>
                </Popup>
              )}
            </>
          );
        })}
        );
      </MapBoxGL>
    </Container>
  );
}
