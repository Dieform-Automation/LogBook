import { rest } from 'msw';

export const handlers = [
  rest.get(`${process.env.API_URL}/customer/`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Bob',
          id: 1,
        },
      ]),
      ctx.status(200)
    );
  }),
];
