import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user.model.js';
import connectDB from './config/MongoDB.js';

connectDB();

const users = [
  {
    first_name: 'TPO',
    last_name: 'Admin',
    email: 'tpo@example.com',
    password: 'password123',
    role: 'tpo_admin'
  },
  {
    first_name: 'Management',
    last_name: 'Admin',
    email: 'management@example.com',
    password: 'password123',
    role: 'management_admin'
  },
  {
    first_name: 'Super',
    last_name: 'User',
    email: 'superuser@example.com',
    password: 'password123',
    role: 'superuser'
  }
];

const createDefaultUsers = async () => {
  try {
    for (let u of users) {
      const existingUser = await User.findOne({ email: u.email });
      if (existingUser) {
        console.log(`⚠️  ${u.role} already exists: ${u.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(u.password, 10);

      const newUser = new User({
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        password: hashedPassword,
        role: u.role,
        isProfileCompleted: true
      });

      await newUser.save();
      console.log(`✅ ${u.role} created: ${u.email}`);
    }

    console.log('All users processed!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating default users:', error);
    process.exit(1);
  }
};

createDefaultUsers();