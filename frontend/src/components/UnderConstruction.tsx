// Renders a placeholder page until an actual one can take its place.
// Takes in a route name that is used in the placeholder's content.

const UnderConstruction = ({ routeName }: { routeName: string }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 text-center">
      <div className="max-w-md">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Under Construction
        </h1>
        <p className="mt-3 text-sm text-gray-500 sm:text-base">
          "<span className="text-red-400">{routeName}</span>" is currently
          being worked on. Check back later.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
