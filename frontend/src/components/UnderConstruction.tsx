const UnderConstruction= ({routeName}: {routeName: string}) => {
    return(
        <div>
            <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
                <div className="max-w-md">
                    <h1 className="text-2x1 font-bold tracking-tight text-gray-900 sm:text-3x1">
                        Under Construction
                    </h1>
                    <p className="mt-3 text-sm text-gray-500 sm:text-base">
                        "<span className="text-red-400">{routeName}</span>" is currently being worked on. Check back later.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UnderConstruction;