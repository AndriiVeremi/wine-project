import { describe, it, expect, beforeEach } from 'vitest';
import { useGrapeFiltersStore } from '@/store/grape/grapeFiltersStore';
import { useTourFiltersStore } from '@/store/tours/tourFiltersStore';
import { useWineriesFiltersStore } from '@/store/wineries/wineriesFiltersStore';

describe('GrapeFiltersStore', () => {
  beforeEach(() => {
    useGrapeFiltersStore.getState().clearFilters();
  });

  it('should have initial empty values', () => {
    const state = useGrapeFiltersStore.getState();
    expect(state.page).toBe(1);
    expect(state.type).toBe('');
    expect(state.region).toBe('');
    expect(state.body).toBe('');
    expect(state.acidity).toBe('');
    expect(state.nameInput).toBe('');
    expect(state.name).toBe('');
  });

  it('should set filter correctly', () => {
    const { setFilter } = useGrapeFiltersStore.getState();
    setFilter('type', 'red');
    expect(useGrapeFiltersStore.getState().type).toBe('red');

    setFilter('body', 'Full-bodied');
    expect(useGrapeFiltersStore.getState().body).toBe('Full-bodied');
  });

  it('should reset page to 1 when filter changes', () => {
    const { setFilter } = useGrapeFiltersStore.getState();
    useGrapeFiltersStore.setState({ page: 5 });
    setFilter('region', 'Kakheti');
    expect(useGrapeFiltersStore.getState().page).toBe(1);
  });

  it('should keep page when setting page filter', () => {
    const { setFilter } = useGrapeFiltersStore.getState();
    useGrapeFiltersStore.setState({ page: 3 });
    setFilter('page', 5);
    expect(useGrapeFiltersStore.getState().page).toBe(5);
  });

  it('should clear all filters', () => {
    const { setFilter, clearFilters } = useGrapeFiltersStore.getState();
    setFilter('type', 'white');
    setFilter('region', 'Imereti');
    setFilter('body', 'Light');
    useGrapeFiltersStore.setState({ nameInput: 'Rkatsiteli' });

    clearFilters();

    const state = useGrapeFiltersStore.getState();
    expect(state.type).toBe('');
    expect(state.region).toBe('');
    expect(state.body).toBe('');
    expect(state.acidity).toBe('');
    expect(state.name).toBe('');
    expect(state.nameInput).toBe('');
  });

  it('should handle nameInput separately from name', () => {
    const { setNameInput, applyName } = useGrapeFiltersStore.getState();

    setNameInput('Saperavi');
    expect(useGrapeFiltersStore.getState().nameInput).toBe('Saperavi');
    expect(useGrapeFiltersStore.getState().name).toBe('');

    applyName();
    expect(useGrapeFiltersStore.getState().name).toBe('Saperavi');
  });
});

describe('TourFiltersStore', () => {
  beforeEach(() => {
    useTourFiltersStore.getState().clearFilters();
  });

  it('should have initial empty values', () => {
    const state = useTourFiltersStore.getState();
    expect(state.page).toBe(1);
    expect(state.region).toBe('');
    expect(state.nameInput).toBe('');
    expect(state.name).toBe('');
  });

  it('should set filter correctly', () => {
    const { setFilter } = useTourFiltersStore.getState();
    setFilter('region', 'Kakheti');
    expect(useTourFiltersStore.getState().region).toBe('Kakheti');
  });

  it('should reset page when filter changes', () => {
    const { setFilter } = useTourFiltersStore.getState();
    useTourFiltersStore.setState({ page: 3 });
    setFilter('region', 'Imereti');
    expect(useTourFiltersStore.getState().page).toBe(1);
  });

  it('should clear all filters', () => {
    const { setFilter, clearFilters } = useTourFiltersStore.getState();
    setFilter('region', 'Racha');
    useTourFiltersStore.setState({ nameInput: 'Wine tasting' });

    clearFilters();

    const state = useTourFiltersStore.getState();
    expect(state.region).toBe('');
    expect(state.name).toBe('');
    expect(state.nameInput).toBe('');
  });
});

describe('WineriesFiltersStore', () => {
  beforeEach(() => {
    useWineriesFiltersStore.getState().clearFilters();
  });

  it('should have Georgia as default country', () => {
    const state = useWineriesFiltersStore.getState();
    expect(state.country).toBe('Georgia');
  });

  it('should set filter correctly', () => {
    const { setFilter } = useWineriesFiltersStore.getState();
    setFilter('region', 'Kakheti');
    expect(useWineriesFiltersStore.getState().region).toBe('Kakheti');
  });

  it('should clear filters but keep country', () => {
    const { setFilter, clearFilters } = useWineriesFiltersStore.getState();
    setFilter('region', 'Imereti');
    useWineriesFiltersStore.setState({ nameInput: 'Pheasant' });

    clearFilters();

    const state = useWineriesFiltersStore.getState();
    expect(state.region).toBe('');
    expect(state.name).toBe('');
    expect(state.country).toBe('Georgia');
  });
});
