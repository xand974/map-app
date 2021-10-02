import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Card = styled.div`
  width: 500px;
  height: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 20px;
  color: gray;
`;

const Input = styled.input`
  outline: none;
  padding: 10px;
`;
const Button = styled.button`
  padding: 10px;
  background-color: #aaebbeae;
  border-radius: 10px;
`;

export default function Register() {
  return (
    <Container>
      <Card>
        <Form>
          <Label>Username</Label>
          <Input placeholder="john" />
          <Label>Password</Label>
          <Input placeholder="..." type="password" />
          <Button>Créer un compte</Button>
        </Form>
      </Card>
    </Container>
  );
}
