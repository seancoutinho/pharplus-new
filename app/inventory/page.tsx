"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const initialInventory = [
  { id: 1, name: "Paracetamol", quantity: 500, price: 0.5 },
  { id: 2, name: "Amoxicillin", quantity: 200, price: 1.2 },
  { id: 3, name: "Ibuprofen", quantity: 300, price: 0.8 },
  { id: 4, name: "Omeprazole", quantity: 150, price: 2.5 },
  { id: 5, name: "Metformin", quantity: 400, price: 1.0 },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' })

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.price) {
      setInventory([...inventory, { 
        ...newItem, 
        id: inventory.length + 1,
        quantity: parseInt(newItem.quantity),
        price: parseFloat(newItem.price)
      }])
      setNewItem({ name: '', quantity: '', price: '' })
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Inventory Management</h1>
      <div className="flex justify-between items-center">
        <Input
          className="w-64"
          placeholder="Search inventory..."
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
              <Button onClick={handleAddItem}>Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Total Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}