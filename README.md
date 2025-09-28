# Climate change in DC from 1958 to 2022
See the changes in average monthly temperature, precipitation, and snowfall in the DC region. Data is pulled from the NOAA station at the National Arboretum (FIPS:11). Compare dates to 2022, which is the most recent full year of data.

Recent update 2025: backend API needed to be created as NOAA updated their API to block CORS. Basic Node/Express API routes set up to handle station data retrieval. React classes were also updated to hooks.

## Built with React
And SCSS and Chart.js and Node.js


## TO DO
 - ~~Allow user to select dates to compare~~
 - Find other data to test
    - See `noaa-data-types.txt` for full list
    - Current data types: TAVG, PRCP, SNOW
 - Add other areas/stations
 - Find average change over time
