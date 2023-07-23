import { InvokeTransactionReceiptResponse, num, shortString } from "starknet";

export enum PixelEvents {
  PutColor = "PutColor",

}

export interface BaseEventData {
  positionX: Number;
  positionY: Number;
}

export interface PutColorEventData extends BaseEventData {
  color_red: number;
  color_green: number;
  color_blue: number;
}

export const parseEvent = (
  receipt: InvokeTransactionReceiptResponse,
  eventType: PixelEvents,
): BaseEventData => {
  const raw = receipt.events?.find(
    (e) => shortString.decodeShortString(e.keys[0]) === eventType,
  );

  if (!raw) {
    throw new Error(`event not found`);
  }

  switch (eventType) {

    case PixelEvents.PutColor:
      return {
        positionX: Number(raw.data[0]),
        positionY: Number(raw.data[1]),
        color_red: Number(raw.data[2]),
        color_green: Number(raw.data[3]),
        color_blue: Number(raw.data[4])
      } as PutColorEventData;


      throw new Error(`event parse not implemented: ${eventType}`);
  }
};
