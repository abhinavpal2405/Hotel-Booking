//get api /user
export const getUserData= async ()=>{
    try {
        const  role= req.user.role;
        const recentSearchCities= req.user.recentSearchCities;
        res.json({success: true, role, recentSearchCities})
        
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
}

// store user recenct search city

export  const storeRecentSearchCitites = async (req,res)=>{
    try {
        const{recentSearchCities}= req.body
        const user = await req.user;

        if(user.recentSearchCities.length < 3){
            user.recentSearchCities.push(recentSearchCity)
        }else{
            user.recentSearchCities.shift();
            user.recentSearchCities.push(recentSearchCity)
        }
        await user.save();
        res.json({success:true, message:"City added"})
        
    } catch (error) {
         res.json({success: false, message: error.message})
        
    }
}