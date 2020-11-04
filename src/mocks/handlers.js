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
  rest.get(`${process.env.API_URL}/part/`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          customer_id: 1,
          id: 1,
          name: 'Part 1',
          number: '123-457',
          purchase_order_id: 1,
        },
      ]),
      ctx.status(200)
    );
  }),
];
