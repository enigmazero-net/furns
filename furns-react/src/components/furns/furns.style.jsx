import styled, {devices, themeGet} from "@styled";

export const PageContent = styled.div`
  margin-top: -35px;
`;

export const FurnsPanel = styled.section`
  padding: 30px;
  margin-bottom: 30px;
  border: 1px solid ${themeGet("colors.borderLight")};
  background-color: ${themeGet("colors.white")};
  border-radius: ${themeGet("radii.sm")};

  ${devices.sm} {
    padding: 22px;
  }
`;

export const PanelTitle = styled.h3`
  margin-bottom: 18px;
  color: ${themeGet("colors.heading")};
  font-size: 24px;
  font-weight: ${themeGet("fontWeights.heading")};
`;

export const PanelSubtitle = styled.p`
  margin-bottom: 22px;
  color: ${themeGet("colors.text")};
  line-height: 1.7;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  ${devices.sm} {
    grid-template-columns: 1fr;
  }
`;

export const FieldBlock = styled.div`
  margin-bottom: 20px;
`;

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 10px;
`;

export const MutedText = styled.p`
  margin-bottom: 0;
  color: ${themeGet("colors.darkgray")};
  line-height: 1.7;
`;

export const LinkText = styled.a`
  color: ${themeGet("colors.primary")};
  font-weight: ${themeGet("fontWeights.subHeading")};

  &:hover {
    color: ${themeGet("colors.heading")};
  }
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;

  ${devices.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${devices.xs} {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  padding: 24px;
  border: 1px solid ${themeGet("colors.borderLight")};
  border-radius: ${themeGet("radii.sm")};
  background: ${themeGet("colors.offWhite")};
`;

export const MetricLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${themeGet("colors.darkgray")};
  font-size: 13px;
  text-transform: uppercase;
  font-family: ${themeGet("fonts.heading")};
`;

export const MetricValue = styled.strong`
  display: block;
  color: ${themeGet("colors.heading")};
  font-size: 26px;
  font-family: ${themeGet("fonts.heading")};
`;

export const FurnsTableWrap = styled.div`
  overflow-x: auto;
`;

export const FurnsTable = styled.table`
  width: 100%;
  min-width: ${({$compact}) => ($compact ? "0" : "760px")};
  border-collapse: collapse;

  th,
  td {
    padding: 15px 12px;
    text-align: left;
    border-bottom: 1px solid ${themeGet("colors.borderLight")};
  }

  th {
    color: ${themeGet("colors.heading")};
    background: ${themeGet("colors.offWhite")};
    font-family: ${themeGet("fonts.heading")};
    font-weight: ${themeGet("fontWeights.subHeading")};
  }

  th:last-child,
  td:last-child {
    text-align: right;
    white-space: nowrap;
  }
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 5px 12px;
  color: ${({variant}) => variant === "danger" ? "#9f1d1d" : variant === "warning" ? "#8a5300" : "#17633a"};
  background: ${({variant}) => variant === "danger" ? "#fff1f1" : variant === "warning" ? "#fff7e6" : "#eefaf3"};
  border-radius: 3px;
  font-size: 13px;
  font-weight: ${themeGet("fontWeights.subHeading")};
`;

export const SummaryList = styled.dl`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 12px 18px;
  margin: 0;

  dt {
    color: ${themeGet("colors.darkgray")};
    font-weight: ${themeGet("fontWeights.subHeading")};
  }

  dd {
    margin: 0;
    color: ${themeGet("colors.heading")};
  }

  ${devices.xs} {
    grid-template-columns: 1fr;
  }
`;
