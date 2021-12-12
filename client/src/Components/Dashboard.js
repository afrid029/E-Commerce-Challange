import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Total } from '../Utill/Common';
import Cart from './Cart';
import axios from 'axios';

function Dashboard() {
    let history = useNavigate();
    const [datas, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredData, setFilterdata] = useState([]);
    const [alert, setAlert] = useState(false);
   

    useEffect(() => {
        if(!localStorage.getItem("newuser")){
            history("/login")
        }
        axios.get("/data/products.json").then((res)=> {
            setData(res.data);
            setFilterdata(res.data);
        });       
    },[history])

    const searchBy = (filt) =>{
        setSearch(filt);
        if(search !== ''){
            const filteredsearch = datas.filter((data) => {
                return data.catagory.toLowerCase().includes(filt.toLowerCase());
            });
            setFilterdata(filteredsearch);
        
        }else{
            setFilterdata(datas);
        }
            
    }

    const addtocart = (value) =>{
        const temp = cart.filter((t)=> t.id === value.id);
        if(temp.length === 0){
            setCart([
                ...cart,{
                    ...value,
                    count:0
                }
            ]
                
           )
        }
    }

    const handleDelete = (item) => {
        const newCart = cart.filter((itm) => item.id !== itm.id);
        setCart(newCart);

        const current = Total.getValue();
        Total.next(current - item.price*item.count); 
    }

    const handleIncrement = (item,inc) => {
        setCart([
            ...cart.map((c)=>{
                return(c.id === item.id ? {
                    ...c,
                    count:inc
                }:c)
            })
        ])
        const current = Total.getValue();
        Total.next(current + inc*item.price);
    }
    
    const handleSending = () => {
        let lastCart = cart.filter((c) =>
            c.count > 0
        );
        const customer = JSON.parse(localStorage.getItem("newuser"));
        lastCart = [...lastCart, {
            'user': customer[0].id,
            'total':Total.getValue()
        }]
        axios.post("http://localhost:3001/order",{orders:lastCart}).then((re)=> {
            setCart([]);
            Total.next(0);
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 2000);
            
        });
    }

    return ( 
        <div>
            <div>
                <Cart mycart = {cart} delete = {handleDelete} inCount = {handleIncrement} onSend = {handleSending}/>
                <div className = "dash">
                    {alert && <div className="alert alert-warning myalert" role="alert">
                        Your Order Has Been Placed!
                    </div>}

                    <div className='search'>
                        <input type="text" onChange = {(e) => {searchBy(e.target.value)}} placeholder='Search By Category'/>
                    </div>
                   
                    {filteredData && filteredData.map((data) => (
                        <div key={data.id} className="product">
                        <img className='prImage' src={data.photoUrl} alt="hii" />
                        <div>
                            <div className='c-body'>
                                <h5 style={{"textAlign":'center'}} className="card-title">{data.name}</h5>
                                <p style={{"float":'left','color':'#d5d7da','fontSize':'13px'}} className="card-text"><span><img className='icon' src="/icons/tag.png" alt="" />&nbsp;&nbsp;&nbsp;</span>{data.catagory}</p>
                                <p style={{"float":'right',"marginRight":'3px'}} className="card-text">Rs: {data.price}</p>
                            </div>
                            <button onClick={() => addtocart(data)}  className="add" >Add to Cart</button>
                        </div>
                    </div>
                    ))}

                </div>
            </div>
        </div>
     );
}


export default Dashboard;