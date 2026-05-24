import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import styled, {css, devices} from "@styled";
import settings from "@data/settings";

const LogoWrap = styled.div`
  &.logo--desktop {
    ${devices.md} {
      display: none;
    }
  }

  &.logo--mobile {
    display: none;

    ${devices.md} {
      display: block;
    }
  }

  a {
    display: inline-flex;
    overflow: hidden;
    position: relative;

    ${({width}) => width && css`
      width: ${width + 'px'};
    `}

    ${({height}) => height && css`
      height: ${height + 'px'};
    `}
  }
`

const Logo = ({width, height, src, className}) => {
    return (
        <LogoWrap width={width} height={height} className={cn(className)}>
            <Link href="/">
                <Image
                    src={src}
                    fill
                    loading="eager"
                    alt={settings.title}
                    style={{objectFit: "contain"}}
                />
            </Link>
        </LogoWrap>
    );
};

Logo.defaultProps = {
    width: 172,
    height: 40
}

Logo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    src: PropTypes.string.isRequired
}

export default Logo;
