"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

export default function TestComponentsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-serif font-bold">shadcn/ui Component Test</h1>
        
        {/* Button Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
            <CardDescription>Testing all button styles and sizes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🎨</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>

        {/* Input Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
            <CardDescription>Testing input component</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Default input" />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <Input disabled placeholder="Disabled input" />
          </CardContent>
        </Card>

        {/* Card Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>This is a card with all sections</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card content goes here. This component supports header, content, and footer sections.
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Save</Button>
          </CardFooter>
        </Card>

        {/* Dialog Test */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog / Modal</CardTitle>
            <CardDescription>Testing dialog component</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This is a dialog component built with Radix UI primitives.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Dropdown Test */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Testing dropdown menu component</CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Toast Test */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Testing Sonner toast notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-x-2">
            <Button onClick={() => toast.success("Success toast!")}>Success</Button>
            <Button onClick={() => toast.error("Error toast!")} variant="destructive">Error</Button>
            <Button onClick={() => toast.info("Info toast!")} variant="outline">Info</Button>
          </CardContent>
        </Card>

        {/* Loading States Test */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>Testing skeleton and spinner components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Spinner:</p>
              <div className="flex gap-4 items-center">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Skeleton:</p>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color System Test */}
        <Card>
          <CardHeader>
            <CardTitle>Color System</CardTitle>
            <CardDescription>Testing HSL-based color variables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-background border" />
                <p className="text-xs">background</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-primary" />
                <p className="text-xs">primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-secondary" />
                <p className="text-xs">secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-accent" />
                <p className="text-xs">accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-muted" />
                <p className="text-xs">muted</p>
              </div>
              <div className="space-y-2">
                <div className="h-20 rounded-md bg-destructive" />
                <p className="text-xs">destructive</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
