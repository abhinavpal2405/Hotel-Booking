import User from '../models/User.js';
import { Webhook } from "svix";

const clerWebhooks = async (req, res) => {
    console.log("Attempt login");

    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Correct header keys
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

        // Verifying header
        await whook.verify(JSON.stringify(req.body), headers);

        // Extracting data from request body
        const { data, type } = req.body;

        const userData = {
            _id: data.id,
            email: data.email_addresses[0].email_address,
            username: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
        };

        // Switch case for different events
        switch (type) {
            case "user.created":
                console.log("New user created");
                await User.create(userData);
                console.log(userData);
                break;
            case "user.updated":
                console.log("User updated");
                await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: true });
                break;
            case "user.deleted":
                console.log("User deleted");
                await User.findByIdAndDelete(data.id);
                break;
            default:
                console.log("Unhandled event type:", type);
                break;
        }

        res.json({ success: true, message: "Webhook received" });

    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export default clerWebhooks;
