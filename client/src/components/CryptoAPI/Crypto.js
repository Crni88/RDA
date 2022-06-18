import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin';

export default function Crypto() {

    const [coins,setCoins] = useState([]);
    const [search,setSearch] = useState('');

    useEffect(()=>{
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false')
        .then(res=>{
            setCoins(res.data);
            //console.log(res.data);
        }).catch(error => console.log(error));
    })


    const handleChange = e =>{
        setSearch(e.target.value);
    }

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())    
    )

    return (
    <div className='coin-app'>
        <div className='coin-search'>
        <h1 className='coin-text'>Looking for something specific?</h1>
            <form>
                <input type="text" placeholder="Search" className="coin-search" onChange={handleChange}/>

            </form>
        </div>
        {filteredCoins.map(coin =>{
            return (
                <Coin 
                key={coin.id} 
                name={coin.name} 
                image={coin.image} 
                price={coin.price}
                symbol={coin.symbol}
                volume={coin.market_cap}
                priceChange={coin.price_change_percentage_24h}
                marketcap={coin.total_volume}
                />
            )
        })}
    </div>
  )
}
