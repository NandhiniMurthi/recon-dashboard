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
---

### POST /api/targets

Creates a new target.

### Request Body

```json
{
  "domain": "github.com",
  "status": "Active"
}
```

### Success Response (201)

```json
{
  "message": "Target created successfully."
}
```

### Error Responses

Missing required fields:

```json
{
  "message": "Domain and status are required."
}
```

Duplicate target:

```json
{
  "message": "Target already exists."
}
```
---

### PUT /api/targets/:id

Updates an existing target.

### Request Body

```json
{
  "domain": "github.com",
  "status": "Completed"
}
```

### Success Response (200)

```json
{
  "message": "Target updated successfully."
}
```

### Error Responses

Target not found:

```json
{
  "message": "Target not found."
}
```

Missing required fields:

```json
{
  "message": "Domain and status are required."
}
```
---

### DELETE /api/targets/:id

Deletes a target.

### Success Response (200)

```json
{
  "message": "Target deleted successfully."
}
```

### Error Response

Target not found:

```json
{
  "message": "Target not found."
}
```