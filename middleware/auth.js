module.exports={
    ensureAuth:function(req,res,next){
        console.log(req.isAuthenticated() + " " + "auth req chacking.")
        if(req.isAuthenticated() || true){
            return next()
        }else{
            res.redirect('/')
        }
    },
    ensureGuest:function(req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }else{
            return next()
        }
    },
}