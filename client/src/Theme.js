import { createMuiTheme } from "@material-ui/core/styles";
const arcBlue = "#0b72b9";
const arcOrange = "#ffba60";
export const theme = createMuiTheme({
  typography: {
    palette: {
      primary: {
        main: `${arcBlue}`,
      },
      secondary: {
        main: `${arcOrange}`,
      },
    },
    h2: {
      fontSize: "2em",
    },
  },
});
