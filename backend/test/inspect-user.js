import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import UserModel from '../src/models/user.model.js';

const run = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    const user = await UserModel.findOne({ email: 'nikhilmeena535@gmail.com' }).lean();
    console.log('FOUND', Boolean(user));
    if (user) {
      console.log('NAME', user.name);
      console.log('EMAIL', user.email);
      console.log('PASSWORD_LENGTH', user.password?.length || 0);
      console.log('PASSWORD_START', user.password?.slice(0, 30));
      console.log('PASSWORD_HASH_FORMAT', user.password?.startsWith('$2') ? 'bcrypt' : 'not-bcrypt');
    }
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

run();
