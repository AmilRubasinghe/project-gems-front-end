import React, { useState } from 'react';

// Sample data array for sections
const settingsData = [
  {
    id: 'profile',
    title: 'Profile Settings',
    inputs: [
      { label: 'Name', type: 'text', placeholder: 'Your Name' },
      { label: 'Email', type: 'email', placeholder: 'Your Email' },
    ],
    buttonLabel: 'Save',
  },
  {
    id: 'notifications',
    title: 'Notification Preferences',
    checkboxes: [
      { label: 'Email Notifications', name: 'emailNotifications' },
      { label: 'SMS Notifications', name: 'smsNotifications' },
    ],
  },
  {
    id: 'password',
    title: 'Password Management',
    inputs: [
      { label: 'Current Password', type: 'password', placeholder: 'Current Password' },
      { label: 'New Password', type: 'password', placeholder: 'New Password' },
    ],
    buttonLabel: 'Update Password',
  },
];

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    profile: { name: '', email: '' },
    notifications: { emailNotifications: false, smsNotifications: false },
    password: { currentPassword: '', newPassword: '' },
  });

  // Handle input change
  const handleChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Handle form submit
  const handleSubmit = (section) => {
    console.log(`Submitted ${section} data:`, formData[section]);
    // Handle form submission logic here
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {settingsData.map((section) => (
        <section key={section.id} className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          {section.inputs && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(section.id); }}>
              {section.inputs.map((input, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700">{input.label}</label>
                  <input
                    type={input.type}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                    placeholder={input.placeholder}
                    value={formData[section.id][input.label.toLowerCase().replace(' ', '')] || ''}
                    onChange={(e) =>
                      handleChange(
                        section.id,
                        input.label.toLowerCase().replace(' ', ''),
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
              <button type="submit" className="bg-[#204a64] text-white px-4 py-2 rounded-lg">
                {section.buttonLabel}
              </button>
            </form>
          )}
          {section.checkboxes && (
            <div>
              {section.checkboxes.map((checkbox, index) => (
                <label key={index} className="block text-gray-700">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData[section.id][checkbox.name]}
                    onChange={(e) =>
                      handleChange(section.id, checkbox.name, e.target.checked)
                    }
                  />
                  {checkbox.label}
                </label>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default SettingsPage;
