# Road Trip Simulator
<img src="https://user-images.githubusercontent.com/57158526/212792386-10f9d1dd-6184-44b8-8ba6-3bb3ef58bed5.gif" width="400" height="400"/>


A road trip simulator.

These are some scripts to compute route coordinates and scrape Google Street View images to simulates road trips via concatenated image sequences.

<!-- ![roadtrip demo](https://user-images.githubusercontent.com/57158526/133194920-0f64fe78-2169-4752-8fe5-11712b616b60.gif) -->



## Steps:

A basic Google API key is required for this. Rememeber to replace instances of YOUR_API_KEY with your own keys.

1. Find an interesting road trip to simulate! Set the config for the origin, destination, and any waypoints that you want to pass through within your road trip. To do this, open `/1-get-config/index.html` in your browser and follow the instructions shown. This should give you config coordinates to copy in the text area.
2. Calculate the directions from the origin to the waypoints, then to the destination. Again: to do this, open `2-get-direction-coords/index.html` in your browser and follow the instructions shown. This should give you a massive list of coordinates of 10-meter intervals along the route from your origin to each waypoint, and then to your final destination. Copy this list to your clipboard.
3. Navigate to `3-fetch-images` and save the copied text to the file called locations.txt. It's prefilled with sample location coordinates, but you can replace it with your own data. Run `3-fetch-images/fetch_images.py` to fetch every image from your location list. By default, it will be saved under a `generatedImages` folder. You can change that and other settings in `config.json`. You should add your Google API key in that file. Note that you can only download 25 000 images per day, so make sure your locations.txt file is under 25000 lines!
4. Congrats, you now have an image sequence that simulates a road trip!

## Demo walkthrough of steps:



https://user-images.githubusercontent.com/57158526/212790906-4efb05de-8cc3-4902-b561-c5b5cd9bf7dc.mp4


