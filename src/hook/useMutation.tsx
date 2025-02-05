import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

interface UseMutationCallbacks{
    onSuccess: (data : AxiosResponse ) => void;
    onError: (error: AxiosError) => void
}

const useMutation = (axiosParams: AxiosRequestConfig, callback: UseMutationCallbacks) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [isError, setError] = useState<AxiosError>();
  const [isLoading, setLoading] = useState(true);

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
        setLoading(true)
        switch (axiosParams.method) {
            case "POST":
                axiosParams.data = {title: "Nouveau Post", body: "Ceci est un contenu"} 
                axiosParams.url = "/posts?_delay=10000"
                break;
            case "PUT":
                axiosParams.data = {id: 33, title: "Nouveau Post edité", body: "Ceci est un contenu édité"} 
                axiosParams.url = "/posts/33"
            break;
            case "PATCH":
                axiosParams.data = {title: "Nouveau Post patché"} 
                axiosParams.url = "/posts/110"
            break;
            default:
                axiosParams.method = "POST"
                axiosParams.data = {title: "Nouveau Post", body: "Ceci est un contenu"} 
                axiosParams.url = "/posts"
        }
        const result = await axios.request(params)
        setResponse(result)
        //implementer onSuccess
        callback.onSuccess(result)
    } catch( err ) {
        setError(err)
        callback.onError(err)
        // implementer callback onError
    } finally {
        setLoading(false)
    }
  };

  const sendData = () => {
    fetchData(axiosParams);
  }

  useEffect(() => {
      fetchData(axiosParams);
  },[]);

  return { response, isError, isLoading, sendData };
}

export default useMutation;