# API Overview

The Zydro API provides a comprehensive set of endpoints for interacting with the platform.

## Base URL

All API requests should be made to:

```
https://api.zydro.com/v1
```

## Authentication

Most endpoints require authentication. Include your API key in the request headers:

```
Authorization: Bearer YOUR_API_KEY
```

## Rate Limiting

API requests are rate-limited to 1000 requests per hour per API key.

