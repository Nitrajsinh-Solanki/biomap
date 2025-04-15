// biomap\src\app\dashboard\envmonitor\page.tsx

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "../../components/DashboardNavbar";
import Footer from "../../components/Footer";
import EnvironmentMonitorHeader from "@/app/components/EnvironmentMonitorHeader";

import EnvironmentLocationSearch from "@/app/components/EnvironmentLocationSearch";
import EnvironmentDataVisualizer from "@/app/components/EnvironmentDataVisualizer";



export default function EnvironmentalMonitorPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token || !userData) {
      router.push("/login");
      return;
    }
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }
    setLoading(false);
    // Set default location (New York)
    setSelectedLocation({
      name: "New York, USA",
      latitude: 40.71,
      longitude: -74.01,
    });
  }, [router]);

  // fetch weather data when location changes
  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);
    }
  }, [selectedLocation]);

  // fetch weather data from MET Norway API
  const fetchWeatherData = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            "User-Agent": "BioMap-Environmental-Dashboard (github.com/biomap)",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: MetNorwayData = await response.json();
      // process the data into a format we can use to our website 
      const processedData: ProcessedWeatherData = {
        times: [],
        temperature: [],
        humidity: [],
        windSpeed: [],
        windDirection: [],
        cloudCover: [],
        airPressure: [],
        precipitation: [],
        weatherSymbols: [],
      };
      // only use the first 24 hours of data
      const timeseries = data.properties.timeseries.slice(0, 24);
      timeseries.forEach((entry) => {
        const date = new Date(entry.time);
        processedData.times.push(
          date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        const details = entry.data.instant.details;
        processedData.temperature.push(details.air_temperature);
        processedData.humidity.push(details.relative_humidity);
        processedData.windSpeed.push(details.wind_speed);
        processedData.windDirection.push(details.wind_from_direction || 0);
        processedData.cloudCover.push(details.cloud_area_fraction);
        processedData.airPressure.push(details.air_pressure_at_sea_level || 0);
        // get precipitation if available
        if (entry.data.next_1_hours) {
          processedData.precipitation.push(
            entry.data.next_1_hours.details.precipitation_amount
          );
          processedData.weatherSymbols.push(
            entry.data.next_1_hours.summary.symbol_code
          );
        } else {
          processedData.precipitation.push(0);
          processedData.weatherSymbols.push("");
        }
      });
      setWeatherData(processedData);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardNavbar user={user} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <EnvironmentMonitorHeader />
          
          <EnvironmentLocationSearch 
            onLocationSelect={setSelectedLocation} 
            error={error}
            selectedLocation={selectedLocation}
          />
          
          <EnvironmentDataVisualizer 
            weatherData={weatherData} 
            selectedLocation={selectedLocation}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

// types for MET Norway API response
interface MetNorwayData {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    meta: {
      updated_at: string;
    };
    timeseries: {
      time: string;
      data: {
        instant: {
          details: {
            air_temperature: number;
            relative_humidity: number;
            wind_speed: number;
            wind_from_direction?: number;
            cloud_area_fraction: number;
            air_pressure_at_sea_level?: number;
          };
        };
        next_1_hours?: {
          summary: {
            symbol_code: string;
          };
          details: {
            precipitation_amount: number;
          };
        };
      };
    }[];
  };
}

// processed data for our application
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
