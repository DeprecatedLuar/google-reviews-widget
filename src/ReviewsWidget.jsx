import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./ReviewsWidget.css";

/**
 * Supported input formats (all normalized to internal schema):
 * 1. Simple: { name, stars, text, reviewUrl, profilePhotoUrl }
 * 2. Google Maps: { authorName, rating, text, authorUrl, authorPhoto }
 * 3. Scraper: { reviewer_name, rating, content, review_url, reviewer_photo_url }
 */

const TRUNCATE_LENGTH = 150;

function NextArrow({ onClick }) {
  return (
    <button className="slick-arrow slick-next" onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button className="slick-arrow slick-prev" onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
      </svg>
    </button>
  );
}

function Star({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "#fbbc04" : "#e8eaed"}
      className={filled ? "star-filled" : "star-empty"}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function ReviewCard({ review, isExpanded, onToggleExpand }) {
  const { reviewer, starRating, comment } = review;

  const shouldTruncate = comment && comment.length > TRUNCATE_LENGTH;
  const displayText = shouldTruncate && !isExpanded
    ? comment.substring(0, TRUNCATE_LENGTH) + "..."
    : comment;

  return (
    <div className="review-card">
      <div className="review-header">
        <img
          src={reviewer.profilePhotoUrl}
          alt={reviewer.displayName}
          className="review-avatar"
        />
        <div className="review-name">{reviewer.displayName}</div>
      </div>
      <div className="review-text">
        {displayText}
        {shouldTruncate && (
          <button
            className="read-more-btn"
            onClick={onToggleExpand}
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      <div className="review-footer">
        <div className="review-stars">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < starRating} />
          ))}
        </div>
        <svg className="google-logo" viewBox="0 0 48 48">
          <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
          <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.10-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
          <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
          <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
        </svg>
      </div>
    </div>
  );
}

function CustomPaging({ currentSlide, slideCount }) {
  // If 100+ reviews, show counter
  if (slideCount >= 100) {
    return (
      <div className="review-counter">
        {currentSlide + 1} / {slideCount}
      </div>
    );
  }

  // If < 100 reviews, show all dots
  const dots = [];
  for (let i = 0; i < slideCount; i++) {
    dots.push(
      <span
        key={i}
        className={i === currentSlide ? "dot-active" : "dot-inactive"}
      >
        •
      </span>
    );
  }

  return <div className="review-dots">{dots}</div>;
}

export default function ReviewsWidget({ src }) {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle responsive slides
  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setSlidesToShow(1);
      } else if (width <= 1200) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

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

        // Normalize all formats to internal schema at the boundary
        const normalized = data
          .filter((r) => r.text != null || r.content != null)
          .map((r) => ({
            name: r.name ?? r.authorName ?? r.reviewer_name ?? "Anonymous",
            stars: r.stars ?? r.rating ?? 5,
            text: r.text ?? r.content ?? "",
            url: r.reviewUrl ?? r.authorUrl ?? r.review_url ?? null,
            photo: r.profilePhotoUrl ?? r.authorPhoto ?? r.reviewer_photo_url ?? null
          }));

        console.log("[ReviewsWidget] Normalized to", normalized.length, "reviews");
        setReviews(normalized);
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  // Transform normalized data to component format
  const transformedReviews = reviews.map((review) => {
    // Generate avatar only if no photo provided
    let profilePhotoUrl;
    if (review.photo) {
      profilePhotoUrl = review.photo;
    } else {
      const style = Math.abs(review.name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 2 === 0
        ? 'shapes'
        : 'thumbs';
      profilePhotoUrl = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(review.name)}`;
    }

    return {
      reviewId: review.url,
      reviewer: {
        displayName: review.name,
        profilePhotoUrl,
        isAnonymous: false,
      },
      starRating: review.stars,
      comment: review.text,
    };
  });

  return (
    <div className="reviews-widget">
      <Slider {...settings}>
        {transformedReviews.map((review, idx) => (
          <ReviewCard
            key={idx}
            review={review}
            isExpanded={isExpanded}
            onToggleExpand={() => setIsExpanded(!isExpanded)}
          />
        ))}
      </Slider>
      <CustomPaging currentSlide={currentSlide} slideCount={reviews.length} />
    </div>
  );
}
