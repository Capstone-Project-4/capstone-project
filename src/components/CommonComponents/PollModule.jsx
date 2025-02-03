import { Radio, Typography, Box, FormControlLabel } from "@mui/material";
import React from "react";
import SliderLabel from "./SliderLabel";

function PollModule({ email, name, numberOfVotes, totalVotes }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      {/* Radio button */}
      <FormControlLabel value={email} control={<Radio sx={{ padding: 1 }} />} />

      {/* Box for Name and Total Votes */}
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        alignItems="flex-start"
      >
        {/* Name */}
        <Box display="flex" width="100%" alignItems="center">
          <Typography variant="body1" sx={{ mr: 2 }}>
            {name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ ml: "auto", color: "text.secondary" }}
          >
            {numberOfVotes}
          </Typography>
        </Box>

        {/* Slider below the name */}
        <Box width="100%">
          <SliderLabel value={numberOfVotes} total={totalVotes} />
        </Box>
      </Box>
    </Box>
  );
}

export default PollModule;
