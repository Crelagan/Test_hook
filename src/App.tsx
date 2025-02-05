import { useState } from 'react';
import './App.css'
import useMutation from "./hook/useMutation"

function App() {
  const [requestType, setRequestType] = useState("");

  // je pense qu'on peut rendre les callback plus utile en modifiant le DOM directement a l'interieur.
  const { response, isLoading, isError, sendData } = useMutation({
    method: `${requestType}`,
    headers: {
      accept: '*/*'
    }
  },
  {
      //on pourrais gerer directement l'affichage directement dans les retour de callback
      onSuccess: (data) => console.log("Operation réussie :", data),
      onError: (error) => console.error("Erreur lors de la création :", error),
  });  

  //solution de factorisation
  // const mutatePost = (method: string) => {
  //   setRequestType(method);
  //   sendData();
  // }

  const newPost = () => {
    setRequestType("POST");
    sendData();
  }

  const editPost = () => {
    setRequestType("PUT");
    sendData();
  }

  const patchPost = () => {
    setRequestType("PATCH");
    sendData();
  }


  return (
    <div className="App">
      {isLoading && (
        <p>Loading...</p>
      )}
      {isError && (
        <h1>{isError.message}</h1>
      )}
      {!isLoading && !error && (
        <article className="post">
          <h1 className="page-title">Voici l'article sollicité : </h1>
          <h3 className="post-title">{response?.data.title}</h3>
          <p className="post-body">
            {response?.data.body}
          </p>
        </article>
      )}

      {/* Avec la factorisation on aurais appelé la methode de cettte facon 
      <button onClick={() => mutatePost("Post")}>
        POST
      </button> */}

      <button onClick={() => newPost()}>
        POST
      </button>

      <button onClick={() => editPost()}>
        PUT
      </button>

      <button onClick={() => patchPost()}>
        PATCH
      </button>
    </div>
  );
}

export default App
