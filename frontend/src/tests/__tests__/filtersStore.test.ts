import { describe, it, expect, beforeEach } from 'vitest';
import { useFiltersStore } from '@/store/wine/filtersStore';

describe('FiltersStore', () => {
  beforeEach(() => {
    useFiltersStore.getState().clearFilters();
  });

  it('should have initial empty values', () => {
    const state = useFiltersStore.getState();

    expect(state.country).toBe('');
    expect(state.region).toBe('');
    expect(state.sweetness).toBe('');
    expect(state.color).toBe('');
    expect(state.grape).toBe('');
    expect(state.wineryId).toBe('');
    expect(state.minRating).toBe('');
    expect(state.vintage).toBe('');
    expect(state.nameInput).toBe('');
    expect(state.name).toBe('');
  });

  it('should set filter correctly', () => {
    const { setFilter } = useFiltersStore.getState();

    setFilter('color', 'red');
    expect(useFiltersStore.getState().color).toBe('red');

    setFilter('country', 'France');
    expect(useFiltersStore.getState().country).toBe('France');

    setFilter('minRating', '4');
    expect(useFiltersStore.getState().minRating).toBe('4');
  });

  it('should set name input without applying', () => {
    const { setNameInput } = useFiltersStore.getState();

    setNameInput('Cabernet');

    expect(useFiltersStore.getState().nameInput).toBe('Cabernet');
    expect(useFiltersStore.getState().name).toBe('');
  });

  it('should apply name after calling applyName', () => {
    const { setNameInput, applyName } = useFiltersStore.getState();

    setNameInput('Merlot');
    applyName();

    expect(useFiltersStore.getState().name).toBe('Merlot');
    expect(useFiltersStore.getState().nameInput).toBe('Merlot');
  });

  it('should clear all filters', () => {
    const { setFilter, clearFilters, setNameInput } = useFiltersStore.getState();

    setFilter('color', 'red');
    setFilter('country', 'France');
    setFilter('grape', 'Cabernet');
    setFilter('minRating', '4');
    setNameInput('Test');

    clearFilters();

    const state = useFiltersStore.getState();
    expect(state.color).toBe('');
    expect(state.country).toBe('');
    expect(state.grape).toBe('');
    expect(state.minRating).toBe('');
    expect(state.vintage).toBe('');
    expect(state.name).toBe('');
    expect(state.nameInput).toBe('');
  });

  it('should update multiple filters independently', () => {
    const { setFilter } = useFiltersStore.getState();

    setFilter('color', 'red');
    setFilter('sweetness', 'dry');
    setFilter('vintage', '2020');

    const state = useFiltersStore.getState();
    expect(state.color).toBe('red');
    expect(state.sweetness).toBe('dry');
    expect(state.vintage).toBe('2020');
  });
});
