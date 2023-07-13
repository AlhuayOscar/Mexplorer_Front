import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker({ value, onChange }) {
  const handleDateChange = (date) => {
    onChange(date);
  };

  return (
    <DatePicker
      selected={value}
      onChange={handleDateChange}
      placeholderText="Selecciona una fecha"
      value={value}
    />
  );
}