//  importing fetch for fetching data from api
const fetch=require("node-fetch")

// importing usermodel for store data and retrieve data
const {UserModel} = require("../modals/userModal")


// fetching data and storing in database
const fetchData = async(req,res)=>{
    try {

        const result=await fetch("https://jsonplaceholder.typicode.com/users")
        let data=await result.json()
        const promise = await Promise.all([...data.map(async(el)=>{
            return await UserModel.findOne({'id':el?.id})!==null;
        })])
        promise.map((pr,i)=>{
          console.log(pr)
         data[i].isPresent=pr;
        })
    res.status(200).json(data);
    } catch (error) {
      console.error('Getting Error while fetching  users:', error);
      res.status(500).json({ "message": 'Getting Error while fetching  users.' });
    }
}
const singleUser = async(req,res)=>{
  const id=req.params.id
  
    try {

        const result=await fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
        const data=await result.json()
    res.status(200).json(data);
    } catch (error) {
      console.error('Getting Error while fetching  users:', error);
      res.status(500).json({ "message": 'Getting Error while fetching  users.' });
    }
}
const addData = async(req,res)=>{
    const id = req.params.id;
    // const Id=req.params.id;
      try {
       
         fetch(`https://jsonplaceholder.typicode.com/users?id=${id}`)
         .then(async(res)=>await res.json())
         .then(async(data)=>{
               const user = new UserModel(data[0]);
             await user.save()
         })
         

      res.status(200).json({ message: 'Users data stored in Database successfully.' });
      } catch (error) {
        console.error('Getting Error while fetching  users:', error);
        res.status(500).json({ "message": 'Getting Error while fetching  users.' });
      }
  }

  


module.exports={fetchData,addData,singleUser}