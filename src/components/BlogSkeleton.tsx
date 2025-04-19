import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton CSS

const BlogSkeleton = () => {
  return (
    <>
      {/* Back Arrow */}
      <div className="fixed top-4 left-4 z-10">
        <Skeleton circle width={30} height={30} />
      </div>

      {/* Main Content */}
      <div className="min-h-screen w-full bg-amber-50 flex justify-center items-center p-4">
        <div className="w-full max-w-3xl">
          <div>
            {/* Skeleton for Title */}
            <Skeleton height={40} width="60%" />
            {/* Skeleton for Content */}
            <div className="mt-6">
              <Skeleton count={5} height={20} /> {/* Simulate multiple lines */}
            </div>
            {/* Skeleton for Author */}
            <div className="flex justify-end">
              <Skeleton width={100} height={12} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogSkeleton;