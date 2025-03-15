Keaz Frontend Code Challenge Solution

Approach

For this challenge, my main focus was making the data as clearly visualized as possible, with minimalist animations partly because I am a beginner but also to make sure the animations do not take the focus away from the limited amount of data (I think the less the data volume the more creative one should be at visualizing the insights of that data but in this case, I think the data provided was of very low dimensions so I decided to focus on clarity over complicated visualizations)

Visualizing the Metrics

I chose to a react library called Recharts, to implement the visualizations. I literally just looked up which the simplest library I could use that would still offer flexibility and this was a good fit. Its quite straightforward and keeps with my minimalist approach.

For the dashboard structure, I implemented:
- Two summary cards, for total contacts and shopify reveneu. There was some trend data provided (this week and last week) so I showed the total with a percentage comparison next to it and with last week's total as a footer. If I had more data, I would implement a minimal scrollable line graph visualizing the time series in a simple accessible way. 
- A bar chart to display daily contacts data. Again because I only had access to this week's and last week's data, I thought the side by side bar graph was the simplest way of showing the trend from this week and last week. 
- A pie chart to visualize the distribution of contact sources. This was my least favorite visualization because I kept refactoring redundant information and also it was hard deciding which activeRender to use. But I think the final implementation was pretty clear and minimalist.

Responsive Design

The dashboard layout is fully responsive, using CSS Grid with different column configurations for different screen sizes:
- On medium and large screens, the summary cards are arranged in the same row with the charts stack vertically (single column) beneath.
- On mobile, the summary cards and charts are displayed as stacked vertically.. I also implement scrolling to make sure overflow is still captured inside the dashboard container.


I kept the design clean and straightforward, using a white card-based layout against a light background with border shadows and hover animation for good contrast. This approach ensures the data visualizations are the focus of the dashboard while maintaining a professional appearance. The color scheme is consistent throughout, using primary blue and gray for trends and a distinct color palette for the pie chart segments.

Conclusion

In implementing this solution, I aimed to create a dashboard that not only meets the technical requirements but also delivers a positive user experience with clear data visualization and intuitive interactions. 
