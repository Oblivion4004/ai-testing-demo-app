function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const starIcon = (
    <svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const emptyStar = (
    <svg className="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <div className="stars" data-testid="star-rating" aria-label={`Rating: ${rating} out of 5`}>
      {Array(fullStars).fill(starIcon).map((s, i) => <span key={`full-${i}`}>{s}</span>)}
      {hasHalf && (
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span style={{ position: 'absolute', overflow: 'hidden', width: '50%' }}>{starIcon}</span>
          {emptyStar}
        </span>
      )}
      {Array(emptyStars).fill(emptyStar).map((s, i) => <span key={`empty-${i}`}>{s}</span>)}
    </div>
  );
}

export default StarRating;