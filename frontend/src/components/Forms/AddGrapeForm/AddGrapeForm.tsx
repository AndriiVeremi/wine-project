import { useState, useEffect, Suspense, lazy } from 'react';
import { toast } from 'react-hot-toast';
import FormField from '@/components/Common/FormField/FormField';
import GalleryUpload from '@/components/Common/GalleryUpload/GalleryUpload';
import MainButton from '@/components/Buttons/MainButton';
import type { Grape } from '@/types/grape';

import {
  AddGrapeWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  InfoGrid,
  FormGrid,
  FullWidthWrapper,
  ButtonWrapper,
  TagItem,
  TagBox,
  TagInput,
  TagsList,
} from './AddGrapeForm.styled';
import { FormContainer } from '@/components/Forms/AuthForm/Form.styled';
import { useGrapesStore } from '@/store/grape/grapesStore';
import Skeleton from '@/components/Common/Skeleton/Skeleton';

const TextEditor = lazy(() => import('@/components/Common/TextEditor/TextEditor'));

const acidOpts = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'Very High', label: 'Very High' },
];

const bodyOpts = [
  { value: 'Light', label: 'Light' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Full-bodied', label: 'Full-bodied' },
];

const tanninOpts = [
  { value: 'Low', label: 'Low' },
  { value: 'Medium', label: 'Medium' },
  { value: 'High', label: 'High' },
  { value: 'None', label: 'None' },
];

const typeOpts = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'rose', label: 'Rose' },
];

const init = {
  name: '',
  type: 'red' as 'red' | 'white' | 'rose',
  description: '',
  acidity: 'Medium',
  body: 'Medium',
  tannins: 'Medium',
  agingPotential: '',
  characteristics: [] as string[],
  foodPairing: [] as string[],
};

interface Props {
  wineryId?: string;
  grapeData?: Grape | null;
  onSuccess?: () => void;
}

const DynamicTags = ({
  label,
  tags,
  onUpdate,
}: {
  label: string;
  tags: string[];
  onUpdate: (t: string[]) => void;
}) => {
  const [val, setVal] = useState('');

  const add = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && val.trim()) {
      e.preventDefault();
      if (!tags.includes(val.trim())) onUpdate([...tags, val.trim()]);
      setVal('');
    }
  };

  const kill = (t: string) => onUpdate(tags.filter((x) => x !== t));

  return (
    <TagBox>
      <h4>{label}</h4>
      <TagsList>
        {tags.map((t) => (
          <TagItem key={t} $selected onClick={() => kill(t)} style={{ cursor: 'pointer' }}>
            {t} ✕
          </TagItem>
        ))}
      </TagsList>
      <TagInput
        placeholder="Add item..."
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={add}
      />
    </TagBox>
  );
};

