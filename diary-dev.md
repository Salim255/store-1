# Welcome to my dev diary

## NGROK

- ngrok is your app’s front door—a globally distributed reverse proxy that secures, protects and accelerates your applications and network services, no matter where you run them.

### Configure NGROK

- 1. Add authtoken to ngrok config:
  - ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
- 2. Start tunnel again:
  - ngrok http 3000
- 3. Deploy your app online
  - ngrok http http://localhost:8080
- 4. Use it:
  - Forwarding https://82d5060a7efc.ngrok-free.app -> http://localhost:3000
