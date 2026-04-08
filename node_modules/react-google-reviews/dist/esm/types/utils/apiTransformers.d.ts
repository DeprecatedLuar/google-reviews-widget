import { GoogleReview, GoogleReviewV2, FeaturableAPIResponseV1, FeaturableAPIResponseV2 } from '../types/review';
/**
 * Transforms a v2 GoogleReview into v1 format for backwards compatibility
 */
export declare function transformV2ReviewToV1(reviewV2: GoogleReviewV2): GoogleReview;
/**
 * Transforms a v2 API response into v1 format for backwards compatibility
 */
export declare function transformV2ResponseToV1(responseV2: FeaturableAPIResponseV2): FeaturableAPIResponseV1;
/**
 * Type guard to check if response is v2
 */
export declare function isV2Response(response: FeaturableAPIResponseV1 | FeaturableAPIResponseV2): response is FeaturableAPIResponseV2;
