import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const {email ,password} = await req.json();

    if(email !=='admin@gmail.com' || password !== 'admin123'){
        return NextResponse.json({message: 'Invalid credentials'}, {status: 401});
    }
    
    const token = jwt.sign({email}, 'dhruvil_secret', {expiresIn: '1h'});

    const response = NextResponse.json({message: 'Login successful',token}, {status: 200});

    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600, // 1 hour
    });

    return response;
}