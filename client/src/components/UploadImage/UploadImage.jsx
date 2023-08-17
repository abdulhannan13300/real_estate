import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";

const UploadImage = ({
   propertyDetails,
   setPropertyDetails,
   nextStep,
   prevStep,
}) => {
   const [imageURL, setImageURL] = useState(propertyDetails.image);

   //Uploading the Image to Cloudinary
   const cloudinaryRef = useRef();
   const widgetRef = useRef();

   useEffect(() => {
      cloudinaryRef.current = window.cloudinary;
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
         {
            cloudName: "df5egkhd1",
            uploadPreset: "qtnyo7n0",
            maxFiles: 1,
         },
         (err, result) => {
            if (result.event === "success") {
               setImageURL(result.info.secure_url);
            }
         }
      );
   });

   return (
      <div className="flexCenter uploadWrapper">
         {!imageURL ? (
            <div
               className="flexColCenter uploadZone"
               onClick={() => widgetRef.current?.open()}
            >
               <AiOutlineCloudUpload size={50} color="grey" />
               <span>Upload Image</span>
            </div>
         ) : (
            <div
               className="uploadedImage"
               onClick={() => widgetRef.current?.open()}
            >
               <img src={imageURL} alt="" />
            </div>
         )}
      </div>
   );
};

export default UploadImage;
