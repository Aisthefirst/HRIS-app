import React, { useState } from 'react';
import { Building2, Users, Shield, Bell, Save } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', name: 'Company', icon: Building2 },
    { id: 'users', name: 'Users & Roles', icon: Users },
    { id: 'permissions', name: 'Permissions', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-2">Manage your organization's settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card padding="sm">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <tab.icon className="mr-3 h-5 w-5" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'company' && (
              <Card>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Company Information</h2>
                    <p className="text-neutral-600">Update your company details and preferences.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Company Name"
                      defaultValue="Acme Corporation"
                    />
                    <Input
                      label="Industry"
                      defaultValue="Technology"
                    />
                    <Input
                      label="Company Size"
                      defaultValue="50-100 employees"
                    />
                    <Input
                      label="Time Zone"
                      defaultValue="PST (UTC-8)"
                    />
                  </div>

                  <div>
                    <Input
                      label="Company Address"
                      defaultValue="123 Business Ave, San Francisco, CA 94105"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button icon={<Save className="h-4 w-4" />}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'users' && (
              <Card>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Users & Roles</h2>
                    <p className="text-neutral-600">Manage user accounts and role assignments.</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
                          className="h-10 w-10 rounded-full"
                          alt="Admin"
                        />
                        <div>
                          <p className="font-medium text-neutral-900">Admin User</p>
                          <p className="text-sm text-neutral-500">admin@company.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                          Admin
                        </span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="primary">
                    Add New User
                  </Button>
                </div>
              </Card>
            )}

            {activeTab === 'permissions' && (
              <Card>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Role Permissions</h2>
                    <p className="text-neutral-600">Configure what each role can access and modify.</p>
                  </div>

                  <div className="space-y-6">
                    {['Admin', 'HR Manager', 'Manager', 'Employee'].map((role) => (
                      <div key={role} className="border border-neutral-200 rounded-lg p-4">
                        <h3 className="font-medium text-neutral-900 mb-3">{role}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {['View Employees', 'Edit Employees', 'View Reports', 'Approve Time Off', 'Manage Settings', 'Export Data'].map((permission) => (
                            <label key={permission} className="flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                defaultChecked={role === 'Admin' || (role === 'HR Manager' && !permission.includes('Settings'))}
                              />
                              <span className="ml-2 text-sm text-neutral-700">{permission}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button icon={<Save className="h-4 w-4" />}>
                      Save Permissions
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-900">Notification Settings</h2>
                    <p className="text-neutral-600">Configure when and how users receive notifications.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      'New employee onboarding',
                      'Time-off requests',
                      'Pending approvals',
                      'System updates',
                      'Monthly reports'
                    ].map((notification) => (
                      <div key={notification} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                        <span className="text-neutral-900">{notification}</span>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                            <span className="ml-2 text-sm text-neutral-700">Email</span>
                          </label>
                          <label className="flex items-center">
                            <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="ml-2 text-sm text-neutral-700">In-app</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button icon={<Save className="h-4 w-4" />}>
                      Save Settings
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};