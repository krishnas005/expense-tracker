import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectToDatabase();
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Generate the JWT token
    const tokenData = {
      id: userExists._id,
      email: userExists.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      token
    });

    // Set the token in the cookie
    response.cookies.set("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
