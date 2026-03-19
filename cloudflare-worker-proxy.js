/**
 * CLOUDFLARE WORKER DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Log in to your Cloudflare Dashboard -> Go to "Workers & Pages"
 * 2. Click "Create Application" -> "Create Worker" -> Name it "groq-proxy"
 * 3. Click "Deploy" then "Edit code"
 * 4. Paste ALL of the code below into the worker script window, replacing what's there.
 * 5. Click "Save and Deploy"
 * 6. Go back to your Worker settings -> "Settings" tab -> "Variables" section.
 * 7. Under "Environment Variables", click "Add Variable".
 *    Name: GROQ_API_KEY
 *    Value: Your actual secret API key starting with gsk_...
 *    IMPORTANT: Click "Encrypt" to hide it permanently. Save it.
 * 8. Copy your new Worker URL (e.g., https://groq-proxy.yourusername.workers.dev)
 * 9. Paste that URL into your frontend `main.js` file at the top!
 */

export default {
    async fetch(request, env) {
        // Handle CORS preflight requests (required for browsers)
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*", // Or lock it to "https://dipendraelectronic.com.np"
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                }
            });
        }

        // Only allow POST requests for the actual chat payload
        if (request.method !== "POST") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        try {
            // Read the secure API key from Cloudflare environment variables
            const apiKey = env.GROQ_API_KEY;
            
            if (!apiKey) {
                return new Response("Server configuration error: missing API key", { status: 500 });
            }

            // Grab the exact request body sent by our frontend main.js
            const body = await request.text();

            // Forward the securely signed request directly to Groq's servers
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: body
            });

            // Read Groq's JSON response
            const data = await response.text();

            // Send Groq's exact response back to our frontend, appending CORS headers
            return new Response(data, {
                status: response.status,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*" // Or lock it to your domain for max security
                }
            });

        } catch (error) {
            return new Response("Internal Server Error", { status: 500 });
        }
    }
};
