import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../read.css'; // Import the provided CSS file
import OwnerPanel from '../OwnerPanel';
import '@mdi/font/css/materialdesignicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ReadFinance = () => {
  const [finances, setFinances] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); // State to hold total amount
  const [totalCost, setTotalCost] = useState(0); 
  const [totalRevenue, setTotalRevenue] = useState(0); // State to hold total revenue
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalAmount(); // Recalculate total amount whenever finances change
    calculateTotalCost(); 
    calculateTotalRevenue(); 
  }, [finances]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/finances');
      setFinances(response.data);
    } catch (error) {
      console.error('Error fetching Finance data:', error);
    }
  };

  const handleDelete = async (finance_id) => {
    try {
      await axios.delete(`http://localhost:8081/api/finances/${finance_id}`);
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error('Error deleting Finance data:', error);
    }
  };

  const searchFinances = () => {
    if (!searchQuery) {
      fetchData(); // If search query is empty, fetch all finances
      return;
    }
    // Filter finances by finance_id, order_id, amount, or milk_id
    const filteredFinances = finances.filter(finance =>
      finance.finance_id.toString().includes(searchQuery) ||
      finance.order_id.toString().includes(searchQuery) ||
      finance.amount.toString().includes(searchQuery) ||
      finance.milk_id.toString().includes(searchQuery)
    );
    setFinances(filteredFinances);
  };

  const calculateTotalAmount = () => {
    const total = finances.reduce((acc, curr) => acc + parseFloat(curr.amount), 0); // Summing up amount values
    setTotalAmount(total);
  };

  
  const calculateTotalCost = () => {
    const total = finances.reduce((acc, curr) => acc + parseFloat(curr.cost), 0); // Summing up cost values
    setTotalCost(total);
  };

  const calculateTotalRevenue = () => {
    const total = totalAmount - totalCost; // Revenue = Total Amount - Total Cost
    setTotalRevenue(total);
    setTotalProfit(total); // Assuming profit is same as revenue
    
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
    finances.map(finances => Object.values(finances).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "this_is_finances.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <OwnerPanel />
    {/* Add container class */}




      <div className="content-wrapper">
      <div className="content">
        {/* Top Statistics */}
        <div className="row">
        <div className="col-xl-3 col-sm-6">
            <div className="card card-default card-mini">
              <div className="card-header">
                {/* <h2>$18,699</h2> */}
                <div className="dropdown">
                  <a
                    className="dropdown-toggle icon-burger-mini"
                    href="/"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></a>

                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </div>
                </div>
                <div className="sub-title">
                  <span className="mr-1">Sales Of This Month</span>{/*  | <br></br><span className="mx-1">50%</span> */}
                  <div>Total Sales: {totalAmount}</div>
                  <i className="mdi mdi-arrow-down-bold text-success"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-wrapper">
                  <div>
                    <div id="spline-area-1">  <img
                  src="img/chart1.jpg" // Replace with your image URL
                  alt="Header Image"
                  className="image-container"
                /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="col-xl-3 col-sm-6">
            <div className="card card-default card-mini">
              <div className="card-header">
               {/*  <h2>$18,699</h2> */}
                <div className="dropdown">
                  <a
                    className="dropdown-toggle icon-burger-mini"
                    href="/"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></a>

                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </div>
                </div>
                <div className="sub-title">
                  <span className="mr-1"> Cost Of This Month</span>{/*  | <br></br><span className="mx-1">50%</span> */}
                  <div>Total Cost: {totalCost}</div>
                  <i className="mdi mdi-arrow-down-bold text-success"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-wrapper">
                  <div>
                    <div id="spline-area-1">  <img
                  src="img/chart2.jpg" // Replace with your image URL
                  alt="Header Image"
                  className="image-container"
                /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xl-3 col-sm-6">
            <div className="card card-default card-mini">
              <div className="card-header">
              {/*   <h2>$18,699</h2> */}
                <div className="dropdown">
                  <a
                    className="dropdown-toggle icon-burger-mini"
                    href="/"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></a>

                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </div>
                </div>
                <div className="sub-title">
                  <span className="mr-1">Profit Of This Month</span> {/* | <span className="mx-1">15%</span> */}<br></br>
                  <div>Total Profit: {totalProfit}</div> 
                  <i className="mdi mdi-arrow-down-bold text-danger"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-wrapper">
                  <div>
                    <div id="spline-area-1">  <img
                  src="img/chart3.jpg" // Replace with your image URL
                  alt="Header Image"
                  className="image-container"
                /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xl-3 col-sm-6">
            <div className="card card-default card-mini">
              <div className="card-header">
               {/*  <h2>$18,699</h2> */}
                <div className="dropdown">
                  <a
                    className="dropdown-toggle icon-burger-mini"
                    href="/"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  ></a>

                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </div>
                </div>
                <div className="sub-title">
                  <span className="mr-1">Revenue Of This Motn</span>{/*  | <br></br><span className="mx-1">50%</span> */}
                  <div>Total Revenue: {totalAmount}</div>
                  <i className="mdi mdi-arrow-down-bold text-success"></i>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-wrapper">
                  <div>
                    <div id="spline-area-1">  <img
                  src="img/chart4.jpg" // Replace with your image URL
                  alt="Header Image"
                  className="image-container"
                /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
      </div>
    </div>



    <div className="container">
       
        <div className="search-container"> {/* Add search-container class */}
          <input
            type="text"
            placeholder="Search by Finance ID, Order ID, Amount, or Milk ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Replace text with search icon */}
          <button onClick={searchFinances}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
     {/*    <div className="row">
        <div className="container3">
        <div className='centered-heading'>Total Amount: {totalAmount}</div> </div>
        
        <div className="container4">
        <div className='centered-heading'>Total Cost: {totalCost}</div>  </div> </div> */}
        <table> {/* Add table class */}
          <thead>
            <tr>
              <th>Finance ID</th>
             {/* <th>Order ID</th> */}
              <th>Order Amount</th>
            {/*   <th>Milk ID</th> */}
              <th>Milk Price</th>
          {/*    <th>Quantity</th> */}
          {/*    <th>Feed ID</th> */}
              <th>Feed Cost</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {finances.map((finance) => (
              <tr key={finance.finance_id}>
                <td>{finance.finance_id}</td>
             {/*   <td>{finance.order_id}</td>  */}
                <td>{finance.amount}</td>
            {/*    <td>{finance.milk_id}</td>  */}
                <td>{finance.price}</td>
            {/*    <td>{finance.quantity}</td>  */}
            {/*    <td>{finance.feed_id}</td>   */}
                <td>{finance.cost}</td>
                <td>{finance.date}</td>
                <td>
                  <Link to={`/UpdateFinance/${finance.finance_id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                  </Link>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(finance.finance_id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="centered-button">
          <button onClick={downloadCSV}>
          <FontAwesomeIcon icon={faDownload} /> Download CSV
          </button>
      </div>
      </div>
    </div>
  );
};

export default ReadFinance;
