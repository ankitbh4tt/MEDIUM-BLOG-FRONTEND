import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AllBlogsSkeleton = () => {
  const skeletonCards = Array(6).fill(0); // Adjust number as needed

  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {skeletonCards.map((_, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <article className="overflow-hidden rounded-lg shadow-sm transition hover:shadow-lg">
              <Skeleton 
                height={224} 
                width="100%" 
                className="rounded-t-lg"
              />
        
              <div className="bg-white p-4 sm:p-6">
                <Skeleton width={100} height={12} className="mb-2" />
                <Skeleton width="80%" height={24} className="mt-0.5" />
                <Skeleton count={3} width="100%" height={12} className="mt-2" />
                <div className="flex justify-end">
                  <Skeleton width={80} height={12} />
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default AllBlogsSkeleton;