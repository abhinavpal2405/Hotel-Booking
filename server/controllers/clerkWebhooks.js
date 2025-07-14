
import User from '../models/User.js';
import { Webhook } from "svix";

const clerWebhooks = async (req, res)=>{
    console.log("Attempt login")
    try{
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //getting header

        const headers= {
            "svix-id":req.headers["sevix-id"],
            "svix-timestamp":req.headers["sevix-timestamp"],
            "svix-signature":req.headers["sevix-signature"]
        };
        //verifying header
        await whook.verify(JSON.stringify(req.body), headers)

        //data from request body
        const {data, type}= req.body

        const userData ={
            _id: data.id,
            email: data.email_addresses[0].email_addresses,
            username:data.first_name+ " "+ data.last_name,
            image: data.image_url,

        }

        // switch case difrent event
        switch (type){
            case "user.created":{
                console.log("new user created")
                await User.create(userData);
                break;
            }
            case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
         }
         
            default:
            break;
        }

        res.json({success: true, message: "Webhook Recieved"})

    }catch (error){
        console.log(error.message);
        res.json({success: false,message: error.message});
    }
}

export default clerWebhooks;