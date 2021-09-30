import styled from "styled-components";
import { PushPin } from "@mui/icons-material";

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

export default function Register() {
  return (
    <Container>
      <Card>
        <Form></Form>
        <PushPin />
      </Card>
    </Container>
  );
}
