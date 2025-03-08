const CancelTicket=require('../controllers/Cancel_ticket')
const express=require('express')
const router=express.Router();
router.post('/cancel', CancelTicket)
module.exports=router;