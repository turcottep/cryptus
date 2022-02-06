import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import s from "./profile.module.scss";

import ViewerProfile from "./viewer_profile/viewer_profile";
import CreatorProfile from "./creator_profile/creator_profile";

export default function Profile(props) {
  const [session] = useSession();
  return (
    <div className={s.app}>
         {session ? (
             <CreatorProfile {...props}/>
         ) : (
             <ViewerProfile {...props}/>
         )}
    </div> 
    
  );
}

