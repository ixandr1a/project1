const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const multer = require('multer')
const upload = multer({ dest: './assets/image' })


app.use(bodyParser.json());

const { exec } = require("child_process");

exec('export GOOGLE_APPLICATION_CREDENTIALS="../hidden-marker-316108-1b0311667a96.json"', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

// app.post('/123', function (req, res) {
//     res.json('xalupa eblivaya')
//     console.log(req.body)
// });
app.post('/123', upload.single('photo'), function (req, res) {
    let name = req.file.filename;
    res.send('закрыть')
    quickstart(name)
    async function quickstart(name) {
        const vision = require('@google-cloud/vision');

        const client = new vision.ImageAnnotatorClient();

        const [result] = await client.labelDetection(`./assets/image/${name}`);
        const labels = result.labelAnnotations;
        let obj1 = labels[0].description;
        let obj2 = labels[1].description;
        let obj3 = labels[2].description;
        let obj4 = labels[3].description;
        let obj5 = labels[4].description;
        let obj6 = labels[5].description;
        let obj7 = labels[6].description;
        let obj8 = labels[7].description;
        let obj9 = labels[8].description;
        let obj10 = labels[9].description;
        console.log(labels)
        res.send(`${obj1}, ${obj2}, ${obj3}, ${obj4}, ${obj5}, ${obj6}, ${obj7}, ${obj8}, ${obj9}, ${obj10}`);

    }
});
let port = ('port', process.env.PORT || 3000);
let host = ('host', process.env.HOST || '0.0.0.0');
http.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});