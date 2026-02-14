/**
 * Retry utility with exponential backoff
 * 
 * @example
 * ```typescript
 * const data = await retryWithBackoff(
 *   () => fetchData(),
 *   { maxAttempts: 3, initialDelay: 1000 }
 * );
 * ```
 */

/**
 * Options for retry behavior
 */
interface RetryOptions {
    /** Maximum number of retry attempts (default: 3) */
    maxAttempts?: number;
    /** Initial delay in milliseconds (default: 1000) */
    initialDelay?: number;
    /** Maximum delay in milliseconds (default: 10000) */
    maxDelay?: number;
    /** Multiplier for exponential backoff (default: 2) */
    backoffFactor?: number;
    /** Callback function called on each retry attempt */
    onRetry?: (attempt: number, error: Error) => void;
}

const defaultOptions: Required<RetryOptions> = {
    maxAttempts: 3,
    initialDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffFactor: 2,
    onRetry: () => { },
};

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param options Retry options
 * @returns Promise with the result of the function
 */
export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    const opts = { ...defaultOptions, ...options };
    let lastError: Error;
    let delay = opts.initialDelay;

    for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error as Error;

            if (attempt === opts.maxAttempts) {
                throw lastError;
            }

            opts.onRetry(attempt, lastError);

            // Wait before retrying
            await new Promise((resolve) => setTimeout(resolve, delay));

            // Exponential backoff
            delay = Math.min(delay * opts.backoffFactor, opts.maxDelay);
        }
    }

    throw lastError!;
}

/**
 * Check if an error is retryable (network errors, timeouts, etc.)
 */
export function isRetryableError(error: Error): boolean {
    const retryableMessages = [
        "network",
        "timeout",
        "fetch",
        "ECONNREFUSED",
        "ETIMEDOUT",
        "ENOTFOUND",
    ];

    const errorMessage = error.message.toLowerCase();
    return retryableMessages.some((msg) => errorMessage.includes(msg));
}

/**
 * Retry only if the error is retryable
 */
export async function retryIfRetryable<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
): Promise<T> {
    try {
        return await retryWithBackoff(fn, {
            ...options,
            maxAttempts: 1, // First attempt
        });
    } catch (error) {
        if (isRetryableError(error as Error)) {
            return await retryWithBackoff(fn, options);
        }
        throw error;
    }
}
