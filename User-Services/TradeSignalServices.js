const {SignalModel}= require('../schema/SignalSchema')
class TradeSignalService{
    constructor(){

    }
    async AddSignal(MainHeading,MainDiscription,imagePath){
        console.log(req.body)
        try{
            const Result=await new SignalModel({image:imagePath,mainheading:MainHeading,maindiscription:MainDiscription})
            const AfterSave=await Result.save()
            if (AfterSave) {
                return { success: true, message: 'Signal Uploaded Successfully' }
            }
            else {
                return { success: false, message: 'Signal Not Uploaded' }
            }

        }catch(error){
            return { success: false, errormessage: error.message }
        }
    }

}
module.exports=TradeSignalService;