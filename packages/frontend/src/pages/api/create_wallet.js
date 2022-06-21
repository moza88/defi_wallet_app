export default function handler(req, res) {

    const {coin} = req.query

    if (req.method === 'GET') {
        // Process a POST request

        res.end(`This is ' ${coin}`)

    } else {
        // Handle any other HTTP method
    }
}
