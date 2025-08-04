/**
 * Multi-Calendar Date Converter - Frontend JavaScript
 */

class DateConverter {
    constructor() {
        this.isUpdating = false;
        this.initializeEventListeners();
        // Convert initial date on page load
        this.convertDate('gregorian');
    }

    initializeEventListeners() {
        // Add event listeners to all date inputs
        const calendars = ['gregorian', 'afghan', 'julian', 'hebrew', 'islamic', 'kurdish'];
        
        calendars.forEach(calendar => {
            const yearInput = document.getElementById(`${calendar}-year`);
            const monthSelect = document.getElementById(`${calendar}-month`);
            const daySelect = document.getElementById(`${calendar}-day`);
            
            if (yearInput) {
                yearInput.addEventListener('input', () => this.handleDateChange(calendar));
                yearInput.addEventListener('blur', () => this.validateDateInput(yearInput));
            }
            
            if (monthSelect) {
                monthSelect.addEventListener('change', () => this.handleDateChange(calendar));
            }
            
            if (daySelect) {
                daySelect.addEventListener('change', () => this.handleDateChange(calendar));
            }
        });
    }

    handleDateChange(fromCalendar) {
        if (this.isUpdating) return;
        
        // Add small delay to avoid rapid API calls
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            this.convertDate(fromCalendar);
        }, 300);
    }

    validateDateInput(input) {
        const value = parseInt(input.value);
        const min = parseInt(input.min) || 1;
        const max = parseInt(input.max) || 9999;
        
        if (isNaN(value) || value < min || value > max) {
            input.classList.add('is-invalid');
            setTimeout(() => input.classList.remove('is-invalid'), 2000);
        }
    }

    async convertDate(fromCalendar) {
        try {
            // Get input values
            const year = parseInt(document.getElementById(`${fromCalendar}-year`).value);
            const month = parseInt(document.getElementById(`${fromCalendar}-month`).value);
            const day = parseInt(document.getElementById(`${fromCalendar}-day`).value);
            
            // Validate inputs
            if (isNaN(year) || isNaN(month) || isNaN(day)) {
                console.log('Invalid input values');
                return;
            }
            
            // Show loading state
            this.setLoadingState(true);
            
            // Make API call
            const response = await fetch('/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from_calendar: fromCalendar,
                    year: year,
                    month: month,
                    day: day
                })
            });
            
            const data = await response.json();
            console.log('Conversion response:', data); // Debug log
            
            if (data.success) {
                this.updateAllCalendars(data.conversions, fromCalendar);
            } else {
                console.error('Conversion failed:', data.error);
                this.showError('Date conversion failed. Please check your input.');
            }
            
        } catch (error) {
            console.error('Error converting date:', error);
            this.showError('Network error. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    updateAllCalendars(conversions, excludeCalendar) {
        this.isUpdating = true;
        
        console.log('Updating calendars with conversions:', conversions); // Debug log
        
        try {
            // Update all calendars including the source calendar
            // We need to update weekdays even for the source calendar
            Object.keys(conversions).forEach(calendar => {
                if (calendar !== 'julian_day' && calendar !== 'modified_julian_day' && conversions[calendar]) {
                    if (excludeCalendar === calendar) {
                        // For the source calendar, only update the weekday (not the date fields)
                        this.updateWeekdayOnly(calendar, conversions[calendar]);
                    } else {
                        // For other calendars, update everything
                        console.log(`Updating ${calendar}:`, conversions[calendar]); // Debug log
                        this.updateCalendarDisplay(calendar, conversions[calendar]);
                    }
                }
            });
            
            // Update Julian Day numbers
            this.updateJulianDays(conversions.julian_day, conversions.modified_julian_day);
            
        } finally {
            this.isUpdating = false;
        }
    }

    updateCalendarDisplay(calendar, data) {
        console.log(`Updating ${calendar} calendar with data:`, data);
        
        // Update year, month, day
        const yearInput = document.getElementById(`${calendar}-year`);
        const monthSelect = document.getElementById(`${calendar}-month`);
        const daySelect = document.getElementById(`${calendar}-day`);
        const weekdayElement = document.getElementById(`${calendar}-weekday`);
        
        console.log(`Elements found for ${calendar}:`, {
            year: !!yearInput,
            month: !!monthSelect,
            day: !!daySelect,
            weekday: !!weekdayElement,
            weekdayTag: weekdayElement ? weekdayElement.tagName : 'not found'
        });
        
        if (yearInput) yearInput.value = data.year;
        if (monthSelect) monthSelect.value = data.month;
        if (daySelect) daySelect.value = data.day;
        if (weekdayElement) {
            // Handle both input elements and div elements
            if (weekdayElement.tagName === 'INPUT') {
                console.log(`Setting input value for ${calendar}-weekday:`, data.weekday);
                weekdayElement.value = data.weekday;
            } else {
                console.log(`Setting text content for ${calendar}-weekday:`, data.weekday);
                weekdayElement.textContent = data.weekday;
            }
        } else {
            console.log(`Weekday element not found for ${calendar}`);
        }
    }

    updateWeekdayOnly(calendar, data) {
        console.log(`Updating weekday only for ${calendar}:`, data.weekday);
        
        const weekdayElement = document.getElementById(`${calendar}-weekday`);
        if (weekdayElement) {
            if (weekdayElement.tagName === 'INPUT') {
                weekdayElement.value = data.weekday;
            } else {
                weekdayElement.textContent = data.weekday;
            }
        }
    }

    updateJulianDays(julianDay, modifiedJulianDay) {
        const jdElement = document.getElementById('julian-day-number');
        const mjdElement = document.getElementById('modified-julian-day');
        
        if (jdElement) {
            const value = Math.round(julianDay);
            if (jdElement.tagName === 'INPUT') {
                jdElement.value = value;
            } else {
                jdElement.textContent = value;
            }
        }
        if (mjdElement) {
            const value = Math.round(modifiedJulianDay);
            if (mjdElement.tagName === 'INPUT') {
                mjdElement.value = value;
            } else {
                mjdElement.textContent = value;
            }
        }
    }

    setLoadingState(loading) {
        const container = document.querySelector('.container');
        if (loading) {
            container.classList.add('loading');
        } else {
            container.classList.remove('loading');
        }
    }

    showError(message) {
        // Create or update error message
        let errorDiv = document.getElementById('error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'error-message';
            errorDiv.className = 'alert alert-danger alert-dismissible fade show';
            errorDiv.innerHTML = `
                <i data-feather="alert-circle" class="me-2"></i>
                <strong>Error:</strong> <span id="error-text"></span>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            document.querySelector('.container').insertBefore(errorDiv, document.querySelector('.container').firstChild);
        }
        
        document.getElementById('error-text').textContent = message;
        errorDiv.style.display = 'block';
        
        // Initialize feather icons for the new alert
        feather.replace();
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        }, 5000);
    }
}

// Initialize the date converter when the page loads
document.addEventListener('DOMContentLoaded', function() {
    new DateConverter();
});

// Utility functions for WordPress embedding
window.AfghanDateConverter = {
    init: function() {
        new DateConverter();
    },
    
    // Method to get current date in all calendars
    getCurrentDates: function() {
        const calendars = ['gregorian', 'afghan', 'julian', 'hebrew', 'islamic', 'kurdish'];
        const dates = {};
        
        calendars.forEach(calendar => {
            const year = document.getElementById(`${calendar}-year`)?.value;
            const month = document.getElementById(`${calendar}-month`)?.value;
            const day = document.getElementById(`${calendar}-day`)?.value;
            
            if (year && month && day) {
                dates[calendar] = {
                    year: parseInt(year),
                    month: parseInt(month),
                    day: parseInt(day)
                };
            }
        });
        
        return dates;
    },
    
    // Method to set a specific date
    setDate: function(calendar, year, month, day) {
        const yearInput = document.getElementById(`${calendar}-year`);
        const monthSelect = document.getElementById(`${calendar}-month`);
        const daySelect = document.getElementById(`${calendar}-day`);
        
        if (yearInput) yearInput.value = year;
        if (monthSelect) monthSelect.value = month;
        if (daySelect) daySelect.value = day;
        
        // Trigger conversion
        if (window.dateConverter) {
            window.dateConverter.convertDate(calendar);
        }
    }
};

// Make converter globally accessible for embedding
window.dateConverter = null;

document.addEventListener('DOMContentLoaded', function() {
    window.dateConverter = new DateConverter();
});
