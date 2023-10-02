const mongoose=require('mongoose')

const ImageDetailsSchema=new mongoose.Schema({
    image:String,

}
)
 const ImageDetails=mongoose.model("ImageDetails",ImageDetailsSchema);

 module.export=ImageDetails;