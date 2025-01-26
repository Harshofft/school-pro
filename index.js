import express from 'express'
import cors from 'cors'
const app = express();

app.use(express.json())
// 
app.use(cors())
const PORT = 5002;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)

})
const STUDENTS = [
    {
        Rollno : 1,
        name : "Ashish",
        age : 21
    } ,
    {
        Rollno : 2,
        name : "Raj",
        age : 22
    },
    {
        Rollno : 3,
        name : "Rohan",
        age : 23
    } ,
    {
        Rollno : 4,
        name : "Rohit",
        age :22
    },
    {
        Rollno : 5,
        name : "Rajesh",
        age : 21
    }
]
//************from here health check up started ************** */
app.get("/health", (req,res)=>{

    res.json({
        sucess : true,
        msg : "server is sucessfully started"
    })
});
 //************from all students data featched ************** ****/
 app.get("/students", (req,res)=>{
    res.json({
        sucess : true,
        data : STUDENTS
    })
 })

//*********to find the student to des********* */
 app.get("/students/:rollno",(req,res)=>{
    const {rollno} = req.params;
    let studentIndex =-1;

 STUDENTS.map((stud,index)=>{ // map used for find the index of student 
        if(stud.Rollno == rollno){ // this line of code use for find the index of student
            studentIndex = index;
            console.log(stud);
            
        }
    })
    res.json({
        success:true,
        data: STUDENTS[studentIndex]
    })
 }
 )
 //******************main code started ****************** */
app.post("/students", (req,res)=>{
    const {Rollno,name,age} = req.body;
    if(!Rollno || !name || !age){
       return res.json({
            sucess : false,
            msg : "please provide all the details"
        })
    }

    
    const sameStudent = STUDENTS.find((stud)=>{
        if (stud.Rollno === Rollno) {
            return true;  
        }
    })
    //if student already exist then return false
    if(sameStudent){
        return res.json({
            sucess : false,
            msg : "student already exist"
        })
    }
    const newStudent = {
        Rollno:Rollno, // Rollno:Rollno is same as  only Rollno
        name,
        age
    }
    STUDENTS.push(newStudent);
    res.status(201).json({
        sucess : true,
        msg : "student added sucessfully",
        data :newStudent
    })
})

app.delete("/students/:Rollno",(req,res)=>{
    const {Rollno} = req.params;
    let studentIndex =-1;

    STUDENTS.map((stud,index)=>{ // map used for find the index of student 
        if(stud.Rollno == Rollno){ // this line of code use for find the index of student
            studentIndex = index;
        }
    })
    if(studentIndex == -1){
        return res.json({
            sucess : false,
            msg : "student not found"
        });
    }
    
    STUDENTS.splice(studentIndex,1);
    res.json({
        sucess : true,
        msg : "student deleted sucessfully"
    })


    //******************this not work from below************************************** */`



    // for (let i = 0; i < STUDENTS.length; i++) {
    //     if(STUDENTS[i].Rollno === Rollno){
    //         studentIndex = i;
    //         break;
    //     }
    // }
    // if(studentIndex === -1){
    //     return res.json({
    //         sucess : false,
    //         msg : "student not found"
    //     })
    // }
    // STUDENTS.splice(studentIndex,1);
})

//******************below this is put ************************************** */
app.put("/students/:Rollno", (req,res)=>{
    const {Rollno} = req.params;
    const {name,age} = req.body;
    let studentIndex =-1;

    STUDENTS.map((stud,index)=>{ // map used for find the index of student 
        if(stud.Rollno == Rollno){ // this line of code use for find the index of student
            studentIndex = index;
        }
    })

    if(studentIndex == -1){
        return res.json({
            sucess : false,
            msg : "student not found"
        });
    }
    const student = {
        Rollno,
        name,
        age 
    }
    STUDENTS[studentIndex] = student;
    res.json({
        sucess : true,
        msg : "student updated sucessfully",
        data : student
    });
})

/******************below this is patch update mean small change ************************************** */

app.patch("/students/age/:Rollno", (req,res) =>{
    const {Rollno} = req.params;
    const {name} = req.body;
    let studentIndex =-1;

    STUDENTS.map((stud, index)=>{
        if(stud.Rollno == Rollno){
            studentIndex = index;
        }
    })
    if(studentIndex == -1){
        return res.json({
        success : false,
        msg : "student not found"
        })
    }
    const student = STUDENTS[studentIndex];
    student.name = name;
    STUDENTS[studentIndex] = student;
    res.json({
        sucess : true,
        msg : "student updated sucessfully",
        data : student
    })
})
app.get ("*", (req ,res)=>{
    res.status(404).json({
        sucess :false,
        msg: "404 not found"
    })
})