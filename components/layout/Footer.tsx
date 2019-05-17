import Link from 'next/link';
import styled from 'styled-components';
import { getYear } from 'date-fns';
import posed from 'react-pose';
import { Props } from '../styles/Themes';

const FooterPopped = posed.footer({
  open: {
    y: `0%`,
    delay: 750,
  },
  closed: {
    y: `100%`,
  },
});

const StyledFooter = styled(FooterPopped)`
  background: ${(props: Props) => props.theme.colors.red_transparent};
  padding: 30px 10px;
  position: sticky;
  transform: translateY(100%);
`;
const SiteInfo = styled.div`
  font-family: monospace;
  color: ${(props: Props) => props.theme.colors.white};
  text-decoration: none;
  text-transform: uppercase;
`;
const Separator = styled.span`
  content: '\\A';
  border: 1px solid ${(props: Props) => props.theme.colors.white};
  margin: auto 10px;
`;
const Footer = () => (
  <StyledFooter initialPose="closed" pose="open">
    <SiteInfo>
      <Link href="/privacy-policy" prefetch>
        <a>Privacy Policy</a>
      </Link>
      <Separator />
      <span>Copyright © {getYear(new Date())}</span>
    </SiteInfo>
  </StyledFooter>
);

export default Footer;
