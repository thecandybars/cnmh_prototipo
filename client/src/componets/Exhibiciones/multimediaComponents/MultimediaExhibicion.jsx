import { Box, Dialog, Stack, styled, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CloseCancelButton from "../../common/buttons/CloseCancelButton";
import getEnv from "../../../utils/getEnv";
import ButtonSlider from "./Sliders/ButtonSlider";
import { useState } from "react";
import PhotoSlider from "./Sliders/PhotoSlider";

MultimediaExhibicion.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

const StyledRightCol = styled(Stack)(() => ({
  display: "flex",
  flex: 1,
  backgroundImage: "url('/fondo_plantas.png')",
  backgroundSize: "fill",
  justifyContent: "space-between",
}));
const MainContent = styled(Stack)(() => ({
  height: "100%",
}));
export default function MultimediaExhibicion(props) {
  //   console.log("🚀 ~ MultimediaExhibicion ~ props:", props);
  const renderCloseButton = (
    <CloseCancelButton
      onClick={props.onClose}
      sx={{ position: "absolute", right: 0 }}
    />
  );
  const renderPortada = (
    <img
      alt="Logo lugar"
      src={`${getEnv("ipfs")}/${props.data.Portada.cid}`}
      style={{
        objectFit: "cover   ",
        objectPosition: "center",
      }}
    />
  );
  const renderLogo = (
    <Box margin="0 auto">
      <img
        alt="Logo lugar"
        src={`${getEnv("media")}${props.data.Lugar.logoURL}`}
      />
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
  console.log("🚀 ~ MultimediaExhibicion ~ activeSlider:", activeSlider);
  const renderSliders = props.data.Sliders.map((slider) => (
    <ButtonSlider
      slider={slider}
      key={slider.id}
      onClick={() => setActiveSlider(slider)}
      onClose={() => setActiveSlider(null)}
    />
  ));

  // SLIDER DIALOG
  const Slider = activeSlider?.tipoSlider === "Foto" ? PhotoSlider : null;
  const renderSliderDialog = activeSlider && (
    <Dialog
      fullScreen
      open={!!activeSlider}
      onClose={() => setActiveSlider(null)}
      sx={{ width: "100vw", height: "100vh" }}
    >
      <Slider data={activeSlider} />
    </Dialog>
  );

  return (
    <Box width="100vw" height="100vh" sx={{ display: "flex" }}>
      {renderSliderDialog}
      <Box display="flex" flex={2}>
        {renderPortada}
      </Box>
      {renderCloseButton}
      <StyledRightCol>
        {renderLogo}

        <MainContent>
          {renderRightData}
          {renderSliders}
        </MainContent>

        {renderFooter}
      </StyledRightCol>
    </Box>
  );
}
