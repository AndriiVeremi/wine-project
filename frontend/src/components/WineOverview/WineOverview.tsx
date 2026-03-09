import type { Wine } from '@/types/wine';
import {
  Characteristics,
  CharacteristicItem,
  WineOverviewTitle,
  WineInStock,
  StockReviewRow,
  WriteReviewButton,
  StyledWinePrice,
  BuyFavRow,
} from './WineOverview.styled';
import MainButton from '../buttons/MainButton';
import FavoriteButton from '../buttons/FavoriteButton';

interface Props {
  wine: Wine;
}

const WineOverview = ({ wine }: Props) => {
  return (
    <div>
      <WineOverviewTitle>{wine.name}</WineOverviewTitle>
      <StockReviewRow>
        <WineInStock $inStock={wine.inStock}>
          {wine.inStock ? 'In stock' : 'Out of stock'}
        </WineInStock>

        <WriteReviewButton>Write a review</WriteReviewButton>
      </StockReviewRow>

      <StyledWinePrice>{wine.price} ₾</StyledWinePrice>
      <BuyFavRow>
        <MainButton size="small">Buy</MainButton>

        <FavoriteButton size={50} wine={wine} />
      </BuyFavRow>

      <WineOverviewTitle>Characteristics</WineOverviewTitle>
      <Characteristics>
        <CharacteristicItem>
          <span>Color:</span>
          <span>{wine.color}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Type:</span>
          <span>{wine.sweetness}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Brand:</span>
          <span>{wine.winery.name}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Volume:</span>
          <span>{wine.volume} L</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>In a box of:</span>
          <span>{wine.boxQuantity}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Packaging:</span>
          <span>{wine.hasPackaging ? 'yes' : 'no'}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Alcohol:</span>
          <span>{wine.alcohol}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Region:</span>
          <span>{wine.name ?? '—'}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Manufacturer:</span>
          <span>{wine.winery.name}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Serve at:</span>
          <span>{wine.servingTemperature}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Grape:</span>
          <span>{wine.grape.name}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Vintage:</span>
          <span>{wine.vintage}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Decanting:</span>
          <span>{wine.decanting ? 'yes' : 'no'}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Bottle diameter:</span>
          <span>{wine.bottleDiameter}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Supplier:</span>
          <span>{wine.supplier}</span>
        </CharacteristicItem>
      </Characteristics>
    </div>
  );
};

export default WineOverview;
