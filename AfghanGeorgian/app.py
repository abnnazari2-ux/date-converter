import os
import logging
from flask import Flask, render_template, request, jsonify
from calendar_converter import CalendarConverter

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

# Initialize calendar converter
converter = CalendarConverter()

@app.route('/')
def index():
    """Main page with the comprehensive date converter interface"""
    return render_template('index.html')

@app.route('/convert', methods=['POST'])
def convert_date():
    """API endpoint to convert dates between all calendar systems"""
    try:
        data = request.get_json()
        from_calendar = data.get('from_calendar')
        year = int(data.get('year'))
        month = int(data.get('month'))
        day = int(data.get('day'))
        
        # Convert to all calendar systems
        result = converter.convert_from_calendar(from_calendar, year, month, day)
        
        return jsonify({
            'success': True,
            'conversions': result
        })
    
    except Exception as e:
        app.logger.error(f"Conversion error: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/embed')
def embed():
    """Embeddable version for WordPress"""
    return render_template('index.html', embed=True)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
