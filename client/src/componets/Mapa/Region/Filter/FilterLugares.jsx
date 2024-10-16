import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../../../utils/theme";
import TipologiaTooltip from "./components/TipologiaTooltip";
import PropTypes from "prop-types";
import useAppStore from "../../../../store/useAppStore";

FilterLugares.propTypes = {
  tiposLugares: PropTypes.array,
};

export default function FilterLugares(props) {
  const activeFilters = useAppStore((state) => state.activeFilters);
  const setActiveFilters = useAppStore((state) => state.setActiveFilters);
  const handleActiveFilters = (id) => {
    if (activeFilters.includes(id))
      setActiveFilters(
        activeFilters.filter((activeFilterId) => activeFilterId !== id)
      );
    else setActiveFilters(activeFilters.concat([id]));
  };

  const renderFilters = props.tiposLugares.map((tipo) => {
    const imageName = tipo.imagenURL.slice(tipo.imagenURL.lastIndexOf("/"));
    return (
      <Box
        key={tipo.id}
        onClick={() => handleActiveFilters(tipo.id)}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: activeFilters.includes(tipo.id)
            ? theme.palette.title.main
            : "transparent",
          cursor: "pointer",
          paddingRight: 2,
          borderRadius: "20px 0 0 20px",
          gap: 1,
        }}
      >
        <Box display="flex" alignItems="center">
          <img
            alt="filter"
            // src={`${getEnv("media")}${tipo.imagenURL}`}
            src={`${imageName}`}
            width="80px"
            style={{
              filter: activeFilters.includes(tipo.id)
                ? "brightness(0) saturate(100%) invert(86%) sepia(20%) saturate(6492%) hue-rotate(346deg) brightness(102%) contrast(106%)" // to yellow
                : "brightness(0) saturate(100%) invert(14%) sepia(5%) saturate(4383%) hue-rotate(118deg) brightness(101%) contrast(86%)", // to green
            }}
          />
          <Typography
            variant="h6"
            color={
              activeFilters.includes(tipo.id)
                ? "primary"
                : theme.palette.title.main
            }
          >
            {tipo.nombre}
          </Typography>
        </Box>
        {/* {props.activeFilters.includes(tipo.id) && ( */}
        <TipologiaTooltip
          description={tipo.descripcion}
          // hidden={!props.activeFilters.includes(tipo.id)}
        />
        {/* )} */}
      </Box>
    );
  });
  return (
    <Stack
      spacing={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {renderFilters}
    </Stack>
  );
}
