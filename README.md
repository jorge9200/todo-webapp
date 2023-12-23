This is a [Next.js](https://nextjs.org/) project for showing up how to develop a simple ToDo web app with an authentication system made with [Next Auth](https://next-auth.js.org/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You will need to login/register to access ToDo page, but currently login is bypassed so any login will work.

## Testing

Only E2E testing was made. It can be executed by running `npm run cypress:open` on the console. You will need to have the development server runing as the testings are made on it.

## Future improvements
- Styling can be improved, some styles with [Tailwind](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/) have been made in order to have something at least visible.
- UI/UX can be improved, I would like to insert new ToDo by a editable row on the ToDo list and look more other ToDo apps to copy good ideas.
- There are not any client validations, some have to be added manually or with a framework like [Formik](https://formik.org/).
- There are not any server validations neither, some validations for each field received and to expect a JWT token to validate each request.
- Password should be encrypted.
- Testing can be improved, by adding more coverage and unit-testing.
- Remove login bypass, to make login work again.
- Use a real DB instead of a JSON file. 
