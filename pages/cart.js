import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
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
  font-size: 1.2rem;
  color: #84c441;
`;

const TourImageBox = styled(Link)`
  width: 70px;
  height: 100px;
  padding: 2px;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
  img {
    max-width: 80px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 5px;
    width: 100px;
    height: 100px;
    img {
      max-width: 100px;
      max-height: 70px;
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
      axios
        .post("/api/cart/", { ids: cartTours.map((tour) => tour.id) })
        .then((response) => {
          setTours(response.data);
          setHasProducts(true);
        })
        .catch((error) => {
          console.error("Error fetching cart tours:", error);
        });
    } else {
      setTours([]);
      setHasProducts(false);
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
  console.log(cartTours);
  
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      kind: cartTours.type,
      name,
      lastname,
      email,
      cartTours,
      currency: cartTours.currency,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const tours of cartTours) {
    const price = tours?.price || 0;
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
                    <th>Info</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour._id}>
                      <TourInfoCell>
                        <TourImageBox href={`/tour/${tour._id}`}>
                          <Image
                            width={140}
                            height={90}
                            src={tour.images[0]}
                            alt=""
                          />
                        </TourImageBox>
                        {tour.name}
                      </TourInfoCell>
                      {
                        <td>
                          <p>{tour.name}</p>
                          <p>
                            Adultos:{" "}
                            {
                              cartTours.find((item) => item.id === tour._id)
                                ?.adults
                            }
                          </p>
                          <p>
                            Niños:{" "}
                            {
                              cartTours.find((item) => item.id === tour._id)
                                ?.children
                            }
                          </p>
                          <p>
                            Fecha:{" "}
                            {
                              cartTours.find((item) => item.id === tour._id)
                                ?.date
                            }
                            (
                            {
                              cartTours.find((item) => item.id === tour._id)
                                ?.hour
                            }
                            )
                          </p>
                          <p>
                            Tipo:{" "}
                            {
                              cartTours.find((item) => item.id === tour._id)
                                ?.type
                            }
                          </p>
                          <p>
                            Moneda:{" "}
                            {
                              cartTours.find((item) => item.id === tour._id)
                                ?.currency
                            }
                          </p>
                        </td>
                      }
                      <td>
                        ${cartTours.find((item) => item.id === tour._id)?.price}
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
            {hasProducts && (
              <Button green onClick={clearCart}>
                Vaciar Carrito
              </Button>
            )}
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
                margin
              />
              <Input
                type="text"
                placeholder="Apellido"
                value={lastname}
                name="lastname"
                onChange={(ev) => setLastname(ev.target.value)}
                margin
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
                margin
              />
              <Button block green onClick={goToPayment}>
                Realizar el pago
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
      <Footer />
    </>
  );
}
