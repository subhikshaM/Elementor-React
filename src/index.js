import React from 'react';
import ReactDOM from 'react-dom';
import MyElementorComponent from './MyElementorComponent';

// Function to render the MyElementorComponent inside the root element
const renderMyElementorComponent = async (selectedOption, dropdownOptions) => {
  let staffData = [];

  // Fetch staff data from staff-data.json when the selected option is "staffListing"
  if (selectedOption === 'staffListing') {
    try {
      const response = await fetch('my-elementor-component/src/staff-data.json'); // Update the path to staff-data.json
      staffData = await response.json();
      console.log('Fetched Staff Data:', staffData); // Debug: Check if data is fetched correctly
    } catch (error) {
      console.error('Error fetching staff data:', error);
    }
  }

  ReactDOM.render(
    <MyElementorComponent dropdownOptions={dropdownOptions} staffData={staffData} />,
    document.getElementById('my-react-component')
  );
};

// Call the render function when the DOM is ready and also in Elementor editor mode
document.addEventListener('DOMContentLoaded', () => {
  // Check if we are in Elementor editor mode
  const isInEditorMode = window.location.href.includes('elementor');

  // If in editor mode, set the initial selected option as "staffListing_1"
  const initialSelectedOption = isInEditorMode ? 'staffListing_1' : '';

  // Define the dropdown options
  const dropdownOptions = {
    programDetail: 'Program Detail Info',
    staffListing: 'Staff Listing',
    videoListing: 'Video Listing',
    programListing: 'Program Listing',
  };

  // Render the MyElementorComponent with the initial selected option and dropdownOptions
  renderMyElementorComponent(initialSelectedOption, dropdownOptions);
});

// Add an event listener for when the selected option is changed in Elementor editor
document.addEventListener('elementor/frontend/init', () => {
  // Get the Elementor editor instance
  const editorInstance = window.elementorFrontend;

  // Add a listener for when the editor updates its settings
  editorInstance.hooks.addAction('panel/open_editor/widget/My Elementor Component', (panel) => {
    const selectedOption = panel.getCurrentWidgetSetting('selected_option');

    // Re-render the MyElementorComponent with the updated selected option
    renderMyElementorComponent(selectedOption);
  });
});
