// import react,{useState, useEffect} from 'react';
// function UserTable(){
//     const [user,setUser]=useState([]);
//     useEffect(()=>{
//         const fetchUsers=()=>{
//      const data=[
//             {id:1,name:'rahul',email:'rahul@example.com'},
//             {id:1,name:'Priya',email:'priya@gmail.com'},
//             {id:1,name:'Amit', email:'amit@gmail.com'},
//         ];
        
   
//         setUSers(data);
//     }
//     fetchUsers();
//     },[]);
//     return(
//         <div className='p-4'>
//             <h1 className='text-xl font-bold mb-2'>User table</h1>
//             <table className='border w-full'>
//                 <thead>
//                     <tbody>
//                     <tr className='bg-gray-200'>
//                         <th className='border px-4 py-2'>ID </th>
//                         <th className='border px-4 py-2'>Name</th>
//                         <th className='border px-4 py-2'>Email</th>
//                     </tr>

//                     </tbody>
//                 </thead>
//             </table>
//         </div>
//     )
// }
// export default UserTable;
// {user.map((u)=>{
//     <tr key={u.id}>
//         <td>{u.id}</td>
//         <td>{u.name}</td>
//         <td>{u.email}</td>
        
//     </tr>
// })}
'use client';
import react,{useState, useEffect} from 'react';
import * as  XLSX from xlsx;
export default function MedicalPage(){
    const [parentData,setParentData]=useState([]);
    const[child1Data,setChild1Data]=useState([]);
    const[visible,setVisible]=useState(null);
 useEffect(()=>{
    const storedParent=localStorage.getItem('parentData');
    const storedChild1=localStorage.getItem('child1Data');
    if(storedParent) setParentData(JSON.parse(storedParent));
    if(storedChild1) setChild1Data(JSON.parse(storedChild1));

 },[]);
 //to save the data in a localstorage then we use json as  to save
 useEffect(()=>{
    localStorage.setItem('parentData', JSON.stringify(parentData))
 },[]);
 useEffect(()=>{
    localStorage.setItem('child1Data', JSON.stringify(child1Data))
 },[child1Data])

 //for upload files we use 
 const handleUpload=(e,sheet)=>{
    const file=e.target.files[0];
    if(!file) return;
 }
 const reader=new FileReader();
 reader.onload=(etv)=>{
    const data=new Unit8Array(etv.target.result);
    const wb=XLSX.read(data,{type:'array'});
    const ws=wb.Sheets[wb.SheetNames[0]];
    const json=XLSX.utils.sheet_to_json(ws,{raw:true});
    if(sheet==='parent') setParentData(json);
    else if(sheet === 'child1') setChild1Data(json);
    setVisible(sheet);
 };
 reader.readAsArrayBuffer(file);
}