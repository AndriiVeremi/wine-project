import { Component, type ReactNode, type ErrorInfo } from 'react';
import { notifyError } from '@/utils/toast';
import { ErrorContainer, ErrorTitle, ErrorMessage, ReloadButton } from './ErrorBoundary.styled';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    notifyError('Something went wrong. Please refresh the page.');
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorContainer>
            <ErrorTitle>Oops! Something went wrong</ErrorTitle>
            <ErrorMessage>
              {this.state.error?.message || 'An unexpected error occurred'}
            </ErrorMessage>
            <ReloadButton onClick={() => window.location.reload()}>Reload Page</ReloadButton>
          </ErrorContainer>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
