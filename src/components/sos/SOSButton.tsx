
import React, { useState } from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const SOSButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [emergencyType, setEmergencyType] = useState('');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSOSClick = () => {
    setIsDialogOpen(true);
  };

  const handleSendSOS = () => {
    setIsLoading(true);
    
    // Simulate sending the SOS
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      
      // Show success toast
      toast({
        title: "SOS Alert Sent",
        description: "Emergency services have been notified of your situation.",
        variant: "default",
      });
      
      // Reset form after a delay
      setTimeout(() => {
        setIsDialogOpen(false);
        setEmergencyType('');
        setDetails('');
        setIsSent(false);
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={handleSOSClick}
        variant="destructive"
        size="lg"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg flex items-center justify-center animate-pulse-subtle"
      >
        <AlertCircle className="h-6 w-6" />
        <span className="sr-only">Emergency SOS</span>
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Emergency SOS Alert
            </DialogTitle>
            <DialogDescription className="text-center">
              Submit an emergency SOS alert to notify rescue teams about your situation.
            </DialogDescription>
          </DialogHeader>

          {!isSent ? (
            <>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="emergency-type" className="text-sm font-medium leading-none col-span-4">
                    Type of Emergency
                  </label>
                  <div className="col-span-4">
                    <Select value={emergencyType} onValueChange={setEmergencyType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flood">Flooding</SelectItem>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="medical">Medical Emergency</SelectItem>
                        <SelectItem value="collapse">Building Collapse</SelectItem>
                        <SelectItem value="other">Other Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="details" className="text-sm font-medium leading-none col-span-4">
                    Additional Details
                  </label>
                  <Textarea 
                    id="details"
                    placeholder="Describe your emergency situation..."
                    className="col-span-4"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  variant="destructive"
                  className="w-full"
                  disabled={!emergencyType || isLoading}
                  onClick={handleSendSOS}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <span className="animate-spin mr-2">
                        <AlertTriangle className="h-4 w-4" />
                      </span>
                      Sending Alert...
                    </div>
                  ) : (
                    "Send SOS Alert"
                  )}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center animate-scale mb-4">
                <AlertCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-center">SOS Alert Sent Successfully</h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                Emergency services have been notified of your situation.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
