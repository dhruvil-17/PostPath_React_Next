import {useEffect , useState} from 'react'

export default function FetchData(){
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
          .then(response => response.json())
          .then(json => setData(json))
          .catch(error => console.error('Error fetching data:', error));
    }, []);
      
      if (!data) {
        return <div>Loading...</div>;
      }

      return (
        <div>
          <h1>{data.title}</h1>
          <p>{data.body}</p>
        </div>
      );
}