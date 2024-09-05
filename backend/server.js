require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.options('/api/inverters/all', cors(corsOptions)); // Habilita CORS para requisições OPTIONS


// Middlewares
app.use(bodyParser.json());

const DBUser = process.env.DB_USER
const DBPassword = process.env.DB_PASSWORD

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${DBUser}:${DBPassword}@cluster0.t9g7g6t.mongodb.net/DBTetoSolar?retryWrites=true&w=majority&appName=Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Mongo DB está conectado'))
  .catch(err => console.log(err, "Erro de Conexão no MONGODB"));

// Routes
const invertersRoutes = require('./routes/inverters/invertersRoutes')
const logRoutes = require('./routes/inverters/logRoutes')
const authRoutes = require('./routes/authRoutes') 
const brandsRoutes = require('./routes/panels/brandsRoutes')
const trackingRoutes = require('./routes/panels/trackingRoutes')

app.use('/api/brands', brandsRoutes)
app.use('/api/trackings', trackingRoutes)
app.use('/api/inverters', invertersRoutes)
app.use('/api/logs', logRoutes)
app.use('/api/auth', authRoutes)

// Start Server
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {

  res.json({ message: "Rota Aberta >>> BDTetoSolar" })

})

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
