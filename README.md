# API-CRUD-EMAIL

This is assignment task for COINSTOREY


npm run start -  To start the server

# User Route

1) To Register User: POST /api/users  with body {name, email, password} PUBLIC
2) To get auth token: POST /api/users/gettoke  with body {email, password};  (x-auth-token in header is required) PUBLIC
3) To load the user: GET /api/users (x-auth-token is required) PRIVATE

# Mail Route

1) To send a mail: POST /api/mail/send with body { to, subject, attachments (array), body} PRIVATE
2) To reply a mail: PUT /api/mail/reply/:mailid with body {body}  PRIVATE
3) To delete the mail: DELETE /api/mail/delete/:mailid  PRIVATE
4) To watch the mail:  GET /api/mail/:maild  PRIVATE