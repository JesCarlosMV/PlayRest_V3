//! middleware de autenticación que verificará si existe
//! un usuario almacenado en sesión antes de dejar pasar

const express = require('express');

//
function auth(req, res, next) {
  if (req.session.usuario) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

// Exportamos la funcion

module.exports = auth;
