import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/routes';
import EditProfileModal from '@/components/profile/EditProfileModal';

interface UserProfile {
  username: string;
  email: string;
  joinDate: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        
        if (userDoc.exists() && userData) {
          setProfile({
            username: userData.username,
            email: user.email || '',
            joinDate: new Date(user.metadata.creationTime || Date.now()).toLocaleDateString('he-IL')
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.AUTH);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleProfileUpdate = () => {
    if (auth.currentUser) {
      getDoc(doc(db, 'users', auth.currentUser.uid))
        .then((userDoc) => {
          const userData = userDoc.data();
          if (userDoc.exists() && userData) {
            setProfile({
              username: userData.username,
              email: auth.currentUser?.email || '',
              joinDate: profile?.joinDate || ''
            });
          }
        })
        .catch(console.error);
    }
  };

  if (loading) {
    return <div className="text-center p-6">טוען...</div>;
  }

  if (!profile) {
    return <div className="text-center p-6">לא נמצא פרופיל</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">הפרופיל שלי</h1>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{profile.username}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            <div className="space-x-2 flex">
              <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                ערוך פרופיל
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                התנתק
              </Button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              תאריך הצטרפות: {profile.joinDate}
            </p>
          </div>
        </div>
      </Card>

      {profile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          currentProfile={profile}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
} 