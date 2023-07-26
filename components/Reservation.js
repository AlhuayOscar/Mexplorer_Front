import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import styled, { css } from "styled-components";
import CartIcon from "@/components/icons/CartIcon";
import MyDatePicker from "./DatePicker";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const ReservationBox = styled.div`
  overflow: hidden;
  border-radius: 7px;
  width: 100hv;
  margin: 40px 0;
  background-color: #fff;
  box-shadow: 2px 2px 4px #47556955;
  text-decoration: none;
  height: fit-content;
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

/* const ReservationBox = styled.div`
  ${ReservationStyle}
`; */

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
  background-color: #84c441;
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
      background-color: #84c441;
      /* border: 2px solid #fff; */
      scale: 1.1;
      color: #fff;
    `}
`;

export default function Reservation({ tour, sticky, reservationsRef }) {
  const { addTour } = useContext(CartContext);
  const { cartTours } = useContext(CartContext);

  /* const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState();
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('compra') */
  const [date, setDate] = useState();

  const initialOrderData = {
    id: tour._id,
    name: tour.name,
    type: "compra",
    adults: 1,
    children: 0,
    date: dayjs(date).format("DD/MM/YYYY"),
    hour: "10:00 a.m",
    price: tour.price?.usd?.adultsPrice, // ? added for validation
  };

  const [orderData, setOrderData] = useState(initialOrderData);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice;
      if (orderData.type === "reserva" && tour.reservation) {
        totalPrice =
          tour.price?.usd?.adultsReservationPrice * orderData.adults +
          tour.price?.usd?.childrenReservationPrice * orderData.children; // ? added for validation
      } else {
        totalPrice =
          tour.price?.usd?.adultsPrice * orderData.adults +
          tour.price?.usd?.childrenPrice * orderData.children; // ? added for validation
      }
      setOrderData({ ...orderData, price: totalPrice });
    };

    calculateTotalPrice();
  }, [orderData.adults, orderData.children, tour, orderData.type]);

  useEffect(() => {
    setOrderData(initialOrderData);
    setDate("");
  }, [tour]);

  /*  async function goToPayment(e) {
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
 */
  const handleTypeClick = (type) => {
    setOrderData({ ...orderData, type: type });
  };

  console.log(cartTours);
  return (
    <ReservationBox sticky={sticky ? "sticky" : ""} ref={reservationsRef}>
      <ResercaTitle>RESERVA AHORA!</ResercaTitle>
      {tour.reservation ? (
        <TypeBox>
          <Types
            active={orderData.type === "reserva"}
            onClick={() => handleTypeClick("reserva")}
          >
            Reserva
          </Types>
          <Types
            active={orderData.type === "compra"}
            onClick={() => handleTypeClick("compra")}
          >
            Compra
          </Types>
        </TypeBox>
      ) : (
        <TypeBox padding>Compra</TypeBox>
      )}

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
          value={orderData.adults}
          onChange={(e) =>
            setOrderData({ ...orderData, adults: e.target.value })
          }
          min={1}
        />
        <Titles>Niños</Titles>
        <InputRes
          placeholder="Cantidad de niños"
          type="number"
          value={orderData.children}
          onChange={(e) =>
            setOrderData({ ...orderData, children: e.target.value })
          }
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
          views={["year", "month", "day"]}
          value={date}
          onChange={(date) => {
            setDate(date);
          }}
        />

        <Price>
          <label>Total</label>
          <div>
            ${orderData.price}
            <span>USD</span>
          </div>
        </Price>
        {orderData.type === "reserva" ? (
          <ButtonR type="submit" green onClick={() => addTour(orderData)}>
            Reserva
          </ButtonR>
        ) : (
          <ButtonR type="submit" green onClick={() => addTour(orderData)}>
            Compra
          </ButtonR>
        )}
      </Box>
    </ReservationBox>
  );
}
