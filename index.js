const express = require('express'); 
const bodyParser = require('body-parser')
const lcdi2c = require('lcdi2c');
const path = require('path');

// Define our LCD Screen (get the address with : i2cdetect -y 1)
const lcd = new lcdi2c(1, 0x27, 16, 2);

const app = express();

function SetLCD(line1, line2) {
  try {
    lcd.clear();
    lcd.println(line1, 1);
    lcd.println(line2, 2);
  }
  catch(err) {
    console.error('LCD functions error');
    console.error(err);
  }
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './views/index.html'));
})

app.post('/', (req, res) => {
  const data = req.body;
  
  if(data.line1 || data.line2) {
    SetLCD(date.line1, data.line2);
  }

  return res.redirect('/?date' + Date.now() + '&result=1');
})

app.listen('3050', () => {
  console.log('listening on 3050');
})