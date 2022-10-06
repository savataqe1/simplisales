import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import { useNavigate, Link } from "react-router-dom";
import SearchDropdown from "./SearchDropdown";
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation, gql, useQuery } from "@apollo/client";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import HeroSearchForm2MobileFactory from "components/HeroSearchForm2Mobile/HeroSearchForm2MobileFactory";

export interface MainNav1Props {
  className?: string;
}
const GET_USER = gql`
  query {
    user {
      name
    }
  }
`;
const MainNav1: FC<MainNav1Props> = ({ className = "" }) => {
  let navigate = useNavigate();
  const context = React.useContext(AuthContext);
  const { data } = useQuery(GET_USER);
  function logout() {
    context.logout();
  }
  return (
    data && (
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
          <div className="hidden md:flex flex-shrink-0 items-center justify-end flex-1 lg:flex-none text-neutral-700 dark:text-neutral-100">
            <div className="hidden xl:flex items-center space-x-0.5">
              <div className="px-1" />
              <ButtonPrimary>{data.user.name}</ButtonPrimary>
            </div>
            <div className="px-3" />

            <ButtonPrimary onClick={() => logout()}>Çıkış yap</ButtonPrimary>

            <div className="flex xl:hidden items-center">
              <SwitchDarkMode />
              <div className="px-0.5" />
              <MenuBar />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MainNav1;
