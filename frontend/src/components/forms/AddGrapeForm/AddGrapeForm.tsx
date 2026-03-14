import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import FormField from '@/components/common/FormField/FormField';
import GalleryUpload from '@/components/common/GalleryUpload/GalleryUpload';
import MainButton from '@/components/buttons/MainButton';
import type { Grape } from '@/types/grape';
import { foodPairingCategories, characteristicSuggestions } from '@/utils/pairingSuggestions';
import {
  AddGrapeWrapper,
  TopSection,
  PhotoSide,
  InfoSide,
  FormGrid,
  SectionTitle,
  FullWidthWrapper,
  ButtonWrapper,
  TagSelectorContainer,
  SelectedTags,
  TagGroup,
  GroupTitle,
  TagsWrapper,
  TagItem,
} from './AddGrapeForm.styled';
import { FormContainer } from '@/components/forms/AuthForm/Form.styled';
import { useGrapesStore } from '@/store/grape/grapesStore';

// Константи для випадаючих списків
const acidityOpts = [
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

const types = [
  { value: 'red', label: 'Red' },
  { value: 'white', label: 'White' },
  { value: 'rose', label: 'Rose' },
];

// Початковий стан форми
const initialFormState = {
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

// Інтерфейс для пропсів компонента
interface AddGrapeProps {
  wineryId?: string;
  grapeData?: Grape | null;
  onSuccess?: () => void;
}

// Інтерфейс для помилок API
interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Внутрішній компонент для вибору тегів (характеристики, їжа)
const TagSelector = ({
  title,
  categories,
  selected,
  onChange,
}: {
  title: string;
  categories: { name: string; icon: string; options: string[] }[];
  selected: string[];
  onChange: (tags: string[]) => void;
}) => {
  // Функція для додавання/видалення тегу
  const handleTagToggle = (tag: string) => {
    if (selected.includes(tag)) {
      // Якщо тег вже є — видаляємо його
      const newTags = selected.filter((t) => t !== tag);
      onChange(newTags);
    } else {
      // Якщо тегу немає — додаємо в масив
      const newTags = [...selected, tag];
      onChange(newTags);
    }
  };

  return (
    <TagSelectorContainer>
      <GroupTitle>{title}</GroupTitle>

      {/* Список вже вибраних тегів */}
      <SelectedTags>
        {selected.length === 0 ? (
          <span style={{ color: '#aaa', fontSize: '13px' }}>Нічого не вибрано</span>
        ) : (
          selected.map((tag) => (
            <TagItem key={tag} $selected={true} onClick={() => handleTagToggle(tag)}>
              {tag} ×
            </TagItem>
          ))
        )}
      </SelectedTags>

      {/* Список доступних варіантів по категоріях */}
      <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '10px' }}>
        {categories.map((category) => (
          <TagGroup key={category.name}>
            <GroupTitle>
              {category.icon} {category.name}
            </GroupTitle>
            <TagsWrapper>
              {category.options.map((option) => (
                <TagItem
                  key={option}
                  $selected={selected.includes(option)}
                  onClick={() => handleTagToggle(option)}
                >
                  {option}
                </TagItem>
              ))}
            </TagsWrapper>
          </TagGroup>
        ))}
      </div>
    </TagSelectorContainer>
  );
};

