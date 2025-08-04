# Overview

This is a comprehensive multi-calendar date converter web application built with Flask. The application allows users to convert dates between six different calendar systems: Afghan/Persian, Gregorian, Islamic, Hebrew, Julian, and Kurdish calendars. The project implements complex calendar conversion algorithms using Julian Day numbers as an intermediate format and presents all functionality through a user-friendly Bootstrap dark-themed interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend uses a traditional server-side rendered approach with Flask templates. The UI is built with Bootstrap's dark theme for responsive design and enhanced user experience. Static assets are organized into separate CSS and JavaScript files for maintainability.

**Key Design Decisions:**
- **Template Engine**: Jinja2 templates for server-side rendering
- **Styling Framework**: Bootstrap with Replit dark theme for consistent, responsive design
- **Icon System**: Feather Icons with contextual icons for each calendar system
- **Client-side Architecture**: Modern JavaScript class-based architecture for real-time conversion
- **Multi-Section Layout**: Organized calendar systems in logical groupings for better usability

## Backend Architecture
The backend follows a comprehensive Flask application structure with advanced calendar conversion capabilities:

**Core Components:**
- **Flask Application** (`app.py`): Handles HTTP routing, JSON API endpoints, and template rendering
- **Multi-Calendar Converter** (`calendar_converter.py`): Implements complex algorithms for six calendar systems
- **Entry Point** (`main.py`): Simple application launcher

**Key Design Patterns:**
- **Modular Design**: Calendar logic separated into comprehensive CalendarConverter class
- **API-First Approach**: JSON endpoints for real-time calendar conversion
- **Cross-Calendar Compatibility**: Unified interface for all calendar systems
- **Embeddable Architecture**: Support for WordPress and external integrations

## Multi-Calendar Conversion Logic
The application implements sophisticated conversion algorithms supporting six calendar systems:

**Supported Calendars:**
- **Afghan/Persian Solar Calendar**: 12 months, 365/366 days, 33-year leap cycle
- **Gregorian Calendar**: Standard international calendar
- **Islamic Hijri Calendar**: Lunar calendar, 11 leap years in 30-year cycle
- **Hebrew Calendar**: Lunisolar calendar with complex leap year rules
- **Julian Calendar**: Historical predecessor to Gregorian calendar
- **Kurdish Calendar**: Regional variant using Persian calendar structure

**Algorithm Approach:**
- **Julian Day Conversion**: Uses Julian day numbers as universal intermediate format
- **Precise Algorithms**: Implements accurate leap year calculations for each system
- **Epoch References**: Proper epoch handling for each calendar system
- **Weekday Calculation**: Multilingual weekday support (English/Persian)

**Advanced Features:**
- **Real-time Conversion**: Instant updates when any date is modified
- **Bidirectional Support**: Convert from any calendar to all others
- **Julian Day Information**: Display of Julian Day and Modified Julian Day numbers
- **Leap Year Detection**: Accurate leap year calculation for all systems
- **Month Name Localization**: Native month names for each calendar system

# External Dependencies

## Frontend Dependencies
- **Bootstrap CSS**: CDN-hosted styling framework with dark theme variant
- **Feather Icons**: CDN-hosted icon library for UI elements

## Backend Dependencies
- **Flask**: Core web framework for HTTP handling and templating
- **Python Standard Library**: Uses `datetime`, `math`, and `calendar` modules for date calculations
- **Advanced Algorithms**: Custom implementations of historical and regional calendar systems

## Infrastructure
- **Environment Variables**: Session secret key configuration
- **Static File Serving**: Flask's built-in static file serving for CSS/JS assets
- **Template Rendering**: Jinja2 template engine (included with Flask)

The application is designed to be self-contained with minimal external dependencies, making it easy to deploy and maintain.