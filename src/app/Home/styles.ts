import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#d0d2d8",
    paddingTop: 52,
  },
  logo: {
    height: 34,
    width: 134,
  },
  form: {
    width: "100%",
    gap: 7,
    paddingHorizontal: 16,
    marginTop: 42,
  },
  content: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  clearButton: {
    marginLeft: "auto",
  },
  clearText: {
    fontSize: 12,
    fontWeight: 600,
    color: "#828282",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingBottom: 12,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#EEF0F5",
    marginVertical: 16,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 62,
  },
  emptyListText: {
    fontSize: 14,
    textAlign: "center",
    color: "#828282",
  },
});

export default styles;
