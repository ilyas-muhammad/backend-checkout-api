const fs = require('fs');

import { code, generateError } from '../../helpers/error';
import log from '../../helpers/logger/log';

export interface Args {
  sku: string;
  quantity: number;
}

export interface Item {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}

interface PurchasedItem {
  sku: string;
  quantity: number;
  name: string;
}

interface Checkout {
  total: number;
  items: PurchasedItem[];
}

const MACBOOK_SKU = '_43N23P';
const GOOGLEHOME_SKU = '_120P90';
const ALEXA_SKU = '_A304SD';
const RASPBERY_SKU = '_234234';

// eslint-disable-next-line prettier/prettier
const datas = JSON.parse(fs.readFileSync('src/models/data.json')) as unknown as Item[];

const calculateMacbook = (sku: string, qty: number, data: Item): Checkout => {
  const total = data.price * qty;

  return {
    total,
    items: [
      {
        sku,
        quantity: qty,
        name: data.name,
      },
      {
        sku: RASPBERY_SKU,
        quantity: qty,
        name: 'Raspberry Pi B',
      },
    ],
  };
};

const calculateGoogleHome = (sku: string, qty: number, data: Item): Checkout => {
  const validQty = qty === 3 ? 2 : qty;
  const total = data.price * validQty;

  return {
    total,
    items: [
      {
        sku,
        quantity: qty,
        name: data.name,
      },
    ],
  };
};

const calculateAlexa = (sku: string, qty: number, data: Item): Checkout => {
  let percentageValue = 0;
  if (qty >= 3) percentageValue = data.price * 0.1;

  const total = (data.price - percentageValue) * qty;

  return {
    total,
    items: [
      {
        sku,
        quantity: qty,
        name: data.name,
      },
    ],
  };
};

export default (args: Args): Checkout => {
  const { CLIENT_ERROR } = code;
  const { sku, quantity } = args;

  try {
    const data = datas.find((item) => item.sku === sku);

    if (!data) {
      throw generateError('SKU not found!', CLIENT_ERROR);
    }

    if (sku === MACBOOK_SKU) return calculateMacbook(sku, quantity, data);
    if (sku === GOOGLEHOME_SKU) return calculateGoogleHome(sku, quantity, data);
    if (sku === ALEXA_SKU) return calculateAlexa(sku, quantity, data);

    const total = data.price * quantity;
    return {
      total,
      items: [
        {
          sku,
          quantity,
          name: data.name,
        },
      ],
    };
  } catch (err) {
    log('error', err.message, err);
    return {
      total: 0,
      items: [],
    };
  }
};
