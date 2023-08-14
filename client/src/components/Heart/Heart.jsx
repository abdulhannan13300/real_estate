import React, { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import useAuthCheck from "../../Hooks/useAuthCheck";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext";
import { checkFavourites, updateFavourites } from "../../utils/comman";
import { toFav } from "../../utils/api";

const Heart = ({ id }) => {
   const [heartColor, setHeartColor] = useState("white");
   //To check if the user is Authenticated
   const { validateLogin } = useAuthCheck();
   const { user } = useAuth0(); //To get user details
   const {
      userDetails: { favourites, token },
      setUserDetails,
   } = useContext(UserDetailContext); // To get and update the token and favourites array

   //This hook will keep the heart icon  and property list
   //updated on every page depending on the favourites array.
   useEffect(() => {
      setHeartColor(() => checkFavourites(id, favourites));
   }, [favourites]);

   const { mutate } = useMutation({
      mutationFn: () => toFav(id, user?.email, token),
      onSuccess: () => {
         setUserDetails((prev) => ({
            ...prev,
            favourites: updateFavourites(id, prev.favourites),
         }));
      },
   });

   const handleLike = () => {
      if (validateLogin) {
         mutate();
         setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
      }
   };

   return (
      <AiFillHeart
         size={24}
         color={heartColor}
         onClick={(e) => {
            e.stopPropagation();
            handleLike();
         }}
      />
   );
};

export default Heart;
