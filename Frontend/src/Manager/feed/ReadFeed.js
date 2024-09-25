import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../read.css'; // Import the provided CSS file
import ManagerPanel from '../ManagerPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';

const ReadFeed = () => {
  const [feedsData, setFeedsData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/feeds');
      setFeedsData(response.data);
    } catch (error) {
      console.error('Error fetching Feed data:', error);
    }
  };

  const handleDelete = async (feed_id) => {
    console.log("Deleting feed with ID:", feed_id);
  
    try {
      await axios.delete(`http://localhost:8081/api/feeds/${feed_id}`);
      // If the delete request is successful, fetch the updated data to refresh the list
      fetchData();
    } catch (error) {
      console.error(`Error deleting record with feed ID ${feed_id}:`, error);
    }
  };

  const searchFeeds = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all feeds
      return;
    }
    // Filter feeds by feed_id or name
    const filteredFeeds = feedsData.filter(feed => 
      feed.feed_id.toString().includes(searchQuery) || 
      feed.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFeedsData(filteredFeeds);
  };

  return (
    <div>
      <ManagerPanel />
      <div className="container"> {/* Add container class */}
        <h1 className="centered-heading">Feed Data</h1>
        <div className="search-container"> {/* Add search-container class */}
          <input
            type="text"
            placeholder="Search by Feed ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Replace text with search icon */}
          <button onClick={searchFeeds}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <table> {/* Add table class */}
          <thead>
            <tr>
              <th>Feed ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedsData.map((feed) => (
              <tr key={feed.feed_id}>
                <td>{feed.feed_id}</td>
                <td>{feed.name}</td>
                <td>{feed.type}</td>
                <td>{feed.quantity}</td>
                <td>{feed.cost}</td>
                <td>
                  <Link to={`/UpdateFeed/${feed.feed_id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(feed.feed_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReadFeed;
