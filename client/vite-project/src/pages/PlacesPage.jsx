import { Link,  useParams } from 'react-router-dom';

export default function PlacesPage() {
  const { action } = useParams();
  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link
            className="bg-primary inline-flex mt-6 gap-1 text-white py-2 px-6 rounded-full"
            to="/AccountPage/places/new"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add new place
          </Link>
        </div>
      )}
     </div>
  );
      }

//The use of   <button className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button> here Add&nbsp;Photo refers to no breaking space.
//Above we have used textarea for writing something in the box. Without adding the textarea inside index.css, we wouldnot have seen the textarea box clearly in UI.
// <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6' >    Assigning in such a way helps us in the responsiveness of our websites.



/*<h2 className='text-xl font-bold mt-4'>Address</h2>
<p className='text-gray-500 text-sm'>Address to this place</p>
<input type="text" placeholder='address'/>
The above lines of code  for each address, photos, title, add photos and many others are replaced with the 
 {preInput('Title', 'Title for your place, should be short and catchy as in advetisements.')} line of code in which we have defined preInput function earlier in the
 <h2><h2/> and <p><p/> are defined in inputHeader() and inputParagraph() functions so, we are doing so for writing clean code with less code.Here is the chalakhi hahahahah.
*/

//We have defined used here useState() hook for perks and setPerks.It updates the value at perks when new data is entered. 