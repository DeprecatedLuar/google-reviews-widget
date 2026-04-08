export type GoogleReview = {
    reviewId: string | null;
    reviewer: {
        profilePhotoUrl: string;
        displayName: string;
        isAnonymous: boolean;
    };
    starRating: number;
    comment: string;
    createTime: string | null;
    updateTime: string | null;
};
export declare const GoogleReview: {};
export type GoogleReviewV2 = {
    id: string;
    platform: string;
    author?: {
        name?: string | null;
        avatarUrl?: string | null;
        photoUrl?: string | null;
    } | null;
    title?: string | null;
    text: string;
    originalText?: string | null;
    languageCode?: string | null;
    rating?: {
        value: number;
        max: number;
    } | null;
    publishedAt: string;
    updatedAt?: string | null;
    createdAt: string;
    lastSyncedAt?: string | null;
    metadata?: Record<string, unknown> | null;
    url?: string | null;
};
export declare const GoogleReviewV2: {};
export type NameDisplay = 'fullNames' | 'firstAndLastInitials' | 'firstNamesOnly';
export type LogoVariant = 'icon' | 'full' | 'none';
export type DateDisplay = 'relative' | 'absolute' | 'none';
export type ReviewVariant = 'testimonial' | 'card';
export type Theme = 'light' | 'dark';
interface FeaturableAPIResponseV1Base {
    success: boolean;
}
interface FeaturableAPIResponseV1Success extends FeaturableAPIResponseV1Base {
    success: true;
    profileUrl: string | null;
    totalReviewCount: number;
    averageRating: number;
    reviews: GoogleReview[];
}
interface FeaturableAPIResponseV1Error extends FeaturableAPIResponseV1Base {
    success: false;
}
export type FeaturableAPIResponseV1 = FeaturableAPIResponseV1Success | FeaturableAPIResponseV1Error;
export declare const FeaturableAPIResponseV1: {};
interface FeaturableAPIResponseV2Base {
    success: boolean;
}
interface FeaturableAPIResponseV2Success extends FeaturableAPIResponseV2Base {
    success: true;
    widget: {
        gbpLocationSummary: {
            reviewsCount: number;
            rating: number;
            writeAReviewUri: string;
        };
        reviews: GoogleReviewV2[];
    };
}
interface FeaturableAPIResponseV2Error extends FeaturableAPIResponseV2Base {
    success: false;
}
export type FeaturableAPIResponseV2 = FeaturableAPIResponseV2Success | FeaturableAPIResponseV2Error;
export declare const FeaturableAPIResponseV2: {};
export type FeaturableAPIResponse = FeaturableAPIResponseV1 | FeaturableAPIResponseV2;
export declare const FeaturableAPIResponse: {};
export type WidgetVersion = 'v1' | 'v2';
export {};
