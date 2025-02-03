import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
export default function SliderLabel({ value, total }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        value={value}
        min={0}
        max={total}
        disabled
        sx={{
          height: 1,
          "& .MuiSlider-thumb": {
            display: "none",
          },
          "& .MuiSlider-rail": {
            opacity: 1,
            backgroundColor: "#3b82f680",
          },
          "& .MuiSlider-track": {
            backgroundColor: "#3e7ce1",
          },
          "&.Mui-disabled": {
            opacity: 1,
            cursor: "not-allowed",
          },
        }}
      />
    </Box>
  );
}
