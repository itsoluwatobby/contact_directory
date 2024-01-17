import {connect, ConnectOptions} from "mongoose";

export const dbConfig = () => {
  try{
    connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true
    } as ConnectOptions)
  }
  catch(error){
    return error
  }
}