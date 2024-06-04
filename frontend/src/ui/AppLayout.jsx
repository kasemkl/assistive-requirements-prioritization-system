import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import "../styles/variables.css";
import "../styles/main.css";
const StyledAppLayout = styled.div`
  // display: grid;
  // grid-template-columns: 26rem 1fr;
  // grid-template-rows: auto 1fr;
  height: 100vh;
  position: relative;
`;

const Main = styled.main`
  background-color: var(--neutral--800);
  padding: 4rem 4.8rem 6.4rem;
  color: var(--theme-color-3);
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <Main className="home-section">
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
