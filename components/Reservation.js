import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import styled, { css } from "styled-components";
import CartIcon from "@mui/icons-material/ShoppingCartRounded";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

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
  font-size: 1.1rem;
  padding: 1rem;
  text-align: center;
  &:hover {
    scale: 1.05;
    background-color: #699c34;
  }
`;

const ButtonC = styled(Button)`
  font-size: 1.4rem;
  padding: 0.2rem 2rem;
  text-align: center;
  margin-block: 0.5rem;
  transition: 0.4s ease;
  &:hover {
    scale: 1.05;
    background-color: #699c34;
    color: #fff;
    transition: 0.4s ease;
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
  const { t } = useTranslation();
  const { addTour } = useContext(CartContext);
  const { cartTours } = useContext(CartContext);
  const [date, setDate] = useState();
  const [showPriceInMXN, setShowPriceInMXN] = useState(false);

  const initialOrderData = {
    id: tour._id,
    name: tour.name,
    type: "Compra",
    adults: 1,
    children: 0,
    date: dayjs(date).format("DD/MM/YYYY"),
    hour: "",
    price: tour.price?.usd?.adultsPrice,
    currency: "USD",
  };

  const [orderData, setOrderData] = useState(initialOrderData);
  const priceInMXN =
    tour.price?.mxn?.adultsPrice * orderData.adults +
      tour.price?.mxn?.childrenPrice * orderData.children || 0;
  const priceInUSD =
    tour.price?.usd?.adultsPrice * orderData.adults +
      tour.price?.usd?.childrenPrice * orderData.children || 0;

  useEffect(() => {
    const calculateTotalPrice = () => {
      let totalPrice;
      if (orderData.type === "reserva" && tour.reservation) {
        totalPrice =
          tour.price?.mxn?.adultsReservationPrice * orderData.adults +
            tour.price?.mxn?.childrenReservationPrice * orderData.children || 0;
      } else {
        totalPrice =
          tour.price?.usd?.adultsPrice * orderData.adults +
            tour.price?.usd?.childrenPrice * orderData.children || 0;
      }
      setOrderData({ ...orderData, price: totalPrice });
    };

    calculateTotalPrice();
  }, [orderData.adults, orderData.children, tour, orderData.type]);

  const handleCurrencyChange = () => {
    const newCurrency = !showPriceInMXN ? "MXN" : "USD";
    const newPrice = !showPriceInMXN ? priceInMXN : priceInUSD;
    setShowPriceInMXN(!showPriceInMXN);
    setOrderData({ ...orderData, currency: newCurrency, price: newPrice });
  };
  useEffect(() => {
    setOrderData(initialOrderData);
    setDate("");
  }, [tour]);

  const isAvailable = (date) => {
    const day = date.day();
    return tour.unavailableDays.includes(day);
  };

  const handleTypeClick = (type) => {
    setOrderData({ ...orderData, type: type });
  };

  const handleSelect = (e) => {
    const schedule = e.target.value;
    setOrderData({ ...orderData, hour: schedule });
  };
  const handleAddToCartC = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const tourId = orderData.id;

    // Verifica si el ID del tour ya existe en el carrito
    const isTourInCart = existingCart.some((item) => item.id === tourId);

    if (isTourInCart) {
      // Si el tour ya está en el carrito, muestra el warning
      Swal.fire({
        icon: "warning",
        title: "¡Ya tienes este producto en el carrito!",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return; // No agregues el tour al carrito nuevamente
    }

    // Si el tour no está en el carrito, agrégalo
    addTour(orderData);

    // Agrega el Sweet Alert de éxito aquí
    Swal.fire({
      icon: "success",
      title: "¡Añadido al carrito exitosamente!",
      timer: 1600,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const handleAddToCartR = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const tourId = orderData.id;

    // Verifica si el ID del tour ya existe en el carrito
    const isTourInCart = existingCart.some((item) => item.id === tourId);

    if (isTourInCart) {
      // Si el tour ya está en el carrito, muestra el warning
      Swal.fire({
        icon: "warning",
        title: "¡Ya tienes este producto en el carrito!",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return; // No agregues el tour al carrito nuevamente
    }

    // Si el tour no está en el carrito, agrégalo
    addTour(orderData);

    // Agrega el Sweet Alert de éxito aquí
    Swal.fire({
      icon: "success",
      title: "¡Añadido al carrito exitosamente!",
      timer: 1600,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <ReservationBox sticky={sticky ? "sticky" : ""} ref={reservationsRef}>
      <ResercaTitle>{t("Reserva ahora!!")}!</ResercaTitle>
      {tour.reservation ? (
        <TypeBox>
          <Types
            active={orderData.type === "Reserva"}
            onClick={() => handleTypeClick("Reserva")}
          >
            {t("Reserva")}
          </Types>
          <Types
            active={orderData.type === "Compra"}
            onClick={() => handleTypeClick("Compra")}
          >
            {t("Compra")}
          </Types>
        </TypeBox>
      ) : (
        <TypeBox padding>{t("Compra")}</TypeBox>
      )}

      <Box>
        <Titles>{t("Adultos")}</Titles>
        <Input
          placeholder="Cantidad de personas"
          type="number"
          value={orderData.adults}
          onChange={(e) =>
            setOrderData({ ...orderData, adults: e.target.value })
          }
          min={1}
        />
        <Titles>{t("Niños")}</Titles>
        <Input
          placeholder="Cantidad de niños"
          type="number"
          value={orderData.children}
          min={0}
          onChange={(e) =>
            setOrderData({ ...orderData, children: e.target.value })
          }
        />

        <Titles>{t("Hora")}</Titles>
        <Select onChange={handleSelect}>
          {tour.schedule?.map((schedule) => (
            <option key={schedule.id} value={schedule}>
              {schedule}
            </option>
          ))}
        </Select>
        <Titles>{t("Elige una fecha")}</Titles>
        <Date
          disablePast
          shouldDisableDate={(date) => !isAvailable(date)}
          format="DD/MM/YYYY"
          views={["year", "month", "day"]}
          value={date}
          onChange={(date) => {
            setDate(date);
          }}
        />

        <Price>
          <label>{t("Total")}</label>
          <div>
            {showPriceInMXN ? `$ ${priceInMXN}` : `$ ${priceInUSD}`}
            <span>{showPriceInMXN ? "MXN" : "USD"}</span>
          </div>
        </Price>
        <ButtonC onClick={handleCurrencyChange}>
          {t("Mostrar en")} {showPriceInMXN ? "USD" : "MXN"}
        </ButtonC>
        {orderData.type === "reserva" ? (
          <ButtonC type="submit" green onClick={handleAddToCartC}>
            <CartIcon />
            {t("Añadir a mi carrito de compras")}!!
          </ButtonC>
        ) : (
          <ButtonR type="submit" green onClick={handleAddToCartR}>
            <CartIcon />
            {t("Añadir a mi carrito de compras")}
          </ButtonR>
        )}
      </Box>
    </ReservationBox>
  );
}
