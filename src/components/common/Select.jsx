// import './Select.css';

const Select = ({ label, id, value, onChange, options, required = false }) => {
  return (
    <div className="select-group">
      {label && <label htmlFor={id}>{label}</label>}
      <select id={id} value={value} onChange={onChange} required={required}>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;