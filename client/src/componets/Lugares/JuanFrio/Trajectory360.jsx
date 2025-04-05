/* eslint-disable react/prop-types */
import { useState } from "react";
import PhotoSphereViewer from "./PhotoSphereViewer";
import { Stack, Typography } from "@mui/material";
import { Location } from "../../common/icons";

export default function Trajectory360(props) {
  const { trajectory, initialStep = 0 } = props;

  const [key, setKey] = useState(0);

  const [currentStepId, setCurrentStepId] = useState(initialStep);
  const currentStep = trajectory.find((step) => step.id === currentStepId);

  const handleNavigate = (id) => {
    setCurrentStepId(id);
    setKey((prev) => prev + 1); // La libreria no admite cambiar dinamicamente el src de la imagen, por lo que se debe cambiar la key para forzar la actualizacion
  };
  return (
    <Stack gap={0}>
      <PhotoSphereViewer
        key={key}
        imageURL={currentStep.imageURL}
        navigationMarkers={currentStep.navigationMarkers}
        onNavigate={handleNavigate}
        initialPosition={currentStep.initialPosition}
      />
      <Stack gap={0} sx={{ borderTop: "4px solid #262B31" }} p={1}>
        <Typography variant="h4" display="flex" alignItems="center" gap={1}>
          <Location
            fontSize="medium"
            sx={{
              color: "#D4A76A",
              bgcolor: "#1A1A1A",
              p: "3px",
              borderRadius: "50%",
              // fontSize: "large",
            }}
          />
          {currentStep.name}
        </Typography>
        {/* <Typography variant="body1" ml={4}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit habitant
          ultrices, feugiat interdum.
        </Typography> */}
      </Stack>
    </Stack>
  );
}
