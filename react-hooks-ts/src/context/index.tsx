import React, { ReactNode } from 'react'
import { AuthProvider } from 'context/auth-context';
import { QueryClient, QueryClientProvider } from 'react-query'
export interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({children}: AppProvidersProps) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}