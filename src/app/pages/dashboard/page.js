'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import axios from 'axios'
import ExpenseForm from '../../components/expense/ExpenseForm'
import ExpenseList from '../../components/expense/ExpenseList'
import ExpenseChart from '../../components/expense/ExpenseChart'

export default function DashboardPage() {
    const [expenses, setExpenses] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchExpenses = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }
            try {
                const response = await axios.get('/api/expenses', { headers: { Authorization: `Bearer ${token}` } })
                console.log(response.data.data)
                setExpenses(response.data.data)
            } catch (error) {
                toast.error('Failed to fetch expenses')
            }
        }

        fetchExpenses()
    }, [router])

    const addExpense = (expense) => {
        setExpenses([...expenses, expense])
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Dashboard</h1>
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseList expenses={expenses} />
            <ExpenseChart expenses={expenses} />
        </div>
    )
}
