import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

async function main() {
  try {
    await mongoose.connect(config.database as string);
    console.log(` Database connected successfully`);

    // port listening
    app.listen(config.port, () => {
      console.log(`the port is listening on ${config.port}`);
    });
  } catch (error) {
    console.error(error, "oh noo!!! database not connected");
  }
}

main();
