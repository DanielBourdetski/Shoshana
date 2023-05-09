import { FormEvent, useState } from "react";
import authService from "../../../services/authService";
import Initial from "./Initial";
import DataRegistration from "./DataRegistration";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const Registration = () => {
  const [stage, setStage] = useState(0);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [businessData, setBusinessData] = useState({
    name: "",
    address: "",
    type: "", // think about how to manage/add/handle types of businesses
  });

  const nextStage = () => {
    if (stage < 2) setStage((cs) => cs + 1);
  };

  const previousStage = () => {
    if (stage > 0) setStage((cs) => cs - 1);
  };

  const stageRender = [
    <Initial
      credentials={credentials}
      setCredentials={setCredentials}
      onNextStage={nextStage}
    />,
    <DataRegistration />,
  ];

  const headerRender = ["User Info", "Business Info"];

  const onRegistration = async (e: FormEvent) => {
    e.preventDefault();

    const { username, password } = credentials;

    const registerRes = await authService.register(username, password);
    // if (!registerRes.ok) return toast.error("registerRes.res");
    console.log(registerRes);
    // TODO handle successful/failed register response
  };

  // TODO extract stage arrows into a seperate component

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center items-center mb-10">
        <div className="rounded-full flex justify-center items-center">
          <BsArrowLeftCircle
            size={30}
            className={`m-4 text-gray-700 cursor-pointer hover:text-black hover:-translate-y-[.12em] duration-300`}
            onClick={previousStage}
          />
        </div>
        <h2 className="text-3xl text-center text-gray-900 -translate-y-1">
          {headerRender[stage]}
        </h2>
        <div className="rounded-full flex justify-center items-center">
          <BsArrowRightCircle
            size={30}
            className={`m-4 text-gray-700 cursor-pointer hover:text-black hover:-translate-y-[.12em] duration-300`}
          />
        </div>
      </div>

      {stageRender[stage]}
    </div>
  );
};

export default Registration;
