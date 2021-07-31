var express = require('express')
var app = express()
const SSLCommerzPayment = require('sslcommerz-lts')

const store_id
const store_passwd 
const is_live = false 


app.use(express.json())

app.get('/', function (req, res) {
  res.send('hello world')
})

app.use('/ssl-request',async(req, res,next)=>{

     const data = {
        total_amount: 100,
        currency: 'EUR',
        tran_id: 'REF123',
        success_url: `http://localhost:4000/ssl-paymanet-success`,
        fail_url: `http://localhost:4000/ssl-paymanet-failer`,
        cancel_url: `http://localhost:4000/ssl-paymanet-cancel`,
        ipn_url: `http://localhost:4000/ssl-paymanet-ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };
    const sslcommer = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcommer.init(data).then(data => {
       

         let GatewayPageURL = data.GatewayPageURL
    
      
        if(data?.GatewayPageURL){
            return res.status(200).redirect(data?.GatewayPageURL)
        }
        else{
            return res.status(400).json({
                message:'ssl not successful'
            })
        }


        
    });


})

app.post('/ssl-paymanet-success',async(req, res)=>{
    return res.status(200).json({
        data:req.body
    })
})

app.post('/ssl-paymanet-failer',async(req, res)=>{
    return res.status(400).json({
        data:req.body
    })
})

app.post('/ssl-paymanet-cancel',async(req, res)=>{
    return res.status(200).json({
        data:req.body
    })
})
app.post('/ssl-paymanet-ipn',async(req, res)=>{
    return res.status(200).json({
        data:req.body
    })
})










app.listen(4000)