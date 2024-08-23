import axios from 'axios';

const getPrioridad = async () => {
  try {
    const response = await axios.get('https://node-api-latest.azurewebsites.net/prioridades');
    return response.data;
  }
  catch (error) {
    return ["no"];
    console.error(error);
  }
}

export default getPrioridad;