import { RenderStars } from "@/components/RenderStars/RenderStars";
import type { ProveedorDetalle } from "../Proveedor";

export const Reviews = ({
  proveedor,
}: {
  proveedor: ProveedorDetalle | null;
}) => {
  const averageRating =
    proveedor?.references && proveedor.references.length > 0
      ? proveedor.references.reduce((acc, item) => acc + item.rating, 0) /
        proveedor.references.length
      : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white">Reseñas</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {RenderStars(Math.round(averageRating))}
          </div>
          <span className="text-sm font-semibold dark:text-white">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({proveedor?.references?.length || 0} calificaciones)
          </span>
        </div>
      </div>

      {proveedor?.references && proveedor?.references.length > 0 ? (
        <div className="space-y-6">
          {proveedor?.references.map((review, key) => (
            <div
              key={key}
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
            >
              <div className="flex items-start gap-4">
                {/*

                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.clientName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {review.clientName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                Avatar */}

                {/*


                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold dark:text-white">
                    {review.clientName}
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {review.date}
                  </span>
                </div>

                Review Content */}
                <div className="flex-1">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-2">
                    {RenderStars(review.rating)}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No hay reseñas disponibles aún</p>
        </div>
      )}
    </div>
  );
};
