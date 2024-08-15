export const SendToken=(status,message,res,user)=>{
 try{
    const token=user.getToken();
    if(token){
        res.status(status).json({
    success:true,
    message:message,
    user,
    token,
        })
    }
 }catch(e){
    console.log(e)
    res.status(500).json({
        success:false,
        message:"someting went wrong",
        user,
        token,
            })
 }
}