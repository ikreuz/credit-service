import axios from "axios";


export default async function srvAxios(url) {
  const { data } = await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return data;
}
