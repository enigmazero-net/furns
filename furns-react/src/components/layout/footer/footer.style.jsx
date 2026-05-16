import styled, {space, color, themeGet} from "@styled";

export const CopyrightText = styled.p`
  color: ${themeGet('colors.white')};
  font-size: 13px;
  font-family: ${themeGet('fonts.heading')};
  line-height: 26px;
  
`

export const FooterBottomWrapper = styled.div`
  ${color}
  ${space}
`

export const WidgetWrapper = styled.div`
  ${space};
  ${color};
`

export const FooterWrap = styled.footer`
  ${space};
  ${color};
`
