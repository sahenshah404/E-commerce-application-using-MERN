import React from 'react';

function Input(props) {
    return <div className="mb-3 row">
        <label htmlFor={props.id} className="col-sm-2 col-form-label">{props.label}</label>
        <div className="col-sm-10">
            <input type={props.type}
             className="form-control" 
             name={props.name}
             id={props.id} placeholder={props.placeholder}
             value={props.value}
              accept={props.accept}
              multiple={props.multiple}
              required={props.required}
              onChange={props.onChange}
              />
        </div>
        </div>

};

        export default Input;