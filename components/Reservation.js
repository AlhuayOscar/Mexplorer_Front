import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import styled, { css } from "styled-components";
import CartIcon from "@mui/icons-material/ShoppingCartRounded";
import Button from "@/components/Button";
import Input from "@/components/Input";
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
      scale: 1.1;
      color: #fff;
    `}
`;

const Select = styled.select`
  width: 100%;
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
    border: 2px solid #84c441;
    outline: none;
  }
`;

export default function Reservation({ tour, sticky, reservationsRef }) {
  const { addTour } = useContext(CartContext);
  const { cartTours } = useContext(CartContext);
  const [date, setDate] = useState();

  const initialOrderData = {
    /* (estado inicial existente) */
  };

  const [orderData, setOrderData] = useState(initialOrderData);

  // Paso 1: Estado para alternar entre precio en dólares y pesos
  const [showPriceInMXN, setShowPriceInMXN] = useState(false);

  // Paso 2: Calcula el precio en pesos mexicanos
  const priceInMXN =
    tour.price.mxn.adultsPrice * orderData.adults +
    tour.price.mxn.childrenPrice * orderData.children;

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice;
      if (orderData.type === "reserva" && tour.reservation) {
        totalPrice =
          tour.price.mxn.adultsReservationPrice * orderData.adults +
          tour.price.mxn.childrenReservationPrice * orderData.children;
      } else {
        totalPrice =
          tour.price.usd.adultsPrice * orderData.adults +
          tour.price.usd.childrenPrice * orderData.children;
      }
      setOrderData({ ...orderData, price: totalPrice });
    };

    calculateTotalPrice();
  }, [orderData.adults, orderData.children, tour, orderData.type]);

  useEffect(() => {
    setOrderData(initialOrderData);
    setDate("");
  }, [tour]);

  const handleTypeClick = (type) => {
    setOrderData({ ...orderData, type: type });
  };

  const handleSelect = (e) => {
    const schedule = e.target.value;
    setOrderData({ ...orderData, hour: schedule });
  };

  console.log(cartTours);
  return (
    <ReservationBox sticky={sticky ? "sticky" : ""} ref={reservationsRef}>
      <ResercaTitle>RESERVA AHORA!</ResercaTitle>
      {tour.reservation ? (
        <TypeBox>
          <Types
            active={orderData.type === "Reserva"}
            onClick={() => handleTypeClick("Reserva")}
          >
            Reserva
          </Types>
          <Types
            active={orderData.type === "Compra"}
            onClick={() => handleTypeClick("Compra")}
          >
            Compra
          </Types>
        </TypeBox>
      ) : (
        <TypeBox padding>Compra</TypeBox>
      )}

      <Box>
        <Titles>Adultos</Titles>
        <Input
          placeholder="Cantidad de personas"
          type="number"
          value={orderData.adults}
          onChange={(e) =>
            setOrderData({ ...orderData, adults: e.target.value })
          }
          min={1}
        />
        <Titles>Niños</Titles>
        <Input
          placeholder="Cantidad de niños"
          type="number"
          value={orderData.children}
          min={0}
          onChange={(e) =>
            setOrderData({ ...orderData, children: e.target.value })
          }
        />

        <Titles>Hora</Titles>
        <Select onChange={handleSelect}>
          {tour.schedule?.map((schedule) => (
            <option key={schedule.id} value={schedule}>
              {schedule}
            </option>
          ))}
        </Select>
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
            {showPriceInMXN ? `${priceInMXN} MXN` : `${orderData.price} USD`}
            <span>USD</span>
          </div>
        </Price>
        {/* Botón para cambiar entre USD y MXN */}
        <ButtonR onClick={() => setShowPriceInMXN(!showPriceInMXN)}>
          Mostrar en {showPriceInMXN ? "USD" : "MXN"}
        </ButtonR>
        {orderData.type === "reserva" ? (
          <ButtonR type="submit" green onClick={() => addTour(orderData)}>
            <CartIcon />
            Reserva
          </ButtonR>
        ) : (
          <ButtonR type="submit" green onClick={() => addTour(orderData)}>
            <CartIcon />
            Compra
          </ButtonR>
        )}
      </Box>
    </ReservationBox>
  );
}
