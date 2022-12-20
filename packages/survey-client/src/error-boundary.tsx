import React from 'react';
import { ErrorInfo, ReactElement } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}
interface ErrorboundaryProps {
  children?: ReactElement;
}

export class ErrorBoundary extends React.Component<
  ErrorboundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorboundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    this.setState({ errorMessage: error.message });
    // do something with error and errorInfo
  }



  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="bg-red-500 text-white p-4 w-[500px] rounded my-3 mx-auto">
          <h3 className="text-xl">An error occured</h3>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }
  }
}
