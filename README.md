#Pre-install

This project is running in latest LTS Node version:
Node 18.15.0

This is small project which looking to implement some of the best practice should be take in consideration when developing REST API such as:

Note: Some points are just recommendations for scale that are not implemented here because the amount of time available . those are going to be marked with `*`

# Error Handler.

- For this case write out a simple error handler system base on classes , where and relaying on express `express-async-errors` so that I can throw error direct form controllers using async/await when is needed

- CustomError abstract class used as template for mapping error object structure response

# Input Validation

- In order to validate input data to route controllers ,

# Testing

Create stub database for testing

# Clean Architecture

# Resilience

- Health Checking: Create a /health endpoint in order to check when API is available
- Graceful shutdowns: https://github.com/hunterloftis/stoppable

# Logger

# Code Reusability
