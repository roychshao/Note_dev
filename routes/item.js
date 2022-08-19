import express from 'express';
import auth from './../middleware/auth.js';
import axios from 'axios';
import { get_items, get_done_items, get_collected_items, search_items, insert_item, mark_item, delete_item } from './../controller/item.js';

const router = express.Router();

router.get('/', auth, get_items);
router.get('/done', auth, get_done_items);
router.get('/collected', auth, get_collected_items);
router.get('/search', auth, search_items);
router.post('/create', auth, insert_item);
router.post('/mark', auth, mark_item);
router.post('/delete', auth, delete_item);

router.get('/einvoice', auth, async (req, res) => {
    
    const version = 0.5;
    const cardType = "3J0002";
    const expTimeStamp = 2147483647;
    const onlyWinningInv = "N";
    const uuid = "109703041";
    const appID = "EINV4202207289482";
    const url = "https://api.einvoice.nat.gov.tw/PB2CAPIVAN/invServ/InvServ";

    //查詢載具發票表頭

    await axios({
        method: 'post',
        url: url,
        data: qs.stringify({
            action: "carrierInvChk",
            appID: appID,
            cardEncrypt: "620109roy",
            cardNo: "/23WDYYU",
            cardType: cardType,
            endDate: "2022/08/17",
            expTimeStamp: expTimeStamp,
            onlyWinningInv: onlyWinningInv,
            startDate: "2022/07/06",
            timeStamp: Math.floor(Date.now()/1000)+100, // suggested to add timestamp from 10 to 180
            uuid: uuid,
            version: version
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then( async result => {
        var response = {
            success: true,
            message: "取得載具發票表頭資料成功",
            data: {
                headers: result.data
            }
        };
        console.log(response);
        res.status(201).json(response);
    }).catch(err => {
        var response = {
            success: false,
            message: "取得載具發票表頭失敗 error: " + err.message,
            data: {}
        };
        console.error(response);
        res.status(400).json(response);
    })
})

export default router;
