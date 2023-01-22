//! Router para autenticación y login , con bcrypt.
//! logout con session.destroy()
const express = require('express');
const routerAuthLogin = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// ------------------ AUTH LOGIN ------------------

//  GETS
// funciona ok
routerAuthLogin.get('/login', (req, res) => {
  res.render('auth_login.njk');
});

//  POSTS
routerAuthLogin.post('/login', (req, res) => {
  let { login, password } = req.body;

  Usuario.findOne({ login }).then((usuario) => {
    if (usuario) {
      bcrypt.compare(password, usuario.password, (err, sonIguales) => {
        if (sonIguales) {
          req.session.usuario = usuario.login;
          res.redirect('/admin/juegos');
        } else {
          res.render('auth_login.njk', {
            error: 'Usuario o contraseña incorrectos',
          });
        }
      });
    } else {
      res.render('auth_login.njk', {
        error: 'Usuario o contraseña incorrectos',
      });
    }
  });
});

routerAuthLogin.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = routerAuthLogin;
