import styled from "styled-components";
import CartIcon from "@/components/icons/CartIcon";
import MyDatePicker from "./DatePicker";
import Button from "./Button";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";

const ReservationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 7px;
  width: 100hv;
  margin: 20px 0;
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

const InputRes = styled.input`
  width: 95%;
  padding: 10px;
  border-radius: 7px;
  margin: 10px;
  font-size: 0.9rem;
`;

const Price = styled.h3`
  border: solid 1px;
  width: 5rem;
  font-size: 1rem;
  margin-top: 5px;
`;

const Titles = styled.label`
  align-self: flex-start;
  text-align: left;
`;

const Date = styled.div`
  width: 100%;
`;

export default function Reservation({ tour }) {
  const [persons, setPersons] = useState(1);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  async function goToPayment(e) {
    e.preventDefault();
    const response = await axios.post("/api/reservationcheckout", {
      kind: "Reserva",
      name,
      lastname,
      email,
      tour,
      persons,
      date
    });
    console.log(response.date);
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  return (
    <form onSubmit={goToPayment}>
      <ReservationBox>
        
          <h2>RESERVA AHORA!</h2>
          <Titles>Nombre</Titles>
          <InputRes
            type="text"
            placeholder="Nombre"
            value={name}
            name="name"
            onChange={(ev) => setName(ev.target.value)}
          />
          <Titles>Apellido</Titles>
          <InputRes
            type="text"
            placeholder="Apellido"
            value={lastname}
            name="lastname"
            onChange={(ev) => setLastname(ev.target.value)}
          />
          <Titles>Email</Titles>
          <InputRes
            type="text"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Titles>Adultos</Titles>
          <InputRes
            placeholder="Cantidad de personas"
            type="number"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            min={1}
          />
          <Date>
            <MyDatePicker
              inline={true}
              value={date}
              satHighlight={true}
              onChange={(ev) => { return console.log(ev.target.value)
                  setDate(ev.target.value)}}
            />
          </Date>
          <Price>{tour.reservationPrice * persons} USD</Price>
          <Button type="submit">Pagar</Button>
        
      </ReservationBox>
    </form>
  );
}
