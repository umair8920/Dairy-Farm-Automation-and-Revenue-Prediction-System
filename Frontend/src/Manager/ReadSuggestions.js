import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import './read.css';
import { Link } from 'react-router-dom';


const ReadSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/suggestions');
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleDelete = async (suggestion_id) => {
    console.log("Deleting suggestion with ID:", suggestion_id);
  
    try {
      await axios.delete(`http://localhost:8081/api/suggestions/${suggestion_id}`);
      // If the delete request is successful, fetch the updated data to refresh the list
      fetchData();
    } catch (error) {
      console.error(`Error deleting suggestion with ID ${suggestion_id}:`, error);
    }
  };

  const searchSuggestions = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all suggestions
      return;
    }
    // Filter suggestions by suggestion_id, suggestion, or temperature
    const filteredSuggestions = suggestions.filter(suggestion => 
      suggestion.suggestion_id.toString().includes(searchQuery) || 
      suggestion.suggestion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.temperature.toString().includes(searchQuery)
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <div>
   
      <div className="container"> {/* Add container class */}
        <h1 className="centered-heading">Suggestions</h1>
        <div className="search-container"> {/* Add search-container class */}
          <input
            type="text"
            placeholder="Search by ID, Suggestion, or Temperature"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Replace text with search icon */}
          <button onClick={searchSuggestions}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <table> {/* Add table class */}
          <thead>
            <tr>
              <th>Suggestion ID</th>
              <th>Suggestion</th>
              <th>Temperature</th>
              <th>Activity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((suggestion) => (
              <tr key={suggestion.suggestion_id}>
                <td>{suggestion.suggestion_id}</td>
                <td>{suggestion.suggestion}</td>
                <td>{suggestion.temperature}</td>
                <td>{suggestion.activity}</td>
                <td>
                  <Link to={`/UpdateSuggestion/${suggestion.suggestion_id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(suggestion.suggestion_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadSuggestions;
