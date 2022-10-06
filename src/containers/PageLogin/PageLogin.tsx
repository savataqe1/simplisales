import React, { FC, useState, useContext } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { useGet } from "../../hooks/useGet";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql, useQuery } from "@apollo/client";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];
type Values = {
  email: string;
  password: string;
};
const GET_AUTH = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  let navigate = useNavigate();

  const context = useContext(AuthContext);
  // console.log(context);
  // console.log(localStorage.getItem("token"));
  const [error, setError] = React.useState([]);
  console.log(context);
  const [mutateFunction, { data, loading }] = useMutation(GET_AUTH, {});

  const [formData, setFormData] = useState<Values>({ email: "", password: "" });
  const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const notify = () =>
    toast.error(" Ups wrong email or password", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const loginButton = async () => {
    const test = await mutateFunction({
      variables: { email: formData.email, password: formData.password },
    });

    if (test) {
      const token = test.data.login;
      navigate("/");
      console.log(context);

      context.login(context);
      localStorage.setItem("token", token);
      // window.location.href = "./";
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Simplisales test</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                name="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={inputsHandler}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                {/* <Link to="/forgot-pass" className="text-sm">
                  Forgot password?
                </Link> */}
              </span>
              <Input
                type="password"
                className="mt-1"
                name="password"
                onChange={inputsHandler}
              />
            </label>
            <h1
              onClick={() => loginButton()}
              className="text-center font-semibold"
            >
              Continue
            </h1>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Simplisales Demo {` `}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
