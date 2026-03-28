//import './Input.css';

const Input = ({ type = 'text', label, id, value, onChange, required = false, placeholder = '' }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;