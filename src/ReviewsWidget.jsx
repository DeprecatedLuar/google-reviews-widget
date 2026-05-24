import { useEffect, useState } from "react";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";
import "./ReviewsWidget.css";

function toReviewSchema(apify) {
  const name = apify.name ?? "Anonymous";
  const encodedName = encodeURIComponent(name);
  return {
    reviewId: apify.reviewUrl ?? null,
    reviewer: {
      displayName: name,
      profilePhotoUrl: `https://ui-avatars.com/api/?name=${encodedName}&background=random`,
      isAnonymous: false,
    },
    starRating: apify.stars,
    comment: apify.text,
    createTime: null,
    updateTime: null,
  };
}

export default function ReviewsWidget({ src }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("[ReviewsWidget] Fetching reviews from:", src);
    fetch(src)
      .then((res) => {
        console.log("[ReviewsWidget] Fetch response:", res.status, res.ok);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("[ReviewsWidget] Received", data?.length, "reviews");
        const transformed = data
          .filter((r) => r.text != null)
          .map(toReviewSchema);
        console.log("[ReviewsWidget] Transformed to", transformed.length, "reviews");
        setReviews(transformed);
      })
      .catch((err) => {
        console.error("[ReviewsWidget] Error loading reviews:", err);
        setError(err.message);
      });
  }, [src]);

  if (error) {
    return (
      <div className="flex items-center justify-center py-12 text-red-500 text-sm">
        Error loading reviews: {error}
      </div>
    );
  }

  if (reviews === null) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
        Loading reviews…
      </div>
    );
  }

  return (
    <div className="w-full">
      <ReactGoogleReviews
        reviews={reviews}
        layout="carousel"
        theme="light"
        hideEmptyReviews={true}
        carouselAutoplay={true}
        carouselSpeed={4000}
      />
    </div>
  );
}
