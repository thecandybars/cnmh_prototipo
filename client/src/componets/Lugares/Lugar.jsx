import PropTypes from "prop-types";
import { Photo_360 } from "../../App";
import MultimediaSliders from "../Exhibiciones/MultimediaSliders";
import { Dialog } from "@mui/material";
import useAppStore from "../../store/useAppStore";

function Lugar(props) {
  const openDialogLugar = useAppStore((state) => state.openDialogLugar);
  const setOpenDialogLugar = useAppStore((state) => state.setOpenDialogLugar);
  const renderContents =
    (props.selectedMarker &&
      Math.floor(Math.abs(props.selectedMarker.latitud * 100)) % 2) === 0 ? (
      <Photo_360 onClose={() => setOpenDialogLugar(false)} />
    ) : (
      <MultimediaSliders
        exhibicionId={17}
        onClose={() => setOpenDialogLugar(false)}
      />
    );
  return (
    <Dialog fullScreen open={openDialogLugar}>
      {renderContents}
    </Dialog>
  );
}

Lugar.propTypes = {
  selectedMarker: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Lugar;
