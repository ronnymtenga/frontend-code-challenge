# Keaz Frontend Code Challenge Solution

## Approach

For this challenge, I focused on creating a clean, user-friendly, and responsive dashboard that visualizes the key metrics provided in the data. Here's how I approached the implementation:

### Visualizing the Metrics

I chose to use Recharts, a composable charting library for React, to implement the visualizations. This library offers a good balance between flexibility and ease of use, allowing for customized charts while keeping the implementation straightforward.

For the dashboard structure, I implemented:
- Four summary cards at the top to provide a quick overview of the key metrics
- A bar chart to display daily contacts data
- A pie chart to visualize the distribution of contact sources

### Responsive Design

The dashboard layout is fully responsive, using CSS Grid with different column configurations for different screen sizes:
- On mobile, cards and charts stack vertically (single column)
- On medium screens, the summary cards use a two-column layout
- On large screens, the summary cards use a four-column layout and the charts display side-by-side

This ensures the dashboard is usable and visually appealing on both desktop and mobile devices without compromising the data visualization's clarity.

### Interactive Elements & Trends

To display trends and add interactivity:
- Both summary cards and the bar chart allow toggling between "This Week" and "Last Week" data to show changes over time
- The summary cards display percentage changes, color-coded green for positive changes and red for negative ones
- The pie chart features interactive segments that expand to show detailed information when hovered over
- Smooth transitions are applied to the charts to enhance the user experience when toggling between data sets

### Design Choices

I kept the design clean and straightforward, using a white card-based layout against a light background for good contrast. This approach ensures the data visualizations are the focus of the dashboard while maintaining a professional appearance. The color scheme is consistent throughout, using primary blue for interactive elements and a distinct color palette for the pie chart segments.

In implementing this solution, I aimed to create a dashboard that not only meets the technical requirements but also delivers a positive user experience with clear data visualization and intuitive interactions. 