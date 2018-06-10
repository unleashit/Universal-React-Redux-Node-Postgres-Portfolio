#!/usr/bin/env bash

export JG_DATABASE_USERNAME=jg_db
export JG_DATABASE_PASSWORD=password
export JG_DATABASE_DATABASE=jg_db
export JG_DATABASE_HOST=db # service name from docker-compose.yml
export JG_DATABASE_PORT=5432
export JG_DATABASE_DIALECT=postgres
export JG_SECRET_KEY=secret_key

export JG_SESSION_SECRET=session_secret
export JG_SESSION_KEY=jg_cp
export JG_GOOGLE_ANALYTICS=

export JG_EMAIL_FROM=some@email.com
export JG_EMAIL_TO=some@email.com
export JG_EMAIL_SUBJECT=New Contact

export JG_LIVE_CHAT_ADMIN_NAME="Administrator"

export JG_SMS_FROM=some@emai.com
export JG_SMS_TO=number@mobile-provider.com
export JG_SMS_SUBJECT=jasongallagher.org=new live chat

export JG_SMTP_HOST=smtp.somewhere.com
export JG_SMTP_PORT=465
export JG_SMTP_SECURE=true
export JG_SMTP_AUTH_USERNAME=username
export JG_SMTP_AUTH_PASSWORD=password

export JG_API_BASE=http://localhost:3100

export NODE_ENV=development
