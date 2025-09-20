export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Contact Us</h1>
      <p className="mt-4 text-lg text-gray-600">
        Have a question or need assistance? We're here to help.
      </p>
      <div className="mt-10">
        <p>You can reach us through the following channels:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Email: support@nike.com</li>
          <li>Phone: 1-800-806-6453</li>
          <li>Live Chat: Available 24/7 on our website</li>
        </ul>
      </div>
    </main>
  );
}
