import styled from "styled-components";
import MyDatePicker from "./DatePicker";
import Button from "./Button";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";

const ReservationBox = styled.div`
  align-items: center;
  border: 1px solid gray;
  border-radius: 7px;
  width: 21rem;
  height: 22rem;
  background-color: #fff;
  box-shadow: 2px 2px 4px #47556955;
  text-decoration: none;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    height: 24rem;
    width: 23rem;
    box-shadow: 2px 2px 4px #47556966;
  }
`;

const Price = styled.h3`
  border: solid 1px;
  width: 5rem;
  font-size: 1rem;
  margin-top: 5px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
`;

export default function Reservation({ tour }) {
  const [persons, setPersons] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      kind: "Reserva",
      name,
      lastname,
      email,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  return (
    <form>
      <ReservationBox>
        <Box>
          <h2>RESERVA AHORA!</h2>
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            name="name"
            onChange={(ev) => setName(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="Apellido"
            value={lastname}
            name="lastname"
            onChange={(ev) => setLastname(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Input
            placeholder="Cantidad de personas"
            type="number"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            min={1}
          />
          <MyDatePicker />
          <Price>{tour.reservationPrice} USD</Price>
          <Button black block onClick={goToPayment}>
            Realizar el pago
          </Button>
        </Box>
      </ReservationBox>
    </form>
  );
}
