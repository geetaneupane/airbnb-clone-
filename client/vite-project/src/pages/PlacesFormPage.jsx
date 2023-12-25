import PhotoUploader from "../PhotosUploader";
import Perks from "./Perks";
import {useState} from "react";
import axios from 'axios';

export default function PlacesFormPage(){
    const[title, setTitle]=useState('');
    const[address, setAddress]=useState('');         //We are using useState here for displaying the addresses, photos, title, photolink, Description,perks,extraInfo, checkIn, checkOut and Maxguests after we send them through UI.
    const[description, setDescription]=useState('');
    const[perks, setPerks]=useState([]);
    const[addedPhotos, setAddedPhotos]=useState([]);
    const[extraInfo, setExtraInfo]=useState('');
    const[checkIn, setCheckIn]=useState('');
    const[checkOut, setCheckOut]=useState('');
    const[maxGuests, setMaxGuests]=useState(1);

    function inputHeader(text){
        return(
          <h2 className='text-xl font-bold mt-4'>{text}</h2>
        );
       }
       function inputParagraph(text){
        return(
          <p className='text-gray-500 text-sm'>{text}</p>       //We are using these inputHeader, inputParagraph and preInput functions because
        );                                                      //we are replacing the below commented code with the actual code that you will see later on.
       }
       function preInput(header, description){
        return(
          <>
            {inputHeader(header)}
           {inputParagraph(description)}
            
          </>
        );
       }
        async function addNewPlace(ev){
        ev.preventDefault();
        const formattedPhotos = addedPhotos.map((photo) =>
        typeof photo === 'string' ? photo : photo.filename);
        await axios.post('/places',{title, address, description,
           perks, addedPhotos:formattedPhotos, extraInfo, 
           checkIn, checkOut, maxGuests});
       }

    return(
        <div>
        <form onSubmit={addNewPlace}>
         {preInput('Title', 'Title for your place, should be short and catchy as in advetisements.')}
         <input type="text" 
         value={title}  
         onChange={ev=>setTitle(ev.target.value)} placeholder='title, for example:my lovely apartment'/>
         {preInput('Address','Address to this place')}
         <input type="text"  
         value={address}  
         onChange={ev=>setAddress(ev.target.value)} placeholder='address'/>
         {preInput('Photos','more=better')}
          <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>     {/**Its code is written in PhotosUploader.jsx file.  */}
         {preInput('Description','Description of the place')}
         <textarea  value={description}  
         onChange={ev=>setDescription(ev.target.value)}/>
         {preInput('Perks','Select all the perks of your place')}
         <div className='grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6' >      
          <Perks selected={perks} onChange={setPerks}/>    
         </div>
         {preInput('Extra Info', 'House, rules etc..')}
         <textarea  value={extraInfo}  
         onChange={ev=>setExtraInfo(ev.target.value)}/>
         {preInput('Check In and Check Out times,','add check-in and check-out times, remember to have some time window for cleaning the room between guests.')}
        <div className='grid gap-1 sm:grid-cols-3'>
         <div>
           <h3 className='mt-2 -mb-1'>Check-In time</h3>
         <input type='text'
         value={checkIn}  
         onChange={ev=>setCheckIn(ev.target.value)}  placeholder='14:00'/>
         </div>
         <div>
         <h3  className='mt-2 -mb-1'>Check-Out time</h3>
         <input type='text' 
          value={checkOut} 
         onChange={ev=>setCheckOut(ev.target.value)}/>
         </div>
         <div>
         <h3  className='mt-2 -mb-1'>Max no. of guests</h3>
         <input type='text' 
          value={maxGuests} 
          onChange={ev=>setMaxGuests(ev.target.value)}/>
         </div>
        </div>
        <div >
         <button className='primary my-4'>Save</button>
        </div>
        </form>
       </div>

    )
}