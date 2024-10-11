"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pill, Syringe, ClipboardList, DollarSign, BarChart3 } from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Inventory', href: '/inventory', icon: Pill },
  { name: 'Procurement', href: '/procurement', icon: Syringe },
  { name: 'Insurance Claims', href: '/insurance-claims', icon: ClipboardList },
  { name: 'Financial', href: '/financial', icon: DollarSign },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-4">
        <h1 className="text-2xl font-bold">PharmaPlus</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-2 p-4">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  pathname === item.href && 'bg-muted'
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}