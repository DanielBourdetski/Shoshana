import { useState } from "react";
import Input from "../../calendar/common/Input";

const DataRegistration = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    business: "",
    address: "",
    privateNum: "",
    businessNum: "",
    logo: "",
  });

  const updateCredential = (value: string, field: string) => {
    setCredentials((currentState) => {
      return { ...currentState, [field]: value };
    });
  };

  return (
    <form>
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
        label="Address"
        onChange={(name: string) => updateCredential(name, "address")}
        value={credentials.address}
      />

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
    </form>
  );
};

export default DataRegistration;
