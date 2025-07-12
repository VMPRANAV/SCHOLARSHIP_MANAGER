import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, BarChart, FileText, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { adminApi } from "@/lib/api";
import AdminDashboard from "@/components/admin-dashboard";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: adminApi.login,
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    form.reset();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-education-blue rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <p className="text-slate-600">Access the scholarship management system</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-education-blue hover:bg-blue-800"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
              <p className="text-sm text-blue-700">Username: admin</p>
              <p className="text-sm text-blue-700">Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="bg-education-blue p-2 rounded-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Admin Panel</h3>
              <p className="text-slate-400 text-sm">Scholarship Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  activeTab === 'dashboard' ? 'bg-education-blue' : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart className="h-5 w-5 mr-3" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'scholarships' ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  activeTab === 'scholarships' ? 'bg-education-blue' : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setActiveTab('scholarships')}
              >
                <GraduationCap className="h-5 w-5 mr-3" />
                Scholarships
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'kpr' ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  activeTab === 'kpr' ? 'bg-education-blue' : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setActiveTab('kpr')}
              >
                <FileText className="h-5 w-5 mr-3" />
                KPR Programs
              </Button>
            </li>
            <li>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  activeTab === 'settings' ? 'bg-education-blue' : 'text-slate-300 hover:bg-slate-800'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </Button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:bg-slate-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'dashboard' || activeTab === 'scholarships' ? (
        <AdminDashboard />
      ) : (
        <div className="flex-1 bg-slate-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {activeTab === 'kpr' ? 'KPR Programs Management' : 'Settings'}
            </h2>
            <p className="text-slate-600">This section is under development</p>
          </div>
        </div>
      )}
    </div>
  );
}
