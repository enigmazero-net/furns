import styled, {css, devices, themeGet} from "@styled";

export const PromoTitle = styled.h3`
  font-size: 30px;
  line-height: 39px;
  margin-bottom: 10px;
  color: ${themeGet('colors.heading')};
  font-weight: ${themeGet('fontWeights.subHeading')};

  ${devices.xs} {
    font-size: 26px;
    line-height: 26px;
  }
`
export const PromoContent = styled.div`
  align-self: center;
  max-width: 330px;
  padding: 22px 24px;
  border-radius: ${themeGet('radii.sm')};
  background-color: rgba(255, 255, 255, 0.84);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);

  p {
    margin-bottom: 0;
    color: ${themeGet('colors.heading')};
    font-weight: ${themeGet('fontWeights.medium')};
  }

  ${devices.xs} {
    max-width: 270px;
    padding: 16px 18px;
  }
`

export const PromoInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 40px;
  justify-content: flex-start;

  ${devices.xs} {
    padding: 20px;
  }

  ${props => props.align === 'right' && css`
    justify-content: flex-end;
  `}

  ${props => props.align === 'center' && css`
    justify-content: center;
    text-align: center;
  `}
`

export const PromoItem = styled.a`
  display: block;
  overflow: hidden;
  position: relative;
  margin-top: 30px;

  figure {
    position: relative;

    &:after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.08);
    }
  }

  img {
    width: 100%;
    object-position: center;
    transition: ${themeGet('transition')};
  }
`
