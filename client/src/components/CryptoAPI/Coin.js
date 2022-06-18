import React from 'react'
import './Crypto.css'
const Coin = ({image,name,symbol,price,volume,priceChange,marketcap,index}) => {
  return (
<>
    {index%2===0 ?(
        <div className='coin-container'>
        <div className='coin-row white'>
            <div className='coin'>
                <img src={image} alt="crypto"/>
                <h1>{name}</h1>
                <p className='coin-symbol'>
                    {symbol}
                </p>
            </div>
            <div className='coin-data'>
                <p className='coin-price'>${price}</p>
                {/**
                 * toLocaleString adds comas betwen the numbers 
                 */}
                <p className='coin-volume'>${volume.toLocaleString()}</p>
                {priceChange <0?(
                    <p className='coin-percent red'>{priceChange.toFixed(3)}%</p>
                ):
                (
                    <p className='coin-percent green'>{priceChange.toFixed(3)}%</p>
    
                )
            }
    
            <p className='coin-marketcap'>
                Mkt Cap: ${marketcap.toLocaleString()}
            </p>
            </div>
        </div>
    </div>
    )
    :
    <div className='coin-container'>
    <div className='coin-row black'>
        <div className='coin'>
            <img src={image} alt="crypto"/>
            <h1>{name}</h1>
            <p className='coin-symbol'>
                {symbol}
            </p>
        </div>
        <div className='coin-data'>
            <p className='coin-price'>${price}</p>
            {/**
             * toLocaleString adds comas betwen the numbers 
             */}
            <p className='coin-volume'>${volume.toLocaleString()}</p>
            {priceChange <0?(
                <p className='coin-percent red'>{priceChange.toFixed(3)}%</p>
            ):
            (
                <p className='coin-percent green'>{priceChange.toFixed(3)}%</p>

            )
        }

        <p className='coin-marketcap'>
            Mkt Cap: ${marketcap.toLocaleString()}
        </p>
        </div>
    </div>
</div>
}
    
   </>
  )
}

export default Coin