import { makeStyles } from "@material-ui/core/styles";

const allStyles = makeStyles((theme) => ({
  container: {
    flexWrap: "nowrap",
    gap: "10px",
    justifyContent: "center",
    fontFamily: "Roboto",
    marginBottom: "10px"
  },
  card: {
    margin: "0 0 10px 0",
    borderRadius: "10px"
  },
  cardRemoveButton: {
    float: "right",
    margin: "0 3px 0 0",
    transition: ".3s all",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "black",
      color: "#FFF"
    }
  },
  column: {
    boxSizing: "border-box",
    background: "#F1F2F5",
    padding: "10px 10px 0 10px",
    width: "240px",
    borderRadius: "10px",
    minWidth: "240px"
  },
  addCardButton: {
    boxSizing: "border-box",
    width: "100%",
    background: "#fff",
    color: "#000",
    transition: ".3s all",
    cursor: "pointer",
    borderRadius: "10px",
    marginBottom: "5px",
    "&:hover": {
      backgroundColor: "black",
      color: "#FFF"
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 10px 0 0",
    transform: "scale(3)",
    background: theme.color
  },
  header: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    background: "#F1F2F5",
    padding: "10px",
    width: "240px",
    minWidth: "240px",
    borderRadius: "10px"
  },
  headerButton: {
    transition: ".3s all",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft: "5px",
    "&:hover": {
      backgroundColor: "black",
      color: "#FFF"
    }
  },
  headerActions: {
    marginLeft: "auto"
  }
}));

export default allStyles;
