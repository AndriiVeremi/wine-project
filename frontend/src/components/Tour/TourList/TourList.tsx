import type { Tour } from '@/types/tours';
import { StyledTourList, StyledTourListItem } from './TourList.styled';
import TourCard from './TourCard/TourCard';

interface PropsTourList {
  tours: Tour[];
}
const TourList = ({ tours }: PropsTourList) => {
  return (
    <StyledTourList>
      {tours.map((tour) => (
        <StyledTourListItem key={tour._id}>
          <TourCard tour={tour}></TourCard>
        </StyledTourListItem>
      ))}
    </StyledTourList>
  );
};

export default TourList;
