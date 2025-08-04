import math
from datetime import datetime, date
import calendar

class CalendarConverter:
    """Comprehensive calendar conversion utility supporting multiple calendar systems"""
    
    def __init__(self):
        # Afghan/Persian month names
        self.afghan_months = [
            "Hamal", "Sawr", "Jawza", "Saratan", "Asad", "Sonbola",
            "Mizan", "Aqrab", "Qaws", "Jadi", "Dalv", "Hoot"
        ]
        
        # Islamic month names
        self.islamic_months = [
            "Muharram", "Safar", "Rabi al-awwal", "Rabi al-thani", "Jumada al-awwal", "Jumada al-thani",
            "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
        ]
        
        # Hebrew month names
        self.hebrew_months = [
            "Tishrei", "Heshvan", "Kislev", "Tevet", "Shevat", "Adar",
            "Nisan", "Iyar", "Sivan", "Tammuz", "Av", "Elul"
        ]
        
        # Kurdish month names (similar to Persian/Afghan)
        self.kurdish_months = [
            "Xakelêwe", "Gullan", "Jorî", "Pûşper", "Gelawêj", "Xermanan",
            "Rezber", "Gelarêzan", "Sermawez", "Befranbar", "Rêbendan", "Reşemî"
        ]
        
        # Weekday names in different languages
        self.weekdays = {
            'english': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'persian': ['Doshanbeh', 'Seshhanbeh', 'Chaharshanbeh', 'Panjshanbeh', 'Jomeh', 'Shanbeh', 'Yekshanbeh']
        }

    def is_leap_year_gregorian(self, year):
        """Check if a Gregorian year is leap"""
        return calendar.isleap(year)

    def is_leap_year_persian(self, year):
        """Check if a Persian/Afghan year is leap using 33-year cycle"""
        breaks = [
            -14, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210,
            1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
        ]
        
        jp = 0
        jump = 0
        for i in range(len(breaks)):
            jm = breaks[i]
            jump = jm - jp
            if year < jm:
                break
            jp = jm
        
        n = year - jp
        
        if jump - n < 6:
            n = n - jump + ((jump + 4) // 6) * 6
        
        leap = ((n + 1) % 33) % 4
        if jump == 33 and leap == 1:
            leap = 0
        
        return leap == 1

    def is_leap_year_islamic(self, year):
        """Check if an Islamic year is leap (11 leap years in 30-year cycle)"""
        return (11 * year + 14) % 30 < 11

    def gregorian_to_julian_day(self, year, month, day):
        """Convert Gregorian date to Julian Day Number"""
        if month <= 2:
            year -= 1
            month += 12
        
        a = year // 100
        b = 2 - a + (a // 4)
        
        jd = int(365.25 * (year + 4716)) + int(30.6001 * (month + 1)) + day + b - 1524
        return jd

    def julian_day_to_gregorian(self, jd):
        """Convert Julian Day Number to Gregorian date"""
        jd = jd + 0.5
        z = int(jd)
        f = jd - z
        
        if z < 2299161:
            a = z
        else:
            alpha = int((z - 1867216.25) / 36524.25)
            a = z + 1 + alpha - (alpha // 4)
        
        b = a + 1524
        c = int((b - 122.1) / 365.25)
        d = int(365.25 * c)
        e = int((b - d) / 30.6001)
        
        day = b - d - int(30.6001 * e) + f
        month = e - 1 if e < 14 else e - 13
        year = c - 4716 if month > 2 else c - 4715
        
        return int(year), int(month), int(day)

    def persian_to_julian_day(self, year, month, day):
        """Convert Persian/Afghan date to Julian Day Number"""
        # Persian calendar epoch: March 22, 622 CE (Gregorian)
        epoch = 1948321  # Julian day of Persian epoch
        
        if month <= 6:
            days_in_months = (month - 1) * 31
        else:
            days_in_months = 186 + (month - 7) * 30
        
        leap_cycles = (year - 1) // 33
        remaining_years = (year - 1) % 33
        
        # Calculate leap years in remaining cycle
        leap_years = 0
        for i in range(1, remaining_years + 1):
            if self.is_leap_year_persian(i):
                leap_years += 1
        
        total_days = (leap_cycles * (33 * 365 + 8)) + (remaining_years * 365) + leap_years + days_in_months + day - 1
        
        return epoch + total_days

    def julian_day_to_persian(self, jd):
        """Convert Julian Day Number to Persian/Afghan date"""
        epoch = 1948321
        days_since_epoch = jd - epoch
        
        # Estimate year
        year = 1 + int(days_since_epoch / 365.25)
        
        # Adjust year by checking actual days
        while True:
            year_start = self.persian_to_julian_day(year, 1, 1)
            if year_start <= jd:
                next_year_start = self.persian_to_julian_day(year + 1, 1, 1)
                if next_year_start > jd:
                    break
                year += 1
            else:
                year -= 1
        
        days_in_year = jd - year_start + 1
        
        # Find month and day
        if days_in_year <= 186:
            month = int((days_in_year - 1) / 31) + 1
            day = days_in_year - (month - 1) * 31
        else:
            month = int((days_in_year - 187) / 30) + 7
            day = days_in_year - 186 - (month - 7) * 30
        
        return year, month, int(day)

    def islamic_to_julian_day(self, year, month, day):
        """Convert Islamic date to Julian Day Number"""
        # Islamic calendar epoch: July 16, 622 CE (Gregorian)
        epoch = 1948439
        
        # Calculate total days
        total_days = (year - 1) * 354 + int((11 * year + 3) / 30)
        
        # Add days for months
        for i in range(1, month):
            if i % 2 == 1 or (i == 12 and self.is_leap_year_islamic(year)):
                total_days += 30
            else:
                total_days += 29
        
        total_days += day - 1
        
        return epoch + total_days

    def julian_day_to_islamic(self, jd):
        """Convert Julian Day Number to Islamic date"""
        epoch = 1948439
        days_since_epoch = jd - epoch
        
        # Estimate year
        year = 1 + int(days_since_epoch / 354.37)
        
        # Adjust year
        while True:
            year_start = self.islamic_to_julian_day(year, 1, 1)
            if year_start <= jd:
                next_year_start = self.islamic_to_julian_day(year + 1, 1, 1)
                if next_year_start > jd:
                    break
                year += 1
            else:
                year -= 1
        
        days_in_year = jd - year_start + 1
        
        # Find month and day
        month = 1
        while month <= 12:
            if month % 2 == 1 or (month == 12 and self.is_leap_year_islamic(year)):
                month_days = 30
            else:
                month_days = 29
            
            if days_in_year <= month_days:
                break
            
            days_in_year -= month_days
            month += 1
        
        return year, month, int(days_in_year)

    def hebrew_to_julian_day(self, year, month, day):
        """Convert Hebrew date to Julian Day Number (simplified)"""
        # Hebrew calendar is complex, using approximation
        # Hebrew epoch: September 7, 3761 BCE
        epoch = 347998
        
        # Approximate conversion (Hebrew calendar is lunisolar)
        avg_year_length = 365.25
        total_days = (year - 1) * avg_year_length + (month - 1) * 29.5 + day - 1
        
        return int(epoch + total_days)

    def julian_day_to_hebrew(self, jd):
        """Convert Julian Day Number to Hebrew date (simplified)"""
        epoch = 347998
        days_since_epoch = jd - epoch
        
        # Approximate conversion
        year = 1 + int(days_since_epoch / 365.25)
        remaining_days = days_since_epoch - (year - 1) * 365.25
        month = 1 + int(remaining_days / 29.5)
        day = int(remaining_days - (month - 1) * 29.5) + 1
        
        if month > 12:
            month = 12
        if day > 30:
            day = 30
        
        return int(year), int(month), int(day)

    def julian_day_to_julian_calendar(self, jd):
        """Convert Julian Day Number to Julian calendar date"""
        jd = jd + 0.5
        z = int(jd)
        
        b = z + 1524
        c = int((b - 122.1) / 365.25)
        d = int(365.25 * c)
        e = int((b - d) / 30.6001)
        
        day = b - d - int(30.6001 * e)
        month = e - 1 if e < 14 else e - 13
        year = c - 4716 if month > 2 else c - 4715
        
        return int(year), int(month), int(day)

    def julian_calendar_to_julian_day(self, year, month, day):
        """Convert Julian calendar date to Julian Day Number"""
        if month <= 2:
            year -= 1
            month += 12
        
        jd = int(365.25 * (year + 4716)) + int(30.6001 * (month + 1)) + day - 1524
        return jd

    def get_weekday(self, jd):
        """Get weekday from Julian Day Number"""
        # Julian Day 0 was a Monday
        weekday_index = int(jd) % 7
        return self.weekdays['english'][weekday_index]

    def get_persian_weekday(self, jd):
        """Get Persian weekday from Julian Day Number"""
        weekday_index = int(jd) % 7
        return self.weekdays['persian'][weekday_index]

    def convert_from_calendar(self, from_calendar, year, month, day):
        """Convert from any calendar to all other calendars"""
        try:
            # Convert to Julian Day first
            if from_calendar == 'gregorian':
                jd = self.gregorian_to_julian_day(year, month, day)
            elif from_calendar == 'afghan' or from_calendar == 'persian':
                jd = self.persian_to_julian_day(year, month, day)
            elif from_calendar == 'islamic':
                jd = self.islamic_to_julian_day(year, month, day)
            elif from_calendar == 'julian':
                jd = self.julian_calendar_to_julian_day(year, month, day)
            elif from_calendar == 'hebrew':
                jd = self.hebrew_to_julian_day(year, month, day)
            elif from_calendar == 'kurdish':
                # Kurdish uses same system as Persian/Afghan
                jd = self.persian_to_julian_day(year, month, day)
            else:
                raise ValueError(f"Unknown calendar: {from_calendar}")
            
            # Convert to all calendars
            result = {}
            
            # Gregorian
            g_year, g_month, g_day = self.julian_day_to_gregorian(jd)
            result['gregorian'] = {
                'year': g_year,
                'month': g_month,
                'day': g_day,
                'month_name': calendar.month_name[g_month],
                'weekday': self.get_weekday(jd),
                'is_leap': self.is_leap_year_gregorian(g_year)
            }
            
            # Afghan/Persian
            p_year, p_month, p_day = self.julian_day_to_persian(jd)
            result['afghan'] = {
                'year': p_year,
                'month': p_month,
                'day': p_day,
                'month_name': self.afghan_months[p_month - 1],
                'weekday': self.get_persian_weekday(jd),
                'is_leap': self.is_leap_year_persian(p_year)
            }
            
            # Islamic
            i_year, i_month, i_day = self.julian_day_to_islamic(jd)
            result['islamic'] = {
                'year': i_year,
                'month': i_month,
                'day': i_day,
                'month_name': self.islamic_months[i_month - 1],
                'weekday': self.get_weekday(jd),
                'is_leap': self.is_leap_year_islamic(i_year)
            }
            
            # Julian
            j_year, j_month, j_day = self.julian_day_to_julian_calendar(jd)
            result['julian'] = {
                'year': j_year,
                'month': j_month,
                'day': j_day,
                'month_name': calendar.month_name[j_month],
                'weekday': self.get_weekday(jd),
                'is_leap': self.is_leap_year_gregorian(j_year)  # Same leap rule as Gregorian for Julian
            }
            
            # Hebrew
            h_year, h_month, h_day = self.julian_day_to_hebrew(jd)
            result['hebrew'] = {
                'year': h_year,
                'month': h_month,
                'day': h_day,
                'month_name': self.hebrew_months[min(h_month - 1, 11)],
                'weekday': self.get_weekday(jd),
                'is_leap': False  # Simplified
            }
            
            # Kurdish (same as Persian)
            result['kurdish'] = {
                'year': p_year,
                'month': p_month,
                'day': p_day,
                'month_name': self.kurdish_months[p_month - 1],
                'weekday': self.get_persian_weekday(jd),
                'is_leap': self.is_leap_year_persian(p_year)
            }
            
            # Add Julian Day and Modified Julian Day
            result['julian_day'] = jd
            result['modified_julian_day'] = jd - 2400000.5
            
            return result
            
        except Exception as e:
            raise ValueError(f"Conversion failed: {str(e)}")
