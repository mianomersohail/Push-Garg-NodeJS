const EthConfig=require('../../EthConfig/EthConfig')
class StatusCheck{
constructor(){

}
    async Status(req, res) {
    const { Data } = req.body; // Use the correct variable name
    
    console.log(Data); // Log the incoming data for debugging
    try {
        const dealData = await EthConfig.contract.NewDeals(Data); // Fetch deal data
        
        if (dealData) {
            console.log('Deal ID (BigInt):', dealData);
            
            // Convert BigInt to string
            const dealIdString = dealData.toString();
            
            // Send response back as JSON
            return res.status(200).json({ dealId: dealIdString });
        }
    } catch (error) {
        console.error('Error fetching deal ID:', error);
        return res.status(500).json({ error: error.message }); // Send error response if fetching fails
    }
}

}
module.exports=StatusCheck