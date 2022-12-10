import './App.css';
import FrontPage from './pages/FrontPage/FrontPage';
import { BrowserRouter , HashRouter, Route , Routes } from 'react-router-dom';
import Header from './components/Header';
import GiftStore from './pages/GiftStore/GiftStore';
import Dashboard from './pages/Dashboard/Dashboard';
import Help from './pages/Help/Help';
import NotFound from './pages/404/NotFound'
import ProductDescription from './pages/ProductDescription/ProductDescription';
import Payment from './pages/PaymentReceipt/Success/Payment';
import PaymentFailed from './pages/PaymentReceipt/Failed/Payment';
import Loading from './pages/Loading/Loading';
import Speech from './components/Speech';
import Merchant from './pages/MerchantDashboard/Merchant';
import MerchantDashboard from './pages/MerchantDashboard/MerchantDashboard';
import MerchantFrontPage from './pages/MerchantLogin/FrontPage/MerchantFrontPage';
 


function App() {
  return (
   <>

<BrowserRouter>

      <Routes>
        <Route path="/" element={<FrontPage/>}> </Route>
        <Route path='/merchantlogin' element={<MerchantFrontPage/>}></Route>
        <Route path="/" element={ <Header/> }> 
        <Route path="/giftstore" element={ <GiftStore/> }></Route>
        <Route path="/dashboard" element={ <Dashboard/> }></Route>
        <Route path="/help" element={ <Help/> }></Route>
        <Route path="/product" element={ <ProductDescription/> }></Route>
        <Route path="*" element={ <NotFound/> }></Route>
        <Route path='/loading' element={<Loading/>}></Route>
        <Route path='/payment/success' element={<Payment/>}></Route>
        <Route path='/payment/failed' element={<PaymentFailed/>}></Route>
        <Route path='/speech' element={<Speech/>}></Route>
        <Route path='/merchantdash' element={<MerchantDashboard/>}></Route>
        </Route>
        </Routes>
        
    </BrowserRouter>
 
    </>
  );
}

export default App;
