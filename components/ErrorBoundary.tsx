"use client";

import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // TODO: Log to external service (e.g., Sentry, LogRocket)
        // logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex min-h-[400px] w-full items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8">
                    <div className="flex max-w-md flex-col items-center text-center">
                        <div className="mb-4 rounded-full bg-red-500/10 p-4">
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-white">Bir Hata Oluştu</h2>
                        <p className="mb-6 text-sm text-gray-400">
                            {this.state.error?.message || "Beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin."}
                        </p>
                        <button
                            onClick={this.handleReset}
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Tekrar Dene
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
