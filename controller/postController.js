//  importing fetch for fetching data from api
const fetch=require("node-fetch")
const excel = require("exceljs");
// importing postModal for store data and retrieve data
const {postModal} = require("../modals/postModal")



const addPost = async(req,res)=>{
    const userId = req.params.userId;
  
      try {
            // Set the flag to true to indicate data fetch  operation has started
          const result=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          const data=await result.json()
        
            //   await postModal.create(data)
      res.status(200).json({ message: 'Post data stored in Database successfully.' });
      } catch (error) {
        console.error('Getting Error while fetching  Post:', error);
        res.status(500).json({ "message": 'Getting Error while fetching  Post.' });
      }
  }
  
  const createPost = async(req,res)=>{
    const userId = req.params.userId;
        try {
          let isPresent=false;

          const result=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          const data=await result.json()
          const post=new postModal({posts:data,userId});
         await post.save()  
      res.status(200).json({ message: 'Post data stored in Database successfully.' });
      } catch (error) {
        console.error('Getting Error while posting post:', error);
        res.status(500).json({ "message": 'Getting Error while posting post.'});
      }
}

const getPost=async(req,res)=>{
  const userId=req.query.userId
  try {
    let alreadyPresent=false;
    const existing=await postModal.findOne({"userId":userId})
    if(existing){
      alreadyPresent=true;
    }
    // let existingData=await postModal.find()

    const result=await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    const data=await result.json()
  
    res.send({data,alreadyPresent})
  } catch (error) {
    console.error('Getting Error while getting post:', error);
    res.status(500).json({ "message": 'Getting Error while getting post.' });
  }
}


const downloadExcel = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const data = await result.json();
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Posts');

    // Assuming 'data' is an array of post objects
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Body', key: 'body', width: 50 },
      // Add more columns as needed
    ];

    data.forEach(post => {
      worksheet.addRow(post);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=posts.xlsx');

    const final=await workbook.xlsx.write(res);
    res.send(final);
  } catch (error) {
    console.error('Error while downloading Excel:', error);
    res.status(500).json({ "message": 'Error while downloading Excel.' });
  }
}


module.exports={addPost,getPost,createPost,downloadExcel}