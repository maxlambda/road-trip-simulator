# road-trip-simulator

A road trip simulator.

These are some scripts to compute route coordinates and scrape Google Street View images to simulates road trips via concatenated image sequences.

## Demo:

![roadtrip demo](https://user-images.githubusercontent.com/57158526/133194920-0f64fe78-2169-4752-8fe5-11712b616b60.gif)

## Steps:

A Google API key is required for this. Rememeber to replace instances of YOUR_API_KEY with your own keys.

1. Find an interesting road trip to simulate! Set the config for the origin, destination, and any waypoints that you want to pass through within your road trip. To do this, open `/1-get-config/index.html` in your browser and follow the instructions shown. This should give you config coordinates to copy in the text area.
2. Calculate the directions from the origin to the waypoints, then to the destination. Again: to do this, open `2-get-direction-coords/index.html` in your browser and follow the instructions shown. This should give you a massive list of coordinates of 10-meter intervals along the route from your origin to each waypoint, and then to your final destination. Copy this list to your clipboard.
3. Navigate to `3-fetch-images` and save the copied text to a file called coords.txt. Run `3-fetch-images/main.py` to fetch every image from your location list. Note that you can only download 25 000 images per day.
4. Navigate to `4-display` to display the road trip!

### Sample config.json

```
{
    "locationsFile": "locations/locations.txt",
    "streetImagesDir": "assets/images",
    "apiKey": "abc123",
    "origin": "43.651505490174166, -79.37490248659148",
    "destination": "43.763642756272525, -79.15552584593397",
    "stops": [
        {
            "location": "43.703358050686006, -79.25368477805685"
        }
    ]
}
```
