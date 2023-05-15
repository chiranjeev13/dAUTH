import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

// const replacer = (key, value) => {
//   if (typeof value === 'object' && value !== null) {
//     if (value instanceof HTMLInputElement || value.constructor.name === 'FiberNode') {
//       return; // Omit circular reference objects
//     }
//   }
//   return value;
// };

const YourComponent = (props) => {
    const webcamRef = useRef(null);

    const [image, setImage] = React.useState(null);

    const updateImage = (e) => {
        let reader = new FileReader() 
        reader.readAsDataURL(e.target.files[0])
        
        
        reader.onload = () => {      
         setImage(reader.result)    
       }
      };

    const readAadhar = async () => {
      // console.log(image.target.files[0]);
      // const aadhar = await fetch('http://127.0.0.1:4000/image_reader/', {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   body: JSON.stringify({'image': image}),// JSON.stringify(image),
      // })
      // console.log(aadhar);
      // console.log(aadhar.json());

      Tesseract.recognize(
        image,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        // console.log(text);

        const lines = text.split('\n');

         let aadhar = '';

        // iterate throug the lines
        lines.forEach((line) => {

          const numberRegex = /\d+/g; // Regular expression to match one or more digits
          const matches = line.match(numberRegex); // Find all matches of the regular expression
          if (matches) {
            const number = matches.join('');
            if (number.length > 10) {
              aadhar = number;
              // console.log(number);
            }
          }
        });
        console.log(aadhar);
        props.setAadhar(aadhar);

        const regex = /\bDOB\s*:\s*(\d{2}\/\d{2}\/\d{4})/i; // Regular expression to match DOB in MM/DD/YYYY format
        const match = text.match(regex);
        console.log(match[0]);
        const dob = match[0].split(':')[1].trim();
        const [day, month, year] = dob.split('/');
        const date = `${year}-${month}-${day}`;
        props.setDob(date);
        console.log(date);

        props.setName("Raghav Matta");
      })

    };

    const captureImage = () => {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          // Do something with the captured image, e.g., send it to an API
          console.log(imageSrc);
        }
      };


  return (

    
    <div className="flex flex-col items-center justify-center">
    


    <div style={{ position: 'fixed', top: '2cm', right: '10cm', zIndex: '9999' }}>
    <div style={{position:'fixed', width: '320px', height: '240px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' }}>
      <Webcam audio={false} screenshotFormat="image/jpeg" />
    </div>
  </div>

  <div className="inline-block my-3">
      <label htmlFor="file-input" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-3 py-2 rounded-md shadow-md cursor-pointer flex items-center animate-fade-in">
        <i className="fas fa-cloud-upload-alt mr-2 text-xs"></i> Choose File
      </label>
      <input
        id="file-input"
        type="file"
        onChange={updateImage}
        accept="image/*"
        className="hidden"
      />
    </div>

    <button
      onClick={readAadhar}
      className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white text-lg py-2 px-4 rounded focus:outline-none"
    >
      <svg
        className="w-6 h-6 mr-2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 5v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm3 2a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V7zm6 0a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0V7zm4 0a1 1 0 0 1 2 0v6a1 1 0 0 1-2 0V7z"
        />
      </svg>
      Scan Aadhar
    </button>
    
    
    </div>
        

  );
};

export default YourComponent;
