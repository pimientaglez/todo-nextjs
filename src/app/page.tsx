import MainContainer from "./components/MainContainer";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 ">
      <h4 className="font-mono font-medium text-4xl align-middle mb-2">
        My app
      </h4>
      <MainContainer />
    </div>
  );
}
