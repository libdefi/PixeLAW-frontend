import { BaseEventData, parseEvent, PixelEvents } from "@/utils/event";
import { useCallback } from "react";
import { useDojo } from "..";

export interface SystemsInterface {
  put_color: (
      position: number[],
      color: number[],
  ) => Promise<SystemExecuteResult>;

  isPending: boolean;
  error?: Error;
}

export interface SystemExecuteResult {
  hash: string;
  event?: BaseEventData;
}

export const useSystems = (): SystemsInterface => {
  const { execute, account, error, isPending } = useDojo();

  const executeAndReciept = useCallback(
    async (method: string, params: Array<string | number >) => {
      if (!account) {
        throw new Error("No account connected");
      }

      try {
        console.log(method, params)
        const hash = await execute(method, params);
        return await account.getTransactionReceipt(hash);
      } catch (err) {
        console.error(`Error execute ${method}`, err);
        throw err;
      }
    },
    [execute, account],
  );

  const put_color = useCallback(
    async (
        position: number[],
        new_color: number[]
    ) => {

      const receipt = await executeAndReciept("PutColor", [
        position[0].toString(),
        position[1].toString(),
        new_color[0].toString(),
        new_color[1].toString(),
        new_color[2].toString()
      ]);

      // using joined event instead of created event to get initial location
      const event = parseEvent(receipt, PixelEvents.PutColor);

      return {
        hash: receipt.transaction_hash,
        event,
      };
    },
    [executeAndReciept],
  );


  return {
    put_color,
    error,
    isPending,
  };
};
