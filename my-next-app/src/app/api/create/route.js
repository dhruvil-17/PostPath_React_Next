export async function POST(req) {
    try {
        const data = await req.json();
        console.log("Received data:", data);
        return new Response(JSON.stringify({ message: "Data received successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ message: "Error processing request" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}