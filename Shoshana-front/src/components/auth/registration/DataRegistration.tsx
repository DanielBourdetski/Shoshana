import { useState } from "react";
import Input from "../../common/Input";
import React from "react";

type Credentials = {
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  address: string;
  privateNum: string;
  businessNum: string;
  logo: string;
};

const DataRegistration: React.FC<{
  onRegistration: Function;
  credentials: Credentials;
  setCredentials: React.Dispatch<React.SetStateAction<Credentials>>;
}> = ({ onRegistration, credentials, setCredentials }) => {
  const updateCredential = (value: string, field: string) => {
    setCredentials((currentState) => {
      return { ...currentState, [field]: value };
    });
  };

  return (
    <form
      className="flex items-center justify-center"
      onSubmit={(e) => onRegistration(e)}
    >
      <div className="w-1/2 h-full p-2 flex flex-col justify-evenly items-center">
        <Input
          label="Business Name"
          onChange={(name: string) => updateCredential(name, "business")}
          value={credentials.business}
        />

        <Input
          label="Personal Phone Number"
          onChange={(num: string) => updateCredential(num, "privateNum")}
          value={credentials.privateNum}
        />

        <Input
          label="Business Phone Number"
          onChange={(num: string) => updateCredential(num, "businessNum")}
          value={credentials.businessNum}
        />

        <Input
          label="Logo"
          onChange={(str: string) => updateCredential(str, "logo")}
          value={credentials.logo}
        />
      </div>

      <div className="w-1/2 h-full p-2 flex flex-col justify-evenly items-center">
        <Input
          label="First Name"
          onChange={(name: string) => updateCredential(name, "firstName")}
          value={credentials.firstName}
        />

        <Input
          label="Last Name"
          onChange={(name: string) => updateCredential(name, "lastName")}
          value={credentials.lastName}
        />

        <Input
          label="Email"
          onChange={(name: string) => updateCredential(name, "email")}
          value={credentials.email}
        />

        <Input
          label="Address"
          onChange={(name: string) => updateCredential(name, "address")}
          value={credentials.address}
        />
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default DataRegistration;
