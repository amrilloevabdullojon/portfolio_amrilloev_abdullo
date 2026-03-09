import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '40px 24px',
            textAlign: 'center',
            color: '#64748b',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '0.85rem',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚠️</div>
          <p>Something went wrong in this section.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
