import { FormEvent, useState } from "react";
import authService from "../../../services/authService";
import Initial from "./Initial";
import DataRegistration from "./DataRegistration";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import toaster from "../../../helpers/toaster";
import localService from "../../../services/localService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { generalActions } from "../../../store/store";

const Registration = () => {
  const [stage, setStage] = useState(0);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [bizCredentials, setBizCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    business: "",
    address: "",
    privateNum: "",
    businessNum: "",
    logo: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextStage = () => {
    if (stage < 2) setStage((cs) => cs + 1);
  };

  const previousStage = () => {
    if (stage > 0) setStage((cs) => cs - 1);
  };

  const headerRender = ["User Info", "Business Info"];

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();

    const registerRes = await authService.register({
      ...credentials,
      ...bizCredentials,
    });

    if (!registerRes.ok) return toaster.authError(registerRes.res);

    localService.saveToken(registerRes.res);
    toaster.success("Registration Completed!");

    dispatch(generalActions.login(credentials.username));

    navigate("/");
  };

  const stageRender = [
    <Initial
      credentials={credentials}
      setCredentials={setCredentials}
      onNextStage={nextStage}
    />,
    <DataRegistration
      onRegistration={handleRegistration}
      credentials={bizCredentials}
      setCredentials={setBizCredentials}
    />,
  ];

  // TODO extract stage arrows into a seperate component

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex justify-center items-center">
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
