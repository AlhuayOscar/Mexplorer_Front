import styled, { css } from "styled-components";
import CartIcon from "@/components/icons/CartIcon";
import MyDatePicker from "./DatePicker";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";

const ReservationStyle = css`
  overflow: hidden;
  border-radius: 7px;
  width: 100hv;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 2px 2px 4px #47556955;
  text-decoration: none;
  ${(props) =>
    props.sticky &&
    css`
      position: sticky;
      top: 20px;
    `}
  @media screen and (min-width: 768px) {
    width: 23rem;
    box-shadow: 2px 2px 4px #47556966;
  }
`;

const ReservationBox = styled.div`
  ${ReservationStyle}
`;

const ResercaTitle = styled.div`
  text-align: center;
  background-color: #00abbd;
  color: #fff;
  padding: 20px;
  font-size: 1.5rem;
`;

const Box = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputRes = styled.input`
  width: 95%;
  padding: 10px;
  border-radius: 7px;
  margin: 10px;
  font-size: 0.9rem;
  border: 2px solid #0006;
  &:focus {
    border: 2px solid #00abbd;
    background-color: #00abbd22;
    outline: none;
  }
`;

const Price = styled.div`
  display: flex;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  background-color: #00abbd;
  width: 80%;
  height: 4rem;
  margin: 20px 0;
  padding: 10px;
  font-size: 1.8rem;
  font-weight: 400;
  color: #fff;
  
  label {
    font-size: 0.8rem;
    align-self: flex-start;
    
    
  }
  div{
    display: flex;
    align-items: center;
  }
  span {
    font-size: 1rem;
    align-self: flex-start;
  }
`;

const Titles = styled.label`
  align-self: flex-start;
  text-align: left;
`;

const Date = styled.div`
  width: 100%;
`;

const ButtonR = styled(Button)`
  font-size: 1.4rem;
  padding: 1rem 7rem;
  text-align: center;
  &:hover {
    scale: 1.05;
    background-color: #699c34;
  }
`;

export default function Reservation({ tour, sticky, reservationsRef }) {
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
      date,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  const logSelectedDate = (date) => {
    console.log("Fecha seleccionada:", date);
  };

  return (
    <form onSubmit={goToPayment} ref={reservationsRef}>
      <ReservationBox sticky={sticky ? "sticky" : ""}>
        <ResercaTitle>RESERVA AHORA!</ResercaTitle>
        <Box>
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
              onChange={(date) => {
                setDate(date);
                logSelectedDate(date);
              }}
            />
          </Date>
          <Price>
            <label>Total</label>
            <div>
              {tour.reservationPrice * persons} 
              <span>USD</span>
            </div>
            </Price>
          <ButtonR type="submit" green>
            Reserva
          </ButtonR>
        </Box>
      </ReservationBox>
    </form>
  );
}
