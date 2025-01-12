const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

// Run migrations and start the server
knex.migrate
  .latest()
  .then(([batchNumber, log]) => {
    console.log(`Migrations completed: Batch ${batchNumber}`);
    if (log.length) {
      console.log("Migrations run:", log.join(", "));
    }
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error("Error running migrations:", error);
    process.exit(1); // Exit with failure code
  });