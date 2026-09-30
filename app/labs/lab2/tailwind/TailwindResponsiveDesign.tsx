export default function TailwindResponsiveDesign() {
    return (
        <div className="font-sans">
            <h2 className="text-3xl font-bold mb-4">Responsive Design</h2>
            <div className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
                <div className="md:flex">
                    <div className="relative md:w-48 md:shrink-0">
                        <img
                            className="h-56 w-full object-cover md:h-full md:min-h-56 md:w-48"
                            src="/images/dog.jpg"
                            alt="Dog"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-24 w-24"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="12" r="2.05" fill="currentColor" />
                                <g fill="none" stroke="currentColor" strokeWidth="1">
                                    <ellipse cx="12" cy="12" rx="10" ry="4.2" />
                                    <ellipse
                                        cx="12"
                                        cy="12"
                                        rx="10"
                                        ry="4.2"
                                        transform="rotate(60 12 12)"
                                    />
                                    <ellipse
                                        cx="12"
                                        cy="12"
                                        rx="10"
                                        ry="4.2"
                                        transform="rotate(120 12 12)"
                                    />
                                </g>
                            </svg>
                            <div className="mt-2 text-2xl font-semibold">Dog</div>
                        </div>
                    </div>
                    <div className="min-w-0 p-8 md:p-12">
                        <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                            Dog
                        </div>
                        <a
                            href="#"
                            className="mt-1 block text-lg md:text-2xl leading-tight font-medium text-black no-underline hover:underline"
                        >
                            This is very good boy.
                        </a>
                        <p className="mt-2 text-gray-500">
                            This is a random dog I found on the internet.
                        </p>
                    </div>
                </div>
            </div>
            <div id="wd-ai-responsive" className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl mt-6">
                <div className="md:flex">
                    <div className="relative md:w-48 md:shrink-0">
                        <img
                            className="h-56 w-full object-cover md:h-full md:min-h-56 md:w-48"
                            src="/images/reactjs.jpg"
                            alt="AI & Responsive"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-24 w-24"
                                aria-hidden="true"
                            >
                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                            </svg>
                            <div className="mt-2 text-2xl font-semibold">AI Ready</div>
                        </div>
                    </div>
                    <div className="min-w-0 p-6 md:p-12 lg:p-16 md:bg-indigo-50">
                        <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                            Web Development
                        </div>
                        <a
                            href="#"
                            className="mt-1 block text-lg md:text-2xl leading-tight font-medium text-black no-underline hover:underline"
                        >
                            Responsive AI Applications
                        </a>
                        <p className="mt-2 text-gray-500">
                            Learn to build intelligent, responsive applications that adapt beautifully across all devices...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}