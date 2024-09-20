"use client";

import { useState } from "react";
import { updateGuest } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ children, guest }) {
  const [count, setCount] = useState();

  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <div>
      <form
        // Server action function - React uses native formData API to send data from form submission to execute on the server
        action={updateGuest}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            defaultValue={fullName}
            name="fullName"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            defaultValue={email}
            name="email"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="relative flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={countryFlag}
              alt="Country flag"
              className="object-cover h-5 rounded-sm"
            />
          </div>

          {/* As SelectCountry needs to be a server component can't import and use directly inside this component - will become an instance of a client component. Need to instead pass through to this component as a prop in parent server component */}
          {/* <SelectCountry
            name="nationality"
            id="nationality"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultCountry={nationality}
          /> */}
          {/* Use children prop to add server component instance to client component here to ensure it remains an instance of a server component  */}
          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            defaultValue={nationalID}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {/* To use useFormStatus hook on a form needs to be used inside a child component contained inside a form element */}
          <SubmitButton pendingText="Updating...">Update Profile</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default UpdateProfileForm;
