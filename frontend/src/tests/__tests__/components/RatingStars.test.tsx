import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RatingStars from '@/components/Common/RatingStars/RatingStars';

describe('RatingStars', () => {
  it('should render with value 0', () => {
    render(<RatingStars value={0} />);
    expect(screen.getByLabelText('Rating: 0.0 out of 5 stars')).toBeInTheDocument();
  });

  it('should render with value 5', () => {
    render(<RatingStars value={5} />);
    expect(screen.getByLabelText('Rating: 5.0 out of 5 stars')).toBeInTheDocument();
  });

  it('should render with decimal value', () => {
    render(<RatingStars value={4.5} />);
    expect(screen.getByLabelText('Rating: 4.5 out of 5 stars')).toBeInTheDocument();
  });

  it('should show left value when showLeftValue is true', () => {
    render(<RatingStars value={4.2} showLeftValue />);
    expect(screen.getByText('4.2')).toBeInTheDocument();
  });

  it('should show reviews when showRightReviews is true', () => {
    render(<RatingStars value={4.0} reviews={25} showRightReviews />);
    expect(screen.getByText('(25)')).toBeInTheDocument();
  });

  it('should not show left value by default', () => {
    render(<RatingStars value={3.5} />);
    expect(screen.queryByText('3.5')).not.toBeInTheDocument();
  });

  it('should not show reviews by default', () => {
    render(<RatingStars value={4.0} reviews={10} />);
    expect(screen.queryByText('(10)')).not.toBeInTheDocument();
  });

  it('should render with custom size', () => {
    render(<RatingStars value={4} size={30} />);
    expect(screen.getByLabelText('Rating: 4.0 out of 5 stars')).toBeInTheDocument();
  });

  it('should render with custom color', () => {
    render(<RatingStars value={4} color="#ff0000" />);
    expect(screen.getByLabelText('Rating: 4.0 out of 5 stars')).toBeInTheDocument();
  });

  it('should handle value greater than 5', () => {
    render(<RatingStars value={5.5} />);
    expect(screen.getByLabelText('Rating: 5.5 out of 5 stars')).toBeInTheDocument();
  });

  it('should handle value less than 0', () => {
    render(<RatingStars value={-1} />);
    expect(screen.getByLabelText('Rating: -1.0 out of 5 stars')).toBeInTheDocument();
  });
});
