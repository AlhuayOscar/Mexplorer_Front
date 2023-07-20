import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from '@mui/material/Slider';
import { styled as muiStyled } from '@mui/material/styles';


const BoxContainer = styled.div`
  position: sticky;
  top: 20px;
  height: 40rem;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #fff;
  box-shadow: 2px 2px 4px #47556955;
  border-radius: 7px;
  margin: 0;
  margin-bottom: 2rem;
  @media screen and (min-width: 768px) {
    width: 25%;
  }
`;

const TitleLabel = styled.label`
  background-color: #eeeeee;
  border-radius: 3px;
  font-size: 1rem;
  padding: 8px;
  margin: 2rem 0;
  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearButton = styled.button`
  background-color: #84c441;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PriceSlider = muiStyled(Slider)(() => ({
  margin: "20px auto",
  color: '#84C441',
  width: 230,
  height: 3,
  padding: '13px',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '1px solid #84C441',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    height: 5,
    backgroundColor: '#84C441',
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 62,
    height: 27,
    backgroundColor: '#84C441',
    transformOrigin: 'bottom left',
  },
}));

const DurationSlider = muiStyled(Slider)(() => ({
  margin: "20px auto",
  color: '#ed2286',
  width: 230,
  height: 3,
  padding: '13px',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '1px solid #ed2286',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    height: 5,
    backgroundColor: '#ed2286',
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 62,
    height: 27,
    backgroundColor: '#ed2286',
    transformOrigin: 'bottom left',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#ed228677',
    height: 8,
    width: 3,
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: '#ed2286',
    },
  },
}));

const marks = [
  {
    value: 0,
  },
  {
    value: 6,
  },
  {
    value: 12,
  },
  {
    value: 18,
  },
  {
    value: 24,
  },
];


export default function Filters({ tours, onFiltersChange, setCurrentPage }) {
  const [selectedReserva, setSelectedReserva] = useState("");
  const [selectedPromo, setSelectedPromo] = useState("");
  const [durationOptions, setDurationOptions] = useState(null);
  const [values, setValues] = useState([0, 1000]);


  const handleReservaChange = (event) => {
    setSelectedReserva(event.target.value);
  };

  const handleChange = (event, newValues) => {
    let [minValue, maxValue] = newValues;
    if (minValue > maxValue) {
      minValue = maxValue;
    }
    if (maxValue < minValue) {
      maxValue = minValue;
    }
    setValues([minValue, maxValue]);
  };

  const handlePromoChange = (event) => {
    setSelectedPromo(event.target.value);
  };

  const handleDurationChange = (event) => {
    const duration = parseInt(event.target.value);
    setDurationOptions(duration !== 0 ? duration : null);
  };

  const clearFilters = () => {
    setSelectedReserva('');
    setSelectedPromo('');
    setDurationOptions(null); // tiene 1 sentido
    setValues([0, 1000]); // tiene 2 sentido
    onFiltersChange(tours); // Restaurar todos los tours originales
  };

  useEffect(() => {
    filterTours();
  }, [selectedReserva, selectedPromo, durationOptions, values])

  // Filtrar tours según los filtros seleccionados
  const filterTours = () => {
    setCurrentPage(1);
    const filteredTours = tours.filter((tour) => {
      let meetsPromotionsFilter = true;
      let meetsDurationFilter = true;
      let meetsPriceRangeFilter = true;
      let meetsReservationFilter = true;

      if (selectedReserva === "true" && !tour.reservation) {
        meetsReservationFilter = false;
      }
      if (selectedPromo === "true" && !tour.promo) {
        meetsPromotionsFilter = false;
      }

      if (durationOptions && tour.duration !== durationOptions) {
        meetsDurationFilter = false;
      }

      if (values) {
        const [min, max] = values;
        if (tour.price < min || tour.price > max) {
          meetsPriceRangeFilter = false;
        }
      }

      return meetsPromotionsFilter && meetsDurationFilter && meetsPriceRangeFilter && meetsReservationFilter;
    });
    onFiltersChange(filteredTours);
  };
  const formatLabel = (value) => `${value} Hrs`;

  return (
    <BoxContainer>
      <TitleLabel>
        Reservas
      </TitleLabel>
      <select onChange={handleReservaChange} value={selectedReserva}>
        <option value="false">Sin reservas</option>
        <option value="true">Con reservas</option>
      </select>
      <TitleLabel>
        Promociones
      </TitleLabel>
      <select onChange={handlePromoChange} value={selectedPromo}>
        <option value="false">Sin promociones</option>
        <option value="true">Con promociones</option>
      </select>
      <TitleLabel>
        Duración
      </TitleLabel>
      <DurationSlider
        value={durationOptions}
        onChange={handleDurationChange}
        min={0}
        max={24}
        valueLabelDisplay="on"
        valueLabelFormat={formatLabel}
        marks={marks}
      />
      <TitleLabel>
        Rango De Precio
      </TitleLabel>
      <PriceSlider
        value={values}
        onChange={handleChange}
        min={0}
        max={1000}
        valueLabelDisplay="on"
      />
      <ButtonContainer>
        {/* <button onClick={filterTours}>Aplicar filtros</button> */}
        <ClearButton onClick={clearFilters}>Limpiar filtros</ClearButton>
      </ButtonContainer>
    </BoxContainer>
  );
}
