import { useLoaderData } from "react-router"
import { useState } from "react"
import { 
	BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
	PieChart, Pie, Cell, Sector
} from "recharts"
import { motion, AnimatePresence } from "framer-motion"

export const clientLoader = async () => {
	return {
		// The total amount of contacts per day for the last 7 days
		contacts: {
			lastWeek: [398, 412, 425, 430, 445, 460, 430],
			thisWeek: [438, 438, 450, 459, 482, 483, 492],
		},
		support: {
			email: "help@keaz.app",
		},
		shopifyRevenue: {
			lastWeek: 15874,
			thisWeek: 20023,
		},
		contactSources: [
			{
				source: "Shopify Order",
				count: 232,
			},
			{
				source: "Shopify Widget",
				count: 35,
			},
			{
				source: "Chat-In",
				count: 125,
			},
			{
				source: "Instagram Bio Link",
				count: 48,
			},
			{
				source: "Manually Created",
				count: 11,
			},
		],
	}
}

// Colors for the charts
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

// Custom Active Shape for PieChart to show detailed info on hover
const renderActiveShape = (props: any) => {
	const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
		fill, payload, percent, value } = props;
	
	// Calculate responsive font sizes based on inner radius - increased base sizes
	const radiusFactor = innerRadius / 60; // Base scaling factor
	const valueFontSize = Math.max(18, Math.min(28, 22 * radiusFactor));  // Further increased for emphasis
	const percentFontSize = Math.max(13, Math.min(18, 15 * radiusFactor)); 
	
	// Calculate line heights based on available space in the donut hole
	const availableHeight = innerRadius * 1.2; 
	const spacing = availableHeight / 4.5; // Adjusted for better spacing
	
	return (
		<g>
			{/* Value display with enhanced styling - perfectly centered */}
			<text 
				x={cx} 
				y={cy - spacing/2} 
				textAnchor="middle" 
				dominantBaseline="middle"
				fill="#333" 
				style={{ 
					fontSize: valueFontSize, 
					fontWeight: 'bold',
					letterSpacing: '-0.5px'
				}}
			>
				{value}
			</text>
			
			{/* Percentage with more subtle styling - perfectly centered */}
			<text 
				x={cx} 
				y={cy + spacing/2} 
				textAnchor="middle" 
				dominantBaseline="middle"
				fill="#666" 
				style={{ 
					fontSize: percentFontSize,
					letterSpacing: '0.3px',
					opacity: 0.85
				}}
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
			
			{/* Highlighted Sector */}
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius + 3}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
				stroke="white"
				strokeWidth={1.5}
			/>
		</g>
	);
};

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: { 
		opacity: 1,
		transition: { 
			staggerChildren: 0.1
		}
	}
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: { 
		y: 0, 
		opacity: 1,
		transition: { type: "spring", stiffness: 300, damping: 24 }
	}
};

