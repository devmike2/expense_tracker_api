const { Profile } = require("../model")

const me = async(req, res) =>{
    try {
        const userId = req.user_id
        if(!userId) return res.status(403).json({status: false, message: 'Unauthorized access'})
        const userDetails = {}
        const profile = await Profile.findOne({
            user: userId
        }).populate('user')
        if(!profile) return res.status(203).json({status: true, data: {}, message: 'User details not found'})
        userDetails.email = profile?.user?.email
        userDetails.name = profile?.user?.firstname
        userDetails.profile_pic = profile.profile_pic
        userDetails.verified = profile.user.verify

        return res.status(200).json({status: true, data: userDetails, message: 'user Details'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message || 'Internal server error'
        })
    }
}

const setProfile = async(req,res) =>{
    try {
        const userId = req.user_id
        const payload = req.body
        if(!profile_pic) return res.status(400).json({status: false, message: 'Invalid Payload'})
        const profiledetails = await Profile.create({...payload, user: userId})
        return res.status(200).json({status:true,message: 'Profile cerated', data: profiledetails})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message || 'Internal server error'
        })
    }
}

const updateProfile = async ()=>{
    try {
        const userId = req.user_id
        const payload = req.body
        if(!payload) return res.status(400).json({status: false, message: 'Invalid payload'})
        const profileDetails = await Profile.findOneAndUpdate({user_id: userId, ...payload}).populate('user')
        const userDetails = {}
        userDetails.email = profileDetails?.user?.email
        userDetails.name = profileDetails?.user?.firstname
        userDetails.profile_pic = profileDetails.profile_pic
        userDetails.verified = profileDetails.user.verify
        return res.status(200).json({status: false, message: 'userDetails updated', data: userDetails})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message || 'Internal server error'
        })
    }
}

const deleteProfile = async() =>{
    try {
        const userId = req.user_id
        const deleteProfile = await Profile.findOneAndDelete({user_id: userId})

        if(deleteProfile) return res.status(200).json({status: true, message: 'User Profile deleted'})
        else return res.status(203).json({status: true,message: 'colud not delete user profile details'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error.message || 'Internal server error'
        })
    }
}



module.exports={
    me,
    setProfile,
    updateProfile,
    deleteProfile
}