# Ghost Coding challenge

## Architecture

This app is split into two root folders:

- `/api` is the backend Express API
- `/client` is the frontend React app

I went this route for a couple reasons, primarily I wanted to ensure all code was in one repo and easily viewable when I submitted. I also needed two separate locations due to some hosting constraints I have with Dreamhost, technically had to create two different subdomains for this.

I chose the following technologies:

- **React** for the client - Didn't use it much for V1 but I knew it was a requirement for the final product so I started with it from the outset.
- **Express** for the API - Mainly because I know it's what you use but I also do enjoy it.
- **MySQL** - I created a comments table in a new MySQL database for this, I was considering SQLite but figured I'd go all in and I tend to favor MySQL over NoSQL generally anyway.
- **SASS** - Even for a small project like this, I couldn't help but throwing in SASS support too. The barrier for addition in a create-react-app is negligible and there are so many benefits.
- **Luxon** for some help on relative dates on the comments
- **Socket.IO** for realtime updates cross multiple clients to satisfy the "Make the display of new upvotes real-time" requirement of V2

## Things I would improve

- **Accessibility** - I noticed a few accessibility-related issues that could be improved upon as well:
  - The "what are your thoughts?" input has a placeholder as a label, without a proper label folks using assistive devices would have a harder time understanding what this field is for so I added a label and made it hidden so it's only visible by assistive devices (like screen readers).
  - The same input mentioned above could do with a higher contrast both on the border and on the placeholder text, the text is close but doesn't meet the 4.5:1 contrast ratio that is recommended.
  - The Upvote and Reply buttons are not visually distinct as interactive elements, I added focus styles but this only really helps keyboard navigation.
  - Overall font sizes are quite small, recommendations vary but generally are around the 16px browser default. I wanted to stick to the design as best as I could so I didn't modify, though I made sure that it still appears as expected increasing the zoom to 400%.
- **All Global Styles** - For the sake of time, I didn't bother going back in and refactoring the styles to be more "React" like and scoped to individual components. If this were an app that I expected to grow I would have made the time for that.
- **Performance** - Right now, I'm loading all comments in the MySQL table. If this were to grow I'd limit that with some pagination. I'm also querying for all comments as a new one is created or upvoted, to reduce that load I would instead try to insert the new comment without a SQL call and update the upvotes in existing state.
- **Routing** - I didn't add any kind of routing to this so it's truly a single page, if this were a real project I would work towards a better understanding of the goals and had accommodated that in the architecture.
- **Redux** - I resisted the urge to add it here in the hopes of keeping things simpler but I think this could have benefitted from some more robust state management.
- **Unit tests** - Even though it was a request in the code challenge, I ended up not moving forward with unit testing and instead had spent that bit of additional time ensuring some light accessibility testing was performed throughout and as I was wrapping up.
