
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavingsTrackerProps {
  onBack: () => void;
}

interface SavingsGoal {
  target: number;
  current: number;
  deadline: string;
  startDate: string;
}

const SavingsTracker = ({ onBack }: SavingsTrackerProps) => {
  const [goal, setGoal] = useState<SavingsGoal>({
    target: 0,
    current: 0,
    deadline: '',
    startDate: new Date().toISOString().split('T')[0]
  });
  const [newSaving, setNewSaving] = useState('');
  const [showGoalForm, setShowGoalForm] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const savedGoal = localStorage.getItem('savingsGoal');
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
      setShowGoalForm(false);
    }
  }, []);

  const saveGoal = () => {
    localStorage.setItem('savingsGoal', JSON.stringify(goal));
    setShowGoalForm(false);
    toast({
      title: "लक्ष्य सेट हो गया! | Goal Set!",
      description: `आपका बचत लक्ष्य ₹${goal.target} सेट हो गया है | Your savings goal of ₹${goal.target} has been set`,
    });
  };

  const addSaving = () => {
    const amount = parseFloat(newSaving);
    if (amount > 0) {
      const updatedGoal = { ...goal, current: goal.current + amount };
      setGoal(updatedGoal);
      localStorage.setItem('savingsGoal', JSON.stringify(updatedGoal));
      setNewSaving('');
      
      if (updatedGoal.current >= updatedGoal.target) {
        toast({
          title: "🎉 बधाई हो! | Congratulations!",
          description: "आपने अपना लक्ष्य पूरा कर लिया! कैशबैक के लिए पात्र हैं | You've achieved your goal! Eligible for cashback",
        });
      } else {
        toast({
          title: "बचत जोड़ी गई! | Saving Added!",
          description: `₹${amount} आपकी बचत में जोड़ा गया | ₹${amount} added to your savings`,
        });
      }
    }
  };

  const progressPercentage = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
  const remainingAmount = Math.max(goal.target - goal.current, 0);
  const daysLeft = goal.deadline ? Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  if (showGoalForm) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            वापस | Back
          </Button>
          <h1 className="text-2xl font-bold">बचत लक्ष्य सेट करें | Set Savings Goal</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>अपना बचत लक्ष्य बनाएं | Create Your Savings Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                लक्ष्य राशि (₹) | Target Amount (₹)
              </label>
              <Input
                type="number"
                value={goal.target}
                onChange={(e) => setGoal({ ...goal, target: parseFloat(e.target.value) || 0 })}
                placeholder="जैसे: 10000 | e.g., 10000"
                className="text-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                अंतिम तारीख | Target Date
              </label>
              <Input
                type="date"
                value={goal.deadline}
                onChange={(e) => setGoal({ ...goal, deadline: e.target.value })}
                className="text-lg"
              />
            </div>

            <Button onClick={saveGoal} className="w-full text-lg py-6">
              लक्ष्य शुरू करें | Start Goal
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          वापस | Back
        </Button>
        <h1 className="text-2xl font-bold">बचत ट्रैकर | Savings Tracker</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Progress Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              आपकी प्रगति | Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">₹{goal.current}</span>
                <span className="text-lg text-gray-600">/ ₹{goal.target}</span>
              </div>
              
              <Progress value={progressPercentage} className="h-4" />
              
              <div className="grid md:grid-cols-3 gap-4 text-center mt-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{progressPercentage.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600">पूरा हुआ | Completed</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">₹{remainingAmount}</div>
                  <div className="text-sm text-gray-600">बकाया | Remaining</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{daysLeft}</div>
                  <div className="text-sm text-gray-600">दिन बचे | Days Left</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Savings */}
        <Card>
          <CardHeader>
            <CardTitle>बचत जोड़ें | Add Savings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              value={newSaving}
              onChange={(e) => setNewSaving(e.target.value)}
              placeholder="राशि डालें | Enter amount"
              className="text-lg"
            />
            <Button onClick={addSaving} className="w-full">
              बचत जोड़ें | Add Saving
            </Button>
          </CardContent>
        </Card>

        {/* Cashback Status */}
        <Card>
          <CardHeader>
            <CardTitle>कैशबैक स्थिति | Cashback Status</CardTitle>
          </CardHeader>
          <CardContent>
            {progressPercentage >= 100 ? (
              <div className="text-center space-y-2">
                <div className="text-3xl">🎉</div>
                <p className="text-green-600 font-bold">कैशबैक के लिए योग्य!</p>
                <p className="text-sm text-gray-600">Eligible for cashback!</p>
                <Button className="w-full mt-4">
                  कैशबैक क्लेम करें | Claim Cashback
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="text-3xl">💰</div>
                <p className="text-gray-600">लक्ष्य पूरा करने पर कैशबैक मिलेगा</p>
                <p className="text-sm text-gray-500">Get cashback when goal is completed</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button 
          variant="outline" 
          onClick={() => setShowGoalForm(true)}
          className="w-full"
        >
          नया लक्ष्य सेट करें | Set New Goal
        </Button>
      </div>
    </div>
  );
};

export default SavingsTracker;
