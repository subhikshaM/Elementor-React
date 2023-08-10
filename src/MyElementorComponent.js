import React, { useState, useEffect } from 'react';

const dummyStaffData = [
  {
    id: 1,
    name: 'Siddarth',
    position: 'Software Engineer',
    department: 'Engineering',
  },
  {
    id: 2,
    name: 'Subhekshana',
    position: 'Marketing Manager',
    department: 'Marketing',
  },
  {
    id: 3,
    name: 'Megha',
    position: 'Product Manager',
    department: 'Product',
  },
  {
    id: 3,
    name: 'Jeyaa',
    position: 'Product Manager',
    department: 'Product',
  },
  {
    id: 3,
    name: 'Iniyan',
    position: 'Product Manager',
    department: 'Product',
  },
  {
    id: 3,
    name: 'Lavanya',
    position: 'Product Manager',
    department: 'Product',
  },
];

const MyElementorComponent = ({ dropdownOptions, staffData }) => {
    const [fetchedStaffData, setFetchedStaffData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [viewAll, setViewAll] = useState(false);
  
    // Use dummyStaffData instead of fetching from API for testing purposes
    const fetchStaffData = async () => {
      setFetchedStaffData(dummyStaffData);
    };
  
    useEffect(() => {
      fetchStaffData();
    }, []);
  
    const handleViewAll = () => {
      setViewAll(!viewAll);
    };
  
    const handleDropdownChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const renderStaffData = () => {
      if (!fetchedStaffData || fetchedStaffData.length === 0) {
        return <p>No staff data available.</p>;
      }
  
      // Determine the number of staff members to display based on the viewAll state
      const staffToDisplay = viewAll ? fetchedStaffData : fetchedStaffData.slice(0, 3);
  
      // Render fetched staff data in separate cards
      return (
        <div style={containerStyle}>
          {window.elementorFrontend ? null : (
            <div>
              <h2>{selectedOption && `Selected Option: ${selectedOption}`}</h2>
              <select onChange={handleDropdownChange}>
                <option value="">Select an option</option>
                {Object.entries(dropdownOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div style={cardsContainerStyle}>
            {staffToDisplay.map((staff) => (
              <div key={staff.id} style={cardStyle}>
                <h3>{staff.name}</h3>
                <p>Position: {staff.position}</p>
                <p>Department: {staff.department}</p>
              </div>
            ))}
            {fetchedStaffData.length > 3 && (
              <div style={viewAllStyle}>
                <button onClick={handleViewAll}>
                  {viewAll ? 'Collapse' : 'View All'}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };
  
    return (
      <div>
        {/* Output additional content here if needed */}
        {renderStaffData()}
      </div>
    );
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };
  
  const cardsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%', // Set a fixed width for the cards container
    position: 'relative', // Add position relative to the cards container
  };
  
  const cardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    flex: '1', // Equal width for each card, adjust as needed
    minWidth: '300px', // Set minimum width for each card, adjust as needed
  };
  
  const viewAllStyle = {
    position: 'absolute', // Set position to absolute
    top: '0', // Align to the top of the container
    right: '0', // Align to the right of the container
    marginTop: '10px',
  };
  
  export default MyElementorComponent;