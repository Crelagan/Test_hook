import { useState } from 'react';
import { useQueryContext } from './query.context';
import axios from 'axios';

interface Props<TData> {
  url: string;
  method: "POST" | "PUT" | "PATCH";
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
}

interface QueryResult {
  isLoading: boolean;
}

const noop = () => { }

export type TriggerResult<TData> = {
  toPromise: () => Promise<TData>;
  abort: () => void;
}

type UseMutationReturn<TData, TBody> = [
  (body: TBody) => TriggerResult<TData>,
  QueryResult
];

export const useMutation = <TData, TBody extends Record<string, any>>({
  url,
  method = "POST",
  onSuccess = noop,
  onError = noop
}: Props<TData>): UseMutationReturn<TData, TBody> => {

  const context = useQueryContext();

  const [queryResult, setQueryResult] = useState<QueryResult>({
    isLoading: false,
  });

  const trigger = (body: TBody): TriggerResult<TData> => {
    const controller = new AbortController();

    setQueryResult(prevState => ({ ...prevState, isLoading: true }));

    const axiosPromise = axios({
      method,
      signal: controller.signal,
      url: context.config.baseUrl + url,
      data: body,
    });

    const promise: Promise<TData> = new Promise((resolve, reject) => {
      axiosPromise
        .then((response) => {
          resolve(response.data);

          onSuccess(response.data);
        })
        .catch((error) => {
          reject(error);

          onError(error);
        })
        .finally(() => {
          setQueryResult(prevState => ({ ...prevState, isLoading: false }))
        });
    });

    return {
      abort: () => controller.abort(),
      toPromise: () => promise
    };
  }

  return [
    trigger,
    queryResult
  ] as const;
};