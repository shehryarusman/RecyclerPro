## RecyclerPro :recycle:
From the creators of DonatorPro

## BinthereRecyclethat

BinthereRecyclethat is a tool that helps individuals dispose of their waste properly by providing real-time data on whether an item is recyclable or not. The project was inspired by the fact that the average recycling contamination rate is **25%**, which costs the industry **up to $500 million annually.** Many individuals want to be environmentally aware, but do not know the recyclable nature of items. BinthereRecyclethat aims to solve this problem by providing a _simple, convenient, and effective solution._ ‼️

# How It Works

BinthereRecyclethat allows users to scan items with their device's camera, which then provides real-time data on whether the item is recyclable or not. Users can also install a camera at the top of their trash can to get immediate guidance on how to dispose of the item they're currently holding. The tool also tracks what objects users are using/throwing away the most, and what objects they are buying the most, which allows us to recommend users products based on their usage of certain items.

# Features

BinthereRecyclethat has several features that make it a convenient and effective tool for individuals and companies alike:

- **Easy Scanning Object Detection:** Our IoT tool allows users to access a vast database of information in a matter of seconds. It allows users to be able to conveniently use a camera to scan their item and figure out whether it's trash or recyclable and how to adequately dispose of it. This scanning tool will also use a loss function to adequately learn over time to teach itself to be more accurate. It will display a percentage confidence score as well as whether the item displayed is recyclable or not.

- **News:** We are scrapping news from the news api and then storing it in a sql lite database. We are scraping articles related to recycling and its effects of it to ensure users are kept up to date with the positive effects of recycling and to keep them active on our website. Then we are using NLP to summarize the articles and then using Random Forrest Regression, we run a sentiment analysis on the articles that classifies them as positive, neutral, or negative. We then display all the positive articles from most to least relevant.

- **Pro and Con List:** We also have a list of Pro's and Con's stored in our code. Every time a user scans an object, we then show the user a random Pro of recycling and a random Con of not recycling, to ensure our users stay educated on the positive effects on our environment of recycling and the negative effects of being careless.

- **Classification:** We are using MobileNet-v2, which is a lightweight Convolutional Neural Network, which allows us to draw an image box around the image being detected, as well as accurately classify the image as either trash or recyclable. This CNN uses a loss function, please find the image attached, that allows the model to learn to make fewer mistakes over time.
 
- **Specific Login Functionality:** We also have specific login functionality for users to be able to log in with their own personal credentials so we are able to track what items users are recycling.

- **Product Recommendation:** We are using a K-Nearest Neighbor Classification algorithm to figure out what products to recommend to a user based on the items they own and have scanned in the past. This algorithm is trained on a dataset containing 9.4 million Amazon products that had data on users who bought similar items. This allows us to classify the items the user scans into our model and recommend item types closest to those items. This will link to our initiative to collaborate with corporations on their Social Responsibility Programs and allow them to be more environmentally aware by giving users who are environmentally aware, environmentally friendly products at discounted rates, while simultaneously advertising their products on our website.

# Parties Helped

BinthereRecyclethat helps three parties involved in the recycling process:

- Encourages individuals who want to recycle to do so properly while getting discounts from brands.
- Helps recycling plants reduce their cost of improperly labeled trash.
- Allows large companies to be more environmentally friendly by encouraging their consumers to recycle properly for discounts.
Technologies Used

# Technologies Used
BinthereRecyclethat is built with the following technologies:

- React.js for the frontend
- Flask for the backend
- SQLAlchemy as the ORM
- TensorFlow for image detection

# Installation

To install BinthereRecyclethat, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies by running npm install.
3. Start the frontend by running npm start.
4. Start the backend by running python app.py.

OR

Simply visit the project [here](https://shehryarusman.github.io/login)

# Conclusion

BinthereRecycleThat is a powerful tool that helps individuals and companies alike be more environmentally friendly. Its convenient and effective features make it easy to use, while its collaboration with brands and personalized news articles keep users engaged and informed. If you're looking for a way to help the environment and reduce the cost of improperly labeled trash, give BinthereRecycleThat a try! ‼️
