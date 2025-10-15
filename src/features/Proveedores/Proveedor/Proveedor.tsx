import { useState } from "react";
import { useParams } from "react-router";
import { Calendar } from "primereact/calendar";
import { CustomButton } from "@/components/CustomButton/CustomButton";
import { TabMenuPrime } from "@/components/TabMenuPrime/TabMenuPrime";
import type { MenuItem } from "primereact/menuitem";

interface PortfolioItem {
	id: number;
	title: string;
	description: string;
	image: string;
	date: string;
	category: string;
}

interface Review {
	id: number;
	clientName: string;
	avatar?: string;
	rating: number;
	date: string;
	comment: string;
}

interface ProveedorDetalle {
	id: number;
	name: string;
	role: string;
	location: string;
	avatar?: string;
	about: string;
	contact: {
		phone: string;
		email: string;
		website: string;
	};
	services: string[];
	availability: Date[];
	portfolio: PortfolioItem[];
	reviews: Review[];
}

// Datos de ejemplo
const proveedorEjemplo: ProveedorDetalle = {
	id: 1,
	name: "Sophia Carter",
	role: "Event Planner",
	location: "New York, United States",
	avatar: "https://i.pravatar.cc/150?img=1",
	about:
      "Soy una planificadora de eventos con más de 8 años de experiencia en crear eventos memorables. Especializada en bodas, fiestas corporativas y reuniones sociales, combin una mezcla única de creatividad y planificación meticulosa en cada proyecto. Su pasión por los detalles y compromiso con la satisfacción del cliente aseguran que cada evento no solo sea sin problemas sino que también refleje la visión y estilo del cliente.",
	contact: {
		phone: "(555) 123-4567",
		email: "sophia.carter@gmail.com",
		website: "www.sophiacartevents.com",
	},
	services: [
		"Planificación de Bodas",
		"Eventos Corporativos",
		"Fiestas Privadas",
		"Diseño de Eventos",
		"Coordinación de Catering",
	],
	availability: [new Date(2024, 6, 5), new Date(2024, 6, 12), new Date(2024, 7, 2)],
	portfolio: [
		{
			id: 1,
			title: "Elegante boda en el jardín",
			description:
				"Una hermosa boda al aire libre con 200 invitados con arreglos florales y temática vintage.",
			image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500",
			date: "Junio 2024",
			category: "Wedding",
		},
		{
			id: 2,
			title: "Summit Corporativo 2024",
			description:
				"Evento corporativo a gran escala para 500+ asistentes con oradores clave y sesiones de networking.",
			image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
			date: "Mayo 2024",
			category: "Corporate",
		},
		{
			id: 3,
			title: "Celebración de Cumpleaños Gala",
			description:
				"Fiesta de cumpleaños de lujo para 50 invitados con entretenimiento en vivo y catering personalizado.",
			image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500",
			date: "Abril 2024",
			category: "Private Party",
		},
		{
			id: 4,
			title: "Cena de Recaudación de Caridad",
			description: "Evento de recaudación de caridad elegante que recaudó más de $100,000 para caridades locales.",
			image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500",
			date: "Marzo 2024",
			category: "Corporate",
		},
	],
	reviews: [
		{
			id: 1,
			clientName: "Isabela García",
			avatar: "https://i.pravatar.cc/150?img=5",
			rating: 5,
			date: "Hace 2 semanas",
			comment:
				"Sophia superó todas nuestras expectativas! Nuestra boda fue absolutamente perfecta. Manejó cada detalle con profesionalismo y creatividad. Altamente recomendado!",
		},
		{
			id: 2,
			clientName: "Michael Brown",
			avatar: "https://i.pravatar.cc/150?img=12",
			rating: 5,
			date: "Hace 1 mes",
			comment:
				"Trabajo excepcional en nuestro evento corporativo. Todo funcionó sin problemas y nuestros invitados quedaron profundamente impresionados. Definitivamente trabajaremos con Sophia de nuevo!",
		},
		{
			id: 3,
			clientName: "Sarah Williams",
			avatar: "https://i.pravatar.cc/150?img=9",
			rating: 4,
			date: "Hace 2 meses",
			comment:
				"Gran experiencia en general. Sophia era muy organizada y responde con rapidez. El único problema menor fue un pequeño retraso en la instalación, pero el resultado final fue hermoso.",
		},
		{
			id: 4,
			clientName: "David Martinez",
			avatar: "https://i.pravatar.cc/150?img=15",
			rating: 5,
			date: "Hace 3 meses",
			comment:
				"Atención increíble a los detalles! Sophia hizo nuestra fiesta de aniversario realmente especial. Es creativa, profesional y un placer trabajar con ella.",
		},
		{
			id: 5,
			clientName: "Jennifer Lee",
			avatar: "https://i.pravatar.cc/150?img=20",
			rating: 5,
			date: "Hace 4 meses",
			comment:
				"Mejor planificador de eventos en la ciudad! Sophia transformó nuestra visión en realidad. La decoración del lugar fue impresionante y todo funcionó perfectamente coordinado.",
		},
	],
};

