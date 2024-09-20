// loading.js file placed in a route folder will apply component stream loading for only components contained in route folder
import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}

export default Loading;
