import { IoChevronDownSharp } from "react-icons/io5";
import styled from "styled-components";

export const List = styled("ul")`
    display: flex;
    align-items: center;
    gap: 8px;
`

export const Item = styled("li")`
    display: flex;
    align-items: center;
`

export const LocationIcon = styled(IoChevronDownSharp)`
    color: var(--brown-icon);
    width: 16px;
    height: 20px;
     `
export const Text = styled("p")`
    font: var(--font-main);
    color: var(--font-grey);
    font-size: 17px;
    font-weight: 500;
    font-style: medium;
    line-height: 26px;
    `