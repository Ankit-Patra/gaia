import React from 'react';
// import './Tabs.css'; // Ensure this path is correct

const Tabs = ({ currentForm, setForm, forms }) => {
    return (
        <div className="tabs">
            {forms.map((form) => (
                <button
                    key={form.name}
                    className={`tab-button ${currentForm === form.name ? 'active' : ''}`}
                    onClick={() => setForm(form.name, form.url)}
                >
                    {form.name}
                </button>
            ))}
        </div>
    );
};

export default Tabs;