const { Router } = require("express");
const { Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const temperamentApi = (
      await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    ).data;

    let temperaments = temperamentApi.map((element) => element.temperament); // mapeo
    temperaments = temperaments.join().split(","); // elimino espacios y spliteo
     
    temperaments = temperaments.filter((el) => el); // filtro los repetidos temperamentos

    temperaments = [...new Set(temperaments)].sort(); // filtro y ordeno
    let tempermamentsTwo = temperaments.map((el) => el.slice(1))
  
    // Recorro y guardo en la base de datos
    tempermamentsTwo.forEach((element) => {
      Temperament.findOrCreate({
        where: { name: element },
      });
    });       

    // Llamo a toda la base de datos
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments);

  } catch (err) {
    next(err);
  }
});

// router.put("/", (req, res, next) => {
//   res.send("Soy un put de /temperamet");
// });

// router.delete("/", (req, res, next) => {
//   res.send("Soy un delete de /temperamet");
// });

// router.get("/temperament", async (req, res) => {
//   const { data } = await axios.get(
//     `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
//   );
//   const temperaments = data.map((i) => i.temperament);
//   const dbTemperaments = Temperament.findOrCreate({
//     where: {
//       name: i,
//     },
//   });

//   const allTemperament = await Temperament.findAll();
//   return res.status(200).send(allTemperament);
// });

module.exports = router;
