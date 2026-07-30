# Recon Dashboard API Documentation

## Base URL

```
http://localhost:3000
```

---

## Endpoints

### GET /api/targets

Returns all targets.

### Response

```json
[
  {
    "id": 1,
    "domain": "google.com",
    "status": "Active",
    "createdAt": "2026-07-30"
  }
]
```