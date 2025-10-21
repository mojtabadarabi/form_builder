import React from 'react';

export default function Preview({ fields, setFields }) {
  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const obj = Object.fromEntries(fd.entries());
    console.log('Form submit values:', obj);
    alert('Submitted — check console for values');
  }

  return (
    <div>
      <h3>Preview</h3>
      {fields.length === 0 ? (
        <div className="muted">No fields yet.</div>
      ) : (
        <form onSubmit={handleSubmit}>
          {fields.map(f => {
            const name = f.id;
            switch (f.type) {
              case 'text':
              case 'email':
                return (
                  <div key={f.id} className="form-row">
                    <label>{f.label}</label>
                    <input name={name} type={f.type === 'email' ? 'email' : 'text'} />
                  </div>
                );
              case 'textarea':
                return (
                  <div key={f.id} className="form-row">
                    <label>{f.label}</label>
                    <textarea name={name} />
                  </div>
                );
              case 'checkbox':
                return (
                  <div key={f.id} className="form-row">
                    <label>
                      <input name={name} type="checkbox" /> {f.label}
                    </label>
                  </div>
                );
              default:
                return null;
            }
          })}

          <div style={{ marginTop: 12 }}>
            <button type="submit">Submit preview</button>
          </div>
        </form>
      )}
    </div>
  );
}