import { useState } from 'react';

interface TransactionState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useTransaction = <T>() => {
  const [state, setState] = useState<TransactionState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = async (promise: Promise<T>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await promise;
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  };

  return {
    ...state,
    execute,
  };
}; 