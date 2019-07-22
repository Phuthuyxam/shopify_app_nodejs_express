const express = require('express');
const router = express.Router();
const session = require('express-session');
const request = require('request-promise');
const app = express();
const Store = require('data-store');
const store = new Store({ path: 'config.json' });

// const verify = require('./shopify');
/* setting gena */
router.get('/',function(req,res){
    var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(full_url); 
    const product = [
        {
            title: "Sản phẩm 1",
            desc: "Đây là sản phẩm 1",
            price: "120",
            image: [
                { src : "http://mcnews1.media.netnews.vn:8080/netnews/archive/images/2018100312/tinngan_123507_301240365_0.jpg" },
                { src : "https://danongonline.com.vn/wp-content/uploads/2018/02/anh-girl-xinh-9-1.jpg" },
                { src : "https://img2.thuthuatphanmem.vn/uploads/2018/12/25/anh-gia-xinh-sieu-cute_012907577.jpg" }
            ]
        },
        {
            title: "Sản phẩm 2",
            desc: "Đây là sản phẩm 2",
            price: "120",
            image: [
                { src : "http://mcnews1.media.netnews.vn:8080/netnews/archive/images/2018100312/tinngan_123507_301240365_0.jpg" },
                { src : "https://danongonline.com.vn/wp-content/uploads/2018/02/anh-girl-xinh-9-1.jpg" },
                { src : "https://img2.thuthuatphanmem.vn/uploads/2018/12/25/anh-gia-xinh-sieu-cute_012907577.jpg" }
            ]
        },
        {
            title: "Sản phẩm 3",
            desc: "Đây là sản phẩm 3",
            price: "120",
            image: [
                { src : "http://mcnews1.media.netnews.vn:8080/netnews/archive/images/2018100312/tinngan_123507_301240365_0.jpg" },
                { src : "https://danongonline.com.vn/wp-content/uploads/2018/02/anh-girl-xinh-9-1.jpg" },
                { src : "https://img2.thuthuatphanmem.vn/uploads/2018/12/25/anh-gia-xinh-sieu-cute_012907577.jpg" }
            ]
        },
        {
            title: "Sản phẩm 4",
            desc: "Đây là sản phẩm 4",
            price: "120",
            image: [
                { src : "http://mcnews1.media.netnews.vn:8080/netnews/archive/images/2018100312/tinngan_123507_301240365_0.jpg" },
                { src : "https://danongonline.com.vn/wp-content/uploads/2018/02/anh-girl-xinh-9-1.jpg" },
                { src : "https://img2.thuthuatphanmem.vn/uploads/2018/12/25/anh-gia-xinh-sieu-cute_012907577.jpg" }
            ]
        }
    ]


    res.render('product', { title: 'All product' , products : product , fullurl : full_url });
});
router.post('/import',function(req,res){
    // res.send("hellop");
    // res.end();
    var verify = store.get("verify");
    var data = req.body.data;
    data = JSON.parse(data);
    // var shop = store.get("shop");
    console.log(data);
    
    // insêrt data
    // DONE: Exchange temporary code for a permanent access token
    const shopRequestUrl = 'https://' + verify.shop + '/admin/api/2019-07/products.json';

    
    // console.log(shop);
    const new_product = {
        product:
            {
                title: data.title,
                body_html: data.desc,
                vendor: "Women's",
                product_type: "Jeans",
                tags: "Women's, New",
                images: data.image,
            }
    };
    const options = {
            method: 'POST',
            uri: shopRequestUrl,
            json: true,
            resolveWithFullResponse: true,//added this to view status code
            headers: verify.header,
            body: new_product //pass new product object - NEW - request-promise problably updated
        };
    request(options)
    .then((response) => {
        // alert("INsert sucess check you products");
        res.status(200).end("INsert sucess check you products");
        
    })
    .catch((error) => {

        console.log("fas");
        return -1;
    });


    // end
}); 
module.exports = router;