const Dashboard = () => {
	const data = useLoaderData<typeof clientLoader>();
	const [activeIndex, setActiveIndex] = useState(-1);
	
	// Format contact data for the bar chart
	const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const contactsData = weekdays.map((day, index) => ({
		day,
		thisWeek: data.contacts.thisWeek[index],
		lastWeek: data.contacts.lastWeek[index],
	}));

	// Calculate total contacts for this week and last week
	const totalContactsThisWeek = data.contacts.thisWeek.reduce((sum, count) => sum + count, 0);
	const totalContactsLastWeek = data.contacts.lastWeek.reduce((sum, count) => sum + count, 0);
	const contactsChange = ((totalContactsThisWeek - totalContactsLastWeek) / totalContactsLastWeek * 100).toFixed(1);
	
	// Calculate revenue change percentage
	const revenueChange = ((data.shopifyRevenue.thisWeek - data.shopifyRevenue.lastWeek) / data.shopifyRevenue.lastWeek * 100).toFixed(1);
    
    // Calculate total from contact sources
    const totalContacts = data.contactSources.reduce((sum, source) => sum + source.count, 0);

	const onPieEnter = (_: any, index: number) => {
		setActiveIndex(index);
	};
	
	// Custom Legend component for Bar Chart
	const CustomBarChartLegend = (props: any) => {
		const { payload } = props;
		
		return (
			<div className="flex justify-center items-center gap-4 mt-2">
				{payload.map((entry: any, index: number) => (
					<div key={`legend-item-${index}`} className="flex items-center">
						<div 
							className="w-3 h-3 rounded-full mr-2"
							style={{ backgroundColor: entry.color }}
						></div>
						<span className="text-sm text-gray-700">{entry.value}</span>
					</div>
				))}
			</div>
		);
	};

	return (
		<motion.div 
			className="flex flex-col w-full h-full overflow-y-auto gap-4 sm:gap-6 p-3 sm:p-4 pb-16"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<header className="flex justify-between items-center mb-4">
				<motion.h1 
					className="text-xl sm:text-2xl font-bold"
					variants={itemVariants}
				>
					Dashboard
				</motion.h1>
				
				<motion.a 
					href={`mailto:${data.support.email}`}
					className="text-sm text-gray-500 hover:text-blue-500 transition-colors"
					variants={itemVariants}
				>
					<span className="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						{data.support.email}
					</span>
				</motion.a>
			</header>
			{/* Summary Cards */}
			<motion.div 
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 items-center mx-auto w-full max-w-4xl"
				variants={containerVariants}
			>
				{/* Total Contacts Card */}
				<motion.div 
					className="bg-white p-3 sm:p-4 rounded-lg shadow-md w-full h-full flex flex-col"
					variants={itemVariants}
					whileHover={{ scale: 1.02, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
				>
					<h2 className="text-gray-500 text-sm">Total Contacts</h2>
					<div className="flex items-end mt-auto mb-auto py-2">
						<span className="text-2xl font-bold">{totalContactsThisWeek}</span>
						<span className={`ml-2 text-sm ${Number(contactsChange) > 0 ? 'text-green-500' : 'text-red-500'}`}>
							{Number(contactsChange) > 0 ? `+${contactsChange}%` : `${contactsChange}%`}
						</span>
					</div>
					<p className="mt-auto text-xs text-gray-500">vs last week ({totalContactsLastWeek})</p>
				</motion.div>
				
				{/* Revenue Card */}
				<motion.div 
					className="bg-white p-3 sm:p-4 rounded-lg shadow-md w-full"
					variants={itemVariants}
					whileHover={{ scale: 1.02, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
				>
					<h2 className="text-gray-500 text-sm">Shopify Revenue</h2>
					<div className="flex items-end mt-2">
						<span className="text-2xl font-bold">${data.shopifyRevenue.thisWeek.toLocaleString()}</span>
						<span className={`ml-2 text-sm ${Number(revenueChange) > 0 ? 'text-green-500' : 'text-red-500'}`}>
							{Number(revenueChange) > 0 ? `+${revenueChange}%` : `${revenueChange}%`}
						</span>
					</div>
					<p className="mt-2 text-xs text-gray-500">vs last week (${data.shopifyRevenue.lastWeek.toLocaleString()})</p>
				</motion.div>
			</motion.div>
			
			{/* Charts Section */}
			<motion.div 
				className="grid grid-cols-1 gap-8 mt-2 sm:mt-4"
				variants={containerVariants}
			>
				{/* Contacts Bar Chart */}
				<motion.div 
					className="bg-white p-3 sm:p-4 rounded-lg shadow-md mx-auto w-full max-w-4xl"
					variants={itemVariants}
					whileHover={{ boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
				>
					<h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Daily Contacts</h2>
					<AnimatePresence mode="wait">
						<motion.div 
							key="contactsChart"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="h-48 sm:h-56 md:h-64"
						>
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={contactsData}
									margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
									barGap={0}
								>
									<CartesianGrid vertical={false} horizontal={true} />
									<XAxis dataKey="day" />
									<YAxis />
									<Tooltip />
									<Legend content={<CustomBarChartLegend />} />
									<Bar 
										dataKey="lastWeek" 
										name="Last Week" 
										fill={COLORS[1]} 
									/>
									<Bar 
										dataKey="thisWeek" 
										name="This Week" 
										fill={COLORS[0]} 
									/>
								</BarChart>
							</ResponsiveContainer>
						</motion.div>
					</AnimatePresence>
				</motion.div>
				
				{/* Contact Sources Pie Chart */}
				<motion.div 
					className="bg-white p-3 sm:p-4 rounded-lg shadow-md mx-auto w-full max-w-4xl overflow-hidden"
					variants={itemVariants}
					whileHover={{ boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
				>
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-3">
						<h2 className="text-base sm:text-lg font-semibold">Contact Sources</h2>
					</div>
					
					<div className="flex flex-col justify-center">
						{/* Chart Container with better mobile sizing */}
						<div className="relative w-full max-w-xs mx-auto">
							<div className="pb-[70%]">
								{/* Absolutely position the chart to maintain the aspect ratio */}
								<div className="absolute inset-0 flex items-center justify-center">
									<ResponsiveContainer width="100%" height="100%">
										<PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
											{activeIndex === -1 && (
												<g>
													<text
														x="50%"
														y="50%"
														textAnchor="middle"
														dominantBaseline="middle"
														fill="#333"
														style={{ 
															fontSize: '24px', 
															fontWeight: 'bold',
															letterSpacing: '-0.5px'
														}}
													>
														{totalContacts}
													</text>
													<text
														x="50%"
														y="50%"
														dy="24"
														textAnchor="middle"
														dominantBaseline="middle"
														fill="#666"
														style={{ 
															fontSize: '13px', 
															letterSpacing: '0.3px',
															opacity: 0.85
														}}
													>
														100%
													</text>
												</g>
											)}
											<Pie
												activeIndex={activeIndex}
												activeShape={renderActiveShape}
												data={data.contactSources}
												cx="50%"
												cy="50%"
												innerRadius="60%"
												outerRadius="95%"
												fill="#8884d8"
												dataKey="count"
												nameKey="source"
												onMouseEnter={onPieEnter}
												onMouseLeave={() => setActiveIndex(-1)}
												paddingAngle={2}
												animationBegin={0}
												animationDuration={400}
												animationEasing="ease"
												isAnimationActive={false}
											>
												{data.contactSources.map((entry, index) => (
													<Cell 
														key={`cell-${index}`} 
														fill={COLORS[index % COLORS.length]} 
														stroke="white"
														strokeWidth={2}
													/>
												))}
											</Pie>
										</PieChart>
									</ResponsiveContainer>
								</div>
							</div>
						</div>
						
						{/* Legend centered under chart */}
						<div className="flex flex-row flex-wrap justify-center gap-2 mt-4 w-full max-w-md mx-auto">
							{data.contactSources.map((source, index) => (
								<div 
									key={index} 
									className={`flex items-center px-2 py-1 ${
										activeIndex === index ? 'bg-gray-50 rounded' : ''
									}`}
									onMouseEnter={() => setActiveIndex(index)}
									onMouseLeave={() => setActiveIndex(-1)}
								>
									<div 
										className="w-3 h-3 rounded-full mr-2"
										style={{ backgroundColor: COLORS[index % COLORS.length] }}
									></div>
									<span 
										className="text-sm truncate" 
										title={source.source}
										style={{ 
											fontWeight: activeIndex === index ? 700 : 500 
										}}
									>
										{source.source}
									</span>
								</div>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</motion.div>
	)
}

export default Dashboard
