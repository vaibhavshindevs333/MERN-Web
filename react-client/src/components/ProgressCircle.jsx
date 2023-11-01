import { Box, Typography, useTheme } from "@mui/material";

const ProgressCircle = ({ progress, increase, size = "50" }) => {
  const theme = useTheme();

  const angle = progress * 360;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
    <Box
      sx={{
        background: `radial-gradient(${theme.palette.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.secondary[900]} ${angle}deg 360deg),
            ${theme.palette.secondary[200]}`,
        position: "relative",    
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
    <Typography
          variant="body2"
          sx={{
            color: theme.palette.secondary[400],
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
