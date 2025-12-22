// Cache utility for API responses
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export const CACHE_DURATIONS = {
  SHORT: 30 * 60 * 1000, // 30 minutes
  MEDIUM: 60 * 60 * 1000, // 1 hour
  LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

export const CacheKeys = {
  RECENTLY_VIEWED_RECIPES: "platewise_cache_recently_viewed",
  RECOMMENDED_RECIPES: "platewise_cache_recommended",
  RECIPE_DETAILS: "platewise_cache_recipe_",
} as const;

/**
 * Get cached data if still valid
 */
export const getCachedData = <T>(
  key: string,
  maxAge: number = CACHE_DURATIONS.MEDIUM
): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheItem: CacheItem<T> = JSON.parse(cached);
    const age = Date.now() - cacheItem.timestamp;

    if (age < maxAge) {
      console.log(`✅ Cache hit: ${key} (age: ${Math.round(age / 1000)}s)`);
      return cacheItem.data;
    } else {
      console.log(`⏰ Cache expired: ${key} (age: ${Math.round(age / 1000)}s)`);
      localStorage.removeItem(key);
      return null;
    }
  } catch (error) {
    console.error("Cache read error:", error);
    return null;
  }
};

/**
 * Set cache data with timestamp
 */
export const setCachedData = <T>(key: string, data: T): void => {
  try {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
    console.log(`💾 Cached: ${key}`);
  } catch (error) {
    console.error("Cache write error:", error);
  }
};

/**
 * Clear specific cache or all caches
 */
export const clearCache = (key?: string): void => {
  if (key) {
    localStorage.removeItem(key);
    console.log(`🗑️ Cleared cache: ${key}`);
  } else {
    // Clear all platewise caches
    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith("platewise_cache_")) {
        localStorage.removeItem(k);
      }
    });
    console.log("🗑️ Cleared all caches");
  }
};

/**
 * Wrapper for API calls with caching
 */
export const fetchWithCache = async <T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  maxAge: number = CACHE_DURATIONS.MEDIUM
): Promise<T> => {
  // Try cache first
  const cached = getCachedData<T>(cacheKey, maxAge);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  console.log(`🌐 Fetching fresh data: ${cacheKey}`);
  const data = await fetcher();

  // Cache the result
  setCachedData(cacheKey, data);

  return data;
};

/**
 * Check if cache exists and is valid
 */
export const isCacheValid = (
  key: string,
  maxAge: number = CACHE_DURATIONS.MEDIUM
): boolean => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return false;

    const cacheItem: CacheItem<any> = JSON.parse(cached);
    const age = Date.now() - cacheItem.timestamp;

    return age < maxAge;
  } catch {
    return false;
  }
};

/**
 * Get cache age in milliseconds
 */
export const getCacheAge = (key: string): number | null => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const cacheItem: CacheItem<any> = JSON.parse(cached);
    return Date.now() - cacheItem.timestamp;
  } catch {
    return null;
  }
};
