import React from "react";

//compoennts
import SignOut from "../component/signOut/signOut.component";

const AccountPage = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-lg border w-full">
        <p className="text-center">Account user</p>
        <SignOut>
          <button className="bt-white">Sign Out</button>
        </SignOut>
      </div>
    </div>
  );
};

export default AccountPage;
