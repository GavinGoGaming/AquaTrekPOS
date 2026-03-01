# AquaTrek POS

AquaTrek POS is a replacement for the Virtual Enterprise POS system used at trade shows and selling events. It uses OCR to scan the Network Bank debit cards, extracts the account number, and adds sales to a google sheet.

You will ***still*** need a person or two actually charging these sales.

Using this isn't plug and play - some assembly is very much required.

Make a google cloud project, enable the google sheets API, make a service user with the permission "Editor", and then go to the keys of it and add a JSON key. Download this, put it into the "backend" folder, and name it "json-key.json". Then, deploy your service. I reccomend Fly.io, you can `fly deploy` as a config is already located.

You'll need to do some code editing to get the frontend working as well. Find all references to the aquatrek backend .fly.dev link and replace them with your own. Once done, you can deploy this root folder on Vercel for a good free option, or github pages via actions if you can get that working.