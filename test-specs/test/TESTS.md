# AirBnB Test Specs

## Authentication Required:
### User Authentication
- GET /me - Get the Current User
	- [ ] Success

### Spots
- GET /me/spots - Return all Spots for Current User
	- [ ] Success
- POST /spots - Create a Spot
	- [ ] Success
	- [ ] Body validation - Data complete
- PUT /spots/:spotId - Update a Spot
	- [ ] Success
	- [ ] Body validation
	- [ ] Invalid id
- DELETE /spots/:spotId - Delete a Spot
	- [ ] Success
	- [ ] Invalid id

### Reviews
- GET /me/reviews - Return all Reviews written by Current User
	- [ ] Success
- POST /spots/:spotId/reviews - Create a Review for Spot by id
	- [ ] Success
	- [ ] Body validation
	- [ ] Invalid id
	- [ ] review by user already exists
- PUT /reviews/:reviewId - Update a Review
	- [ ] Success
	- [ ] Body validation
	- [ ] Invalid id
- DELETE /reviews/:reviewId - Delete a Review
	- [ ] Success
	- [ ] Invalid id

### Bookings
- GET /me/bookings - Return all Bookings made by Current User
	- [ ] Success
- GET /spots/:spotId/bookings - Return all bookings for a Spot by id
	- [ ] Success - not owner
	- [ ] Success - owner
	- [ ] Invalid id
- POST /spots/:spotId/bookings - Create a Booking for a Spot by id
	- [ ] Success
	- [ ] Body validation
	- [ ] Invalid id
	- [ ] Booking conflict
- PUT /bookings/:bookingId - Update a Booking
	- [ ] Success
	- [ ] Body validation
	- [ ] Invalid id
	- [ ] Past end date
	- [ ] Booking conflict
- DELETE /bookings/:bookingId - Delete a Booking
	- [ ] Success
	- [ ] Invalid id
	- [ ] Past start date

### Images
- POST /spots/:spotId/images - Create an Image for a Spot by Id
	- [ ] Success
	- [ ] Invalid id
- POST /reviews/:reviewId/images - Create an Image for a Review by Id
	- [ ] Success
	- [ ] Invalid id
	- [ ] max number of images
- DELETE /images/:imageId - Delete an Image 
	- [ ] Success
	- [ ] Invalid id


## No Authentication Required:
### User Authentication
- POST /login - Log in a User
	- [ ] Success
	- [ ] Invalid credentials
	- [ ] Body validation
- POST /signup - Sign up a User
	- [ ] Success
	- [ ] User exists
	- [ ] Body validation

### Spots
- GET /spots - Return all spots
	- [ ] Success
- GET /spots/:spotId - Return Spot details by id
	- [ ] Success
	- [ ] Invalid id

### Reviews
- GET /spots/:spotId/reviews - Return all reviews for a Spot by id
	- [ ] Success
	- [ ] Invalid id

### Query Params - Spots
- GET /spots?page&size&minLat&maxLat&minLng&maxLng&minPrice&maxPrice - Return all Spots filtered by query params
	- [ ] Success
	- [ ] param validation