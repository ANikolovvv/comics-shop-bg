export const pageSearchStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#151515",
};

export const containerStyles = {
  m: 0,
  paddingBottom: "0px",
  position: "absolute",
  top: "8.2%",
  width: "50%",
  height: 60,
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  gap: "20px",
  borderRadius: "0px 0px 10px 10px",
  borderBottom: "2px solid red",
  backgroundColor: "#151515",
  zIndex: 999,
};

export const inputStyles = {
  color: "white",
  "&.MuiInput-underline:before": {
    borderBottomColor: "white",
  },
};

export const submitButtonStyles = {
  display: "flex",
  textAlign: "center",
  height: 35,
  width: "40%",
  backgroundColor: "#1976d2",
  color: "white",
  "&:hover": {
    backgroundColor: "#135ba1",
  },
};

export const errorTextStyles = {
  position: "absolute",
  top: "100%",
  color: "red",
};

export const buttonsBoxStyles = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 2,
};

export const buttonTitleStyles = {
  mt: 0,
  backgroundColor: "#151515",
  borderColor: "red",
  display: "flex",
  alignItems: "center",
};
