const itemController = {
    getItemList : async(req,res) =>{
        
    },
    getItemListByPicture : async(req,res) =>{
        console.log(req.file.location)
        res.json(req.file)
    }
}

export default itemController