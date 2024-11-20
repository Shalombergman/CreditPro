import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { LoanPurpose } from '@/types/credit';

const LOAN_PURPOSES = [
  { value: 'MORTGAGE', label: 'משכנתא' },
  { value: 'BUSINESS', label: 'עסקי' },
  { value: 'PERSONAL', label: 'אישי' }
];

export default function NewApplicationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const [formData, setFormData] = useState({
    amount: '',
    purpose: 'PERSONAL' as LoanPurpose,
    loanTerm: '12',
    monthlyIncome: '',
    employmentStatus: 'EMPLOYED',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const amount = parseFloat(formData.amount);
      const loanTerm = parseInt(formData.loanTerm);
      const monthlyIncome = parseFloat(formData.monthlyIncome);

      // חישוב תשלום חודשי משוער (ריבית שנתית של 5%)
      const annualRate = 0.05;
      const monthlyRate = annualRate / 12;
      const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
        (Math.pow(1 + monthlyRate, loanTerm) - 1);

      const application = {
        userId: user.uid,
        amount,
        purpose: formData.purpose,
        status: 'PENDING',
        guarantors: [],
        documents: [],
        terms: {
          interestRate: annualRate * 100,
          loanTerm,
          monthlyPayment,
          totalPayment: monthlyPayment * loanTerm
        },
        monthlyIncome,
        employmentStatus: formData.employmentStatus,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'applications'), application);
      navigate('/applications');
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('אירעה שגיאה בשליחת הבקשה. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">בקשת אשראי חדשה</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">סכום הלוואה מבוקש</label>
                <Input
                  type="number"
                  min="1000"
                  step="1000"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="הכנס סכום בש״ח"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">מטרת ההלוואה</label>
                <Select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value as LoanPurpose })}
                  options={LOAN_PURPOSES}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">תקופת ההלוואה (בחודשים)</label>
                <Input
                  type="number"
                  min="3"
                  max="360"
                  required
                  value={formData.loanTerm}
                  onChange={(e) => setFormData({ ...formData, loanTerm: e.target.value })}
                  placeholder="מספר חודשים"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">הכנסה חודשית</label>
                <Input
                  type="number"
                  min="0"
                  step="100"
                  required
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  placeholder="הכנס סכום בש״ח"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">מצב תעסוקתי</label>
                <Select
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                  options={[
                    { value: 'EMPLOYED', label: 'שכיר' },
                    { value: 'SELF_EMPLOYED', label: 'עצמאי' },
                    { value: 'RETIRED', label: 'פנסיונר' },
                    { value: 'OTHER', label: 'אחר' }
                  ]}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">הערות נוספות</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="הוסף מידע נוסף שיכול להיות רלוונטי לבקשה"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/applications')}
                disabled={loading}
              >
                ביטול
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'שולח בקשה...' : 'שלח בקשה'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
} 