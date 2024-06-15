import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import Expense from '@/models/Expense';

export async function GET(req) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectToDatabase();
        console.log("Expenses backend fetch : ", decoded.id)
        const expenses = await Expense.find({ userId: decoded.id });
        return new Response(JSON.stringify({ data: expenses }), { status: 200 });
    } catch (error) {
        console.error('Error in GET request:', error);
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
}

export async function POST(req) {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Expenses backend post : ", decoded.id)
        const { date, amount, category, notes } = await req.json();
        if (!date || !amount || !category || !notes) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
        }
        await connectToDatabase();

        const expense = new Expense({ userId: decoded.id, date, amount, category, notes });
        await expense.save();
        return new Response(JSON.stringify({ data: expense }), { status: 201 });
    } catch (error) {
        console.error('Error in POST request:', error);
        return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }
}
