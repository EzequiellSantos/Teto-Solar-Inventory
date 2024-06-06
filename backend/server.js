require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

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
const userRoutes = require('./routes/userRoutes');
const inversoresRoutes = require('./routes/inversoresRoutes')

app.use(cors())

app.use('/api/users', userRoutes);
app.use('api/inversores', inversoresRoutes)

// Start Server
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "Rota Aberta >>> BDTetoSolar" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
