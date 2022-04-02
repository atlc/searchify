import dotenv from "dotenv";
dotenv.config();

async function get_auth_token() {
    return new Promise(async (resolve, reject) => {
        try {
            const client_credentials = Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64");
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    Authorization: "Basic " + client_credentials,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=client_credentials&json=true"
            });

            const { access_token } = await response.json();
            resolve(access_token);
        } catch (error) {
            reject(error);
        }
    });
}

export default async function handler(req, res) {
    try {
        const token = await get_auth_token();

        const { searchTerm, searchType } = req.query;

        const response = await fetch(`https://api.spotify.com/v1/search?type=${searchType}&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An authentication error occurred, please try again later." });
    }
}
