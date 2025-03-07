const mongoose = require('mongoose')
const bcryptjs= require('bcryptjs')

const userSchema = mongoose.Schema({
    name:String,
    email:{required:true,unique:true,type:String},
    app:Number,
    password:String

})


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) { 
      this.password = await bcryptjs.hash(this.password, 10); 
    }
    next(); 
  });

  userSchema.methods.comparePassword = async function (userPassword) {
    return await bcryptjs.compare(userPassword, this.password); 
  };

//json web token : ttamel signature b facon crypté (data mte3 user )
//arrow function mattarech "this"

//next : 9bal matet3ada lel partie lowla ekhdem hethi w baaed arjaa l next (aamel l password w baaed arjaa a3mel l save ) 
    //hash : compare hash b hash w yrajaa true 

//if modified ( ychoufou kn amal modification w lé si nn maghir maybadlou)
//middleware ( stana ekhdem haja w baaed ekhem haja okhra )

module.exports = mongoose.model('User',userSchema)