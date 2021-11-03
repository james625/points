To run the app, in the project directory:

Run `npm start`

Notes:

The app is designed to display only the points of the current user and the spending
points option. The add transaction is purely done in the backend and displayed only
for the purposes of this exercise.

Add transaction is the way to submit data for payer/points in this app so date ordering
was not needed. However, the app can be expanded to add dates using `new Date()` and
the queue can be sorted by comparing the dates.

The app can be further developed to include a database to keep track of dates and
other users as well as specific routes.