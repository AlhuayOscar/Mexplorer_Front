import React, { useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import CartIcon from "@/components/icons/CartIcon";
import MyDatePicker from "./DatePicker";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const ReservationStyle = css`
  overflow: hidden;
  border-radius: 7px;
  width: 100hv;
  margin: 40px 0;
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
  border: 1px solid #0006;
  &:hover {
    border: 1px solid #000;
    outline: none;
  }
  &:focus {
    border: 2px solid #00abbd;
    outline: none;
  }
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  align-items: center;
  background-color: #00abbd;
  justify-content: center;
  width: 80%;
  height: 4rem;
  margin: 20px 0;
  padding: 10px;
  font-size: 1.8rem;
  font-weight: 400;
  color: #fff;
  
  label {
    font-size: 0.8rem;
    align-self: start;
    justify-self: flex-start;
  }
  
  div {
    display: flex;
    align-items: center;
  }
  
  span {
    font-size: 0.9rem;
    align-self: flex-start;
  }
`;

const Titles = styled.label`
  align-self: flex-start;
  text-align: left;
`;

const Date = styled(DatePicker)`
  width: 100%;
  margin: 10px 0;
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

const TypeBox = styled.div`
  display: flex;
  width: 100%;
  color: #fff;
  background-color: #84C441;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const Types = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: #699c34;
  box-sizing: border-box;
  color: #ddd;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      background-color: #84C441;
      /* border: 2px solid #fff; */
      scale: 1.1;
      color: #fff;
    `}
`;

export default function Reservation({ tour, sticky, reservationsRef }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState();
/*   const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState(""); */
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('compra')

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice;
      if (type === 'reserva' && tour.reservation) {
        totalPrice =
          tour.price.usd.adultsReservationPrice * adults + tour.price.usd.childrenReservationPrice * children;
      } else {
        totalPrice = tour.price.usd.adultsPrice * adults + tour.price.usd.childrenPrice * children;
      }
      setPrice(totalPrice);
    };

    calculateTotalPrice(); 

  }, [adults, children, tour, type]);

  async function goToPayment(e) {
    e.preventDefault();
    const response = await axios.post("/api/reservationcheckout", {
      kind: "Reserva",
      name,
      lastname,
      email,
      tour,
      adults,
      children,
      price,
      date,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  const logSelectedDate = (date) => {
    console.log("Fecha seleccionada:", date);
  };

  const handleTypeClick = (e) => {
    event.preventDefault
    const type = e.target.getAttribute('name')
    setType(type);
  };

  return (
    <form onSubmit={goToPayment} ref={reservationsRef}>
      <ReservationBox sticky={sticky ? "sticky" : ""}>
        <ResercaTitle>RESERVA AHORA!</ResercaTitle>
        {tour.reservation ?
          <TypeBox>
          <Types name='reserva' 
                 active={type === 'reserva'}
                 onClick={handleTypeClick}>
                  Reserva
          </Types>
          <Types name='compra' 
                 active={type === 'compra'}
                 onClick={handleTypeClick}>
                  Compra
          </Types>
      </TypeBox>
      : <TypeBox padding> 
          Compra
        </TypeBox>}
        
        <Box>
{/*           <Titles>Nombre</Titles>
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
          /> */}
          
          <Titles>Adultos</Titles>
          <InputRes
            placeholder="Cantidad de personas"
            type="number"
            value={adults}
            onChange={(e) => setAdults(e.target.value)}
            min={1}
          />
          <Titles>Niños</Titles>
          <InputRes
            placeholder="Cantidad de niños"
            type="number"
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            min={0}
          />
          
            {/* <MyDatePicker
              inline={true}
              value={date}
              satHighlight={true}
              onChange={(date) => {
                setDate(date);
                logSelectedDate(date);
              }}
            /> */}
            <Titles>Elige una fecha</Titles>
            <Date
            disablePast
            format="DD/MM/YYYY"
            /* label='Elige una fecha' */
            views={['year', 'month', 'day']}
            value={date}
            onChange={date => {setDate(date)}}/>
          
          <Price>
            <label>Total</label>
            <div>
              ${price}
              <span>USD</span>
            </div>
          </Price>
          {type === 'reserva' ? 
            <ButtonR type="submit" green>Reserva</ButtonR>
          : <ButtonR type="submit" green>Compra</ButtonR>}
          
        </Box>
      </ReservationBox>
    </form>
  );
}
