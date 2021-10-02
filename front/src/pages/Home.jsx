import { useState } from "react";
import MapBoxGL, { Marker, Popup } from "react-map-gl";
import styled from "styled-components";
import { RoomOutlined, StarOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import api from "config/api";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

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

const PopUpCreate = styled.div`
  width: 200px;
  height: 250px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  outline: none;
  border: none;
  margin: 10px 0;
  color: gray;
`;

const Button = styled.button`
  border: 1px solid #1a2637;
  background: none;
  border-radius: 5px;
  color: #1a2637;
  padding: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    background: #1a2637;
    color: white;
  }
`;

export default function Home() {
  const [pinSelected, setPinSelected] = useState(null);
  const [pins, setPins] = useState([]);
  const [coordinate, setCoordinate] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const history = useHistory();
  const user = useSelector((state) => state.user.user);

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
            token: user.accessToken,
          },
        });
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPins();
  }, [user]);

  const handleCreate = (e) => {
    const [lon, lat] = e.lngLat;
    setCoordinate((prev) => {
      return {
        ...prev,
        longitude: lon,
        latitude: lat,
      };
    });
  };

  const handleClick = async () => {
    try {
      await api.post(
        "/pins/add",
        { ...coordinate, title, description, rating, username: "alexandre" },
        {
          headers: {
            token: user.accessToken,
          },
        }
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <MapBoxGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapStyle="mapbox://styles/xand974/cku5ipsl12agz18l6u2rvopzc"
        // transitionDuration="300"
        onDblClick={handleCreate}
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
                  tipSize={20}
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
        {coordinate && (
          <>
            <Marker
              longitude={coordinate.longitude}
              latitude={coordinate.latitude}
            >
              <RoomOutlined />
            </Marker>
            <Popup
              longitude={coordinate.longitude}
              latitude={coordinate.latitude}
              anchor="right"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setPinSelected(null)}
            >
              <PopUpCreate>
                <Form onSubmit={(e) => e.preventDefault()}>
                  <Title>Create a pin</Title>
                  <Label>Title</Label>
                  <Input
                    placeholder="plage de l'ermitage"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Label>Description</Label>
                  <Input
                    placeholder="j'aime bien cette plage, endroit où on peut se détendre"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Label>Rating</Label>
                  <Input
                    onChange={(e) => setRating(e.target.value)}
                    type="number"
                    max={7}
                    placeholder="notez cette endroit sur 7"
                  />
                  <Button onClick={handleClick}>Créer</Button>
                </Form>
              </PopUpCreate>
            </Popup>
          </>
        )}
        );
      </MapBoxGL>
    </Container>
  );
}
