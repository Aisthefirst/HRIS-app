import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  const handleSave = () => {
    // TODO: Implement profile update API call
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">My Profile</h1>
          <p className="text-neutral-600 mt-2">Manage your personal information and preferences.</p>
        </div>
        {!isEditing && (
          <Button
            variant="primary"
            icon={<Edit2 className="h-4 w-4" />}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center space-x-6">
          <img
            className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
            src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'}
            alt={user?.name}
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-neutral-900">{user?.name}</h2>
              <Badge variant="info" className="capitalize">
                {user?.role}
              </Badge>
            </div>
            <p className="text-lg text-neutral-700 mt-1">{user?.email}</p>
          </div>
        </div>
      </Card>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-neutral-900">Personal Information</h3>
            {isEditing && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={<X className="h-4 w-4" />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Save className="h-4 w-4" />}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {isEditing ? (
              <>
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  icon={<User className="h-4 w-4 text-neutral-400" />}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={<Mail className="h-4 w-4 text-neutral-400" />}
                />
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  icon={<Phone className="h-4 w-4 text-neutral-400" />}
                />
                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  icon={<MapPin className="h-4 w-4 text-neutral-400" />}
                />
              </>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Full Name</p>
                    <p className="font-medium text-neutral-900">{user?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Email</p>
                    <p className="font-medium text-neutral-900">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Phone</p>
                    <p className="font-medium text-neutral-900">Not provided</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-neutral-400" />
                  <div>
                    <p className="text-sm text-neutral-600">Address</p>
                    <p className="font-medium text-neutral-900">Not provided</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-neutral-900 mb-6">Account Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-neutral-400" />
              <div>
                <p className="text-sm text-neutral-600">Member Since</p>
                <p className="font-medium text-neutral-900">January 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-neutral-400" />
              <div>
                <p className="text-sm text-neutral-600">Role</p>
                <p className="font-medium text-neutral-900 capitalize">{user?.role}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-200">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};