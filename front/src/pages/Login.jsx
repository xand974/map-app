import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "redux/apiCalls";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
`;

const Card = styled.div`
  box-shadow: 0 0 20px black;
  padding: 20px;
  background: #000b44;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 20px;
  color: white;
  margin: 20px;
`;

const Input = styled.input`
  outline: none;
  padding: 10px;
  margin: 0 20px;
  background: none;
  border: none;
  border-bottom: 1px solid black;
  color: white;
`;
const Button = styled.button`
  padding: 10px;
  background-color: none;
  color: black;
  font-weight: bold;
  border: 1xp solid black;
  border-radius: 5px;
  margin: 20px;
  cursor: pointer;
`;
const Text = styled.p`
  color: gray;
`;

export default function Login() {
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleClick = () => {
    login(userInput, dispatch);
    history.push("/");
  };
  return (
    <Container>
      <Card>
        <Title>connexion perdue ?</Title>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Label>Username</Label>
          <Input
            placeholder="john"
            value={userInput.username}
            name="username"
            onChange={handleChange}
          />
          <Label>Password</Label>
          <Input
            placeholder="..."
            type="password"
            value={userInput.password}
            name="password"
            onChange={handleChange}
          />
          <Button onClick={handleClick}>Se connecter</Button>
          <Text>
            Pas encore de compte ? Créez en un{" "}
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to="/register"
            >
              ici
            </Link>{" "}
          </Text>
        </Form>
      </Card>
    </Container>
  );
}
