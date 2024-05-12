# Home Assistant meeting

Tell your Home Assistant that you're busy in meeting !

## How it works ?

The Chrome extension checks if a tab containing a website like Google Meet or Zoom, it will send an API request to your Home Assistant toggling an entity you've configured.

## Chrome extension setup

Go to the options of extension and fill the inputs :

- `Home Assistant URL` : can be a domain name or an IP address
- `API token`: the token without `Bearer`
- `Entity ID`: you have to use a switch entity
