import styled from "styled-components";
import Button from "@/components/Button";
import MyDatePicker from "./DatePicker";
import { useState } from "react";

export default function Reservation() {
  const [persons, setPersons] = useState(null);
  return (
    <form>
      <MyDatePicker />
      <label>Cantidad de personas</label>
      <input
        type="number"
        value={persons}
        onChange={(e) => setPersons(e.target.value)}
      />
    </form>
  );
}
