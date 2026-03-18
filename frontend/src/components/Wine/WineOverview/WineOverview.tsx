import type { Wine } from '@/types/wine';
import {
  Characteristics,
  CharacteristicItem,
  WineOverviewTitle,
  WineInStock,
  StockReviewRow,
  StyledWinePrice,
  BuyFavRow,
  TechGrid,
  TechItem,
} from './WineOverview.styled';
import MainButton from '../../Buttons/MainButton';
import FavoriteButton from '../../Buttons/FavoriteButton';
import RatingStars from '../../Common/RatingStars';
import { FaPercent, FaTemperatureHalf, FaGlassWater, FaWineGlass } from 'react-icons/fa6';
import { GiWineBottle } from 'react-icons/gi';

interface Props {
  wine: Wine;
}

const getColorHex = (color: string) => {
  switch (color.toLowerCase()) {
    case 'red':
      return '#841013';
    case 'white':
      return '#F2D06B';
    case 'rose':
      return '#F29985';
    case 'orange':
      return '#D97941';
    default:
      return '#841013';
  }
};

const WineOverview = ({ wine }: Props) => {
  return (
    <div>
      <WineOverviewTitle>{wine.name}</WineOverviewTitle>

      <StockReviewRow>
        <WineInStock $inStock={wine.inStock}>
          {wine.inStock ? '• In stock' : '• Out of stock'}
        </WineInStock>

        <RatingStars
          value={wine.averageRating ?? 0}
          reviews={wine.totalReviews ?? 0}
          showLeftValue={true}
          showRightReviews={true}
          size={24}
        />
      </StockReviewRow>

      <StyledWinePrice>{wine.price} $</StyledWinePrice>

      <TechGrid>
        <TechItem>
          <FaPercent className="tech-icon" />
          <span className="tech-label">Alcohol</span>
          <span className="tech-value">{wine.alcohol || '—'}</span>
        </TechItem>
        <TechItem>
          <GiWineBottle className="tech-icon" />
          <span className="tech-label">Volume</span>
          <span className="tech-value">{wine.volume ? `${wine.volume} ml` : '—'}</span>
        </TechItem>
        <TechItem>
          <FaTemperatureHalf className="tech-icon" />
          <span className="tech-label">Serve at</span>
          <span className="tech-value">{wine.servingTemperature || '—'}</span>
        </TechItem>
        <TechItem>
          <FaGlassWater className="tech-icon" />
          <span className="tech-label">Type</span>
          <span className="tech-value">{wine.sweetness}</span>
        </TechItem>
      </TechGrid>

      <BuyFavRow>
        <MainButton size="small">Buy</MainButton>
        <FavoriteButton size={50} wine={wine} />
      </BuyFavRow>

      <WineOverviewTitle style={{ fontSize: '20px', marginBottom: '16px' }}>
        Product Details
      </WineOverviewTitle>
      <Characteristics>
        <CharacteristicItem>
          <span>Color:</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaWineGlass style={{ color: getColorHex(wine.color) }} />
            {wine.color}
          </span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Winery:</span>
          <span>{wine.winery.name}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Region:</span>
          <span>{wine.winery.region?.name ?? '—'}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Grape Variety:</span>
          <span>{wine.grape.name}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Vintage:</span>
          <span>{wine.vintage}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Decanting:</span>
          <span>{wine.decanting ? 'Required' : 'Not required'}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>In a box of:</span>
          <span>{wine.boxQuantity} bottles</span>
        </CharacteristicItem>

        {wine.bottleDiameter && (
          <CharacteristicItem>
            <span>Bottle diameter:</span>
            <span>{wine.bottleDiameter}</span>
          </CharacteristicItem>
        )}

        <CharacteristicItem>
          <span>Supplier:</span>
          <span>{wine.supplier || 'Direct delivery'}</span>
        </CharacteristicItem>
      </Characteristics>
    </div>
  );
};

export default WineOverview;
