import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Bell, Check } from 'lucide-react';

interface SubscriptionFormProps {
  onClose?: () => void;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    newProducts: true,
    sales: true,
    updates: false,
    newsletters: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: 'Please log in',
        description: 'You need to be logged in to subscribe to our newsletter.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email || user?.email,
          preferences
        }),
      });

      if (response.ok) {
        toast({
          title: 'Successfully subscribed!',
          description: 'You will now receive updates about new products and exclusive offers.',
        });
        setEmail('');
        if (onClose) onClose();
      } else {
        const error = await response.json();
        toast({
          title: 'Subscription failed',
          description: error.error || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Subscription failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferenceChange = (key: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center mb-4">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-2xl">Stay Updated</CardTitle>
        <CardDescription>
          Subscribe to our newsletter for exclusive offers, new product launches, and special updates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user?.email || "Enter your email"}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm font-medium">Notification Preferences</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newProducts"
                  checked={preferences.newProducts}
                  onCheckedChange={(checked) => handlePreferenceChange('newProducts', checked as boolean)}
                />
                <Label htmlFor="newProducts" className="text-sm">
                  New product launches
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sales"
                  checked={preferences.sales}
                  onCheckedChange={(checked) => handlePreferenceChange('sales', checked as boolean)}
                />
                <Label htmlFor="sales" className="text-sm">
                  Sales and discounts
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="updates"
                  checked={preferences.updates}
                  onCheckedChange={(checked) => handlePreferenceChange('updates', checked as boolean)}
                />
                <Label htmlFor="updates" className="text-sm">
                  Company updates
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletters"
                  checked={preferences.newsletters}
                  onCheckedChange={(checked) => handlePreferenceChange('newsletters', checked as boolean)}
                />
                <Label htmlFor="newsletters" className="text-sm">
                  Weekly newsletters
                </Label>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to receive marketing emails from us. 
            You can unsubscribe at any time from your profile settings.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
