import { Item, List, Text } from "./Language.styled";
import { DropDownIcon } from "@/components/Location/Location.styled";


const Language = () => {
    return <>
    <List>
        <Item><Text>En</Text></Item>
        <Item><DropDownIcon /></Item>
    </List>
    </>
}

export default Language;