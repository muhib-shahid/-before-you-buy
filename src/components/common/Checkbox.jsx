// import './Checkbox.css';

const Checkbox = ({ label, id, checked, onChange }) => {
  return (
    <div className="checkbox-group">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;