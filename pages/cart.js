import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const TourInfoCell = styled.td`
  padding: 10px 0;
`;

const TourImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartTours, addTour, removeTour, clearCart } = useContext(CartContext);
  const [tours, setTours] = useState([]);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasProducts, setHasProducts] = useState(false);

  useEffect(() => {
    if (cartTours.length > 0) {
      axios.post("/api/cart", { ids: cartTours }).then((response) => {
        setTours(response.data);
        setHasProducts(true); // Actualiza el estado hasProducts a true
      });
    } else {
      setTours([]);
      setHasProducts(false); // Actualiza el estado hasProducts a false
    }
  }, [cartTours]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisTour(id) {
    addTour(id);
  }
  function lessOfThisTour(id) {
    removeTour(id);
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      kind: "Compra",
      name,
      lastname,
      email,
      currency: 'USD',
      cartTours,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const tourId of cartTours) {
    const price = tours.find((p) => p._id === tourId)?.adultsPrice || 0;
    total += price;
  }
  total = total.toFixed(2); //Para redondear a 2 decimales
  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Gracias por la orden!</h1>
              <p>Se enviará un correo con la confirmación de su compra.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Carrito</h2>
            {!cartTours?.length && (
              <div>
                Tu carrito actualmente está vacio, probá agregando tours!
              </div>
            )}
            {tours?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour._id}>
                      <TourInfoCell>
                        <TourImageBox>
                          <img src={tour.images[0]} alt="" />
                        </TourImageBox>
                        {tour.title}
                      </TourInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisTour(tour._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {cartTours.filter((id) => id === tour._id).length}
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisTour(tour._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartTours.filter((id) => id === tour._id).length *
                          tour.adultsPrice}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
            {hasProducts && <Button onClick={clearCart}>Vaciar Carrito</Button>}
          </Box>
          {!!cartTours?.length && (
            <Box>
              <h2>Información de la orden</h2>
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
              <Button black block onClick={goToPayment}>
                Realizar el pago
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
