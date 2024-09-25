import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//////////////////////////////////////////////////Website Frontend//////////////////////////////////////////////////
import Home from './Home/home';
import About from './About/About';
import Services from './Services/Services';
import Product from './Product/Product';
import Team from './Team/Team';
import Login from './Login/Login';
import Contact from './Contact/Contact';
import Features from './Features/Features';
import CreateSuggestions from './Veterinarian/CreateSuggestions';
import ReadSuggestions from './Manager/ReadSuggestions';



import Weather from './Weather/Weather';
import Calender from './Calender/Calender';


//////////////////////////////////////////////////Owner//////////////////////////////////////////////////
import OwnerPanel from './Owner/OwnerPanel';
import ReadFinance from './Owner/finance/ReadFinance';
import CreateFinance from './Owner/finance/CreateFinance';
import UploadCSV from './Owner/UploadCsv';


//////////////////////////////////////////////////Manager//////////////////////////////////////////////////
 import Manager from './Manager/manager';
 import ManagerPanel from './Manager/ManagerPanel';
 import ContactUs from './SendEmail';
 //////////Oders book by Clients////////// 
 import CreateClientOrders from './Contact/CreateClientOrders';
 import ReadClientOrders from './Manager/ClientOrders/ReadClientOrders';
 import UpdateClientOrders from './Manager/ClientOrders/UpdateClientOrders';

 //////////Employee////////// 
 import CreateEmployee from './Manager/Employee/CreateEmployee';
 import ReadEmployee from './Manager/Employee/ReadEmployee';
 import UpdateEmployee from './Manager/Employee/UpdateEmployee';

 //////////Orders////////// 
import Order from './Manager/order/order';
import Ordercreate from './Manager/order/ordercreate';
import OrderUpdate from './Manager/order/OrderUpdate';
import DisplayData from './Manager/order/DisplayData';

 //////////Vaccinations////////// 
import ReadVaccination from './Manager/vaccination/ReadVaccination';
import CreateVaccination from './Manager/vaccination/CreateVaccination';
import UpdateVaccination from './Manager/vaccination/UpdateVaccination';

 //////////Feed////////// 
import ReadFeed from './Manager/feed/ReadFeed';
import CreateFeed from './Manager/feed/CreateFeed';
import UpdateFeed from './Manager/feed/UpdateFeed';

//////////Milk Production////////// 
import ReadMilkProduction from './Manager/milkproduction/ReadMilkProduction';
import CreateMilkProduction from './Manager/milkproduction/CreateMilkProduction';
import UpdateMilkProduction from './Manager/milkproduction/UpdateMilkProduction';
import Total from './Manager/milkproduction/Total';

//////////Livestock////////// 
import ReadLivestock from './Manager/Livestock/ReadLivestock';
import CreateLivestock from './Manager/Livestock/CreateLivestock';
import UpdateLivestock from './Manager/Livestock/UpdateLivestock';

//////////Daily Milk////////// 
import ReadDailyMilk from './Manager/DailyMilk/ReadDailyMilk';
import CreateDailyMilk from './Manager/DailyMilk/CreateDailyMilk';
import UpdateDailyMilk from './Manager/DailyMilk/UpdateDailyMilk';



//////////////////////////////////////////////////Veterinarian//////////////////////////////////////////////////
import VeterinarianPanel from './Veterinarian/VeterinarianPanel';
import ReadVaccinationvet from './Veterinarian/vaccination/ReadVaccination';
import CreateVaccinationvet from './Veterinarian/vaccination/CreateVaccination';
import UpdateVaccinationvet from './Veterinarian/vaccination/UpdateVaccination';


import VacOrder from './Veterinarian/vaccinesales/order';
import VacOrdercreate from './Veterinarian/vaccinesales/ordercreate';
import VacOrderUpdate from './Veterinarian/vaccinesales/OrderUpdate';


import CalenderVet from './Veterinarian/CalenderVet/CalenderVet';



import ReadLivestockVet from './Veterinarian/Livestock/ReadLivestockVet';



