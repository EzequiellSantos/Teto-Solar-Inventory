const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {

  const { username, password, permission } = req.body;

  try {

    const user = new User({ username, password, permission });
    await user.save();
    res.status(201).send('Usuario Registradox');

  } catch (err) {

    res.status(400).send(err.message);

  }

});

router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  try {

    const user = await User.findOne({ username });

    if (!user) return res.status(400).send('Usuárioo nao encontrado');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send('Credenciais Inválidas');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {

      expiresIn: '1h',

    });

    res.status(200).json({ token });

  } catch (err) {

    res.status(400).send(err.message);
    
  }
});

module.exports = router;
