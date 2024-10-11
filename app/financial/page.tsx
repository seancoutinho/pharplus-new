"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react"

const initialTransactions = [
  { id: 1, date: "2023-12-01", description: "Insurance Claim Payment", amount: 5000, type: "Income" },
  { id: 2, date: "2023-12-02", description: "Supplier Payment", amount: -2000, type: "Expense" },
  { id: 3, date: "2023-12-03", description: "Patient Payment", amount: 150, type: "Income" },
  { id: 4, date: "2023-12-04", description: "Utility Bill", amount: -500, type: "Expense" },
  { id: 5, date: "2023-12-05", description: "Insurance Claim Payment", amount: 3000, type: "Income" },
]

export default function FinancialPage() {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [newTransaction, setNewTransaction] = useState({ date: '', description: '', amount: 0, type: 'Income' })

  const handleAddTransaction = () => {
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1, amount: newTransaction.type === 'Expense' ? -Math.abs(newTransaction.amount) : Math.abs(newTransaction.amount) }])
    setNewTransaction({ date: '', description: '', amount: 0, type: 'Income' })
  }

  const totalIncome = transactions.reduce((sum, transaction) => transaction.amount > 0 ? sum + transaction.amount : sum, 0)
  const totalExpenses = Math.abs(transactions.reduce((sum, transaction) => transaction.amount < 0 ? sum + transaction.amount : sum, 0))
  const netIncome = totalIncome - totalExpenses

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Financial Management</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            {netIncome >= 0 ? <TrendingUp className="h-4 w-4 text-green-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${netIncome.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <Input
          className="w-64"
          placeholder="Search transactions..."
        />
        <Button onClick={handleAddTransaction}>Add Transaction</Button>
      </div>
      <div className="flex space-x-2">
        <Input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })}
        />
        <select
          className="border rounded p-2"
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className={transaction.amount >= 0 ? "text-green-500" : "text-red-500"}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </TableCell>
              <TableCell>{transaction.amount >= 0 ? "Income" : "Expense"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}