
import * as dotenv from 'dotenv';
dotenv.config();

const uri: string = process.env.MONGO_URI as string;

import { connect, ConnectOptions} from 'mongoose';

export function connectDB() {

  connect(uri, {useNewUrlParser: true} as ConnectOptions)
      .then(() => {
          console.info(`Connected to database...`);
      })
      .catch ((error) => {
          console.error('failed to connect', error);
      });
}
