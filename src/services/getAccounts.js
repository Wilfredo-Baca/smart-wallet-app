import axios from "axios";
const getAccountsByUserID = async () => {
  try {
    const token = sessionStorage.getItem("access_token");
    const response = await axios.get(`https://node-api-latest.azurewebsites.net/cuentas/usuario/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Accounts by user id", response.data);
    return response.data;
  } catch (error) {
    return ["no"];
    console.error(error);
  }
};

export default getAccountsByUserID;