import axios from "axios";
const getMetaById = async (id) => {
  try {
    const token = sessionStorage.getItem("access_token");
    const response = await axios.get(`https://node-api-latest.azurewebsites.net/metas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return ["no"];
    console.error(error);
  }
};

export default getMetaById;
