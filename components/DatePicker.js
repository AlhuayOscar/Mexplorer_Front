import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      placeholderText="Selecciona una fecha"
    />
  );
};
