// Importar libreria para respuestas
const Respuesta = require("../utils/respuesta.js");
// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");

// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo aprendiz
const Sensei = models.sensei;
// Recuperar el modelo aprendiz
const Aprendiz = models.aprendiz;

class AprendizController {
  async createAprendiz(req, res) {
    // Implementa la lógica para crear un nuevo plato
    const aprendiz = req.body;

    try {
      const aprendizNuevo = await Aprendiz.create(aprendiz);

      res.status(201).json(Respuesta.exito(aprendizNuevo, "Aprendiz insertado"));
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(Respuesta.error(null, `Error al crear un aprendiz nuevo: ${aprendiz}`));
    }
  }

  async getAllAprendiz(req, res) {
    try {
      const data = await Aprendiz.findAll({
        include: [
          {
            model: Sensei,
            as: "idSensei_sensei",
          },
        ],
      }); 
      res.json(Respuesta.exito(data, "Datos de aprendices recuperados"));
    } catch (err) {
      // Handle errors during the model call
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos de los aprendices: ${req.originalUrl}`
          )
        );
    }
  }

  // // Handles retrieval of a single type by its ID (implementation pending)
  async deleteAprendiz(req, res) {
    const idAprendiz = req.params.idAprendiz;
    try {
      const numFilas = await Aprendiz.destroy({
        where: {
          idAprendiz: idAprendiz,
        },
      });
      if (numFilas == 0) {
        // No se ha encontrado lo que se quería borrar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado: " + idAprendiz));
      } else {
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al eliminar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async getAprendizById(req, res) {
    // El id plato viene en la ruta /api/platos/:idplato
    const idAprendiz = req.params.idAprendiz;
    try {
      const fila = await Aprendiz.findByPk(idAprendiz);
      if (fila) {
        // Si se ha recuprado un plato
        res.json(Respuesta.exito(fila, "Aprendiz recuperado"));
      } else {
        res.status(404).json(Respuesta.error(null, "Aprendiz no encontrado"));
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al recuperar los datos: ${req.originalUrl}`
          )
        );
    }
  }

  async updateAprendiz(req, res) {
    const aprendiz = req.body; // Recuperamos datos para actualizar
    const idAprendiz = req.params.idAprendiz; // dato de la ruta

    // Petición errónea, no coincide el id del plato de la ruta con el del objeto a actualizar
    if (idAprendiz != aprendiz.idAprendiz) {
      return res
        .status(400)
        .json(Respuesta.error(null, "El id del aprendiz no coincide"));
    }

    try {
      const numFilas = await Aprendiz.update({ ...aprendiz }, { where: { idAprendiz } });

      if (numFilas == 0) {
        // No se ha encontrado lo que se quería actualizar o no hay nada que cambiar
        res
          .status(404)
          .json(Respuesta.error(null, "No encontrado o no modificado: " + idAprendiz));
      } else {
        // Al dar status 204 no se devuelva nada
        // res.status(204).json(Respuesta.exito(null, "Plato actualizado"));
        res.status(204).send();
      }
    } catch (err) {
      logMensaje("Error :" + err);
      res
        .status(500)
        .json(
          Respuesta.error(
            null,
            `Error al actualizar los datos: ${req.originalUrl}`
          )
        );
    }
  }
  async getFilteredAprendiz(req, res) {
    try {
        const filters = {};
        
        // Recorremos los parámetros de la query y los añadimos a los filtros
        for (const key in req.query) {
            if (Object.prototype.hasOwnProperty.call(Aprendiz.rawAttributes, key)) {
                filters[key] = req.query[key];
            }
        }

        const senseis = await Aprendiz.findAll({ where: filters });

        res.json(Respuesta.exito(senseis, "Aprendices filtrados"));
    } catch (err) {
        logMensaje("Error :" + err);
        res.status(500).json(Respuesta.error(null, `Error al recuperar senseis filtrados: ${req.originalUrl}`));
    }
  }
  
}

module.exports = new AprendizController();

// Structure of result (MySQL)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Number of rows affected by the query
//   insertId: 1,     // ID generated by the insertion operation
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0   // Number of rows changed by the query
// }
