# Marketplace
An Angular application that showcases items on the Ethereum blockchain within a simple web interface. You will need CORS disabled in order for the frontend application to access the external domain of the middleware.

![](https://raw.githubusercontent.com/COMP6810-Research-Project-620098373/Marketplace/media/src/assets/screenshot-001.png)

## Getting Started

1. ### **Installing Dependencies**
    Installing project dependencies using the command
    ```
    npm install
    ```

2. ### **Start Project**
    Start the project using
    ```
    npm start
    ```

## Security Settings

To view the application locally you may need to disable certain security measured shipped with modern browsers. For Chrome on Linux or MacOS, launch it with the following command:

```
google-chrome --disable-web-security --user-data-dir=/tmp
```

Once opened, navigate to `chrome://flags/#allow-insecure-localhost` and set the **"Allow invalid certificates for resources loaded from localhost."** dropdown to **Enabled**