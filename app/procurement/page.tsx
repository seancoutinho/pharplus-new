"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const initialOrders = [
  { id: 1, item: "Paracetamol", quantity: 1000, supplier: "PharmaCorp", status: "Pending" },
  { id: 2, item: "Amoxicillin", quantity: 500, supplier: "MediSupply", status: "Shipped" },
  { id: 3, item: "Ibuprofen", quantity: 750, supplier: "HealthDrugs", status: "Delivered" },
]

export default function ProcurementPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [newOrder, setNewOrder] = useState({ item: '', quantity: 0, supplier: '' })

  const handleAddOrder = () => {
    setOrders([...orders, { ...newOrder, id: orders.length + 1, status: "Pending" }])
    setNewOrder({ item: '', quantity: 0, supplier: '' })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Procurement Management</h1>
      <div className="flex justify-between items-center">
        <Input
          className="w-64"
          placeholder="Search orders..."
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Place New Order</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Place New Order</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Item name"
                value={newOrder.item}
                onChange={(e) => setNewOrder({ ...newOrder, item: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newOrder.quantity}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
              />
              <Input
                placeholder="Supplier"
                value={newOrder.supplier}
                onChange={(e) => setNewOrder({ ...newOrder, supplier: e.target.value })}
              />
              <Button onClick={handleAddOrder}>Place Order</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.item}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{order.supplier}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}