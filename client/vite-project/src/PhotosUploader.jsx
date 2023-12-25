import { useState } from "react";
import axios from 'axios'; 

export default function PhotoUploader({addedPhotos, onChange}){  //Photos are stored in the form of arrays.
    const[photoLink, setPhotoLink]=useState('');

    const baseURL = 'http://localhost:4000'; 
    async function addPhotoByLink(ev){
        ev.preventDefault();                                                            //this line of code will prevent our add photo button to reload since it's inside the form tag. 
        const {data:filename}=await axios.post('/upload-by-link', {Link:photoLink});   //By data:filename code, we are destructuring the array which means unpacking values from arrays.
        onChange(prev=>{
          return([...prev, [filename]]);
        });
        setPhotoLink('');
      }
      
      
    
      function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
          data.append('photos', files[i]);
        }
      
        axios.post('/upload', data, {
          headers: { "Content-Type": "multipart/form-data" } // Correctly formatted headers
        })
        .then(response => {
          const { data: filenames } = response;
          onChange(prev => {
            const newArray = Array.isArray(prev) ? [...prev, filenames] : [filenames];
            return newArray;
          });
        })
        .catch(error => {
          console.error("Error uploading file:", error);
        });
      }  
      //The above function uploadPhoto is written for uploading the documents from our computers 
      //to the actual UI after requesting with axios.
    return(
        <>
        <div className='flex gap-2'>
          <input type='text' value={photoLink}  onChange={ev=>setPhotoLink(ev.target.value)} placeholder={'Upload by link.......jpg'}/>
          <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button>   {/*Here I am using addPhotoByLink function for onClick event that means whenever I click on Add Photo button, i will be able to do the desired task in ReactJS. */}
        </div>
        <div className='mt-2 grid flex gap-4 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
        { addedPhotos && addedPhotos.length > 0 && addedPhotos.map(
         filename => (
         <div className='h-32 flex' key={filename}>
          <img className='rounded-2xl w-full object-cover' src={`${baseURL}/uploads/${filename}`} alt={filename} />
          <img className='rounded-2xl w-full object-cover' src={`${baseURL}/${filename}`} alt={filename} />
       </div>
        )
         )}
    
        <label className=' flex items-center justify-center cursor-pointer gap-1 border  rounded-2xl text-2xl text-gray-500 p-2 bg-transparent font-bold'>
        <input type='file'  multiple className='hidden' onChange={uploadPhoto}/>               {/*this line of code is made hidden because we want to see the file uploading ui to appear whenever we click upload. */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
       </label>
        </div>
        </>
    )
}