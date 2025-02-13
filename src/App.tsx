import { useRef } from 'react'
import { TriggerResult, useMutation } from './useMutation'

type User = {
  id: string;
  userId: string;
  title: string;
  body: string;
}

function App() {
  const ref = useRef<TriggerResult<User>>();

  const [mutation, { isLoading }] = useMutation<User, Omit<User, "id">>({
    url: '/posts',
    method: 'POST',
    onSuccess(data) {
      console.log("onSuccess", { data })
    },
    onError(error) {
      console.log("onError", { error })
    },
  });

  const handleSubmit = async () => {
    const triggerResult = mutation({
      userId: Math.random().toString(36).substring(2, 7),
      title: 'foo',
      body: 'bar',
    });
    
    ref.current = triggerResult;
  }

  const handleSubmitAsPromise = async () => {
    try {

      const triggerResult = mutation({
        userId: Math.random().toString(36).substring(2, 7),
        title: 'foo',
        body: 'bar',
      })

      ref.current = triggerResult;

      const data = await triggerResult.toPromise()

      console.log({ data })

    } catch (error) {
      console.error({ error })
    }
  }

  const handleCancel = () => {
    if (ref.current) {
      ref.current.abort();
    }
  }

  return (
    <>
      <h1>useMutation hook</h1>

      {isLoading && <div>
        <p>Loading...</p>

        <button onClick={handleCancel}>
          Cancel
        </button>
      </div>}
      
      <button onClick={handleSubmit}>
        Call
      </button>

      <button onClick={handleSubmitAsPromise}>
        Call as promise
      </button>
    </>
  )
}