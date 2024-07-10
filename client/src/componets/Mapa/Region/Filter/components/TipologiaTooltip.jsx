import { Box, Tooltip, tooltipClasses, Typography } from "@mui/material";
import { theme } from "../../../../../utils/theme";
import { InfoIcon } from "../../../../common/icons";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  // ))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
    boxShadow: "none",
  },
}));

TipologiaTooltip.propTypes = {
  description: PropTypes.string,
  hidden: PropTypes.bool,
};
export default function TipologiaTooltip(props) {
  return (
    <CustomTooltip
      // arrow={true}
      // TransitionComponent={Zoom}
      // TransitionProps={{ timeout: 800 }}
      sx={{
        [`&.${tooltipClasses.tooltip}`]: {
          backgroundColor: "transparent",
          padding: 0,
          boxShadow: "none",
        },
      }}
      title={
        <Box
          backgroundColor={theme.palette.secondary.main}
          p={1}
          border={`1px solid ${theme.palette.title.main}`}
          borderRadius="5px 0 0 5px"
        >
          <Typography variant="body" color={theme.palette.primary.main}>
            {props.description}
          </Typography>
        </Box>
      }
      slotProps={{
        tooltip: {},
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [32, -16],
              },
            },
          ],
        },
      }}
      placement="left-start"
    >
      <InfoIcon
        color="secondary"
        sx={{ visibility: props.hidden ? "hidden" : "visible" }}
      />
    </CustomTooltip>
  );
}
