import React from 'react'
import Carousel from '../../components/Carousel'
import './store.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchGiftCard, STATUES } from '../../service/GiftCardSlice/GiftCardSlice'
import GiftCategory1 from '../../components/GiftCategory1'
import ReactLoading from 'react-loading';
import GiftCategory2 from '../../components/GiftCategory2'
import GiftCategory3 from '../../components/GiftCategory3'
import { add } from '../../service/GiftCardSlice/GiftCardSlice'
import Loading from '../Loading/Loading'
import Redeem from './Redeem'
import Search from '../../components/Search'
import { toast } from 'react-toastify'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Footer from '../../components/Footer'
import Tooltip from '@mui/material/Tooltip';

export default function GiftStore() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { giftCardData, status } = useSelector((state) => state.giftcard)
  const [query, setQuery] = useState("")

  const [textcolor, setColor] = useState("")

  const [showGiftCard, setsGiftCard] = useState(true)
  const [showCategory1, setCategory1] = useState(false)
  const [showCategory2, setCategory2] = useState(false)
  const [showCategory3, setCategory3] = useState(false)
  const [showHowtoRedeem, setHowtoRedeem] = useState(false)
  const [showSearch, setSearch] = useState(false)


  const [menuactive, setmenuactive] = useState("active")
  const [categoryactive, setcategoryactive] = useState("inactive")
  const [helpactive, sethelpactive] = useState("inactive")
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();



  useEffect(() => {

    const item = localStorage.getItem("auth0")
    if (item == null) {
      navigate('/')
    }
    dispatch(fetchGiftCard());

  }, [])



  if (status == STATUES.LOADING) {
    return <Loading />
  }

  if (status == STATUES.ERROR) {
    return <h2>Error</h2>
  }

  const giftCard = () => {

    setmenuactive("active")
    setcategoryactive("inactive")
    sethelpactive("inactive")

    setsGiftCard(true)
    setCategory1(false)
    setCategory2(false)
    setCategory3(false)
    setHowtoRedeem(false)
    setSearch(false)
  }

  const Category = () => {
    setmenuactive("inactive")
    setcategoryactive("active")
    sethelpactive("inactive")
  }


  const Category1 = () => {
    setsGiftCard(false)
    setCategory1(true)
    setCategory2(false)
    setCategory3(false)
    setHowtoRedeem(false)
    setSearch(false)
  }

  const Category2 = () => {
    setsGiftCard(false)
    setCategory1(false)
    setCategory2(true)
    setCategory3(false)
    setHowtoRedeem(false)
    setSearch(false)
  }

  const Category3 = () => {
    setsGiftCard(false)
    setCategory1(false)
    setCategory2(false)
    setCategory3(true)
    setHowtoRedeem(false)
    setSearch(false)
  }

  const HowtoRedeem = () => {

    setmenuactive("inactive")
    setcategoryactive("inactive")
    sethelpactive("active")

    setsGiftCard(false)
    setCategory1(false)
    setCategory2(false)
    setCategory3(false)
    setHowtoRedeem(true)
    setSearch(false)
  }

  const searchIt = () => {

    setmenuactive("inactive")
    setcategoryactive("inactive")
    sethelpactive("inactive")

    setsGiftCard(false)
    setCategory1(false)
    setCategory2(false)
    setCategory3(false)
    setHowtoRedeem(false)
    setSearch(true)
  }




  if (!browserSupportsSpeechRecognition) {
   toast.warn("Your Browser is Incompatible with Text to Speech")
  }

  const Speech = () => {
    setQuery(transcript)
    if (listening == true) {
      setColor("")
      SpeechRecognition.stopListening()

    } else {
      setColor("red")
      SpeechRecognition.startListening()

    }

  }

  return (
    <>
      <div>
        <Carousel />

        <div style={{ marginLeft: '5%', marginRight: '5%' }} className="content">
          <div className="content-panel ">
            <div className="vertical-tabs">

              <div style={{ flex: 1 }} className="vertical-tabs" >

                <a onClick={giftCard} className={menuactive} >Gift Card</a>
                <div className="dropdown">
                  <a onClick={Category} className={categoryactive} dropdown-toggle="true" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Categories
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><a onClick={Category1} className="dropdown-item" >Shopping</a></li>
                    <li><a onClick={Category2} className="dropdown-item" >Fashion</a></li>
                    <li><a onClick={Category3} className="dropdown-item" >Entertainment</a></li>
                  </ul>
                </div>
                <a className={helpactive} onClick={HowtoRedeem}>How to Redeem</a>
              </div>

              <div onClick={searchIt} >
                <div className="input-group rounded">
                  <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={query} onChange={event => setQuery(event.target.value)} />
                  <span className="input-group-text border-0" id="search-addon">
              <Tooltip title="Search" arrow>
                    <i onClick={Speech} style={{ color: textcolor, fontSize: '23px' }} className="bi bi-mic-fill"></i>
               </Tooltip>
                  </span>
                </div>
              </div>

            </div>

          </div>


          {showGiftCard &&
            <div className="content-main">
              <div className="content-main">
                <div className="card-grid">


                  {giftCardData.map((data, index) => {

                    return (

                      <div key={index} className="card">
                        <div className="px-2 pt-2 position-relative">
                          <img alt="..." src={data.image} className="card-img" />
                        </div>
                        <div className="card-body">
                          <h3 className="text-base text-muted font-semibold mb-3">{data.giftCardName}</h3>
                          <span className="d-block h3 mb-0"><i style={{fontSize:'25px'}} className="bi bi-currency-rupee"></i>{data.giftCardPrice}</span>
                          <h3 style={{ marginTop: '3%' }} className="text-base text-muted font-semibold mb-3">Sold By : {data.merchantName} <i style={{ color: 'green' }} className="bi bi-patch-check-fill"></i></h3>
                          <h5 style={{ marginTop: '3%' }} className="text-base text-muted font-semibold mb-3">Available : {data.giftCardQty}</h5>
                          <br></br>

                          {data.giftCardQty > 0 ? <Link to='/product'><button onClick={() => { dispatch(add(data)) }} className="button-37" role="button"><i className="bi bi-cart-fill"></i> Buy Now</button></Link> : <button disabled className="button-disable" role="button"><i className="bi bi-cart-fill"></i> Stock Out</button>}


                        </div>
                      </div>
                    )
                  })
                  }

                </div>
              </div>
            </div>
          }
          {showCategory1 && <GiftCategory1 />}
          {showCategory2 && <GiftCategory2 />}
          {showCategory3 && <GiftCategory3 />}
          {showHowtoRedeem && <Redeem />}
          {showSearch && <Search query={query} />}
        </div>
      </div>
      <Footer />
    </>
  )
}
