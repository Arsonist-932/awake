const Loading = () => {
  return (
    <>
      <section className="min-h-screen">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-200 border-t-red-600"></div>
              <p className="mt-4">Chargement des compétences...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loading;