export const Proveedor = () => {
	const { id } = useParams();
	const [proveedor] = useState<ProveedorDetalle>(proveedorEjemplo);
	const [activeTab, setActiveTab] = useState(0);
	const [selectedDates, setSelectedDates] = useState<Date[]>(proveedor.availability);

	const tabs: MenuItem[] = [{ label: "Perfil" }, { label: "Portafolio" }, { label: "Reseñas" }];

	const handleContact = () => {
		console.log("Contactar proveedor:", id);
		// Lógica para contactar al proveedor
	};

	return (
		<div className="p-6 max-w-7xl mx-auto">
			{/* Header Section */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
				<div className="flex items-start justify-between gap-6">
					{/* Profile Info */}
					<div className="flex items-start gap-6 flex-1">
						{/* Avatar */}
						<div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-100 dark:border-gray-700">
							{proveedor.avatar ? (
								<img
									src={proveedor.avatar}
									alt={proveedor.name}
									className="w-full h-full object-cover"
								/>
							) : (
								<div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
									<span className="text-3xl font-bold text-white">{proveedor.name.charAt(0)}</span>
								</div>
							)}
						</div>

						{/* Info */}
						<div>
							<h1 className="text-3xl font-bold dark:text-white mb-1">{proveedor.name}</h1>
							<p className="text-[var(--primary-color-light)] dark:text-blue-400 text-lg mb-2">
								{proveedor.role}
							</p>
							<div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								<span className="text-sm">{proveedor.location}</span>
							</div>
						</div>
					</div>

					{/* Contact Button */}
					<CustomButton
						text="Contactar Proveedor"
						onClick={handleContact}
						backgroundButton="var(--primary-color-light)"
						colorP="#ffffff"
					/>
					{/* Agregar Proveedor Button */}
					{/* <CustomButton
            text="Agregar Servicio"
            onClick={handleAddService}
            backgroundButton="#3B82F6"
            colorP="#ffffff"
          /> */}
				</div>
			</div>

			{/* Tabs */}
			<div className="mb-5">
				<TabMenuPrime
					items={tabs}
					activeIndex={activeTab}
					onTabChange={(e) => setActiveTab(e.index)}
				/>
			</div>

			{/* Tab Content */}
			<div className="space-y-6">
				{activeTab === 0 && (
					<>
						{/* About Section */}
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-bold dark:text-white mb-4">About</h2>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">{proveedor.about}</p>
						</div>

						{/* Contact Section */}
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-bold dark:text-white mb-4">Contact</h2>
							<div className="space-y-4">
								{/* Phone */}
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-3 flex-1">
										<svg
											className="w-5 h-5 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
											/>
										</svg>
										<div>
											<p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
											<p className="font-medium dark:text-white">{proveedor.contact.phone}</p>
										</div>
									</div>
								</div>

								{/* Email */}
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-3 flex-1">
										<svg
											className="w-5 h-5 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
										<div>
											<p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
											<p className="font-medium dark:text-white">{proveedor.contact.email}</p>
										</div>
									</div>
								</div>

								{/* Website */}
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-3 flex-1">
										<svg
											className="w-5 h-5 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
											/>
										</svg>
										<div>
											<p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
											<p className="font-medium dark:text-white">{proveedor.contact.website}</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Services Section */}
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-bold dark:text-white mb-4">Servicios</h2>
							<div className="flex flex-wrap gap-2">
								{proveedor.services.map((service) => (
									<span
										key={service}
										className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
									>
										{service}
									</span>
								))}
							</div>
						</div>

						{/* Availability Section */}
						<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
							<h2 className="text-xl font-bold dark:text-white mb-4">Disponibilidad</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<Calendar
									value={selectedDates}
									onChange={(e) => setSelectedDates(e.value as Date[])}
									inline
									selectionMode="multiple"
									className="w-full dark:bg-gray-800"
									dateFormat="dd/mm/yy"
								/>
								<Calendar
									value={selectedDates}
									onChange={(e) => setSelectedDates(e.value as Date[])}
									inline
									selectionMode="multiple"
									className="w-full dark:bg-gray-800"
									dateFormat="dd/mm/yy"
									viewDate={new Date(2024, 7, 1)} // Agosto 2024
								/>
							</div>
						</div>
					</>
				)}

				{activeTab === 1 && (
					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
						<h2 className="text-xl font-bold dark:text-white mb-6">Portafolio</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{proveedor.portfolio.map((item) => (
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
											<span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
										</div>
										<h3 className="text-lg font-bold dark:text-white mb-2">{item.title}</h3>
										<p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{activeTab === 2 && (
					<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-bold dark:text-white">Reseñas</h2>
							<div className="flex items-center gap-2">
								<div className="flex items-center">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											className="w-5 h-5 text-yellow-400 fill-current"
											viewBox="0 0 20 20"
										>
											<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
										</svg>
									))}
								</div>
								<span className="text-sm font-semibold dark:text-white">5.0</span>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									({proveedor.reviews.length} reseñas)
								</span>
							</div>
						</div>

						<div className="space-y-6">
							{proveedor.reviews.map((review) => (
								<div
									key={review.id}
									className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
								>
									<div className="flex items-start gap-4">
										{/* Avatar */}
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

										{/* Review Content */}
										<div className="flex-1">
											<div className="flex items-center justify-between mb-2">
												<h3 className="font-semibold dark:text-white">{review.clientName}</h3>
												<span className="text-xs text-gray-500 dark:text-gray-400">
													{review.date}
												</span>
											</div>

											{/* Rating Stars */}
											<div className="flex items-center mb-2">
												{[...Array(5)].map((_, i) => (
													<svg
														key={i}
														className={`w-4 h-4 ${
															i < review.rating
																? "text-yellow-400 fill-current"
																: "text-gray-300 dark:text-gray-600 fill-current"
														}`}
														viewBox="0 0 20 20"
													>
														<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
													</svg>
												))}
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
					</div>
				)}
			</div>
		</div>
	);
};
