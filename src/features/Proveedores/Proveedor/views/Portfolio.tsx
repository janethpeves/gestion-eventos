import type { ProveedorDetalle } from "../Proveedor";

export const Portfolio = ({
  proveedor,
}: {
  proveedor: ProveedorDetalle | null;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold dark:text-white mb-6">Portafolio</h2>
      {proveedor?.portfolio && proveedor?.portfolio.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proveedor?.portfolio.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No hay elementos de portafolio disponibles</p>
        </div>
      )}
    </div>
  );
};
