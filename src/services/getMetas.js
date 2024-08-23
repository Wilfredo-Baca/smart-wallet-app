import axios from "axios";

const getMetas = async () => {
  try {
    const token = sessionStorage.getItem("access_token");
    const response = await axios.get("https://node-api-latest.azurewebsites.net/metas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Metas:", response.data);
    return response.data;
  } catch (error) {
    return ["no"];
    console.error(error);
  }
};

export default getMetas;
