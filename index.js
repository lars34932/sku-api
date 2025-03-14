import express from 'express';
import SneaksAPI from 'sneaks-api';

const sneaks = new SneaksAPI();
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies

function getSneakerInfo(sku) {
    return new Promise((resolve) => {
        sneaks.getProductPrices(sku, function (err, product) {
            if (err) {
                resolve({ error: err.message });
            } else {
                resolve(product);
            }
        });
    });
}

// Change this route to handle both GET and POST requests
app.route('/api/sneaker/:sku')
    .get((req, res) => {
        const sku = req.params.sku;
        if (!sku) {
            return res.status(400).json({ error: 'Please provide a SKU as a parameter.' });
        }

        getSneakerInfo(sku)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    })
    .post((req, res) => {
        const sku = req.params.sku;
        if (!sku) {
            return res.status(400).json({ error: 'Please provide a SKU as a parameter.' });
        }

        getSneakerInfo(sku)
            .then((data) => {
                res.json(data);
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    });

app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});