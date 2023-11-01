import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();

  return (
    <Box width="100%" m="0 30px">

      <Box display="flex" justifyContent="space-between">
      <Box>
          {icon}
        <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: theme.palette.grey[100] }}
        >
          {title}
        </Typography>
      </Box>

      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: theme.palette.grey[500] }}>
          {subtitle}
        </Typography>
      </Box>
      <Box>
        <ProgressCircle progress={progress} increase={increase} />
      </Box>
    </Box>
  );
};

export default StatBox;
