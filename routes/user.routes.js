const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/',async(req,res)=>{
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).send({message:'user saved successfully',user})
    } catch (error) {
        res.status(500).send({message:error})
        
    }


})
router.get('/all',async(req,res)=>{
   try {
    const users = await User.find() 
    res.send(users)
   } catch (error) {
    
   }

})

router.get('/:name',async(req,res)=>{
    try {
        const name = req.params.name
     const user = await User.findOne({name}) 
     if (user) {
        res.status(200).send(user)
     }else{
        res.status(404).send({message:"user not found"})
     }
    } catch (error) {
     
    }
 
 })

 router.put('/update/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const user = await User.findOne({ name });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        }
        const userUpdated = await User.findOneAndUpdate({name},{$set:{name:req?.body?.name || 'Jihene'}},{new:true})
        res.status(201).send({message:"user updated successfully",userUpdated});
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});


router.delete('/delete/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const user = await User.findOne({ name });
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        }
        await User.deleteOne({name})
        res.status(201).send({message:"user deleted successfully",userUpdated});
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});
   


module.exports = router