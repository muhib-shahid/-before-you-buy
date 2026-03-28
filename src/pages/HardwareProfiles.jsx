import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserProfiles, createHardwareProfile } from '../services/hardwareService';
import HardwareProfileCard from '../components/hardware/HardwareProfileCard';
import HardwareProfileForm from '../components/hardware/HardwareProfileForm';
// import './HardwareProfiles.css';

const HardwareProfiles = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchProfiles = async () => {
      const { data, error } = await getUserProfiles(user.id);
      setLoading(false);
      if (error) setError(error);
      else setProfiles(data || []);
    };
    fetchProfiles();
  }, [user]);

  const handleAddProfile = async (profileData) => {
    if (!user) return;
    const { data, error } = await createHardwareProfile({
      ...profileData,
      user_id: user.id
    });
    if (error) {
      alert(error);
    } else {
      setProfiles([...profiles, data]);
      setShowForm(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading profiles...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="hardware-profiles-page">
      <h1>My Hardware Profiles</h1>
      <button onClick={() => setShowForm(!showForm)} className="btn-primary">
        {showForm ? 'Cancel' : 'Add New Profile'}
      </button>
      {showForm && <HardwareProfileForm onSubmit={handleAddProfile} />}
      <div className="profiles-list">
        {profiles.map(profile => <HardwareProfileCard key={profile.id} profile={profile} />)}
      </div>
    </div>
  );
};

export default HardwareProfiles;