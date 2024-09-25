import os
import pandas as pd
from flask import Flask, request, jsonify
from datetime import datetime
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

result_cache = {}  # To store the result temporarily

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    
    file = request.files['file']
    
    if file.filename == '':
        return 'No selected file'
    
    if file:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)
        
        # Process the CSV file
        data = pd.read_csv(file_path)
        
        # Ensure the data has the correct columns
        if 'date' not in data.columns or 'AmountOfSales' not in data.columns or 'feed_cost' not in data.columns:
            return 'Invalid CSV file format'
        
        # Parse dates with mixed formats
        data['date'] = pd.to_datetime(data['date'], errors='coerce')
        
        if data['date'].isnull().any():
            return 'Invalid date format in CSV file'
        
        # Filter data for the current month
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_month_data = data[(data['date'].dt.month == current_month) & (data['date'].dt.year == current_year)]
        
        # Calculate current revenue and profit
        current_revenue = current_month_data['AmountOfSales'].sum().item()
        current_profit = (current_month_data['AmountOfSales'] - current_month_data['feed_cost']).sum().item()
        
        # Prepare data for prediction
        current_month_data['day'] = current_month_data['date'].dt.day
        X = current_month_data[['day']]
        y_revenue = current_month_data['AmountOfSales']
        y_profit = current_month_data['AmountOfSales'] - current_month_data['feed_cost']
        
        # Standardize the features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Train the models
        revenue_model = LinearRegression()
        revenue_model.fit(X_scaled, y_revenue)
        
        profit_model = LinearRegression()
        profit_model.fit(X_scaled, y_profit)
        
        # Predict for the rest of the month
        days_in_month = pd.date_range(start=datetime(current_year, current_month, 1), end=datetime(current_year, current_month, 1) + pd.offsets.MonthEnd(0)).day[-1]
        future_days = np.arange(X['day'].max() + 1, days_in_month + 1).reshape(-1, 1)
        future_days_scaled = scaler.transform(future_days)
        
        predicted_revenue = revenue_model.predict(future_days_scaled).sum().item()
        predicted_profit = profit_model.predict(future_days_scaled).sum().item()
        
        total_revenue = current_revenue + predicted_revenue
        total_profit = current_profit + predicted_profit
        
        result_cache['result'] = {
            'current_revenue': current_revenue,
            'current_profit': current_profit,
            'predicted_revenue': predicted_revenue,
            'predicted_profit': predicted_profit,
            'total_revenue': total_revenue,
            'total_profit': total_profit
        }
        
        return 'File processed successfully'

@app.route('/result', methods=['GET'])
def get_result():
    return jsonify(result_cache.get('result', 'No result available'))

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)