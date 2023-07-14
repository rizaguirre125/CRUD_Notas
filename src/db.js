import mongoose from "mongoose";

const mongoAtlasUri =
  "mongodb+srv://darkuzdenta5:mrk3gUEnvZf0iTod@crudloginreactdb.ouujefq.mongodb.net/?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(mongoAtlasUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(">>> DB is connected to atlas");
  } catch (error) {
    // Ensures that the client will close when you finish/error
    console.log(error);
  }
};