const AddGrape = ({ wineryId, grapeData, onSuccess }: Props) => {
  const [vals, setVals] = useState(init);
  const [mainImg, setMainImg] = useState<File | null>(null);
  const [extraImgs, setExtraImgs] = useState<File[]>([]);
  const [mainPre, setMainPre] = useState<string | null>(null);
  const [extraPres, setExtraPre] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const { add, update } = useGrapesStore();

  useEffect(() => {
    if (grapeData) {
      setVals({
        name: grapeData.name,
        type: grapeData.type,
        description: grapeData.description || '',
        acidity: grapeData.acidity || 'Medium',
        body: grapeData.body || 'Medium',
        tannins: grapeData.tannins || 'Medium',
        agingPotential: grapeData.agingPotential || '',
        characteristics: grapeData.characteristics || [],
        foodPairing: grapeData.foodPairing || [],
      });
      if (grapeData.imageUrls?.length) {
        setMainPre(grapeData.imageUrls[0]);
        setExtraPre(grapeData.imageUrls.slice(1));
      }
    }
  }, [grapeData]);

  const onMain = (f: File) => {
    setMainImg(f);
    setMainPre(URL.createObjectURL(f));
  };

  const onInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setVals((p) => ({ ...p, [id]: value }));
  };

  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const tid = toast.loading('Saving varietal...');
    try {
      const winId =
        typeof grapeData?.winery === 'object'
          ? (grapeData.winery as { _id?: string })?._id
          : grapeData?.winery;
      const payload = { ...vals, winery: wineryId || winId };
      const allFiles = [];
      if (mainImg) allFiles.push(mainImg);
      allFiles.push(...extraImgs);

      if (grapeData?._id) {
        await update(grapeData._id, payload, allFiles);
        toast.success('Updated!', { id: tid });
      } else {
        await add(payload, allFiles);
        toast.success('Added!', { id: tid });
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || 'Error', { id: tid });
    } finally {
      setBusy(false);
    }
  };

  return (
    <AddGrapeWrapper>
      <FormContainer onSubmit={saveData}>
        <TopSection>
          <PhotoSide>
            <GalleryUpload
              mainPreview={mainPre}
              galleryPreviews={extraPres}
              onMainFileChange={onMain}
              onGalleryFileChange={(file, index) => {
                const galleryIndex = index; // extraPres is galleryPreviews.slice(1) in wineries, but here extraPres is the whole gallery array slice(1)
                const newFiles = [...extraImgs];
                newFiles[galleryIndex] = file;
                setExtraImgs(newFiles);

                const newPreviews = [...extraPres];
                newPreviews[galleryIndex] = URL.createObjectURL(file);
                setExtraPre(newPreviews);
              }}
              onRemoveGalleryFile={(index) => {
                const newFiles = [...extraImgs];
                newFiles.splice(index, 1);
                setExtraImgs(newFiles);

                const newPreviews = [...extraPres];
                newPreviews.splice(index, 1);
                setExtraPre(newPreviews);
              }}
              maxGalleryCount={5}
            />
          </PhotoSide>
          <InfoSide>
            <InfoGrid>
              <FormField
                label="Varietal Name"
                id="name"
                value={vals.name}
                onChange={onInput}
                required
              />
              <FormField
                label="Wine Style Type"
                id="type"
                isSelect
                value={vals.type}
                onChange={onInput}
                required
                options={typeOpts}
              />
            </InfoGrid>
          </InfoSide>
        </TopSection>

        <FormGrid>
          <FormField
            label="Acidity Level"
            id="acidity"
            isSelect
            value={vals.acidity}
            onChange={onInput}
            required
            options={acidOpts}
          />
          <FormField
            label="Body Weight"
            id="body"
            isSelect
            value={vals.body}
            onChange={onInput}
            required
            options={bodyOpts}
          />
          <FormField
            label="Tannin Structure"
            id="tannins"
            isSelect
            value={vals.tannins}
            onChange={onInput}
            options={tanninOpts}
          />
          <FormField
            label="Aging Potential"
            id="agingPotential"
            value={vals.agingPotential}
            onChange={onInput}
            placeholder="e.g. 5-10 years"
          />

          <FullWidthWrapper>
            <DynamicTags
              label="Flavors & Aromas"
              tags={vals.characteristics}
              onUpdate={(t) => setVals((p) => ({ ...p, characteristics: t }))}
            />
            <DynamicTags
              label="Perfect Food Pairings"
              tags={vals.foodPairing}
              onUpdate={(t) => setVals((p) => ({ ...p, foodPairing: t }))}
            />
            <Suspense
              fallback={
                <div>
                  <Skeleton height="40px" $margin="0 0 12px 0" />
                  <Skeleton height="200px" $borderRadius="8px" />
                </div>
              }
            >
              <TextEditor
                label="Full Variety History"
                value={vals.description}
                onChange={(v: string) => setVals((p) => ({ ...p, description: v }))}
              />
            </Suspense>
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton type="submit" disabled={busy}>
            {busy ? 'SAVING...' : 'SAVE VARIETAL'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddGrapeWrapper>
  );
};

export default AddGrape;
