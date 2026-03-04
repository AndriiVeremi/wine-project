import { List, Text, Item, LocationIcon, DropDownIcon } from './Location.styled';

const Location = () => {
  return (
    <>
      <List>
        <Item>
          <LocationIcon />
        </Item>
        <Item>
          <Text>Georgia</Text>
        </Item>
        <Item>
          <DropDownIcon />
        </Item>
      </List>
    </>
  );
};

export default Location;
