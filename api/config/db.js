const mongoose=require('mongoose')
 const dbUri='mongodb+srv://demouz:g5986173@cluster0.irlc4.mongodb.net/?retryWrites=true&w=majority'
 const connectDB = async () => {
    try {
      const conn = await mongoose.connect(dbUri, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected:${conn.connection.host}`);
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports = connectDB;