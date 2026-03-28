import { useState } from 'react';
// import './HardwareProfileForm.css';

const HardwareProfileForm = ({ onSubmit }) => {
  const [cpu, setCpu] = useState('');
  const [ram, setRam] = useState('');
  const [gpu, setGpu] = useState('');
  const [os, setOs] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ cpu, ram, gpu, os });
  };

  return (
    <form onSubmit={handleSubmit} className="hardware-profile-form">
      <div className="form-group">
        <label htmlFor="cpu">CPU</label>
        <input type="text" id="cpu" value={cpu} onChange={(e) => setCpu(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="ram">RAM (GB)</label>
        <input type="number" id="ram" value={ram} onChange={(e) => setRam(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="gpu">GPU</label>
        <input type="text" id="gpu" value={gpu} onChange={(e) => setGpu(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="os">OS</label>
        <input type="text" id="os" value={os} onChange={(e) => setOs(e.target.value)} />
      </div>
      <button type="submit">Save Profile</button>
    </form>
  );
};

export default HardwareProfileForm;