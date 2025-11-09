import { useState, useCallback } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for handling API calls with loading, error, and success states
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, execute, reset }
 */
const useApi = (apiFunction, options = {}) => {
  const {
    onSuccess,
    onError,
    showSuccessToast = false,
    showErrorToast = true,
    successMessage = 'Operation completed successfully',
    errorMessage = 'An error occurred',
    initialData = null
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFunction(...args);
      
      setData(result);
      
      if (showSuccessToast) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || errorMessage;
      setError(errorMsg);
      
      if (showErrorToast) {
        toast.error(errorMsg);
      }
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError, showSuccessToast, showErrorToast, successMessage, errorMessage]);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  return {
    data,
    loading,
    error,
    execute,
    reset
  };
};

/**
 * Hook for handling pagination with API calls
 * @param {Function} apiFunction - API function that accepts page and limit
 * @param {Object} options - Configuration options
 * @returns {Object} - Pagination state and controls
 */
export const usePaginatedApi = (apiFunction, options = {}) => {
  const {
    initialPage = 1,
    pageSize = 10,
    ...apiOptions
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { data, loading, error, execute, reset } = useApi(
    (page = currentPage, limit = pageSize, ...args) => 
      apiFunction(page, limit, ...args),
    {
      ...apiOptions,
      onSuccess: (result) => {
        if (result?.pagination) {
          setTotalPages(result.pagination.pages || 1);
          setTotalItems(result.pagination.total || 0);
        }
        if (apiOptions.onSuccess) {
          apiOptions.onSuccess(result);
        }
      }
    }
  );

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    execute(page, pageSize);
  }, [execute, pageSize]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const refresh = useCallback(() => {
    execute(currentPage, pageSize);
  }, [execute, currentPage, pageSize]);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    goToPage,
    nextPage,
    prevPage,
    refresh,
    reset: () => {
      setCurrentPage(initialPage);
      setTotalPages(1);
      setTotalItems(0);
      reset();
    }
  };
};

/**
 * Hook for handling form submissions with API calls
 * @param {Function} apiFunction - API function for form submission
 * @param {Object} options - Configuration options
 * @returns {Object} - Form submission state and handler
 */
export const useFormApi = (apiFunction, options = {}) => {
  const {
    resetOnSuccess = true,
    validationSchema,
    ...apiOptions
  } = options;

  const [validationErrors, setValidationErrors] = useState({});

  const { loading, error, execute, reset } = useApi(apiFunction, {
    ...apiOptions,
    showErrorToast: false, // Handle errors manually for forms
    onSuccess: (result) => {
      setValidationErrors({});
      if (resetOnSuccess) {
        reset();
      }
      if (apiOptions.onSuccess) {
        apiOptions.onSuccess(result);
      }
    },
    onError: (err) => {
      // Handle validation errors
      if (err.response?.status === 422 && err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
      } else {
        toast.error(err.response?.data?.message || err.message || 'Form submission failed');
      }
      if (apiOptions.onError) {
        apiOptions.onError(err);
      }
    }
  });

  const submitForm = useCallback(async (formData) => {
    // Client-side validation
    if (validationSchema) {
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        setValidationErrors({});
      } catch (validationError) {
        const errors = {};
        validationError.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
        return;
      }
    }

    return execute(formData);
  }, [execute, validationSchema]);

  return {
    loading,
    error,
    validationErrors,
    submitForm,
    reset: () => {
      setValidationErrors({});
      reset();
    }
  };
};

/**
 * Hook for real-time data updates
 * @param {Function} apiFunction - API function to call
 * @param {number} interval - Polling interval in milliseconds
 * @param {Object} options - Configuration options
 * @returns {Object} - Real-time data state and controls
 */
export const useRealTimeApi = (apiFunction, interval = 30000, options = {}) => {
  const [isPolling, setIsPolling] = useState(false);
  
  const { data, loading, error, execute, reset } = useApi(apiFunction, {
    ...options,
    showErrorToast: false // Don't show toast for polling errors
  });

  const startPolling = useCallback(() => {
    setIsPolling(true);
    execute(); // Initial call
    
    const intervalId = setInterval(() => {
      execute();
    }, interval);

    return () => {
      clearInterval(intervalId);
      setIsPolling(false);
    };
  }, [execute, interval]);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
  }, []);

  return {
    data,
    loading,
    error,
    isPolling,
    startPolling,
    stopPolling,
    refresh: execute,
    reset
  };
};

export default useApi;