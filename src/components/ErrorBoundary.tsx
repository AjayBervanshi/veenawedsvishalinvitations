import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Last line of defence: if anything unexpected throws while rendering,
 * guests still see a decorated wedding card with a reload button instead
 * of a blank white page.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // Keep the console signal for diagnostics without breaking the page.
    console.error('Wedding page error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
          style={{ background: 'linear-gradient(180deg, #fbf8f2 0%, #f3edf8 100%)' }}
        >
          <div
            className="max-w-sm rounded-3xl bg-white/90 border-2 px-8 py-10 shadow-[0_8px_30px_rgba(95,37,15,0.10)]"
            style={{ borderColor: 'rgba(221,164,93,0.6)' }}
          >
            <div className="text-4xl mb-3">❖</div>
            <h1 className="font-serif text-xl font-bold mb-2" style={{ color: '#5f250f' }}>
              Veena &amp; Vishal
            </h1>
            <p className="font-serif text-sm mb-6" style={{ color: '#5f250f' }}>
              The invitation is taking a short moment. Please refresh to open it again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest shadow-md hover:scale-105 transition-all"
              style={{ background: '#5f250f', color: '#dda45d' }}
            >
              Reload Invitation
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
