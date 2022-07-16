import {BitGo} from "bitgo";


export function bitgo() {
    const bitgo = new BitGo({ env: 'test' });
    const accessToken = process.env.BITGO_ACCESS_TOKEN;
    bitgo.authenticateWithAccessToken({ accessToken });

    return bitgo;
}

export function getOptions(req_url : string)  {
    return {
        method: 'GET',
        url: req_url,
        headers: {
            'Authorization': 'Bearer ' + process.env.BITGO_ACCESS_TOKEN,
        }
    }
}
