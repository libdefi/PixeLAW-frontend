import { PIXELAW_WORLD_ADDRESS } from "@/constants";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
    Account,
    BigNumberish,
    CallData, RpcProvider,
    shortString,
    TransactionStatus,
} from "starknet";

export const SCALING_FACTOR = 10000;
export const REFETCH_INTERVAL = 1000; // really need graphql subscriptions...

interface DojoInterface {
  account?: Account;
  isPending: boolean;
  error?: Error;
  execute: (systemName: string, params: BigNumberish[]) => Promise<string>;
  call: () => void;
}

const provider = new RpcProvider({
    nodeUrl: process.env.NEXT_PUBLIC_RPC_ENDPOINT!,
});


//@ts-ignore
const DojoContext = createContext<DojoInterface>(undefined);

export function useDojo() {
  const context = useContext(DojoContext);
  if (!context) {
    throw new Error("useDojo must be used within a DojoProvider");
  }
  return useContext(DojoContext);
}

export function DojoProvider({
  children,
}: {
  children?: ReactNode;
}): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error>();



    const accounts = [
        {
            address: "0x03ee9e18edc71a6df30ac3aca2e0b02a198fbce19b7480a63a0d71cbd76652e0",
            pk:  "0x0300001800000000300000180000000000030000000000003006001800006600"
        },
        {
            address: "0x033c627a3e5213790e246a917770ce23d7e562baa5b4d2917c23b1be6d91961c",
            pk:  "0x0333803103001800039980190300d206608b0070db0012135bd1fb5f6282170b"
        }
    ]

    const accountIndex = typeof window !== "undefined" ? parseInt(new URLSearchParams(window.document.location.search).get("account")??"1") : 1


    const account = new Account(
        provider,
        accounts[accountIndex-1].address!,
        accounts[accountIndex-1].pk!
    );



    const execute = useCallback(

    async (systemName: string, params: BigNumberish[]) => {
      if (!account) {
        throw new Error("No account connected");
      }
        console.log(account)
      setIsPending(true);
      setError(undefined);
        console.log("RYO_WORLD_ADDRESS", PIXELAW_WORLD_ADDRESS)
      return account
        .execute({
          contractAddress: PIXELAW_WORLD_ADDRESS,
          entrypoint: "execute",
          calldata: CallData.compile([
            shortString.encodeShortString(systemName),
            params.length,
            ...params,
          ]),
        })
        .then(async ({ transaction_hash }) => {
          await account.waitForTransaction(transaction_hash, {
            retryInterval: 1000,
            successStates: [TransactionStatus.ACCEPTED_ON_L2],
          });

          console.log("transaction hash: " + transaction_hash);

          return transaction_hash;
        })
        .catch((e) => {
          console.error(e);
          setError(e);
          throw e;
        })
        .finally(() => setIsPending(false));
    },
    [account],
  );

  // TODO: implement
  const call = useCallback(() => {
    console.error("not implemented");
  }, []);

  return (
    <DojoContext.Provider
      value={{
        account,
        isPending,
        error,
        call,
        execute

      }}
    >
      {children}
    </DojoContext.Provider>
  );
}
