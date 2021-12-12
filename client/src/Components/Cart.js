import React, { useEffect, useState } from 'react';
import '../App.css';
import "../bootstrap.css"
import { Total } from '../Utill/Common';

function Cart(props) {
    const [mylist, setmylist] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const list = props.mycart;
        setmylist(list);
               
    },[props.mycart])

    useEffect(() =>{
        Total.subscribe(setTotal);
    },[])
    return (
    
        <div className="cbody">
        <div className=" cart">
            <div className="carthead">
                <div>
                    <h3>Your Cart</h3> 
                     {total > 0 && <span style={{"fontSize":'20px',"marginTop":'12px',"color":'#d5d7da'}}> Rs {total}</span>}
                </div>
                {mylist.length > 0 &&  <span className=" bdg">{mylist.length}</span>}
               
            </div>
            <div className="cartbody">
                {mylist.length > 0 ? mylist.map((my) =>(
                    <><div className='topcart'>
                        <div className="cartitem">
                            <p>{my.name}</p>
                            <button onClick={() => props.delete(my)} className="delbtn">Delete</button>
                        </div>
                        <div className='qty'>
                            {my.count === 0 ? <><label htmlFor="">Quantity</label><input id = {my.id} type="number" min="1" /><button onClick={()=> props.inCount(my,document.getElementById(my.id).value)}> <img src="icons/plus-circle-fill.png" className='icon' alt="" /> </button></> : < div className = "botmqty"><p>Quantities:  </p>&nbsp;&nbsp;&nbsp;<p>{my.count} x {my.price}</p></div>}
                        </div>
                    </div></>
                    
                )) : 
                <div className="no">
                    <p>Cart Is Empty</p>
                </div>}  
            </div>
        </div>
            <div>
                <button onClick={props.onSend} disabled = {total > 0 ? false : true} className="buy">Buy  </button>
            </div>
    </div>
     );
}

export default Cart;