import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRegionByName } from '@/api/regions';
import { useWineriesStore } from '@/store/wineries/wineriesStore';
import { useWinesStore } from '@/store/wine/winesStore';
import { Loader } from '@/components/Common/Loader';
import Container from '@/components/Common/Container';
import Slider from '@/components/Slider/Slider';
import SliderCardWinery from '@/components/Slider/cards/SliderCardWinery';
import SliderCardWine from '@/components/Slider/cards/SliderCardWine';
import InfoButton from '@/components/Buttons/InfoButton';
import WineryCardSkeleton from '@/components/Common/Skeleton/WineryCardSkeleton';
import WineCardSkeleton from '@/components/Common/Skeleton/WineCardSkeleton';
import type { Wine } from '@/types/wine';
import type { Winery } from '@/types/wineries';
import type { Region } from '@/types/region';
import {
  StyledRegionWrapper,
  StyledRegionHero,
  StyledRegionImg,
  StyledNoImg,
  StyledRegionInfo,
  StyledRegionLabel,
  StyledRegionTitle,
  StyledText,
  StyledSection,
  StyledRegionGrid,
  StyledColumn,
  StyledBlock,
  StyledGrapeGrid,
  StyledGrapeItem,
  StyledTag,
  StyledTagsWrap,
  StyledWineriesWines,
  StyledTitle,
  StyledTabs,
  StyledTitleWrapper,
  SkeletonGrid,
  StyledImageModalOverlay,
  StyledModalImage,
  StyledCloseModal,
} from './RegionDetailPage.styled';

const RegionDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'wineries' | 'wines'>('wineries');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const { wineries, fetchWineries, loading: wineriesLoading } = useWineriesStore();
  const { wines, fetch: fetchWines, loading: winesLoading } = useWinesStore();

  useEffect(() => {
    if (isImageModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
      document.body.style.paddingRight = `${scrollBarWidth}px`; // Prevent layout shift
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isImageModalOpen]);

  useEffect(() => {
    const loadRegion = async () => {
      if (!name) return;
      try {
        setLoading(true);
        const res = await getRegionByName(name);
        setRegion(res.data);
      } catch (err) {
        console.error('Error loading region:', err);
      } finally {
        setLoading(false);
      }
    };
    loadRegion();
  }, [name]);

  useEffect(() => {
    if (activeTab === 'wineries' && region?._id) {
      fetchWineries({ region: region._id, limit: 12 });
    }
  }, [activeTab, region, fetchWineries]);

  useEffect(() => {
    if (activeTab === 'wines' && region?._id) {
      fetchWines({ region: region._id, limit: 12 });
    }
  }, [activeTab, region, fetchWines]);

  const getDynamicTitle = () => {
    if (!region) return '';
    return activeTab === 'wineries'
      ? `Explore Wineries in ${region.name}`
      : `Premium Wines from ${region.name}`;
  };

  const handleOpenModal = () => setIsImageModalOpen(true);
  const handleCloseModal = () => setIsImageModalOpen(false);

  if (loading) return <Loader />;
  if (!region) return <Container>Region not found.</Container>;

  return (
    <Container>
      <StyledRegionWrapper>
        <StyledRegionHero>
          <StyledRegionImg onClick={handleOpenModal}>
            {region.imageUrl ? (
              <img src={region.imageUrl} alt={region.name} />
            ) : (
              <StyledNoImg>{region.name}</StyledNoImg>
            )}
          </StyledRegionImg>

          <StyledRegionInfo>
            <StyledTitleWrapper>
              <StyledRegionLabel>Region:</StyledRegionLabel>
              <StyledRegionTitle>{region.name}</StyledRegionTitle>
            </StyledTitleWrapper>
            <StyledText>{region.description}</StyledText>

            {region.locationAndClimate && (
              <StyledSection>
                <h2>{region.locationAndClimate.title || 'Geographic location and climate'}</h2>
                <p>{region.locationAndClimate.description}</p>
                {region.locationAndClimate.features && (
                  <ul>
                    {region.locationAndClimate.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </StyledSection>
            )}
          </StyledRegionInfo>
        </StyledRegionHero>

        {isImageModalOpen && region.imageUrl && (
          <StyledImageModalOverlay onClick={handleCloseModal}>
            <StyledCloseModal onClick={handleCloseModal}>&times;</StyledCloseModal>
            <StyledModalImage
              src={region.imageUrl}
              alt={region.name}
              onClick={(e) => e.stopPropagation()}
            />
          </StyledImageModalOverlay>
        )}

        <StyledRegionGrid>
          <StyledColumn>
            {region.soils && (
              <StyledBlock>
                <h2>{region.soils.title || `Soils of ${region.name}`}</h2>
                <p>{region.soils.description}</p>
                {region.soils.mainTypes && (
                  <StyledTagsWrap>
                    {region.soils.mainTypes.map((t, i) => (
                      <StyledTag key={i}>{t}</StyledTag>
                    ))}
                  </StyledTagsWrap>
                )}
              </StyledBlock>
            )}

            {region.grape && (
              <StyledBlock>
                <h2>{region.grape.title || `Main grape varieties of ${region.name}`}</h2>
                <StyledGrapeGrid>
                  {region.grape.white && region.grape.white.length > 0 && (
                    <StyledGrapeItem>
                      <h4>White Grapes</h4>
                      <ul>
                        {region.grape.white.map((g, i) => (
                          <li key={i}>
                            <strong>{g.name}</strong>
                            {g.description}
                          </li>
                        ))}
                      </ul>
                    </StyledGrapeItem>
                  )}
                  {region.grape.red && region.grape.red.length > 0 && (
                    <StyledGrapeItem>
                      <h4>Red Grapes</h4>
                      <ul>
                        {region.grape.red.map((g, i) => (
                          <li key={i}>
                            <strong>{g.name}</strong>
                            {g.description}
                          </li>
                        ))}
                      </ul>
                    </StyledGrapeItem>
                  )}
                </StyledGrapeGrid>
              </StyledBlock>
            )}
          </StyledColumn>

          <StyledColumn>
            {region.cultureAndTraditions && (
              <StyledBlock>
                <h2>{region.cultureAndTraditions.title || 'Winemaking culture and traditions'}</h2>
                <p>{region.cultureAndTraditions.description}</p>
                {region.cultureAndTraditions.rituals && (
                  <ul>
                    {region.cultureAndTraditions.rituals.map((r, i) => (
                      <li key={i} style={{ fontSize: '14px', marginBottom: '8px', color: '#555' }}>
                        {r}
                      </li>
                    ))}
                  </ul>
                )}
              </StyledBlock>
            )}

            {region.typicalWines && (
              <StyledBlock>
                <h2>{region.typicalWines.title || 'Typical wines of the region'}</h2>
                <p>{region.typicalWines.description}</p>
                {region.typicalWines.styles && (
                  <StyledTagsWrap>
                    {region.typicalWines.styles.map((s, i) => (
                      <StyledTag key={i}>{s}</StyledTag>
                    ))}
                  </StyledTagsWrap>
                )}
              </StyledBlock>
            )}

            {region.pdo && region.pdo.list && region.pdo.list.length > 0 && (
              <StyledBlock>
                <h2>{region.pdo.title || 'PDO'}</h2>
                <StyledTagsWrap>
                  {region.pdo.list.map((p, i) => (
                    <StyledTag key={i}>{p}</StyledTag>
                  ))}
                </StyledTagsWrap>
              </StyledBlock>
            )}
          </StyledColumn>
        </StyledRegionGrid>

        <StyledWineriesWines>
          <StyledTitle>{getDynamicTitle()}</StyledTitle>

          <StyledTabs>
            <InfoButton active={activeTab === 'wineries'} onClick={() => setActiveTab('wineries')}>
              Wineries located in {region.name}
            </InfoButton>
            <InfoButton active={activeTab === 'wines'} onClick={() => setActiveTab('wines')}>
              Wines produced in the {region.name} region
            </InfoButton>
          </StyledTabs>

          {activeTab === 'wineries' ? (
            wineriesLoading && wineries.length === 0 ? (
              <SkeletonGrid>
                <div>
                  <WineryCardSkeleton />
                  <WineryCardSkeleton />
                  <WineryCardSkeleton />
                  <WineryCardSkeleton />
                </div>
              </SkeletonGrid>
            ) : (
              <Slider
                items={wineries}
                renderItem={(winery: Winery) => <SliderCardWinery winery={winery} />}
              />
            )
          ) : winesLoading && wines.length === 0 ? (
            <SkeletonGrid>
              <div>
                <WineCardSkeleton />
                <WineCardSkeleton />
                <WineCardSkeleton />
                <WineCardSkeleton />
              </div>
            </SkeletonGrid>
          ) : (
            <Slider items={wines} renderItem={(wine: Wine) => <SliderCardWine wine={wine} />} />
          )}

          {activeTab === 'wineries' && !wineriesLoading && wineries.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
              No wineries found in this region.
            </p>
          )}

          {activeTab === 'wines' && !winesLoading && wines.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
              No wines found in this region.
            </p>
          )}
        </StyledWineriesWines>
      </StyledRegionWrapper>
    </Container>
  );
};

export default RegionDetailPage;
