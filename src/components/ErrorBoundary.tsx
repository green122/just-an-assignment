import React, {ErrorInfo} from "react";
import {ErrorMessage} from "./ErrorMessage";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {hasError: false};
  }
  
  static getDerivedStateFromError(error: any) {
    return {hasError: true};
  }
  
  componentDidCatch(error: Error | null, errorInfo: ErrorInfo) {
    // Log to some log service
    console.error(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorMessage message="Something bad has happened. Please try again."/>;
    }
    
    return this.props.children;
  }
}
