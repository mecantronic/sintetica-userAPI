import "dotenv/config.js";
import app from "./src/app.js";
import sequelize from "./src/db.js";
import "./src/dbAssociations.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`---------- Server listening on port ${PORT} ----------`);

  try {
    await sequelize.sync(/* { force: true } */);
    console.log("---------- Base de datos conectada exitosamente ----------");
  } catch (error) {
    console.log(
      "Se ha producido un error al conectar con la base de datos",
      error
    );
  }
});
