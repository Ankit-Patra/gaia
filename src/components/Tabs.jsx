import React from 'react';

function Tabs({ currentForm, setForm, forms }) {
  return (
    <div className="tabs">
      {forms.map((form) => (
        <button
          key={form.name}
          onClick={() => setForm(form.name, form.url)}
          className={currentForm === form.name ? 'active' : ''}
        >
          {form.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
