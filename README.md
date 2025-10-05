# 🌾 Smart Farming Assistant using NASA Data

## Overview
Smart Farming Assistant is an AI-powered tool designed to help farmers make data-driven decisions. By leveraging NASA’s Earth observation and remote sensing datasets, it provides actionable insights on crop health, weather forecasts, soil moisture, and pest risks. This helps farmers reduce crop losses, optimize resources, and improve productivity.

---

## Problems Addressed
Farmers often face uncertainty in key agricultural decisions, such as:  
- Determining the best sowing and harvesting times  
- Predicting rainfall or drought conditions  
- Monitoring crop growth and flowering stages  
- Receiving early warnings for pest and disease risks  

These uncertainties can lead to crop loss, lower productivity, and financial risk.

---

## NASA Data Used
- **Landsat / MODIS (NDVI, EVI indices):** Detect plant health and growth stages  
- **GPM (Global Precipitation Measurement):** Accurate rainfall data and prediction  
- **SMAP (Soil Moisture Active Passive):** Soil moisture measurement for irrigation planning  
- **AIRS / MODIS LST (Temperature datasets):** Track crop stress due to heat or cold  

---

## Features
1. **Crop Bloom & Harvest Calendar**  
   - Analyze NDVI patterns to detect crop growth stages (sowing → blooming → harvest)  
   - Predict expected harvest times  
   - Visual farming calendar  

2. **Weather & Rainfall Alerts**  
   - 7-day weather forecast using NASA GPM and temperature data  
   - Alerts for extreme events like floods, heavy rainfall, or drought  

3. **Interactive Farm Health Map**  
   - Farmer selects their farm location on a map  
   - Displays crop health visually (green = healthy, yellow = stressed)  

4. **Pest & Disease Risk Alerts**  
   - Identify vulnerable crop stages  
   - Preventive alerts like “High pest risk in the next 5 days”  

5. **Reports & Insights**  
   - Weekly PDF reports with soil moisture, rainfall, crop health, and pest risks  
   - Historical data stored for long-term analysis  

---

## Tech Stack
- **Frontend:** React.js / HTML + CSS + JavaScript  
- **Backend:** Flask / Django  
- **Visualization:** Leaflet.js / Mapbox (Maps), Plotly.js / D3.js (Graphs)  
- **Data Access:** Google Earth Engine, NASA APIs (MODIS, GPM, SMAP, AIRS)  
- **Optional AI/ML:** Predict bloom & harvest time from NDVI and rainfall data  

---

## Impact for Farmers
- Identify best sowing and harvesting times  
- Reduce crop loss due to unexpected weather  
- Early warnings for pests and diseases  
- Improve long-term productivity with data-driven insights  
- Optimize resources like water, fertilizers, and pesticides  

---

## How to Run
1. Clone the repository:
   git clone https://github.com/yourusername/Smart_Farming.git

2. Install dependencies:
   pip install -r requirements.txt
  
3. Set up Google Earth Engine and NASA API credentials

4.Run the backend server:
  python app.py

5. Open the frontend dashboard in your browser