const AddGrape: React.FC<AddGrapeProps> = ({ wineryId, grapeData, onSuccess }) => {
  const [form, setForm] = useState(initialFormState);

  // Стани для роботи з файлами (головне фото + галерея)
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { add, update } = useGrapesStore();

  // Якщо ми редагуємо існуючий виноград — заповнюємо форму
  useEffect(() => {
    if (grapeData) {
      setForm({
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

      // Заповнюємо прев'ю з бази
      if (grapeData.imageUrls && grapeData.imageUrls.length > 0) {
        setMainPreview(grapeData.imageUrls[0]);
        setGalleryPreviews(grapeData.imageUrls.slice(1));
      }
    }
  }, [grapeData]);

  // Обробка вибору головного фото
  const handleMainFileChange = (file: File) => {
    setMainFile(file);
    setMainPreview(URL.createObjectURL(file));
  };

  // Обробка вибору фото для галереї
  const handleGalleryFilesChange = (files: File[]) => {
    setGalleryFiles(files);
    setGalleryPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Обробка звичайних текстових полів та селектів
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // Функція збереження
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Зберігаємо дані...');

    try {
      // Отримуємо ID виноробні (якщо виноград вже належить якійсь)
      const existingWineryId =
        typeof grapeData?.winery === 'object'
          ? (grapeData.winery as { _id: string })?._id
          : grapeData?.winery;

      const payload = {
        ...form,
        winery: wineryId || existingWineryId,
      };

      // Збираємо всі файли в один масив для відправки
      const filesToUpload: File[] = [];
      if (mainFile) filesToUpload.push(mainFile);
      filesToUpload.push(...galleryFiles);

      if (grapeData?._id) {
        // Оновлення
        await update(grapeData._id, payload, filesToUpload);
        toast.success('Дані успішно оновлено!', { id: toastId });
      } else {
        // Створення нового
        await add(payload, filesToUpload);
        toast.success('Новий сорт додано!', { id: toastId });
      }

      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as ApiErrorResponse;
      const message = error.response?.data?.message || 'Сталася помилка при збереженні';
      toast.error(message, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AddGrapeWrapper>
      <FormContainer onSubmit={handleSubmit}>
        <TopSection>
          <PhotoSide>
            <GalleryUpload
              mainPreview={mainPreview}
              galleryPreviews={galleryPreviews}
              onMainFileChange={handleMainFileChange}
              onGalleryFilesChange={handleGalleryFilesChange}
              maxGalleryCount={4}
            />
          </PhotoSide>

          <InfoSide>
            <FormField
              label="Назва сорту"
              id="name"
              value={form.name}
              onChange={handleInputChange}
              required
            />
            <FormField
              label="Тип (колір)"
              id="type"
              isSelect
              value={form.type}
              onChange={handleInputChange}
              required
              options={types}
            />
          </InfoSide>
        </TopSection>

        <SectionTitle>Детальні характеристики</SectionTitle>
        <FormGrid>
          <FormField
            label="Кислотність"
            id="acidity"
            isSelect
            value={form.acidity}
            onChange={handleInputChange}
            required
            options={acidityOpts}
          />
          <FormField
            label="Тільність"
            id="body"
            isSelect
            value={form.body}
            onChange={handleInputChange}
            required
            options={bodyOpts}
          />
          <FormField
            label="Таніни"
            id="tannins"
            isSelect
            value={form.tannins}
            onChange={handleInputChange}
            options={tanninOpts}
          />
          <FormField
            label="Потенціал витримки"
            id="agingPotential"
            value={form.agingPotential}
            onChange={handleInputChange}
            placeholder="Наприклад: 5-10 років"
          />

          <FullWidthWrapper>
            {/* Секція вибору характеристик */}
            <TagSelector
              title="Характеристики смаку та аромату"
              categories={characteristicSuggestions}
              selected={form.characteristics}
              onChange={(tags) => setForm((prev) => ({ ...prev, characteristics: tags }))}
            />

            {/* Секція вибору їжі */}
            <TagSelector
              title="Найкращі поєднання з їжею"
              categories={foodPairingCategories}
              selected={form.foodPairing}
              onChange={(tags) => setForm((prev) => ({ ...prev, foodPairing: tags }))}
            />

            <FormField
              label="Додатковий опис"
              id="description"
              isTextarea
              value={form.description}
              onChange={handleInputChange}
              placeholder="Розкажіть більше про цей сорт..."
            />
          </FullWidthWrapper>
        </FormGrid>

        <ButtonWrapper>
          <MainButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'ЗАЧЕКАЙТЕ...' : 'ЗБЕРЕГТИ СОРТ'}
          </MainButton>
        </ButtonWrapper>
      </FormContainer>
    </AddGrapeWrapper>
  );
};

export default AddGrape;
