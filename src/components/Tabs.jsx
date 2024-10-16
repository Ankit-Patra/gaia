function Tabs({ currentForm, setForm, forms }) {
    return (
      <div className="tabs">
        {forms.map(form => (
          <button
            key={form.name}
            onClick={() => setForm(form.name, form.url)}  // Pass form name and URL to fetch
            className={currentForm === form.name ? 'active' : ''}
          >
            {form.name}
          </button>
        ))}
      </div>
    );
  }
  
export default  Tabs;