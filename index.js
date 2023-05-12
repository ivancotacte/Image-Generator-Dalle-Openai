const express = require("express");

const cors = require('cors');

const app = express();

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({

  apiKey: process.env.OPEN_AI_KEY,

});

const openai = new OpenAIApi(configuration);

async function aiImage(prompt_msg) {

    const response = await openai.createImage({

    	prompt: prompt_msg,        n: 1,

        size: "1024x1024",

    });

    return response.data;

}

app.use(express.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

app.get('/', (req, res) => {

  res.render("index.html");

})

app.post('/generate', (req, res) => {

  const { text } = req.body;

  console.log(text);

  let image = aiImage(text);

  image.then((response) => {

    res.status(200).send({

      code: 200,

      message: "success", 

      result: {

        url: response.data[0].url

      }

    })

    console.log(response.data[0].url)

  })

})

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log(`App is listening on port ${port}`));
