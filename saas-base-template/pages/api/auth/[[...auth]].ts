export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    return res.status(200).json({
      user: null,
      message: 'Auth endpoint ready. Configure Supabase Auth for full functionality.',
    })
  }

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Sign In - __PRODUCT_NAME__</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50 min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full mx-4">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Welcome to __PRODUCT_NAME__</h1>
          <p class="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <p class="text-gray-500 text-center mb-6">
            Authentication is powered by Supabase Auth.
            <br/>Configure your Supabase project to enable sign-in.
          </p>
          <a href="/" class="block text-center text-emerald-600 hover:text-emerald-700 font-medium">
            ← Back to home
          </a>
        </div>
      </div>
    </body>
    </html>
  `)
}
