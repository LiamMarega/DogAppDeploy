const { Router } = require("express");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;




// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const apiDogs = async () => {
 const Dogss = await axios.get(
   `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}` //obtengo api con el match de nombre
 );
  return Dogss.data;
} 

const dbDogsInclude = async ()=> {
    return await Dog.findAll({
      include: {
        model: Temperament,
        attribute: {
          include: ["name"],
        },
        through: {
          attribute: [],
        },
      },
    });
}

const concatDogs = async ()=> {
  const dogApi =  await apiDogs();
  const dogDb = await dbDogsInclude();

  const concatDog = await dogApi.concat(dogDb);

  return concatDog;
}



router.get("/", async (req, res, next) => {

   let name = req.query.name;
   let dogPromiseApi;
   let dogPromiseDb;
   if (name) {
     dogPromiseApi = await axios.get(
       `https://api.thedogapi.com/v1/breeds/search?q=${name}` //obtengo api con el match de nombre  //entry
     );
     dogPromiseDb = Dog.findAll({
       where: {
         name: {
           [Op.iLike]: "%" + name + "%", // matcheo
         },
       },
       order: [["name", "ASC"]], // ordeno
     });
   } else {
     dogPromiseApi = await axios.get(
       `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}` //obtengo api
     );

     dogPromiseDb = Dog.findAll(); // llamo a la DATABASE 
   }

 

   Promise.all([dogPromiseApi, dogPromiseDb]).then((respuesta) => {
     const [dogApi, dogDb] = respuesta;
     let allDogs = [...dogApi.data, ...dogDb]; // CONCATENO API Y DATABASE
     res.send(allDogs);
   });
  
});


/* router.get("/", async (req, res, next) => {
  let name = req.query.name;
  let dogPromiseApi;
  let dogPromiseDb;
  if (name) {
    dogPromiseApi = axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}` //obtengo api con el match de nombre
    );
    dogPromiseDb = Dog.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%", // matcheo
        },
      },

      order: [["name", "ASC"]], // ordeno
    });
  } else {
    dogPromiseApi = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}` //obtengo api
    );
    dogPromiseDb = Dog.findAll({
      include: {
        model: Temperament,
        attribute: {
          include: ["name"],
        },
      },
    }); // llamo a la DATABASE

    Promise.all([dogPromiseApi, dogPromiseDb]).then((respuesta) => {
      const [dogApi, dogDb] = respuesta; // RESPUESTA DE LA API
      let allDogs = [...dogApi.data, ...dogDb]; // CONCATENO API Y DATABASE
      res.send(allDogs);
    });
  }
}); */


router.get("/:idRaza", async (req, res, next) => {
  try {
    const { idRaza } = req.params;

    // Compruebo si idRaza es una PrimaryKey de UUIDV4

    const concatDog = await concatDogs();

    if (typeof idRaza === "string" && idRaza.length > 8) {
      let dog = concatDog.filter(e => e.id == idRaza); 
      res.send(dog);
    } else {
      // Llamo a la DATABASE
      let dogPromiseApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
      let dog = await dogPromiseApi.data.find(
        (el) => el.id === parseInt(idRaza)
      );
      // envio las raza con su informacion
      return res.send({
        name: dog.name || "Raza no encontrada :(",
        img: (dog.image && dog.image.url),
        temperament: dog.temperament || "Raza no encontrada :(",
        life_span: dog.life_span || "Raza no encontrada :(",
        weight: dog.weight.metric || "Raza no encontrada :(",
        height: dog.height.metric || "Raza no encontrada :(",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, height, weight, life_span, image, temps, createdInDb } =
      req.body; // destructuro el body
    // Añado la informacion a la DATABASE.
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
      createdInDb,
    });

    const tempDb = await Temperament.findAll({
      where: {
        name: {
          [Op.in]: temps
        }
      }
    });
    tempDb.map((el) => {
      newDog.addTemperament(el);
    })
    // temperament.map(async (el) => {
    //     const tempDb = await Temperament.findAll({
    //       where: {
    //         name: el
    //       },
    //       include: [Dog]
    //     });

    //     newDog.addTemperament(tempDb);
    // } )

    res.status(201).send(newDog);

  } catch (error) {
    next(error);
  }
});

// router.put("/", (req, res, next) => {
//   res.send("Soy una prueba /dogs");
// });

// router.delete("/", (req, res, next) => {
//   res.send("Soy una prueba /dogs");
// });

module.exports = router;
