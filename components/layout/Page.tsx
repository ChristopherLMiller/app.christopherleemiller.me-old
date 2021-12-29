import { FunctionComponent, Fragment } from "react";
import styled from "styled-components";
import Meta from "components/layout/Meta";
import SidebarNav from "components/layout/SidebarNav";
import MobileNav from "components/layout/MobileNav";
import { Props } from "styles/Themes";
import { imageURL } from "utils/functions";

const StyledPage = styled.div`
  color: var(--text-color-light);
  transition: all 0.5s;

  :before {
    content: "";
    position: fixed;
    transform: scale(1.1);
    left: 0;
    right: 0;
    z-index: -1;

    display: block;
    background-image: url("${imageURL("clm_me/assets/background")}");
    background-size: cover;
    width: 100%;
    height: 100%;
  }

  @media (min-width: ${(props: Props) => props.theme.sizes.small}) {
    display: grid;
    grid-template-columns: auto 1fr;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`;

interface PageProps {
  children: object;
  router?: {
    route: any;
  };
}

const Page: FunctionComponent<PageProps> = ({ children }) => (
  <Fragment>
    <StyledPage>
      <Meta />
      <SidebarNav />
      <Inner>{children}</Inner>
    </StyledPage>
    <MobileNav />
  </Fragment>
);

export default Page;
