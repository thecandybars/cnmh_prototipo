import { Box, Dialog, Stack, styled, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CloseCancelButton from "../../common/buttons/CloseCancelButton";
import ButtonSlider from "./Sliders/ButtonSlider";
import { useState } from "react";
import Slider from "./Sliders/Slider";
import useSelectMediaSource from "../../common/customHooks/useSelectMediaSource";

MultimediaExhibicion.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

const StyledRightCol = styled(Stack)(() => ({
  display: "flex",
  flex: 1,
  paddingTop: "8px",
  backgroundImage: "url('/fondo_plantas.png')",
  backgroundSize: "fill",
  justifyContent: "space-between",
}));
const MainContent = styled(Stack)(() => ({
  height: "100%",
  overflowY: "scroll",
}));
const StyledFullScreenContainer = styled(Box)(() => ({
  display: "flex",
  width: "100vw",
  height: "100vh",
  overflowY: "clip",
}));
export default function MultimediaExhibicion(props) {
  // Get media sources
  const logoSource = useSelectMediaSource({
    primary: props.data.Logo.url,
    secondary: props.data.Logo.cid,
  });
  const portadaSource = useSelectMediaSource({
    primary: props.data.Portada.url,
    secondary: props.data.Portada.cid,
  });

  const renderCloseButton = (
    <CloseCancelButton
      onClick={props.onClose}
      sx={{ position: "absolute", right: 0 }}
    />
  );
  const renderPortada = portadaSource && (
    <img
      alt="Logo lugar"
      src={portadaSource}
      style={{
        width: "100%",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
  const renderLogo = logoSource && (
    <Box margin="0 auto">
      <img alt="Logo lugar" src={logoSource} style={{ height: "200px" }} />
    </Box>
  );
  const renderRightData = (
    <Stack p={3} spacing={1} sx={{ overflow: "scroll" }}>
      <Typography color="secondary" variant="h3">
        {props.data.Lugar.nombre}
      </Typography>
      <Typography color="primary" variant="body">
        {props.data.Lugar.descripcion}
      </Typography>
    </Stack>
  );
  const renderFooter = (
    <Box
      width="100%"
      bgcolor="yellowCNMH"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      <img alt="footer CNMH" src="/footer-cnmh-logo-yellow.png" />
    </Box>
  );

  // SLIDERS
  const [activeSlider, setActiveSlider] = useState(null);
  const renderButtonSliders = props.data.Sliders.map((slider) => (
    <ButtonSlider
      slider={slider}
      key={slider.id}
      onClick={() => setActiveSlider(slider)}
      onClose={() => setActiveSlider(null)}
    />
  ));

  // SLIDER DIALOG
  const renderSliderDialog = activeSlider && (
    <Dialog
      fullScreen
      open={!!activeSlider}
      onClose={() => setActiveSlider(null)}
      sx={{ width: "100vw", height: "100vh" }}
    >
      <Slider data={activeSlider} onClose={() => setActiveSlider(null)} />
    </Dialog>
  );

  return (
    <StyledFullScreenContainer>
      {renderSliderDialog}
      <Box display="flex" flex={3}>
        {renderPortada}
      </Box>
      {renderCloseButton}
      <StyledRightCol>
        {renderLogo}
        <MainContent>
          {renderRightData}
          {renderButtonSliders}
        </MainContent>
        {renderFooter}
      </StyledRightCol>
    </StyledFullScreenContainer>
  );
}
