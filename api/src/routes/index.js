const { Router } = require("express");
const dogRoute = require("./Dog")
const temperamentRoute = require("./Temperament");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRoute);  // llama a los modulos de dogRoute
router.use("/temperament", temperamentRoute);




module.exports = router;
