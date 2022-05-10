import axios from "axios";


async function serviceAxiosPost(url, json) {
    const { response } = await axios.post(url, json, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    console.log('axios:: ' + response);
    return response;
}
async function serviceAxiosPut(url, json) {
    const { response } = await axios.put(url, json, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    console.log('axios:: ' + response);
    return response;
}
async function serviceAxiosGet(url) {
    const { data } = await axios.get(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
    console.log('axios:: ' + data);
    return data;
}
async function serviceAxiosDelete(url) {
    const { data } = await axios.delete(url, {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    });
    return data;
}




export default {
    serviceAxiosPost,
    serviceAxiosPut,
    serviceAxiosGet,
    serviceAxiosDelete
}
