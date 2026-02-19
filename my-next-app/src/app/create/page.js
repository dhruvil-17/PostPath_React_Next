const handleSubmit = async () => {
  const res = await fetch("http://localhost:3000/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "dhruvil@test.com"
    })
  });

  const data = await res.json();
  console.log(data);
};
export default handleSubmit