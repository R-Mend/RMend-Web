# RMend-Web

RMend-Web is the frontend web console for the RMend SaaS. Its goal is to give authority (customers/counties) admins the ability to manage and view their reports and other data.


## Usage example

A typical example of how the RMend web works are...
1. Logging an authority admin in
2. Getting that users authority data like employees, reports, etc.
3. Displaying the found information
4. Allowing admin to update and delete reports and other similar data

Built with [Next.js](https://nextjs.org/) (App Router) and TypeScript, with Redux + redux-thunk for
state management.

## Development setup

Create a `.env` file (see `.env.example`) pointing at the backend API:

```sh
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Then install dependencies and run the available scripts:

```sh
npm install
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm test         # run the Jest test suite
npm run lint     # run eslint
npm run typecheck # run the TypeScript compiler
```

## Meta

Creator - Tanner York

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/R-Mend](https://github.com/R-Mend)

## Contributing

1. Fork it (https://github.com/R-Mend/RMend-Web)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
