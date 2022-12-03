export async function post({ request }) {
    const data = await request.json();
  
    const recaptchaURL = 'https://www.google.com/recaptcha/api/siteverify';
    const requestBody = {
      secret: "6LfPipchAAAAAJyPMhYmZauIQx_6_0I_BcMO6NPX",   // This can be an environment variable
      response: data.recaptcha          // The token passed in from the client
    };
  
    const response = await fetch(recaptchaURL, {
      method: "POST",
      body: JSON.stringify(requestBody)
    });
  
    const responseData = await response.json();
  
    return new Response(JSON.stringify(responseData), { status: 200 });
  }