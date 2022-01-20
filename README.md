# foodpanda-desktop

> This app ISN'T belong to Foodpanda. And I am also not working for Foodpanda.

## Introduction

***[繁體中文文檔](/doc/README.zh.md)***

This is a Foodpanda app that is able to order food from Foodpanda on desktop platforms. And includes a feature that can notify you of the order's status.

## How to Use

***You can install this app on the [release page](https://github.com/000hen/foodpanda-desktop/releases/latest). The usage below is for development.***

 1. Clone/Download the repository.
 2. Run the `npm install` command.
 3. Run the `npm start` command. (Using `NODE_ENV=development` will let the devtools open)

Now, you can use the app to order food.

***p.s. This app will auto fetch your ip to get the location, if you don't want to use this function, use run args `--disable-auto-set-locale` with `--local={Country ID(ISO 3166-1 alpha-2)}`***

## Build the App

***There is the best way to build the app: Download the release (from [release page](https://github.com/000hen/foodpanda-desktop/releases/latest)) and follow the instructions.***

You can build foodpanda-desktop with `electron-builder` to build the app.

## Screenshots

 1. Main Page

 ![Main Page](https://cdn.discordapp.com/attachments/698551378745884835/930397857272430622/unknown.png)

 2. Notifications

 ![Notifications](https://cdn.discordapp.com/attachments/698551378745884835/930398948483538955/unknown.png)

 3. All Messages You might see

 ![Messages](https://cdn.discordapp.com/attachments/698551378745884835/931151990279503882/unknown.png)

# TODO

 * [ ] Make a useful chat function that can be used to send messages to the delivery guy (or delivery guy send to you).