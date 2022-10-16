const uploadPost = async (req, res) => {
    try {
    
    } catch (error) {
        console.log('error in uplodPost: ', error);
        return res.status(500).json({message:"Some internal error occured!", body: []})
    }
}


