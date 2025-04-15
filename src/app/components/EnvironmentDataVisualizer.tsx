// biomap\src\app\components\EnvironmentDataVisualizer.tsx


"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// register chart js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProcessedWeatherData {
  times: string[];
  temperature: number[];
  humidity: number[];
  windSpeed: number[];
  windDirection: number[];
  cloudCover: number[];
  airPressure: number[];
  precipitation: number[];
  weatherSymbols: string[];
}

interface LocationData {
  name: string;
  latitude: number;
  longitude: number;
}

interface EnvironmentDataVisualizerProps {
  weatherData: ProcessedWeatherData | null;
  selectedLocation: LocationData | null;
}

export default function EnvironmentDataVisualizer({
  weatherData,
  selectedLocation,
}: EnvironmentDataVisualizerProps) {
  const [dataType, setDataType] = useState<
    "temperature" | "humidity" | "wind" | "cloud" | "pressure" | "precipitation"
  >("temperature");

  // format chart data based on selected data type
  const getChartData = () => {
    if (!weatherData) return null;
    let label = "";
    let data: number[] = [];
    let unit = "";
    let borderColor = "";
    switch (dataType) {
      case "temperature":
        label = "Temperature";
        data = weatherData.temperature;
        unit = "°C";
        borderColor = "rgb(255, 99, 132)";
        break;
      case "humidity":
        label = "Humidity";
        data = weatherData.humidity;
        unit = "%";
        borderColor = "rgb(54, 162, 235)";
        break;
      case "wind":
        label = "Wind Speed";
        data = weatherData.windSpeed;
        unit = "m/s";
        borderColor = "rgb(75, 192, 192)";
        break;
      case "cloud":
        label = "Cloud Cover";
        data = weatherData.cloudCover;
        unit = "%";
        borderColor = "rgb(153, 102, 255)";
        break;
      case "pressure":
        label = "Air Pressure";
        data = weatherData.airPressure;
        unit = "hPa";
        borderColor = "rgb(255, 159, 64)";
        break;
      case "precipitation":
        label = "Precipitation";
        data = weatherData.precipitation;
        unit = "mm";
        borderColor = "rgb(0, 128, 128)";
        break;
    }
    return {
      labels: weatherData.times,
      datasets: [
        {
          label: `${label} (${unit})`,
          data,
          borderColor,
          backgroundColor: `${borderColor
            .replace("rgb", "rgba")
            .replace(")", ", 0.5)")}`,
        },
      ],
    };
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: selectedLocation
          ? `Weather Data for ${selectedLocation.name}`
          : "Weather Data",
      },
    },
    scales: {
      y: {
        beginAtZero:
          dataType === "cloud" ||
          dataType === "humidity" ||
          dataType === "precipitation",
      },
    },
  };

  const chartData = getChartData();

  return (
    <div>
      {/* data type selecter is implemented here  */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          Select Data to View:
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setDataType("temperature")}
            className={`px-4 py-2 rounded-md ${
              dataType === "temperature"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Temperature
          </button>
          <button
            onClick={() => setDataType("humidity")}
            className={`px-4 py-2 rounded-md ${
              dataType === "humidity"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Humidity
          </button>
          <button
            onClick={() => setDataType("wind")}
            className={`px-4 py-2 rounded-md ${
              dataType === "wind"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Wind Speed
          </button>
          <button
            onClick={() => setDataType("cloud")}
            className={`px-4 py-2 rounded-md ${
              dataType === "cloud"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Cloud Cover
          </button>
          <button
            onClick={() => setDataType("pressure")}
            className={`px-4 py-2 rounded-md ${
              dataType === "pressure"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Air Pressure
          </button>
          <button
            onClick={() => setDataType("precipitation")}
            className={`px-4 py-2 rounded-md ${
              dataType === "precipitation"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Precipitation
          </button>
        </div>
      </div>

      {/* chart is becoming here  */}
      {chartData ? (
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-8">
          <Line options={chartOptions} data={chartData} />
        </div>
      ) : (
        <div className="bg-gray-50 p-6 text-center rounded-lg border border-gray-200 mb-8">
          <p className="text-gray-500">
            No data available for the selected location or data type.
          </p>
        </div>
      )}

      {/* summary of weather data is here  */}
      {weatherData && (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Current Weather Conditions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                <h3 className="text-lg font-medium text-red-800 mb-2">
                  Temperature
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-red-700">
                    {weatherData.temperature[0]}
                  </span>
                  <span className="ml-1 text-red-600">°C</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Range today:{" "}
                  {Math.min(...weatherData.temperature.slice(0, 24))} -{" "}
                  {Math.max(...weatherData.temperature.slice(0, 24))} °C
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="text-lg font-medium text-blue-800 mb-2">
                  Humidity
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-blue-700">
                    {weatherData.humidity[0]}
                  </span>
                  <span className="ml-1 text-blue-600">%</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {weatherData.humidity[0] < 30
                    ? "Low humidity - dry conditions"
                    : weatherData.humidity[0] > 70
                    ? "High humidity - humid conditions"
                    : "Moderate humidity - comfortable conditions"}
                </p>
              </div>
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                <h3 className="text-lg font-medium text-teal-800 mb-2">
                  Wind Speed
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-teal-700">
                    {weatherData.windSpeed[0]}
                  </span>
                  <span className="ml-1 text-teal-600">m/s</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {weatherData.windSpeed[0] < 1.5
                    ? "Light breeze"
                    : weatherData.windSpeed[0] < 5.5
                    ? "Moderate wind"
                    : weatherData.windSpeed[0] < 10.7
                    ? "Strong wind"
                    : "Very strong wind"}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <h3 className="text-lg font-medium text-purple-800 mb-2">
                  Cloud Cover
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-purple-700">
                    {weatherData.cloudCover[0]}
                  </span>
                  <span className="ml-1 text-purple-600">%</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {weatherData.cloudCover[0] < 20
                    ? "Clear sky"
                    : weatherData.cloudCover[0] < 50
                    ? "Partly cloudy"
                    : weatherData.cloudCover[0] < 80
                    ? "Mostly cloudy"
                    : "Overcast"}
                </p>
              </div>
              {weatherData.airPressure[0] > 0 && (
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <h3 className="text-lg font-medium text-amber-800 mb-2">
                    Air Pressure
                  </h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-amber-700">
                      {weatherData.airPressure[0]}
                    </span>
                    <span className="ml-1 text-amber-600">hPa</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {weatherData.airPressure[0] < 1000
                      ? "Low pressure - may indicate unsettled weather"
                      : weatherData.airPressure[0] > 1020
                      ? "High pressure - typically indicates fair weather"
                      : "Normal atmospheric pressure"}
                  </p>
                </div>
              )}
              <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-100">
                <h3 className="text-lg font-medium text-cyan-800 mb-2">
                  Precipitation (next hour)
                </h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-cyan-700">
                    {weatherData.precipitation[0]}
                  </span>
                  <span className="ml-1 text-cyan-600">mm</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {weatherData.precipitation[0] === 0
                    ? "No precipitation expected"
                    : weatherData.precipitation[0] < 0.5
                    ? "Light precipitation possible"
                    : weatherData.precipitation[0] < 4
                    ? "Moderate precipitation expected"
                    : "Heavy precipitation expected"}
                </p>
              </div>
              {weatherData.weatherSymbols[0] && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Current Weather
                  </h3>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-700 mb-2">
                        {weatherData.weatherSymbols[0]
                          .replace(/_/g, " ")
                          .replace(/^\w/, (c) => c.toUpperCase())}
                      </div>
                      <p className="text-sm text-gray-600">
                        {weatherData.weatherSymbols[0].includes("rain") ||
                        weatherData.weatherSymbols[0].includes("sleet") ||
                        weatherData.weatherSymbols[0].includes("snow")
                          ? "Precipitation expected"
                          : weatherData.weatherSymbols[0].includes("cloud")
                          ? "Cloudy conditions"
                          : weatherData.weatherSymbols[0].includes("fog")
                          ? "Foggy conditions"
                          : weatherData.weatherSymbols[0].includes("clear")
                          ? "Clear conditions"
                          : "Check forecast for details"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}