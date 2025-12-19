import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Users, Shield, User } from "lucide-react"

export const metadata = {
  title: "Manage Users",
  description: "Manage user accounts and permissions"
}

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@step-institute.edu",
    role: "admin",
    status: "active",
    lastLogin: "2024-10-25",
    createdAt: "2024-01-15"
  },
  {
    id: "2", 
    name: "Dr. Rajesh Kumar",
    email: "rajesh@step-institute.edu",
    role: "faculty",
    status: "active",
    lastLogin: "2024-10-24",
    createdAt: "2024-02-01"
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    role: "student",
    status: "active",
    lastLogin: "2024-10-23",
    createdAt: "2024-03-10"
  }
]

export default async function ManageUsersPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  // Only SUPER_ADMIN can access user management
  if (session.user.role !== "SUPER_ADMIN") {
    redirect("/admin")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New User
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or email" className="pl-8" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({mockUsers.length} total)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {user.role === 'admin' ? (
                      <Shield className="h-5 w-5 text-primary" />
                    ) : user.role === 'faculty' ? (
                      <Users className="h-5 w-5 text-primary" />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Last login: {new Date(user.lastLogin).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    user.role === 'admin' ? 'default' :
                    user.role === 'faculty' ? 'secondary' : 
                    'outline'
                  }>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* TODO Notice */}
      <Card className="border-brand-200 bg-brand-50">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• User authentication and authorization</li>
            <li>• Role-based access control</li>
            <li>• Bulk user operations</li>
            <li>• User activity logging</li>
            <li>• Password reset and security features</li>
            <li>• Integration with LDAP/SSO systems</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}