function App() {
  return (
    <BrowserRouter>
    
      <Routes>


    {/*   /////////////////////////////////////////////Website-Frontend////////////////////////////////////////////////// */}
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/Login" element={<Login />} />


     {/* //////////////////////////////////////////////////Owner////////////////////////////////////////////////// */}
  
      <Route path="/Calender" element={<Calender />} />
      
      <Route path="/Weather" element={<Weather />} />
      <Route path="/OwnerPanel" element={<OwnerPanel />} />
      <Route path="/UploadCSV" element={<UploadCSV />} />

      <Route path="/ReadFinance" element={<ReadFinance />} />
      <Route path="/CreateFinance" element={<CreateFinance />} />


      <Route path="/CreateSuggestions" element={<CreateSuggestions />} />
      <Route path="/ReadSuggestions" element={<ReadSuggestions />} />
      



        {/* //////////////////////////////////////////////////Manager////////////////////////////////////////////////// */}

        <Route path="/manager" element={<Manager />} />
        <Route path="/ManagerPanel" element={<ManagerPanel />} />
        <Route path="/ContactUs" element={<ContactUs />} />

      
        {/* //////////ORDERS CREATED BY CLIENTS//////////  */}
        <Route path="/CreateClientOrders" element={<CreateClientOrders />} />
        <Route path="/ReadClientOrders" element={<ReadClientOrders />} />
        <Route path="/UpdateClientOrders/:id" element={<UpdateClientOrders />} />

        {/* //////////Employee//////////  */}
        <Route path="/ReadEmployee" element={<ReadEmployee />} />
        <Route path="/CreateEmployee" element={<CreateEmployee />} />
        <Route path="/UpdateEmployee/:employee_id" element={<UpdateEmployee />} />
      
      {/* //////////Orders////////// */}
      <Route path="/DisplayData" element={<DisplayData />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/ordercreate" element={<Ordercreate />} />
      <Route path="/OrderUpdate/:order_id" element={<OrderUpdate />} />

      {/* //////////Vaccinations//////////  */}
      <Route path="/ReadVaccination" element={<ReadVaccination />} />
      <Route path="/CreateVaccination" element={<CreateVaccination />} />
      <Route path="/UpdateVaccination/:vaccination_id" element={<UpdateVaccination />} />


      {/* //////////Feed//////////  */}
      <Route path="/ReadFeed" element={<ReadFeed />} />
      <Route path="/CreateFeed" element={<CreateFeed />} />
      <Route path="/UpdateFeed/:feed_id" element={<UpdateFeed />} />

      {/* ////////// milk production//////////  */}

      <Route path="/ReadMilkProduction" element={<ReadMilkProduction />} />
      <Route path="/CreateMilkProduction" element={<CreateMilkProduction />} />
      <Route path="/UpdateMilkProduction/:production_id" element={<UpdateMilkProduction />} />
      <Route path="/Total" element={<Total />} />

      {/* ////////// Livestock//////////  */}
      <Route path="/ReadLivestock" element={<ReadLivestock />} />
      <Route path="/CreateLivestock" element={<CreateLivestock />} />
      <Route path="/UpdateLivestock/:livestock_id" element={<UpdateLivestock />} />

       {/* ////////// Daily mILK//////////  */}
       <Route path="/ReadDailyMilk" element={<ReadDailyMilk />} />
      <Route path="/CreateDailyMilk" element={<CreateDailyMilk />} />
      <Route path="/UpdateDailyMilk/:milk_id" element={<UpdateDailyMilk />} />
    




        


       




        



   

   

      {/* //////////////////////////////////////////////////veterinarian////////////////////////////////////////////////// */}

        <Route path="/VeterinarianPanel" element={<VeterinarianPanel />} />
        
        <Route path="/CalenderVet" element={<CalenderVet />} />

        <Route path="/ReadVaccinationvet" element={<ReadVaccinationvet />} />
        <Route path="/CreateVaccinationvet" element={<CreateVaccinationvet />} />
        <Route path="/UpdateVaccinationvet/:vaccination_id" element={<UpdateVaccinationvet />} />

        <Route path="/VacOrder" element={<VacOrder />} />
        <Route path="/VacOrdercreate" element={<VacOrdercreate />} />
        <Route path="/VacOrderUpdate/:order_id" element={<VacOrderUpdate />} />
        <Route path="/ReadLivestockVet" element={<ReadLivestockVet />} />


      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
