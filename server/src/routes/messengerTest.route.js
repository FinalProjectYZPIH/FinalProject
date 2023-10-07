import express from "express";
import * as Messengerservice from "../services/messenger.service.js";
import { verifyJwt } from "../helpers/utils/jwt.utils.js";
import verifyRole from "../helpers/middleware/verifyRole.js";

const router = express.Router();

router.use(verifyRole)

router
    .post("/send", sendHi)
    .post("/sendMessage", sendMessageTest);

    async function sendHi (req,res,next){
        res.json({message:"Hi"})
    }
    
    export default router;
    
    async function sendMessageTest(req, res ) {
      try {
        const { accessJwt } = req.cookies;
    
        const { decoded } = verifyJwt(accessJwt, process.env.ACCESS_TOKEN || "");
    
        const message = await Messengerservice.createMessage(
          res,
          "65215e2b330307103bd5e77c",
          "Hello Fragezeichen! FirstMessage"
        );
    
        const chatroom = await Messengerservice.createChat(
          res,
          decoded?.UserInfo.id,
          message,
        );
    
            console.log( {message: chatroom.chatbox/* .message[0].content*/  })  // deepverschachtet? kann nicht auf daten zugreifen. 
        res.status(200).json({message: chatroom.chatbox["message"] })
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "sendMessage failed" });
      }
    }
    