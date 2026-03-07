import type { Wine } from '@/types/wine';
import { Characteristics, CharacteristicItem } from './WineOverview.styled';
import MainButton from '../buttons/MainButton';

interface Props {
  wine: Wine;
}

const WineOverview = ({ wine }: Props) => {
  return (
    <div>
      <h2>{wine.name}</h2>
      <p>{wine.price}</p>
      <MainButton>Buy</MainButton>
      <h3>Characteristics</h3>
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
          <span>{typeof wine.winery === 'string' ? wine.winery : wine.winery.name}</span>
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
          <span>{typeof wine.winery === 'string' ? wine.winery : wine.winery.name}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Serve at:</span>
          <span>{wine.servingTemperature}</span>
        </CharacteristicItem>

        <CharacteristicItem>
          <span>Grape:</span>
          <span>{typeof wine.grape === 'string' ? wine.grape : wine.grape.name}</span>
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
