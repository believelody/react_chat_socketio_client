import React from "react";
import styled from "styled-components";
import SidenavHeader from "../header/SidenavHeader";
import CardProfile from "../cards/CardProfile";
import SearchForm from "../forms/SearchForm";
import MenuTab from "../tabs/MenuTab";
import devices from "../../utils/devices";

const SidenavStyle = styled.aside`
  width: auto;
  height: 100vh;
  margin: 0;
  background-image: linear-gradient(-45deg, #373b44, #2c3e50);
  background-color: #2c3e50;
  color: #f5f5f5;

  @media ${devices.mobileL} {
    width: 100vw;
  }
`;

const Sidenav = () => {
  return (
    <SidenavStyle>
      <SidenavHeader />
      <CardProfile />
      <SearchForm placeholder="Search a friend" />
      <MenuTab />
    </SidenavStyle>
  );
};

export default Sidenav;
