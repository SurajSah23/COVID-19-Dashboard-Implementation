# COVID-19 Dashboard

A real-time COVID-19 statistics dashboard built with React, Javascript, and Tailwind CSS. This application provides interactive visualizations of COVID-19 data across different countries, including total cases, deaths, and recoveries.

![Dashboard Preview](https://images.pexels.com/photos/3970330/pexels-photo-3970330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)

## Features

- 🌍 Country-wise COVID-19 statistics with search functionality
- 📊 Interactive charts showing historical data:
  - Line chart for tracking cases, deaths, and recoveries over time
  - Pie chart comparing total population with COVID-19 statistics
- 📅 Date range selection for historical data analysis
- 📱 Responsive design optimized for all devices
- 🔄 Real-time data updates
- 📈 Statistical cards with key metrics and growth indicators

## Tech Stack

- React 18
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API requests
- React DatePicker for date selection
- Date-fns for date formatting

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/covid-dashboard.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

The dashboard integrates with two main APIs:

1. COVID-19 Historical Data:
   - Endpoint: `https://disease.sh/v3/covid-19/historical/{country}?lastdays=1500`
   - Provides historical data for cases, deaths, and recoveries

2. Countries List:
   - Endpoint: `https://restcountries.com/v3.1/all`
   - Provides the list of countries for the dropdown selection

## Project Structure

```
src/
├── components/
│   ├── LineChart.jsx    # Historical data visualization
│   ├── PieChart.jsx     # Population comparison chart
│   └── StatCard.jsx     # Statistics display component
├── App.jsx              # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Features in Detail

### Statistical Cards
- Total Cases with growth rate
- Total Recoveries with growth rate
- Total Deaths with growth rate
- All values displayed in millions for better readability

### Interactive Charts
- Line Chart:
  - Historical trend visualization
  - Multiple data series (cases, deaths, recoveries)
  - Interactive tooltips
  - Automatic scaling in millions
  
- Pie Chart:
  - Population distribution visualization
  - Comparison between total population and COVID-19 metrics
  - Interactive tooltips
  - Custom color scheme

### Search and Filtering
- Country search functionality
- Date range selection
- Real-time data filtering

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

