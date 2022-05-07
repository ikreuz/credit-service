import axios from "axios";


export async function srvAxios(url) {
  const { data } = await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
  return data;
}


export async function srvAxiosInsert(url, json) {
  const { data } = await axios.post(url, json, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  return data;
}

