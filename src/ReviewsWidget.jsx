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

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        const transformed = data
          .filter((r) => r.text != null)
          .map(toReviewSchema);
        setReviews(transformed);
      });
  }, [src]);

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
        maxItems={5}
      />
    </div>
  );
}
